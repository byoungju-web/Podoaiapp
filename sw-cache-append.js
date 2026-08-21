/* ══════════════════════════════════════════════════
   🍇 포도야 셸 캐싱 — 기존 sw.js 맨 아래에 그대로 붙여넣기
   (위쪽 push / notificationclick 코드는 건드리지 않습니다)
   ※ 배포할 때마다 아래 CACHE 뒤 숫자만 올리면 됩니다.
   ══════════════════════════════════════════════════ */
const CACHE = 'podoya-shell-v1';
const SHELL = ['/', '/manifest.json', '/podo-192.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .catch(function () {})
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          if (k !== CACHE && k.indexOf('podoya-shell-') === 0) return caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;                       /* POST 등은 손대지 않음 */

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;        /* 외부 API(워커·AI)는 그대로 통과 */

  /* ── 1) 화면(HTML): 캐시 먼저 보여주고 뒤에서 조용히 새로 받아둔다 ── */
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') > -1) {
    e.respondWith(
      caches.open(CACHE).then(function (c) {
        return c.match('/').then(function (hit) {
          var net = fetch(req).then(function (res) {
            if (res && res.ok) { try { c.put('/', res.clone()); } catch (err) {} }
            return res;
          }).catch(function () { return hit; });
          return hit || net;                              /* 있으면 즉시, 없으면 네트워크 */
        });
      })
    );
    return;
  }

  /* ── 2) 아이콘·매니페스트 같은 정적 파일: 캐시 먼저 ── */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.ok && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { try { c.put(req, copy); } catch (err) {} });
        }
        return res;
      });
    })
  );
});
