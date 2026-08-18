/* ══════════════════════════════════════════════════════════════
   🍇 PODOYA-TALK 레이어 — 포도야(podoya.ai.kr) → 포도톡(podotalk.kr)
   ──────────────────────────────────────────────────────────────
   원칙 : index.html 안의 기존 코드는 한 줄도 고치지 않는다.
          여기서 전역 함수를 덮어쓰기(override)만 한다.

   하는 일 :
     ① 포도톡 이동 주소를 pododa.html → podotalk.kr 로 바꾼다
     ② podotalkPushMsg() 를 podotalk-api 워커 호출로 바꾼다
        (예약 브리핑 · 문서 보관 · 커넥션 결과가 진짜 포도톡으로 감)
     ③ "포도톡 방 연결" 화면을 발송 채널 설정 안에 끼워 넣는다

   안 하는 일 :
     · 포도다(pododa.kr) 관련 — 나중에
     · 포도야 비서 inbox/outbox 양방향 — 나중에
     · 포도톡(pt2.js / podotalk-worker.js) 수정 — 필요 없음

   붙이는 법 : index.html 의 </body> 바로 위에
               <script src="/podoya-talk.js"></script>
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var PTL_VER = "2";

  /* ── 설정 ────────────────────────────────────────────────── */
  var API  = "https://podotalk-api.hasin7jk.workers.dev";  /* 워커 */
  var SITE = "https://podotalk.kr";                        /* 화면 */
  var PFX  = "sv_";        /* pt2.js 가 서버 방을 이 접두어로 읽는다 */

  var K_UID   = "podoya_pt_uid";     /* 포도야가 쓰는 발신자 id */
  var K_ROOMS = "podoya_pt_rooms";   /* 연결된 포도톡 방 목록 */

  var MSG_MAX = 1900;      /* 워커 한도 2000. 여유를 둔다 */
  var GAP_MS  = 400;       /* 워커 분당 25건. 연속 전송 간격 */

  /* ── 작은 도구들 ──────────────────────────────────────────── */
  function LS(k, d) { try { return localStorage.getItem(k) || (d || ""); } catch (e) { return d || ""; } }
  function LSS(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function say(m) { try { if (typeof toast === "function") { toast(m); return; } } catch (e) {} }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* 발신자 id — 워커 검사 규칙 /^[a-zA-Z0-9_-]{6,64}$/ 를 지킨다.
     포도톡의 내 id 는 다른 도메인에 있어서 읽을 수 없다. 그래서
     포도야는 자기 id 를 따로 하나 만들어 쓴다. 방 참여자 목록에는
     "🍇 포도야" 라는 이름으로 한 자리 잡는다. */
  function myUid() {
    var u = LS(K_UID, "");
    if (/^[a-zA-Z0-9_-]{6,64}$/.test(u)) return u;
    var A = "abcdefghijklmnopqrstuvwxyz0123456789", s = "";
    try {
      var r = new Uint8Array(14);
      (window.crypto || {}).getRandomValues
        ? window.crypto.getRandomValues(r)
        : (function () { for (var i = 0; i < 14; i++) r[i] = Math.floor(Math.random() * 256); })();
      for (var i = 0; i < 14; i++) s += A[r[i] % A.length];
    } catch (e) {
      s = String(Date.now()) + Math.random().toString(36).slice(2, 8);
    }
    u = "podoya-" + s;
    LSS(K_UID, u);
    return u;
  }

  var NICK = "🍇 포도야";

  /* ── 연결된 방 목록 ───────────────────────────────────────── */
  /* [{ id:"서버 uuid", code:"ABC123", name:"방 이름", def:1 }] */
  function rooms() {
    try { var a = JSON.parse(LS(K_ROOMS, "[]")); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function saveRooms(a) { LSS(K_ROOMS, JSON.stringify(a || [])); }
  function defRoom() {
    var a = rooms();
    if (!a.length) return null;
    for (var i = 0; i < a.length; i++) if (a[i].def) return a[i];
    return a[0];
  }

  /* ── 워커 호출 ────────────────────────────────────────────── */
  function api(path, body) {
    var o = { method: body ? "POST" : "GET", headers: { "Content-Type": "application/json" } };
    if (body) o.body = JSON.stringify(body);
    return fetch(API + path, o).then(function (r) {
      /* 워커가 그 길을 모르면 HTML 을 뱉는다. 바로 .json() 하면
         엉뚱한 파싱 오류가 나므로 글로 먼저 받는다. */
      return r.text().then(function (t) {
        try { return JSON.parse(t); }
        catch (e) { return { ok: false, error: "서버 응답을 읽지 못했어요 (" + r.status + ")" }; }
      });
    }).catch(function () {
      return { ok: false, error: "포도톡 서버에 연결하지 못했어요" };
    });
  }

  /* ── 보낼 글 다듬기 ───────────────────────────────────────── */
  /* @영문 은 포도톡에서 봇 호출로 읽힌다. 브리핑에 @openai 같은 게
     섞이면 엉뚱한 봇이 깨어나므로 전각 ＠ 로 바꾼다. */
  function tame(s) { return String(s == null ? "" : s).replace(/@/g, "＠"); }

  function chunks(s) {
    s = String(s == null ? "" : s);
    if (s.length <= MSG_MAX) return [s];
    var out = [], i = 0;
    while (i < s.length) {
      var end = Math.min(i + MSG_MAX, s.length);
      if (end < s.length) {
        var cut = s.lastIndexOf("\n", end);          /* 줄 단위로 끊는다 */
        if (cut > i + 200) end = cut;
      }
      out.push(s.slice(i, end));
      i = end;
    }
    return out;
  }

  /* 한 방에 여러 조각을 순서대로 (워커 분당 제한을 피해 간격을 둔다) */
  function sendParts(roomId, parts) {
    var uid = myUid();
    return parts.reduce(function (p, part, idx) {
      return p.then(function (acc) {
        if (acc && acc.stop) return acc;
        return new Promise(function (res) { setTimeout(res, idx ? GAP_MS : 0); })
          .then(function () {
            return api("/talk/message", { room_id: roomId, uid: uid, nick: NICK, body: part });
          })
          .then(function (d) {
            if (!d || !d.ok) return { stop: true, error: (d && d.error) || "전송 실패" };
            return { sent: (acc.sent || 0) + 1 };
          });
      });
    }, Promise.resolve({ sent: 0 }));
  }

  /* ══════════════════════════════════════════════════════════
     ① 이동 주소 — pododa.html → podotalk.kr
     ══════════════════════════════════════════════════════════ */
  window.goPodotalkOpen = function () {
    try { window._vansActive = false; } catch (e) {}
    var u = SITE + "/#/talk/direct";
    try { location.assign(u); } catch (e) { location.href = u; }
  };

  /* 음성으로 "○○방에 …라고 보내줘" 한 경우.
     원래는 localStorage 로 글자를 넘겨 입력창에 채웠는데, 도메인이
     달라 그 길이 막혔다. 그래서 먼저 보내고 방을 연다. */
  window.goPodotalk = function (room, msg, ctx) {
    if (!room || !room.id) return;
    try { window._vansActive = false; } catch (e) {}
    var u = SITE + "/#/talk/room/" + PFX + room.id;
    var go = function () { try { location.assign(u); } catch (e) { location.href = u; } };
    if (!msg) { go(); return; }
    say("포도톡으로 보내는 중…");
    sendParts(room.id, chunks(tame(msg))).then(function (r) {
      if (r && r.stop) { say("보내지 못했어요: " + (r.error || "")); return; }
      setTimeout(go, 250);
    });
  };

  /* ══════════════════════════════════════════════════════════
     ② 방 목록 / 방 찾기 / 메시지 보내기 — 서버로 갈아끼운다
     함수 이름과 인자는 그대로 둔다. 부르는 쪽(예약 브리핑·문서
     보관·커넥션·음성 이동)은 한 줄도 고칠 필요가 없다.
     ══════════════════════════════════════════════════════════ */

  /* 원본은 pododa_talk_rooms 를 읽었다. 이제 연결된 방을 돌려준다. */
  window.podotalkRooms = function () {
    return rooms().map(function (r) { return { id: r.id, name: r.name }; });
  };

  /* 이름으로 방 찾기. 없으면 기본 방. 하나도 연결 안 됐으면 빈 값. */
  window.podotalkEnsureRoom = function (name) {
    var a = rooms();
    if (!a.length) return "";
    var n = String(name || "").trim();
    if (n) {
      for (var i = 0; i < a.length; i++) {
        if (String(a[i].name || "").trim() === n) return a[i].id;
      }
    }
    var d = defRoom();
    return d ? d.id : "";
  };

  /* 예약 브리핑 · 문서 보관 · 커넥션 결과가 전부 이리로 온다. */
  window.podotalkPushMsg = function (roomId, text, fromName) {
    if (!roomId) {
      say("포도톡 방이 연결되지 않았어요");
      setTimeout(function () { window.podoyaTalkSetup(); }, 600);
      return false;
    }
    var head = fromName ? ("【" + String(fromName).slice(0, 20) + "】\n") : "";
    var parts = chunks(tame(head + String(text == null ? "" : text)));
    sendParts(roomId, parts).then(function (r) {
      if (r && r.stop) say("포도톡 전송 실패: " + (r.error || ""));
    });
    return true;
  };

  /* ══════════════════════════════════════════════════════════
     ③ 포도톡 방 연결 화면
     ══════════════════════════════════════════════════════════ */
  function closeSetup() {
    var b = document.getElementById("ptl-bg");
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }
  window.podoyaTalkClose = closeSetup;

  function listHtml() {
    var a = rooms();
    if (!a.length) {
      return '<div style="background:#fafafa;border:1px dashed #ddd;border-radius:12px;padding:18px;' +
             'text-align:center;font-size:13px;color:#999;line-height:1.6">아직 연결된 방이 없어요.<br>' +
             '포도톡에서 방 코드를 복사해 아래에 넣어주세요.</div>';
    }
    var h = "";
    for (var i = 0; i < a.length; i++) {
      var r = a[i], on = !!r.def;
      h += '<div style="display:flex;align-items:center;gap:9px;background:#fff;border:1.5px solid ' +
             (on ? "#c4b5fd" : "#ececec") + ';border-radius:12px;padding:11px 12px;margin-bottom:8px">' +
             '<div style="flex:1;min-width:0">' +
               '<div style="font-size:14px;font-weight:800;color:#111;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
                 esc(r.name) + (on ? ' <span style="font-size:10.5px;color:#7c3aed">기본</span>' : "") +
               '</div>' +
               '<div style="font-size:11.5px;color:#aaa;margin-top:2px">코드 ' + esc(r.code || "-") + '</div>' +
             '</div>' +
             (on ? "" : '<button onclick="podoyaTalkDefault(' + i + ')" style="flex-shrink:0;padding:7px 10px;' +
               'border-radius:9px;border:1px solid #ddd;background:#fff;color:#555;font-size:11.5px;' +
               'font-weight:700;cursor:pointer;font-family:inherit">기본으로</button>') +
             '<button onclick="podoyaTalkRemove(' + i + ')" style="flex-shrink:0;padding:7px 10px;' +
               'border-radius:9px;border:1px solid #f0d0d0;background:#fff;color:#c0392b;font-size:11.5px;' +
               'font-weight:700;cursor:pointer;font-family:inherit">해제</button>' +
           '</div>';
    }
    return h;
  }

  function paint() {
    var el = document.getElementById("ptl-list");
    if (el) el.innerHTML = listHtml();
  }

  window.podoyaTalkDefault = function (i) {
    var a = rooms();
    for (var k = 0; k < a.length; k++) a[k].def = (k === i) ? 1 : 0;
    saveRooms(a); paint(); say("기본 방으로 정했어요");
  };

  window.podoyaTalkRemove = function (i) {
    var a = rooms();
    if (i < 0 || i >= a.length) return;
    if (!confirm('"' + a[i].name + '" 연결을 해제할까요?\n(포도톡 방은 지워지지 않아요)')) return;
    var wasDef = a[i].def;
    a.splice(i, 1);
    if (wasDef && a.length) a[0].def = 1;
    saveRooms(a); paint(); say("해제했어요");
  };

  window.podoyaTalkAdd = function () {
    var inp = document.getElementById("ptl-code");
    var code = ((inp && inp.value) || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!code) { say("방 코드를 넣어주세요"); return; }
    var a = rooms();
    for (var i = 0; i < a.length; i++) {
      if (a[i].code === code) { say("이미 연결된 방이에요"); return; }
    }
    var btn = document.getElementById("ptl-add");
    if (btn) { btn.disabled = true; btn.textContent = "확인 중…"; }
    api("/talk/room?code=" + encodeURIComponent(code)).then(function (d) {
      if (btn) { btn.disabled = false; btn.textContent = "연결"; }
      if (!d || !d.ok || !d.room) { say((d && d.error) || "코드에 맞는 방이 없어요"); return; }
      var a2 = rooms();
      a2.push({ id: d.room.id, code: code, name: d.room.name || "포도톡 방", def: a2.length ? 0 : 1 });
      saveRooms(a2);
      if (inp) inp.value = "";
      paint();
      say("✅ " + (d.room.name || "방") + " 연결됨");
    });
  };

  window.podoyaTalkTest = function () {
    var d = defRoom();
    if (!d) { say("먼저 방을 연결해 주세요"); return; }
    var btn = document.getElementById("ptl-test");
    if (btn) { btn.disabled = true; btn.textContent = "보내는 중…"; }
    sendParts(d.id, ["[포도야] 연결 확인용 시험 메시지입니다 ✅"]).then(function (r) {
      if (btn) { btn.disabled = false; btn.textContent = "테스트 발송"; }
      if (r && r.stop) { say("실패: " + (r.error || "")); return; }
      say("✅ 포도톡 \"" + d.name + "\" 방을 확인해 보세요");
    });
  };

  window.podoyaTalkSetup = function () {
    closeSetup();
    var bg = document.createElement("div");
    bg.id = "ptl-bg";
    bg.style.cssText =
      "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.42);display:flex;" +
      "align-items:flex-end;justify-content:center;font-family:inherit";
    bg.onclick = function (e) { if (e.target === bg) closeSetup(); };

    var sheet = document.createElement("div");
    sheet.style.cssText =
      "width:100%;max-width:520px;max-height:88vh;overflow:auto;background:#fff;" +
      "border-radius:20px 20px 0 0;padding:18px 16px 40px;box-sizing:border-box;" +
      "-webkit-overflow-scrolling:touch";

    sheet.innerHTML =
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
        '<div style="flex:1;font-size:17px;font-weight:800;color:#111">💬 포도톡 방 연결</div>' +
        '<button onclick="podoyaTalkClose()" style="width:34px;height:34px;border-radius:50%;' +
          'border:1px solid #e5e5e5;background:#fafafa;color:#666;font-size:17px;cursor:pointer;' +
          'font-family:inherit;line-height:1">×</button>' +
      '</div>' +

      '<div style="background:#f4f8ff;border:1px solid #e1e9f6;border-radius:12px;padding:12px 13px;' +
        'font-size:12.5px;color:#3a506e;line-height:1.65;margin-bottom:14px">' +
        '예약 브리핑 · 문서 보관 · 실행 결과를 <b>포도톡 방</b>으로 받습니다.<br>' +
        '포도톡에서 방을 열고 <b>방 코드</b>를 복사해 아래에 붙여넣으세요.' +
      '</div>' +

      '<div id="ptl-list" style="margin-bottom:12px">' + listHtml() + '</div>' +

      '<div style="display:flex;gap:7px;margin-bottom:10px">' +
        '<input id="ptl-code" placeholder="방 코드 (예: A7K2QM)" maxlength="12" ' +
          'autocapitalize="characters" autocomplete="off" spellcheck="false" ' +
          'style="flex:1;min-width:0;box-sizing:border-box;background:#f6f7f8;border:1px solid #e6e6e6;' +
          'border-radius:11px;padding:12px;font-size:14px;color:#111;outline:none;font-family:inherit;' +
          'text-transform:uppercase;letter-spacing:1px">' +
        '<button id="ptl-add" onclick="podoyaTalkAdd()" style="flex-shrink:0;padding:12px 18px;' +
          'border-radius:11px;border:none;background:linear-gradient(135deg,#8b35e0,#a855f7);color:#fff;' +
          'font-size:14px;font-weight:800;cursor:pointer;font-family:inherit">연결</button>' +
      '</div>' +

      '<div style="display:flex;gap:7px">' +
        '<button id="ptl-test" onclick="podoyaTalkTest()" style="flex:1;padding:11px;border-radius:11px;' +
          'border:1px solid #dcdcdc;background:#fff;color:#111;font-size:13.5px;font-weight:700;' +
          'cursor:pointer;font-family:inherit">테스트 발송</button>' +
        '<button onclick="goPodotalkOpen()" style="flex:1;padding:11px;border-radius:11px;' +
          'border:1px solid #dcdcdc;background:#fff;color:#111;font-size:13.5px;font-weight:700;' +
          'cursor:pointer;font-family:inherit">포도톡 열기</button>' +
      '</div>' +

      '<details style="margin-top:13px">' +
        '<summary style="font-size:12px;color:#888;cursor:pointer">방 코드는 어디서 받나요?</summary>' +
        '<ol style="margin:8px 0 2px;padding-left:19px;font-size:12px;color:#666;line-height:1.9">' +
          '<li>포도톡에서 방을 하나 만드세요 (예: "포도야 알림")</li>' +
          '<li>방 안 메뉴에서 <b>초대 코드</b>를 복사하세요</li>' +
          '<li>여기에 붙여넣고 연결을 누르세요</li>' +
        '</ol>' +
        '<div style="font-size:11.5px;color:#96a;margin-top:7px;line-height:1.6">' +
          '포도야는 그 방에 <b>' + esc(NICK) + '</b> 이라는 이름으로 참여합니다. ' +
          '참여자 목록에 한 자리가 잡히고, 글이 도착하면 방에 있는 분들께 알림이 갑니다.' +
        '</div>' +
      '</details>';

    bg.appendChild(sheet);
    document.body.appendChild(bg);
  };

  /* ── 발송 채널 설정 안에 "방 연결" 카드 끼워 넣기 ──────────── */
  /* podoadvf-bg 라는 id 는 다른 고급기능 화면도 같이 쓴다. 그래서
     제목이 "발송 채널" 일 때만 붙인다. 화면이 늦게 그려질 수 있어
     몇 번 다시 확인한다. */
  function hookCard(tries) {
    var bg = document.getElementById("podoadvf-bg");
    if (!bg || bg.children.length < 2) {
      if (tries > 0) setTimeout(function () { hookCard(tries - 1); }, 120);
      return;
    }
    if (document.getElementById("ptl-hook")) return;

    /* 첫 아이는 머리말(제목 줄), 그 뒤가 내용 상자다 */
    var head = bg.children[0];
    var title = (head && (head.innerText || head.textContent) || "");
    if (title.indexOf("발송 채널") < 0) return;   /* 다른 화면이면 붙이지 않는다 */

    var w = null;
    for (var i = 1; i < bg.children.length; i++) {
      if (bg.children[i].nodeType === 1) { w = bg.children[i]; break; }
    }
    if (!w) {
      if (tries > 0) setTimeout(function () { hookCard(tries - 1); }, 120);
      return;
    }

    var d = defRoom(), n = rooms().length;
    var box = document.createElement("div");
    box.id = "ptl-hook";
    box.style.cssText =
      "background:#fff;border:1.5px solid " + (d ? "#c4b5fd" : "#f0d0a0") +
      ";border-radius:14px;padding:14px;margin-bottom:12px";
    box.innerHTML =
      '<div style="font-size:14px;font-weight:800;color:#111">💬 포도톡 방 연결</div>' +
      '<div style="font-size:12.5px;color:#999;margin-top:5px;line-height:1.6">' +
        (d ? ('현재 <b>' + esc(d.name) + '</b> 방으로 갑니다' + (n > 1 ? (" 외 " + (n - 1) + "개 연결됨") : ""))
           : '아직 연결 안 됨 — <b>연결해야 포도톡으로 갑니다</b>') +
      '</div>' +
      '<button onclick="podoyaTalkSetup()" style="width:100%;margin-top:11px;padding:11px;' +
        'border-radius:11px;border:1px solid #dcdcdc;background:#fafafa;color:#111;font-size:13.5px;' +
        'font-weight:700;cursor:pointer;font-family:inherit">' +
        (d ? "방 관리" : "방 연결하기") + '</button>';
    w.insertBefore(box, w.firstChild);
  }

  var _origDeliver = window.openDeliverSettings;
  if (typeof _origDeliver === "function") {
    window.openDeliverSettings = function () {
      _origDeliver.apply(this, arguments);
      hookCard(12);
    };
  }
  /* asDeliver() 가 원본 함수를 직접 붙들고 있을 수도 있으니 한 겹 더 */
  var _origAsDeliver = window.asDeliver;
  if (typeof _origAsDeliver === "function") {
    window.asDeliver = function () {
      _origAsDeliver.apply(this, arguments);
      hookCard(12);
    };
  }

  /* ── 준비 확인 ────────────────────────────────────────────── */
  try {
    console.log("🍇 podoya-talk v" + PTL_VER + " · 연결된 방 " + rooms().length + "개 · uid " + myUid());
  } catch (e) {}
})();
