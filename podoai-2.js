/* PodoAI v4.82 - part 2/3 */
function rtEsc(x){ return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function routinesList(){ var a=lsG('podoai_routines',[]); return Array.isArray(a)?a:[]; }
function routinesSaveAll(a){ lsS('podoai_routines',a); }
function routineFind(id){ var a=routinesList(); for(var i=0;i<a.length;i++){ if(a[i].id===id) return a[i]; } return null; }
function routineDelete(id){ if(!confirm('이 루틴을 삭제할까요?')) return; routinesSaveAll(routinesList().filter(function(r){return r.id!==id;})); openRoutines(); }
function routineRun(t){
t=String(t||'').trim(); if(!t) return;
try{
if(typeof podotalkIntent==='function'){ var _pr=podotalkIntent(t); if(_pr){ goPodotalk(_pr, podotalkMsg(t)); return; } }
if(typeof callIntent==='function' && callIntent(t)){ goCall(callParse(t)); return; }
if(typeof tossIntent==='function' && tossIntent(t)){ var _a=tossParse(t); if(_a.prov==='toss'){ goToss(_a); } else { vansTossBack(_a,t); } return; }
if(typeof telegramIntent==='function' && telegramIntent(t)){ goTelegram(telegramParse(t), true); return; }
if(typeof kakaoOpenIntent==='function' && kakaoOpenIntent(t)){ goKakaoOpenRoom(kakaoOpenParse(t), true); return; }
if(typeof kakaoIntent==='function' && kakaoIntent(t)){ var _k=kakaoParse(t); if(_k&&_k.body){ try{ navigator.clipboard.writeText(_k.body); }catch(e){} } if(typeof goKakaoOpen==='function') goKakaoOpen(); return; }
if(typeof smsIntent==='function' && smsIntent(t)){ goSms(smsParse(t)); return; }
if(typeof taxiIntent==='function' && taxiIntent(t)){ goTaxi(); return; }
if(typeof vansIsNavi==='function' && vansIsNavi(t)){ goNavi(t); return; }
if(typeof deliveryIntent==='function' && deliveryIntent(t)){ goDelivery(deliveryParse(t)); return; }
if(typeof adminIntent==='function' && adminIntent(t)){ var _c=adminParse(t); var fav=(typeof adminFind==='function')?adminFind(_c.name):null; var url=fav?fav.url:(_c.kind==='url'?_c.url:''); if(url){ _openTabOrApp(url); } else { vansAdminBack(_c,t); } return; }
if(typeof calIntent==='function' && calIntent(t)){ _openTabOrApp(calBuildUrl(calParse(t))); return; }
if(typeof vansIsMusic==='function' && vansIsMusic(t)){ var mq=(typeof musicTopic==='function')?musicTopic(t):t; _openTabOrApp('https://www.youtube.com/results?search_query='+encodeURIComponent(mq)); return; }
if(typeof uniDetectMode==='function' && uniDetectMode(t)==='draft'){ if(typeof setWorkflowPreset==='function') setWorkflowPreset(uniDetectPreset(t)); openWorkflow(); var wq=document.getElementById('workflow-q'); if(wq) wq.value=t; return; }
_openTabOrApp('https://search.naver.com/search.naver?query='+encodeURIComponent(t));
}catch(err){ if(typeof showToast==='function') showToast('이 단계 실행 중 문제가 생겼어요','rgba(0,0,0,.85)'); }
}
function routineStep(id, i){ var r=routineFind(id); if(r && r.steps && r.steps[i]) routineRun(r.steps[i]); }
function _openTabOrApp(url){ try{ if(window.Android && window.Android.openExternal){ window.Android.openExternal(url); return; } }catch(e){} window.open(url,'_blank'); }
function isApk(){ return !!(window.Android); }
function routineStepLeavesApp(t){ return !(typeof uniDetectMode==='function' && uniDetectMode(String(t||''))==='draft'); }
var _routine=null;
function routinePlay(id){
var r=routineFind(id); if(!r||!r.steps.length) return;
_routine={ id:id, name:r.name, steps:r.steps.slice(), idx:0, pendingResume:false };
routinePlayBar();
routineFireCurrent();
}
function routineFireCurrent(){
if(!_routine) return;
if(_routine.idx>=_routine.steps.length){ routineFinish(); return; }
var step=_routine.steps[_routine.idx];
_routine.pendingResume = isApk() && routineStepLeavesApp(step);
routinePlayBar();
routineRun(step);
}
function routineNext(){
if(!_routine) return;
_routine.pendingResume=false;
_routine.idx++;
if(_routine.idx>=_routine.steps.length){ routineFinish(); return; }
routineFireCurrent();
}
function routineStop(){ _routine=null; var b=document.getElementById('routine-bar'); if(b) b.remove(); }
function routineFinish(){
var nm=_routine?_routine.name:'';
_routine=null; var b=document.getElementById('routine-bar'); if(b) b.remove();
if(typeof showToast==='function') showToast('✅ 루틴 완료: '+nm,'linear-gradient(135deg,#7b61ff,#6645dd)');
}
window.onAppResume=function(){
if(_routine && _routine.pendingResume){ _routine.pendingResume=false; setTimeout(function(){ routineNext(); }, 500); }
};
function routinePlayBar(){
if(!_routine) return;
var b=document.getElementById('routine-bar');
if(!b){ b=document.createElement('div'); b.id='routine-bar'; b.style.cssText='position:fixed;left:10px;right:10px;bottom:14px;z-index:99999;background:#241b3d;color:#fff;border-radius:16px;padding:12px 14px;box-shadow:0 8px 24px rgba(0,0,0,.35);font-family:inherit'; document.body.appendChild(b); }
var cur=_routine.steps[_routine.idx]||'';
var waiting=_routine.pendingResume;
b.innerHTML='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:13px;font-weight:800">🧩 '+rtEsc(_routine.name)+'</span>'
+'<span style="margin-left:auto;font-size:12px;opacity:.8">'+(_routine.idx+1)+' / '+_routine.steps.length+'</span></div>'
+'<div style="font-size:13.5px;font-weight:700;line-height:1.4;margin-bottom:10px;word-break:break-word">'+(waiting?'⏳ 앱 다녀오면 자동 진행 · ':'▶ ')+rtEsc(cur)+'</div>'
+'<div style="display:flex;gap:7px">'
+'<button onclick="routineFireCurrent()" style="flex:0 0 auto;padding:9px 12px;border:1px solid rgba(255,255,255,.4);border-radius:10px;background:transparent;color:#fff;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit">다시</button>'
+'<button onclick="routineNext()" style="flex:1;padding:9px;border:none;border-radius:10px;background:linear-gradient(135deg,#7b61ff,#6645dd);color:#fff;font-size:13.5px;font-weight:800;cursor:pointer;font-family:inherit">다음 단계 ›</button>'
+'<button onclick="routineStop()" style="flex:0 0 auto;padding:9px 12px;border:none;border-radius:10px;background:rgba(255,255,255,.16);color:#fff;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit">중지</button>'
+'</div>';
}
function openRoutines(){
if(typeof vansOpen==='function') vansOpen();
var q=document.getElementById('vans-q'); if(q) q.value='';
var body=document.getElementById('vans-body'); if(!body) return;
var arr=routinesList();
var RC='#7b61ff';
var html='<div style="display:flex;align-items:center;margin:2px 0 4px"><div style="font-size:19px;font-weight:900;color:'+RC+'">🧩 내 루틴</div>'
+'<button onclick="routineEditor()" style="margin-left:auto;padding:8px 13px;border:none;border-radius:11px;background:linear-gradient(135deg,#7b61ff,#6645dd);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">+ 새 루틴</button></div>'
+'<div style="font-size:12.5px;color:#5b6178;line-height:1.6;margin-bottom:13px">자주 하는 동작을 순서대로 묶어두고 한 번에 실행해요. 예) "가게 오픈" → 공지 작성 · 단골 카톡방 · 스토어 관리자.</div>';
if(!arr.length){
html+='<div style="text-align:center;color:#9aa0b4;font-size:13px;padding:22px 0">아직 만든 루틴이 없어요.<br>"+ 새 루틴"으로 만들어보세요.</div>';
} else {
arr.forEach(function(r){
html+='<div style="border-left:4px solid '+RC+';background:rgba(123,97,255,.06);border-radius:0 11px 11px 0;padding:11px 12px;margin-bottom:10px">'
+'<div style="display:flex;align-items:center;gap:8px"><div style="flex:1;min-width:0;font-size:15px;font-weight:800;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">🧩 '+rtEsc(r.name)+'</div>'
+'<button onclick="routineEditor(\''+r.id+'\')" style="padding:6px 10px;border:1px solid #d8dae2;border-radius:8px;background:#fff;color:#555;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">편집</button>'
+'<button onclick="routineDelete(\''+r.id+'\')" style="padding:6px 9px;border:1px solid #eecdd0;border-radius:8px;background:#fff;color:#d3374b;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">삭제</button></div>'
+'<div style="font-size:12px;color:#5b6178;margin:6px 0 9px">'+r.steps.length+'단계 · '+rtEsc(r.steps.slice(0,3).join(' → '))+(r.steps.length>3?' …':'')+'</div>'
+'<button onclick="routineViewer(\''+r.id+'\')" style="display:block;width:100%;box-sizing:border-box;padding:11px;border:none;border-radius:11px;background:linear-gradient(135deg,#7b61ff,#6645dd);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit">▶ 실행</button>'
+'</div>';
});
}
body.innerHTML=html;
}
function routineViewer(id){
var r=routineFind(id); if(!r) return openRoutines();
var body=document.getElementById('vans-body'); if(!body) return;
var RC='#7b61ff';
var html='<div style="display:flex;align-items:center;margin:2px 0 8px"><button onclick="openRoutines()" style="background:none;border:none;color:'+RC+';font-weight:800;font-size:14px;cursor:pointer;font-family:inherit;padding:0">‹ 루틴 목록</button><div style="flex:1"></div></div>'
+'<div style="font-size:19px;font-weight:900;color:'+RC+';margin-bottom:4px">🧩 '+rtEsc(r.name)+'</div>'
+'<div style="font-size:12px;color:#5b6178;line-height:1.6;margin-bottom:13px">위에서부터 순서대로 눌러 실행하세요. 앱이 열리면 <b>뒤로가기</b>로 돌아와 다음 단계를 누르면 돼요. (APK에서는 앱 다녀오면 <b>자동으로 다음 단계</b>가 진행돼요)</div>'
+'<button onclick="routinePlay(\''+r.id+'\')" style="display:block;width:100%;box-sizing:border-box;margin-bottom:14px;padding:13px;border:none;border-radius:13px;background:linear-gradient(135deg,#7b61ff,#6645dd);color:#fff;font-size:14.5px;font-weight:800;cursor:pointer;font-family:inherit">▶ 순서대로 자동 실행</button>';
r.steps.forEach(function(s,i){
html+='<div style="display:flex;align-items:center;gap:10px;background:#f4f2fd;border:1px solid rgba(123,97,255,.25);border-radius:12px;padding:11px 12px;margin-bottom:9px">'
+'<div style="flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:'+RC+';color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center">'+(i+1)+'</div>'
+'<div style="flex:1;min-width:0;font-size:13.5px;font-weight:700;color:#141720;word-break:break-word">'+rtEsc(s)+'</div>'
+'<button onclick="routineStep(\''+r.id+'\','+i+')" style="flex:0 0 auto;padding:9px 14px;border:none;border-radius:10px;background:linear-gradient(135deg,#7b61ff,#6645dd);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">실행</button>'
+'</div>';
});
body.innerHTML=html;
}
function routineEditor(id){
var r=id?routineFind(id):null;
var body=document.getElementById('vans-body'); if(!body) return;
var RC='#7b61ff';
var stepsText = r ? r.steps.join('\n') : '';
var html='<div style="display:flex;align-items:center;margin:2px 0 8px"><button onclick="openRoutines()" style="background:none;border:none;color:'+RC+';font-weight:800;font-size:14px;cursor:pointer;font-family:inherit;padding:0">‹ 루틴 목록</button></div>'
+'<div style="font-size:19px;font-weight:900;color:'+RC+';margin-bottom:10px">'+(r?'✏️ 루틴 편집':'🧩 새 루틴 만들기')+'</div>'
+'<div style="font-size:12px;font-weight:800;color:#5b6178;margin-bottom:4px">루틴 이름</div>'
+'<input id="ru-name" value="'+rtEsc(r?r.name:'')+'" placeholder="예: 가게 오픈" style="width:100%;box-sizing:border-box;padding:11px;border:1.5px solid #d8dae2;border-radius:11px;font-size:15px;font-family:inherit;margin-bottom:12px">'
+'<div style="font-size:12px;font-weight:800;color:#5b6178;margin-bottom:4px">동작 (한 줄에 하나씩, 위→아래 순서)</div>'
+'<textarea id="ru-steps" placeholder="예)\n주말 20% 할인 공지 써줘\n코부기방 텔레그램 열어줘\n스마트스토어 관리자 열어줘" style="width:100%;box-sizing:border-box;min-height:130px;padding:11px;border:1.5px solid #d8dae2;border-radius:11px;font-size:14px;font-family:inherit;line-height:1.6;resize:vertical">'+rtEsc(stepsText)+'</textarea>'
+'<div style="font-size:11.5px;color:#9aa0b4;line-height:1.55;margin:6px 0 12px">각 줄은 평소 음성비서에 말하듯 적으면 돼요: "철수한테 전화", "코인방 텔레그램 열어줘", "스마트스토어 관리자 열어줘", "내일 3시 미팅 잡아줘", "주말 할인 공지 써줘" 등.</div>'
+'<button onclick="routineSaveFromForm('+(r?('\''+r.id+'\''):'')+')" style="display:block;width:100%;box-sizing:border-box;padding:14px;border:none;border-radius:13px;background:linear-gradient(135deg,#7b61ff,#6645dd);color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit">저장</button>';
body.innerHTML=html;
}
function routineSaveFromForm(id){
var nEl=document.getElementById('ru-name'), sEl=document.getElementById('ru-steps');
var name=(nEl&&nEl.value||'').trim();
var steps=((sEl&&sEl.value)||'').split('\n').map(function(x){return x.trim();}).filter(Boolean);
if(!name){ if(typeof showToast==='function') showToast('루틴 이름을 입력해줘','rgba(0,0,0,.85)'); return; }
if(!steps.length){ if(typeof showToast==='function') showToast('동작을 한 줄 이상 적어줘','rgba(0,0,0,.85)'); return; }
var arr=routinesList();
if(id){ for(var i=0;i<arr.length;i++){ if(arr[i].id===id){ arr[i].name=name; arr[i].steps=steps; } } }
else { arr.push({ id:'rt'+Date.now()+Math.random().toString(36).slice(2,5), name:name, steps:steps }); }
routinesSaveAll(arr);
if(typeof showToast==='function') showToast('🧩 루틴을 저장했어요','linear-gradient(135deg,#7b61ff,#6645dd)');
openRoutines();
}
function showFeatureGuide(){
if(typeof vansOpen==='function') vansOpen();
var q=document.getElementById('vans-q'); if(q) q.value='';
var body=document.getElementById('vans-body'); if(!body) return;
var G=[
['🎵','유튜브 노래','유튜브에서 나훈아 노래 틀어줘','유튜브에서 그 노래를 바로 재생','#e11d48'],
['🗺️','길 안내·내비','강남역 길 안내해줘','네이버지도로 길찾기','#16a34a'],
['🍽️','음식점·맛집','근처 국밥집 찾아줘','지도·검색으로 주변 맛집 안내','#ea580c'],
['📍','가볼 만한 곳','가볼 만한 곳 추천해줘','AI가 주변 명소·나들이 추천','#0e7490'],
['🏨','숙소 예약','8월 4일 신라호텔 1박2일 2명 예약','여기어때로 바로 이동','#7c3aed'],
['🚄','기차 예매 (SRT·KTX)','KTX 용산에서 부산까지 내일 2시 예매','KTX(코레일)=앱 열기 / SRT=예매 웹 열기 · 역·날짜는 직접 선택','#1a56db'],
['🛵','배달','치킨 배달 시켜줘','배민(단골 가게 직행) · 요기요(단골 ID) · 쿠팡이츠','#22c55e'],
['🛒','쇼핑','○○ 최저가 검색해줘','네이버쇼핑·쿠팡 등에서 검색','#f59e0b'],
['🚕','택시','택시 불러줘','카카오T로 호출','#d97706'],
['📞','전화','김사장한테 전화','저장된 연락처로 다이얼러 열기','#2563eb'],
['💬','문자','김사장한테 늦는다고 문자','내용까지 채워서 문자앱 열기','#0891b2'],
['💛','카톡','김사장한테 안녕이라고 카톡','메시지 복사 + 카톡 열기<br><span style="color:#8a7f00">· 오픈채팅방: 링크 저장하면 "○○ 오픈카톡방 열어줘"로 그 방 직행</span>','#eab308'],
['✈️','텔레그램','코인방 텔레그램 열어줘','방 링크·@아이디를 저장하면 그 방으로 바로 직행','#0ea5e9'],
['💸','송금·페이','김사장한테 2만원 토스로 보내줘','토스: 계좌·금액까지 자동 입력<br><span style="color:#5b6178">· 네이버페이·카카오페이: 앱으로 열어 송금(앱 없으면 웹)</span>','#10b981'],
['📅','일정 등록','내일 3시 김사장 미팅 잡아줘','구글 캘린더에 제목·시간 자동 입력','#6366f1'],
['🔗','내 관리 페이지','스마트스토어 관리자 열어줘','스마트스토어·배민 사장님 등 링크 저장 → 반복 접속 직행','#14b8a6']
];
var html='<div style="font-size:19px;font-weight:900;color:#0a7a96;margin:2px 0 4px">📋 이렇게 말해보세요</div>'
+'<div style="font-size:12.5px;color:#5b6178;line-height:1.6;margin-bottom:13px">말하거나 적으면 아래처럼 알아서 실행해요. <b>연락처·링크를 한 번만 저장</b>해두면 다음부턴 그 대상으로 바로 직행합니다.</div>';
G.forEach(function(g){
html+='<div style="border-left:4px solid '+g[4]+';background:rgba(0,0,0,.02);border-radius:0 11px 11px 0;padding:9px 12px;margin-bottom:9px">'
+'<div style="font-size:14.5px;font-weight:800;color:#141720">'+g[0]+' '+g[1]+'</div>'
+'<div style="margin:5px 0 4px"><span style="display:inline-block;background:rgba(8,129,159,.1);color:#0a7a96;font-size:12.5px;font-weight:700;padding:3px 10px;border-radius:9px">🗣️ &ldquo;'+g[2]+'&rdquo;</span></div>'
+'<div style="font-size:12px;color:#5b6178;line-height:1.55">→ '+g[3]+'</div>'
+'</div>';
});
html+='<div onclick="vansClose();openWorkflow()" style="border-left:4px solid #7b61ff;background:rgba(123,97,255,.06);border-radius:0 11px 11px 0;padding:9px 12px;margin-bottom:9px;cursor:pointer">'
+'<div style="font-size:14.5px;font-weight:800;color:#141720;display:flex;align-items:center">✍️ 사장님 글쓰기<span style="margin-left:auto;color:#7b61ff;font-size:19px;font-weight:800">›</span></div>'
+'<div style="margin:5px 0 4px"><span style="display:inline-block;background:rgba(123,97,255,.12);color:#6645dd;font-size:12.5px;font-weight:700;padding:3px 10px;border-radius:9px">✍️ 공지·예약·리뷰·지출·감사·환불·배송·이벤트</span></div>'
+'<div style="font-size:12px;color:#5b6178;line-height:1.55">→ 8종 문구를 AI가 작성 (탭하면 열려요)</div>'
+'</div>';
html+='<div onclick="openRoutines()" style="border-left:4px solid #7b61ff;background:rgba(123,97,255,.06);border-radius:0 11px 11px 0;padding:9px 12px;margin-bottom:9px;cursor:pointer">'
+'<div style="font-size:14.5px;font-weight:800;color:#141720;display:flex;align-items:center">🧩 내 루틴<span style="margin-left:auto;color:#7b61ff;font-size:19px;font-weight:800">›</span></div>'
+'<div style="margin:5px 0 4px"><span style="display:inline-block;background:rgba(123,97,255,.12);color:#6645dd;font-size:12.5px;font-weight:700;padding:3px 10px;border-radius:9px">🧩 여러 동작을 순서대로 묶기</span></div>'
+'<div style="font-size:12px;color:#5b6178;line-height:1.55">→ "가게 오픈" 한 번에 공지·카톡방·스토어 실행 (탭하면 열려요)</div>'
+'</div>';
html+='<div style="font-size:11.5px;color:#9aa0b4;line-height:1.6;margin-top:10px;padding:10px 12px;background:rgba(8,129,159,.06);border-radius:11px">💡 저장(연락처·계좌·링크·즐겨찾기)은 모두 <b>이 기기에만</b> 보관돼요(서버 없음). 음성이 안 되는 기기는 글로 적어도 똑같이 실행됩니다.</div>';
body.innerHTML=html;
}
function calPad(n){ return (n<10?'0':'')+n; }
function calFmt(d, allDay){ var y=d.getFullYear(), m=calPad(d.getMonth()+1), da=calPad(d.getDate()); return allDay ? (''+y+m+da) : (''+y+m+da+'T'+calPad(d.getHours())+calPad(d.getMinutes())+'00'); }
var CAL_WD=['일','월','화','수','목','금','토'];
function calWeekday(ch){ return {'일':0,'월':1,'화':2,'수':3,'목':4,'금':5,'토':6}[ch]; }
function trainIntent(q){ q=String(q||'');
var brand=/(srt|ktx|기차|열차|코레일|고속철|무궁화|새마을|itx)/i.test(q);
var act=/(예매|예약|표|승차권|끊어|타고\s*가|편도|왕복|자리|좌석)/.test(q);
var route=/에서.*(까지|행|가는|도착)/.test(q);
var stations=/(수서|서울역|용산|부산|동대구|대전|대구|광주송정|목포|천안아산|오송|울산|포항|여수|익산|전주|강릉|청량리|공주|김천구미|경주|밀양|나주|정읍|남원|순천)/.test(q);
if(/방법|어떻게|하는\s*법|뭐가\s*빨|차이|뭐야|얼마\s*(야|인|지|예)/.test(q)) return false;
if(brand && (act||route)) return true;
if(route && (act||stations)) return true;
if(stations && act) return true;
return false;
}
function trainParse(q){ q=String(q||''); var now=new Date();
var kind = /srt/i.test(q) ? 'srt' : (/ktx|코레일|무궁화|새마을|itx/i.test(q) ? 'ktx' : '');
var from='', to='';
var m=q.match(/([가-힣]{2,}?)\s*역?\s*에서\s*([가-힣]{2,}?)\s*역?\s*(?:까지|행|가는|도착|으로)/);
if(m){ from=m[1]; to=m[2]; }
else { var m2=q.match(/([가-힣]{2,})\s*역?\s*(?:→|->|~|－|-)\s*([가-힣]{2,})/); if(m2){ from=m2[1]; to=m2[2]; } }
from=from.replace(/역$/,''); to=to.replace(/역$/,'');
if(!from && !to){
var STN=['수서','청량리','서울','용산','부산','동대구','대전','대구','광주송정','목포','천안아산','천안','오송','울산','포항','여수','익산','전주','강릉','공주','김천구미','경주','밀양','나주','정읍','남원','순천','평택','수원'];
var found=[]; STN.forEach(function(st){ var idx=q.indexOf(st); if(idx>=0) found.push([idx,st]); });
found.sort(function(a,b){ return a[0]-b[0]; });
if(found.length>=2){ from=found[0][1]; to=found[1][1]; } else if(found.length===1){ from=found[0][1]; }
}
var dateStr='';
var md=q.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일/);
if(md){ dateStr=(+md[1])+'월 '+(+md[2])+'일'; }
else if(/모레/.test(q)){ var d=new Date(now.getTime()+2*86400000); dateStr=(d.getMonth()+1)+'월 '+d.getDate()+'일'; }
else if(/내일/.test(q)){ var d1=new Date(now.getTime()+86400000); dateStr=(d1.getMonth()+1)+'월 '+d1.getDate()+'일'; }
else if(/오늘/.test(q)){ dateStr=(now.getMonth()+1)+'월 '+now.getDate()+'일'; }
var timeStr='';
var tm=q.match(/(오전|오후|저녁|아침|밤)?\s*(\d{1,2})\s*시(?:\s*(\d{1,2})\s*분|\s*반)?/);
if(tm){ var hh=+tm[2]; if(/오후|저녁|밤/.test(tm[1]||'')&&hh<12) hh+=12; if(/오전|아침/.test(tm[1]||'')&&hh===12) hh=0; else if(!tm[1]&&hh>=1&&hh<=6) hh+=12; var mm=tm[3]?(+tm[3]):(/시\s*반/.test(tm[0])?30:0); timeStr=(hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm; }
var pax=''; var pm=q.match(/(\d{1,2})\s*(명|인|매|장|좌석|자리)/); if(pm) pax=pm[1]+'명';
return { kind:kind, from:from, to:to, date:dateStr, time:timeStr, pax:pax, raw:q };
}
function trainSummary(info){ return [ (info.from||info.to)?((info.from||'?')+' → '+(info.to||'?')):'', info.date, info.time, info.pax ].filter(Boolean).join(' / '); }
function goTrainSRT(){ _openApp('intent:#Intent;package=kr.co.srail.newapp;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=https%3A%2F%2Fetk.srail.kr%2Fmain.do;end','kr.co.srail.newapp'); }
function goTrainKTX(){ _openApp('intent:#Intent;package=com.korail.talk;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=https%3A%2F%2Fwww.letskorail.com%2F;end','com.korail.talk'); }
function goTrain(info){
window._vansActive=true;
var s=trainSummary(info); if(s){ try{ navigator.clipboard.writeText(s); }catch(e){} }
var k=info.kind;
if(!k){ if(/수서/.test(info.from||'')) k='srt'; else if(/서울|용산|청량리/.test(info.from||'')) k='ktx'; else k='srt'; }
if(k==='ktx') goTrainKTX(); else goTrainSRT();
}
function vansTrainBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var summ=trainSummary(info);
var TB='#1a56db';
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:'+TB+';margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(26,86,219,.35)'; t.textContent='🚄 기차 예매'+(info.from||info.to?(' — '+(info.from||'?')+'→'+(info.to||'?')):''); body.appendChild(t);
if(summ){ var bx=document.createElement('div'); bx.style.cssText='font-size:15px;color:#141720;font-weight:700;background:rgba(26,86,219,.07);border-radius:10px;padding:12px 14px;margin:4px 0 10px;line-height:1.7'; bx.textContent='🚉 '+(info.from||'?')+' → '+(info.to||'?')+'\n📅 '+(info.date||'날짜 미지정')+'   🕒 '+(info.time||'시간 미지정')+'   👥 '+(info.pax||'인원 미지정'); body.appendChild(bx); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:0 0 12px'; note.textContent='기차표는 SRT·코레일 정책상 외부에서 자동으로 채워 예매할 수 없어요. 예매 화면을 열어드리고, 위 정보를 복사해드릴게요 — 앱에서 출발·도착·날짜만 선택하면 빠르게 끝나요. (로그인 상태면 바로 조회)'; body.appendChild(note);
function bigBtn(label, grad, fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
var wantK=info.kind==='ktx', wantS=info.kind==='srt';
if(!wantK) bigBtn('🚄 SRT 예매 열기'+(summ&&wantS?'':''), 'linear-gradient(135deg,#5b21b6,#7c3aed)', function(){ window._vansActive=true; goTrainSRT(); });
if(!wantS) bigBtn('🚆 코레일(KTX) 예매 열기', 'linear-gradient(135deg,#1a56db,#1e40af)', function(){ window._vansActive=true; goTrainKTX(); });
var cp=document.createElement('button'); cp.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:13px;border:none;border-radius:12px;cursor:pointer;font-family:inherit;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#6b7280,#4b5563)'; cp.textContent='📋 예매 정보 복사'; cp.onclick=function(){ var txt=summ||info.raw; try{ navigator.clipboard.writeText(txt); cp.textContent='✅ 복사됨! 예매 화면에 참고'; }catch(e){ alert('복사할 정보: '+txt); } }; body.appendChild(cp);
var tip=document.createElement('div'); tip.style.cssText='font-size:11px;color:#9aa0b4;margin-top:4px;line-height:1.5'; tip.textContent='"SRT 수서에서 부산까지 내일 오후 2시 2명 예매"처럼 말하면 정보가 자동 정리돼요. SRT=수서 출발 / 코레일(KTX)=서울·용산 출발.'; body.appendChild(tip);
}
function calIntent(q){ q=String(q||'');
if(/방법|어떻게|취소|삭제|변경|수정|뭐야|뜻/.test(q)) return false;
var hasKw=/(일정|약속|미팅|회의|스케줄|캘린더|예약)/.test(q);
var hasAct=/(잡아|등록|추가|넣어|만들어|기록)/.test(q);
var hasWhen=/(오늘|내일|모레|글피|\d{1,2}\s*시|\d{1,2}\s*월\s*\d{1,2}\s*일|[월화수목금토일]요일|\d{1,2}\s*일)/.test(q);
if(hasKw && hasAct) return true;
if(/잡아\s*줘?/.test(q) && hasWhen) return true;
if(/(일정|약속|미팅|회의)/.test(q) && hasWhen) return true;
return false;
}
function calParse(q){
q=String(q||''); var now=new Date();
var base=new Date(now.getFullYear(),now.getMonth(),now.getDate());
var allDay=true, hour=null, min=0, dateSet=false;
if(/모레/.test(q)){ base.setDate(base.getDate()+2); dateSet=true; }
else if(/글피/.test(q)){ base.setDate(base.getDate()+3); dateSet=true; }
else if(/내일/.test(q)){ base.setDate(base.getDate()+1); dateSet=true; }
else if(/오늘/.test(q)){ dateSet=true; }
var md=q.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일/);
if(md){ base=new Date(now.getFullYear(), +md[1]-1, +md[2]); if(base < new Date(now.getFullYear(),now.getMonth(),now.getDate())) base.setFullYear(base.getFullYear()+1); dateSet=true; }
else { var dOnly=q.match(/(\d{1,2})\s*일(?!\s*간)/); if(dOnly){ base=new Date(now.getFullYear(),now.getMonth(),+dOnly[1]); if(base < new Date(now.getFullYear(),now.getMonth(),now.getDate())) base.setMonth(base.getMonth()+1); dateSet=true; } }
var wm=q.match(/(다음\s*주|담주|이번\s*주)?\s*([월화수목금토일])\s*요일/);
if(wm){ var target=calWeekday(wm[2]), diff=(target-base.getDay()+7)%7; if(diff===0) diff=7; if(wm[1]&&/다음|담/.test(wm[1])) diff+=7; base.setDate(base.getDate()+diff); dateSet=true; }
var ampm=null;
if(/오전|아침|새벽/.test(q)) ampm='am'; else if(/오후|저녁|밤/.test(q)) ampm='pm';
var tm=q.match(/(\d{1,2})\s*시(?:\s*(\d{1,2})\s*분|\s*(반))?/);
if(tm){ hour=+tm[1]; if(tm[2]) min=+tm[2]; else if(tm[3]) min=30;
if(ampm==='pm' && hour<12) hour+=12; else if(ampm==='am' && hour===12) hour=0; else if(ampm===null && hour>=1 && hour<=7) hour+=12;
allDay=false;
} else if(/점심/.test(q)){ hour=12; allDay=false; } else if(/저녁/.test(q)){ hour=18; allDay=false; } else if(/아침/.test(q)){ hour=8; allDay=false; }
var dur=60; var dm=q.match(/(\d{1,2})\s*시간/); if(dm) dur=+dm[1]*60; if(/시간\s*반|한\s*시간\s*반/.test(q)) dur+=30;
var start=new Date(base); if(!allDay && hour!=null) start.setHours(hour,min,0,0);
var end=new Date(start); if(allDay) end.setDate(end.getDate()+1); else end.setMinutes(end.getMinutes()+dur);
var title=q
.replace(/\d{1,2}\s*월\s*\d{1,2}\s*일/g,' ').replace(/\d{1,2}\s*일(?!간)/g,' ')
.replace(/(다음\s*주|담주|이번\s*주)?\s*[월화수목금토일]\s*요일/g,' ')
.replace(/오늘|내일|모레|글피/g,' ').replace(/오전|오후|아침|저녁|점심|새벽|밤/g,' ')
.replace(/\d{1,2}\s*시(\s*\d{1,2}\s*분|\s*반)?(에|부터)?/g,' ').replace(/\d{1,2}\s*시간(\s*반)?/g,' ')
.replace(/(일정|스케줄|캘린더)(에|을|를|좀)?/g,' ')
.replace(/(잡아\s*줘?|잡아|등록\s*해?\s*줘?|등록|추가\s*해?\s*줘?|추가|넣어\s*줘?|넣어|만들어\s*줘?|기록\s*해?\s*줘?|해\s*줘|좀|줘)/g,' ')
.replace(/\s+/g,' ').trim();
if(!title) title='일정';
return { title:title, start:start, end:end, allDay:allDay, dur:dur };
}
function calBuildUrl(ev){
var s=calFmt(ev.start, ev.allDay), e=calFmt(ev.end, ev.allDay);
var u='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(ev.title||'일정')+'&dates='+s+'/'+e+'&ctz=Asia%2FSeoul';
if(ev.details) u+='&details='+encodeURIComponent(ev.details);
if(ev.location) u+='&location='+encodeURIComponent(ev.location);
return u;
}
function goCalUrl(u){ window._vansActive=true; try{ if(typeof openUrl==='function'){ openUrl(u); return; } }catch(e){} try{ location.assign(u); }catch(e){ location.href=u; } }
function calHuman(ev){
var d=ev.start; var s=(d.getMonth()+1)+'월 '+d.getDate()+'일('+CAL_WD[d.getDay()]+')';
if(ev.allDay) return s+' 종일';
return s+' '+calPad(d.getHours())+':'+calPad(d.getMinutes());
}
function vansCalBack(ev, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var CB='#1a73e8';
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:'+CB+';margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(26,115,232,.35)'; t.textContent='📅 일정 등록 — '+(ev.title||'일정'); body.appendChild(t);
var bx=document.createElement('div'); bx.style.cssText='font-size:15px;color:#141720;font-weight:700;background:rgba(26,115,232,.08);border-radius:10px;padding:12px 14px;margin:4px 0 10px;line-height:1.6'; bx.textContent='📌 '+(ev.title||'일정')+'\n🕒 '+calHuman(ev); body.appendChild(bx);
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:0 0 12px'; note.textContent='제목·날짜·시간을 미리 채워 구글 캘린더 등록 화면을 엽니다. 아래에서 고친 뒤 등록하세요. (구글 계정 로그인 상태면 그대로 저장만 누르면 끝)'; body.appendChild(note);
function field(label){ var w=document.createElement('div'); w.style.cssText='margin-bottom:8px'; var l=document.createElement('div'); l.style.cssText='font-size:11.5px;color:#5b6178;font-weight:700;margin-bottom:3px'; l.textContent=label; w.appendChild(l); return w; }
var inCss='width:100%;box-sizing:border-box;padding:10px;border:1px solid #d8dae2;border-radius:9px;font-size:14px;font-family:inherit';
var wT=field('제목'); var iT=document.createElement('input'); iT.type='text'; iT.id='cal-title'; iT.value=ev.title||''; iT.style.cssText=inCss; wT.appendChild(iT); body.appendChild(wT);
var wD=field('날짜'); var iD=document.createElement('input'); iD.type='date'; iD.id='cal-date'; iD.value=ev.start.getFullYear()+'-'+calPad(ev.start.getMonth()+1)+'-'+calPad(ev.start.getDate()); iD.style.cssText=inCss; wD.appendChild(iD); body.appendChild(wD);
var rowAD=document.createElement('label'); rowAD.style.cssText='display:flex;align-items:center;gap:7px;margin:2px 0 8px;font-size:13px;color:#141720;font-weight:600;cursor:pointer';
var iAD=document.createElement('input'); iAD.type='checkbox'; iAD.id='cal-allday'; iAD.checked=ev.allDay; iAD.style.cssText='width:17px;height:17px'; rowAD.appendChild(iAD); var adl=document.createElement('span'); adl.textContent='종일'; rowAD.appendChild(adl); body.appendChild(rowAD);
var wTime=field('시작 시간'); var iTime=document.createElement('input'); iTime.type='time'; iTime.id='cal-time'; iTime.value=ev.allDay?'09:00':(calPad(ev.start.getHours())+':'+calPad(ev.start.getMinutes())); iTime.style.cssText=inCss; iTime.disabled=ev.allDay; wTime.appendChild(iTime); body.appendChild(wTime);
var wDur=field('소요 시간'); var iDur=document.createElement('select'); iDur.id='cal-dur'; iDur.style.cssText=inCss; [['30','30분'],['60','1시간'],['90','1시간 30분'],['120','2시간'],['180','3시간']].forEach(function(o){ var op=document.createElement('option'); op.value=o[0]; op.textContent=o[1]; if(+o[0]===ev.dur) op.selected=true; iDur.appendChild(op); }); wDur.appendChild(iDur); body.appendChild(wDur);
iAD.onchange=function(){ iTime.disabled=iAD.checked; iDur.disabled=iAD.checked; };
if(ev.allDay) iDur.disabled=true;
var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin:6px 0 4px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:linear-gradient(135deg,#1a73e8,#1257c7);box-shadow:0 4px 12px rgba(26,115,232,.28)'; b.textContent='📅 구글 캘린더에 등록';
b.onclick=function(){
var titleV=iT.value.trim()||'일정'; var dateV=iD.value; var allDayV=iAD.checked; var timeV=iTime.value; var durV=+iDur.value||60;
if(!dateV){ alert('날짜를 선택해줘.'); return; }
var p=dateV.split('-'); var s=new Date(+p[0],+p[1]-1,+p[2]);
if(!allDayV && timeV){ var tp=timeV.split(':'); s.setHours(+tp[0],+tp[1],0,0); }
var e=new Date(s); if(allDayV) e.setDate(e.getDate()+1); else e.setMinutes(e.getMinutes()+durV);
goCalUrl(calBuildUrl({title:titleV, start:s, end:e, allDay:allDayV}));
};
body.appendChild(b);
var tip=document.createElement('div'); tip.style.cssText='font-size:11px;color:#9aa0b4;margin-top:4px;line-height:1.5'; tip.textContent='"내일 오후 3시 김사장 미팅 잡아줘"처럼 말하면 자동으로 채워져요.'; body.appendChild(tip);
}
function adminList(){ var a=lsG('podoai_admin',[]); return Array.isArray(a)?a:[]; }
function adminSave(name,url){ name=String(name||'').trim(); url=String(url||'').trim(); if(!/^https?:\/\//i.test(url)) url='https://'+url.replace(/^\/+/,''); if(!name||!/^https?:\/\/.+/i.test(url)) return false; var a=adminList().filter(function(s){return s.name!==name;}); a.push({name:name,url:url}); lsS('podoai_admin',a); return true; }
function adminDel(name){ lsS('podoai_admin', adminList().filter(function(s){return s.name!==name;})); }
function adminFind(name){
if(!name) return null; var q=String(name).replace(/\s/g,''); if(!q) return null;
var a=adminList(); if(!a.length) return null;
for(var i=0;i<a.length;i++){ if(String(a[i].name).replace(/\s/g,'')===q) return a[i]; }
var best=null,bestScore=0;
for(i=0;i<a.length;i++){ var nm=String(a[i].name).replace(/\s/g,''); if(nm.length<2) continue; var overlap=Math.min(q.length,nm.length); if(overlap<2) continue; var base=(q.length<=nm.length)?q:nm; var head=(q.length<=nm.length)?nm.slice(0,q.length):q.slice(0,nm.length); var sc=(typeof tgSim==='function')?tgSim(base,head):(base===head?1:0); if(sc>bestScore){bestScore=sc;best=a[i];} }
return (best&&bestScore>=0.6)?best:null;
}
function adminIntent(q){ q=String(q||'');
if(/방법|어떻게|뭐야|가입\s*방법|만드는|만들려|탈퇴/.test(q)) return false;
var openV=/(열어|열기|들어가|입장|접속|보여|가\s*줘|켜|이동)/.test(q);
if(!openV) return false;
var kw=/(관리자|관리\s*페이지|관리페이지|판매자\s*센터|판매자센터|셀러|대시보드|어드민|admin|백오피스|관리\s*툴|사장님\s*광장|사장님|판매자\s*정보|스토어\s*관리|매출\s*관리|정산)/i.test(q);
if(kw) return true;
try{ var nm=adminParse(q).name; if(nm && adminFind(nm)) return true; }catch(e){}
return false;
}
function adminParse(q){ q=String(q||'');
var lm=q.match(/https?:\/\/[^\s]+/i); if(lm){ return {kind:'url', url:lm[0], name:lm[0], raw:q}; }
var t=q
.replace(/관리\s*페이지|관리페이지|판매자\s*센터|판매자센터|백오피스|관리\s*툴|사장님\s*광장|대시보드|어드민|admin|관리자|셀러|판매자|매출\s*관리|정산|관리/gi,' ')
.replace(/(사이트|페이지|화면)/g,' ')
.replace(/(열어\s*줘?|열기|들어가\s*줘?|들어가|입장(해\s*줘?)?|접속(해\s*줘?)?|보여\s*줘?|가\s*줘|켜\s*줘?|이동(해\s*줘?)?|해\s*줘|좀|줘)/g,' ')
.replace(/^\s*(내|제|나의)\s+/,'')
.replace(/\s+/g,' ').trim();
return {kind:'name', name:t, raw:q};
}
function goAdminUrl(u){ window._vansActive=true; try{ if(typeof openUrl==='function'){ openUrl(u); return; } }catch(e){} try{ location.assign(u); }catch(e){ location.href=u; } }
function goAdmin(info, force){
if(!(force || _hasGesture())) return;
var fav=adminFind(info&&info.name);
var url=fav?fav.url:((info&&info.kind==='url')?info.url:'');
if(!url) return;
goAdminUrl(url);
}
var ADMIN_PRESETS=[
['스마트스토어','https://sell.smartstore.naver.com'],
['배민 사장님','https://ceo.baemin.com'],
['쿠팡 윙','https://wing.coupang.com'],
['스마트플레이스','https://smartplace.naver.com'],
['유튜브 스튜디오','https://studio.youtube.com'],
['홈택스','https://hometax.go.kr'],
['인스타그램','https://instagram.com']
];
function vansAdminBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var fav=adminFind(info&&info.name);
var url=fav?fav.url:((info&&info.kind==='url')?info.url:'');
var nameTxt=fav?fav.name:((info&&info.name)||'');
var AC='#0891b2';
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:'+AC+';margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(8,145,178,.35)'; t.textContent='🔗 관리 페이지 열기'+(nameTxt?(' — '+nameTxt):''); body.appendChild(t);
if(url){ var bx=document.createElement('div'); bx.style.cssText='font-size:14px;color:#141720;font-weight:700;background:rgba(8,145,178,.08);border-radius:10px;padding:12px 14px;margin:4px 0 10px;line-height:1.6;word-break:break-all'; bx.textContent=url.replace(/^https?:\/\//,'')+'  → 바로 엽니다'; body.appendChild(bx); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:0 0 12px';
note.textContent = url
? '저장된 관리 페이지로 바로 이동해요. 로그인 상태면 그대로 열립니다.'
: '"'+(nameTxt||'그 페이지')+'" 로 저장된 링크가 없어요. 아래 즐겨찾기에 이름→주소를 한 번만 저장하면, 다음부턴 "'+(nameTxt||'OO')+' 관리자 열어줘"로 바로 들어갑니다. (자주 쓰는 건 프리셋에서 한 번에 추가)';
body.appendChild(note);
if(url){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:linear-gradient(135deg,#0891b2,#0e7490);box-shadow:0 4px 12px rgba(8,145,178,.26)'; b.textContent='🔗 '+(nameTxt||'페이지')+' 열기'; b.onclick=function(){ goAdmin(fav?{name:fav.name}:info, true); }; body.appendChild(b); }
vansAdminUI(body, info);
}
function vansAdminUI(body, info){
var wrap=document.createElement('div'); wrap.style.cssText='margin-top:14px;padding:12px;border-radius:12px;background:rgba(8,145,178,.07);border:1px solid rgba(8,145,178,.4)';
var h=document.createElement('div'); h.style.cssText='font-size:13.5px;font-weight:800;color:#0e7490;margin-bottom:6px'; h.textContent='🔖 관리 페이지 즐겨찾기 (한 번 등록하면 바로 직행)'; wrap.appendChild(h);
var list=document.createElement('div'); list.style.cssText='margin-bottom:8px';
function refresh(){
while(list.firstChild) list.removeChild(list.firstChild);
var arr=adminList();
if(!arr.length){ var e=document.createElement('div'); e.style.cssText='font-size:12px;color:#9aa0b4;padding:4px 0'; e.textContent='저장된 페이지가 없어요. 아래에서 추가하세요.'; list.appendChild(e); return; }
arr.forEach(function(s){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.08)';
var nm=document.createElement('div'); nm.style.cssText='flex:1;min-width:0;font-size:13.5px;font-weight:700;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; nm.textContent=s.name+' '; var nc=document.createElement('span'); nc.style.cssText='font-size:11px;color:#9aa0b4;font-weight:600'; nc.textContent=String(s.url).replace(/^https?:\/\//,''); nm.appendChild(nc); row.appendChild(nm);
var goB=document.createElement('button'); goB.textContent='열기'; goB.style.cssText='padding:6px 12px;border:none;border-radius:8px;background:#0891b2;color:#fff;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; goB.onclick=function(){ goAdmin({name:s.name}, true); }; row.appendChild(goB);
var delB=document.createElement('button'); delB.textContent='삭제'; delB.style.cssText='padding:6px 9px;border:none;border-radius:8px;background:#e5e7eb;color:#555;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; delB.onclick=function(){ adminDel(s.name); refresh(); }; row.appendChild(delB);
list.appendChild(row);
});
}
refresh(); wrap.appendChild(list);
var form=document.createElement('div'); form.style.cssText='display:flex;gap:6px;align-items:center;margin-bottom:8px';
var nIn=document.createElement('input'); nIn.type='text'; nIn.placeholder='이름(예: 스마트스토어)'; nIn.value=(info&&info.name)||''; nIn.style.cssText='width:100px;flex-shrink:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var vIn=document.createElement('input'); vIn.type='text'; vIn.placeholder='주소(https://…)'; vIn.value=(info&&info.kind==='url'?info.url:'')||''; vIn.style.cssText='flex:1;min-width:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var sB=document.createElement('button'); sB.textContent='저장'; sB.style.cssText='padding:9px 12px;border:none;border-radius:8px;background:#0e7490;color:#fff;font-size:13px;font-weight:800;font-family:inherit;cursor:pointer';
sB.onclick=function(){ if(adminSave(nIn.value, vIn.value)){ vIn.value=''; refresh(); } else { alert('이름과 주소(https://…)를 입력해줘.'); } };
form.appendChild(nIn); form.appendChild(vIn); form.appendChild(sB); wrap.appendChild(form);
var pl=document.createElement('div'); pl.style.cssText='font-size:11.5px;color:#5b6178;font-weight:700;margin-bottom:5px'; pl.textContent='빠른 추가 (탭하면 등록)'; wrap.appendChild(pl);
var chips=document.createElement('div'); chips.style.cssText='display:flex;flex-wrap:wrap;gap:6px';
ADMIN_PRESETS.forEach(function(p){
var c=document.createElement('button'); c.textContent='+ '+p[0]; c.style.cssText='padding:7px 11px;border:1px solid rgba(8,145,178,.45);border-radius:16px;background:#fff;color:#0e7490;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer';
c.onclick=function(){ adminSave(p[0], p[1]); refresh(); c.style.background='#0891b2'; c.style.color='#fff'; c.textContent='✓ '+p[0]; };
chips.appendChild(c);
});
wrap.appendChild(chips);
var hint=document.createElement('div'); hint.style.cssText='font-size:11px;color:#9aa0b4;margin-top:8px;line-height:1.5'; hint.textContent='이 기기에만 저장돼요(서버 없음). "스마트스토어 관리자 열어줘"처럼 부르면 바로 열려요. 프리셋 주소가 다르면 저장 후 목록에서 수정(삭제 후 재등록)하세요.'; wrap.appendChild(hint);
body.appendChild(wrap);
}
function kakaoOpens(){ var a=lsG('podoai_kakao_open',[]); return Array.isArray(a)?a:[]; }
function kakaoOpenSave(name,val){ name=String(name||'').trim(); val=String(val||'').trim(); if(!name||!val) return false; var a=kakaoOpens().filter(function(s){return s.name!==name;}); a.push({name:name,val:val}); lsS('podoai_kakao_open',a); return true; }
function kakaoOpenDel(name){ lsS('podoai_kakao_open', kakaoOpens().filter(function(s){return s.name!==name;})); }
function kakaoOpenFind(name){
if(!name) return null; var q=String(name).replace(/\s/g,''); if(!q) return null;
var a=kakaoOpens(); if(!a.length) return null;
for(var i=0;i<a.length;i++){ if(String(a[i].name).replace(/\s/g,'')===q) return a[i]; }
var best=null,bestScore=0;
for(i=0;i<a.length;i++){ var nm=String(a[i].name).replace(/\s/g,''); if(nm.length<2) continue; var overlap=Math.min(q.length,nm.length); if(overlap<3) continue; var base=(q.length<=nm.length)?q:nm; var head=(q.length<=nm.length)?nm.slice(0,q.length):q.slice(0,nm.length); var sc=(typeof tgSim==='function')?tgSim(base,head):(base===head?1:0); if(sc>bestScore){bestScore=sc;best=a[i];} }
return (best&&bestScore>=0.7)?best:null;
}
function kakaoOpenNorm(v){ v=String(v||'').trim(); if(!v) return {type:'empty'};
if(/open\.kakao\.com\/o\//i.test(v) || /^https?:\/\//i.test(v)){ var url=v.replace(/^https?:\/\//i,''); return {type:'link', url:'https://'+url}; }
return {type:'name', val:v};
}
function kakaoOpenIntent(q){ q=String(q||'');
if(!/(카톡|카카오톡|오픈\s*채팅|오픈챗)/.test(q)) return false;
if(/방법|어떻게|설치|뭐야|뜻|안\s*되|못\s*(해|보)|탈퇴|삭제/.test(q)) return false;
if(/보내|전해|전달|메시지|메세지|문자|써\s*줘|작성|전송/.test(q)) return false;
if(/열어|열기|들어가|입장|방|들어/.test(q)) return true;
return false;
}
function kakaoOpenParse(q){ q=String(q||'');
var isOpen=/오픈/.test(q);
var body='';
var mm=q.match(/메시지\s*[:：]\s*(.+)$/); if(mm) body=mm[1].trim();
if(!body){ var cm=q.match(/카(?:카오)?톡\s*[:：]\s*(.+)$/); if(cm) body=cm[1].trim(); }
if(!body){ var bm=q.match(/(?:방에|에게|한테)\s*(.+?)\s*(?:라고)?\s*(?:보내|전해|전달|말해|공지|알려)/); if(bm && bm[1].trim()) body=bm[1].trim(); }
if(body) body=body.replace(/\s+(?:라고|이라고|하고|다고|고)$/,'').replace(/([가-힣])고$/,'$1').trim();
var lm=q.match(/(https?:\/\/)?open\.kakao\.com\/o\/[^\s]+/i);
if(lm){ return {kind:'link', val:lm[0], title:lm[0].replace(/^https?:\/\//,''), name:lm[0], body:body, isOpen:true, raw:q}; }
var t=q; var mi=t.search(/(메시지|카카오톡|카톡)\s*[:：]/); if(mi>=0) t=t.slice(0,mi);
t=t.replace(/오픈\s*카톡|오픈\s*채팅|오픈\s*챗|카카오톡|카톡/g,' ')
.replace(/(채팅방|대화방|오픈채팅방|단톡방|단톡|그룹|채널)/g,' ')
.replace(/방(\s|$)/g,' ')
.replace(/^\s*오픈\s+/,'')
.replace(/(열어\s*줘?|열기|들어가\s*줘?|들어가|입장\s*해?\s*줘?|접속\s*해?\s*줘?|가\s*줘|줘|해\s*줘|좀|부탁\s*해?\s*줘?)/g,' ')
.replace(/\s+/g,' ').trim();
return {kind:'name', val:t, title:t, name:t, body:body, isOpen:isOpen, raw:q};
}
function goKakaoOpenLink(url){ var path=String(url).replace(/^https?:\/\/open\.kakao\.com\//i,''); _openApp('intent://open.kakao.com/'+path+'#Intent;scheme=https;package=com.kakao.talk;S.browser_fallback_url='+encodeURIComponent(url)+';end', null, null); }
function kakaoOpenPick(info){ var fav=kakaoOpenFind(info&&info.name); if(fav) return fav.val; if(info&&info.kind==='link') return info.val; if(info&&info.val) return info.val; return ''; }
function goKakaoOpenRoom(info, force){
if(!(force || _hasGesture())) return;
window._vansActive=true;
var n=kakaoOpenNorm(kakaoOpenPick(info));
var msg=(info&&info.body)||'';
if(msg){ try{ navigator.clipboard.writeText(msg); }catch(e){} }
if(n.type==='link'){ goKakaoOpenLink(n.url); return; }
if(!msg && n.type==='name' && n.val){ try{ navigator.clipboard.writeText(n.val); }catch(e){} }
goKakaoOpen();
}
function vansKakaoOpenBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var fav=kakaoOpenFind(info&&info.name);
var pick=kakaoOpenPick(info);
var n=kakaoOpenNorm(pick);
var direct=(n.type==='link');
var openChat=direct || (info&&info.isOpen);
var titleTxt=fav?fav.name:((info&&info.title)||'');
var KKY='#E8A200';
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:'+KKY+';margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(254,229,0,.9)'; t.textContent=(openChat?'💬 카톡 오픈채팅 열기':'💬 카카오톡 열기')+(titleTxt?(' — '+titleTxt):''); body.appendChild(t);
if(n.type!=='empty'){ var bx=document.createElement('div'); bx.style.cssText='font-size:15px;color:#141720;font-weight:700;background:rgba(254,229,0,.16);border-radius:10px;padding:12px 14px;margin:4px 0 12px;line-height:1.6'; bx.textContent=direct?('링크: '+n.url.replace(/^https?:\/\//,'')+'  → 이 오픈채팅방으로 바로 들어가요'):(openChat?('오픈채팅방 이름: "'+n.val+'"  (저장된 링크 없음)'):('카톡방 이름: "'+n.val+'"  (일반 카톡방은 링크로 못 열어요)')); body.appendChild(bx); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:4px 0 12px';
note.textContent=direct
? 'open.kakao.com 링크는 카카오톡이 알아듣는 주소라, 그 오픈채팅방으로 바로 들어가요. (검색 안 거침)'
: (openChat
? '오픈채팅방이면 그 방의 open.kakao.com/o/… 링크를 아래에 한 번만 저장하면 다음부턴 "'+(titleTxt||'OO')+' 오픈카톡방 열어줘"로 바로 직행해요. 지금은 카톡을 열어드릴게요(오픈채팅 탭에서 검색).'
: '일반 카톡방(친구·그룹)은 공개 링크가 없어서 앱만 열어드려요. 만약 이게 오픈채팅방이라면 "'+(titleTxt||'OO')+' 오픈카톡방 열어줘"라고 하고, 아래에 그 방의 open.kakao.com/o/… 링크를 저장하면 바로 직행돼요.');
body.appendChild(note);
if(info&&info.body){ var mb=document.createElement('div'); mb.style.cssText='font-size:14.5px;color:#141720;font-weight:700;background:rgba(0,0,0,.05);border-radius:10px;padding:11px 13px;margin:2px 0 10px;white-space:pre-wrap'; mb.textContent='📋 보낼 메시지 (복사됨): '+info.body; body.appendChild(mb); }
function bigBtn(label,grad,dark,fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:'+(dark?'#3C1E1E':'#fff')+';background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
var _pre=(info&&info.body)?'📋 메시지 복사 + ':'';
if(direct){ bigBtn(_pre+'💬 '+(titleTxt||'오픈채팅방')+' 열기','linear-gradient(135deg,#FEE500,#F9D000)',true,function(){ goKakaoOpenRoom(fav?{name:fav.name,body:(info&&info.body)}:info,true); }); }
else if(openChat){ bigBtn(_pre+'💬 카카오톡 열기 (오픈채팅 탭에서 검색)','linear-gradient(135deg,#FEE500,#F9D000)',true,function(){ goKakaoOpenRoom(info,true); }); }
else { bigBtn(_pre+'💬 카카오톡 열기','linear-gradient(135deg,#FEE500,#F9D000)',true,function(){ goKakaoOpenRoom(info,true); }); }
if(info&&info.body){ var cp2=document.createElement('button'); cp2.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:13px;border:none;border-radius:12px;cursor:pointer;font-family:inherit;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#6b7280,#4b5563)'; cp2.textContent='📋 메시지만 복사'; cp2.onclick=function(){ try{ navigator.clipboard.writeText(info.body); cp2.textContent='✅ 복사됐어요! 방에서 붙여넣기'; }catch(e){ alert('길게 눌러 직접 복사: '+info.body); } }; body.appendChild(cp2); }
vansKakaoOpenUI(body, info);
}
function vansKakaoOpenUI(body, info){
var wrap=document.createElement('div'); wrap.style.cssText='margin-top:14px;padding:12px;border-radius:12px;background:rgba(254,229,0,.14);border:1px solid rgba(230,162,0,.55)';
var h=document.createElement('div'); h.style.cssText='font-size:13.5px;font-weight:800;color:#B37F00;margin-bottom:6px'; h.textContent='🔖 카톡 오픈채팅 즐겨찾기 (한 번 등록하면 바로 직행)'; wrap.appendChild(h);
var guide=document.createElement('div'); guide.style.cssText='font-size:11.5px;color:#5b6178;line-height:1.55;margin-bottom:8px'; guide.textContent='등록법: 카카오톡에서 그 오픈채팅방 열기 → 우상단 메뉴 → "대화방 링크" 또는 공유로 open.kakao.com/o/… 복사 → 아래 칸에 붙여넣기.'; wrap.appendChild(guide);
var list=document.createElement('div'); list.style.cssText='margin-bottom:8px';
function refresh(){
while(list.firstChild) list.removeChild(list.firstChild);
var arr=kakaoOpens();
if(!arr.length){ var e=document.createElement('div'); e.style.cssText='font-size:12px;color:#9aa0b4;padding:4px 0'; e.textContent='저장된 오픈채팅방이 없어요.'; list.appendChild(e); return; }
arr.forEach(function(s){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.08)';
var nm=document.createElement('div'); nm.style.cssText='flex:1;min-width:0;font-size:13.5px;font-weight:700;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; nm.textContent=s.name+' '; var nc=document.createElement('span'); nc.style.cssText='font-size:11px;color:#9aa0b4;font-weight:600'; nc.textContent=String(s.val).replace(/^https?:\/\//,''); nm.appendChild(nc); row.appendChild(nm);
var goB=document.createElement('button'); goB.textContent='열기'; goB.style.cssText='padding:6px 12px;border:none;border-radius:8px;background:#FEE500;color:#3C1E1E;font-size:12px;font-weight:800;font-family:inherit;cursor:pointer'; goB.onclick=function(){ goKakaoOpenRoom({name:s.name}, true); }; row.appendChild(goB);
var delB=document.createElement('button'); delB.textContent='삭제'; delB.style.cssText='padding:6px 9px;border:none;border-radius:8px;background:#e5e7eb;color:#555;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; delB.onclick=function(){ kakaoOpenDel(s.name); refresh(); }; row.appendChild(delB);
list.appendChild(row);
});
}
refresh(); wrap.appendChild(list);
var form=document.createElement('div'); form.style.cssText='display:flex;gap:6px;align-items:center';
var nIn=document.createElement('input'); nIn.type='text'; nIn.placeholder='이름(예: 코인방)'; nIn.value=(info&&info.name)||''; nIn.style.cssText='width:96px;flex-shrink:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var vIn=document.createElement('input'); vIn.type='text'; vIn.placeholder='open.kakao.com/o/… 링크'; vIn.value=(info&&info.kind==='link'?info.val:'')||''; vIn.style.cssText='flex:1;min-width:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var sB=document.createElement('button'); sB.textContent='저장'; sB.style.cssText='padding:9px 12px;border:none;border-radius:8px;background:#E8A200;color:#fff;font-size:13px;font-weight:800;font-family:inherit;cursor:pointer';
sB.onclick=function(){ if(kakaoOpenSave(nIn.value, vIn.value)){ vIn.value=''; refresh(); } else { alert('이름과 open.kakao.com 링크를 입력해줘.'); } };
form.appendChild(nIn); form.appendChild(vIn); form.appendChild(sB); wrap.appendChild(form);
var hint=document.createElement('div'); hint.style.cssText='font-size:11px;color:#9aa0b4;margin-top:6px;line-height:1.5'; hint.textContent='이 기기에만 저장돼요(서버 없음). 오픈채팅방만 링크로 직행돼요. "코인방 카톡방 열어줘"처럼 부르면 돼요.'; wrap.appendChild(hint);
body.appendChild(wrap);
}
function tgRooms(){ var a=lsG('podoai_tg',[]); return Array.isArray(a)?a:[]; }
function tgRoomSave(name,val){ name=String(name||'').trim(); val=String(val||'').trim(); if(!name||!val) return false; var a=tgRooms().filter(function(s){return s.name!==name;}); a.push({name:name,val:val}); lsS('podoai_tg',a); return true; }
function tgRoomDel(name){ lsS('podoai_tg', tgRooms().filter(function(s){return s.name!==name;})); }
function tgSim(a,b){ a=String(a);b=String(b); var m=a.length,n=b.length; if(!m||!n) return 0; var d=[]; for(var i=0;i<=m;i++)d[i]=[i]; for(var j=0;j<=n;j++)d[0][j]=j; for(i=1;i<=m;i++){ for(j=1;j<=n;j++){ var c=(a.charAt(i-1)===b.charAt(j-1))?0:1; d[i][j]=Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+c); } } return 1-(d[m][n]/Math.max(m,n)); }
function tgRoomFind(name){
if(!name) return null; var q=String(name).replace(/\s/g,''); if(!q) return null;
var a=tgRooms(); if(!a.length) return null;
for(var i=0;i<a.length;i++){ if(String(a[i].name).replace(/\s/g,'')===q) return a[i]; }
var best=null, bestScore=0;
for(i=0;i<a.length;i++){
var nm=String(a[i].name).replace(/\s/g,''); if(nm.length<2) continue;
var overlap=Math.min(q.length, nm.length); if(overlap<3) continue;
var base=(q.length<=nm.length)?q:nm;
var head=(q.length<=nm.length)?nm.slice(0,q.length):q.slice(0,nm.length);
var sc=tgSim(base, head);
if(sc>bestScore){ bestScore=sc; best=a[i]; }
}
return (best && bestScore>=0.7) ? best : null;
}
function tgIsUser(v){ return /^@?[A-Za-z0-9_]{4,32}$/.test(String(v||'').trim()) && !/\s/.test(String(v||'').trim()); }
function tgIsUser(v){ return /^@?[A-Za-z0-9_]{4,32}$/.test(String(v||'').trim()) && !/\s/.test(String(v||'').trim()); }
function tgNorm(v){
v=String(v||'').trim();
if(!v) return {type:'empty'};
if(/^tg:\/\//i.test(v)) return {type:'scheme', url:v};
if(/^https?:\/\/t\.me\//i.test(v) || /^t\.me\//i.test(v) || /\bt\.me\//i.test(v)){
var path=v.replace(/^https?:\/\//i,'').replace(/^.*?t\.me\//i,'').replace(/^@/,'');
if(/^[A-Za-z0-9_]{4,32}$/.test(path)) return {type:'user', val:path};
return {type:'link', url:'https://t.me/'+path, path:path};
}
var um=v.match(/^@?([A-Za-z0-9_]{4,32})$/);
if(um && !/\s/.test(v)) return {type:'user', val:um[1]};
return {type:'search', val:v};
}
function tgShortQuery(title){
title=String(title||'').replace(/\s+/g,' ').trim();
var w=title.split(' ').filter(Boolean);
if(w.length<=1) return title;
return (w[0].length>=3) ? w[0] : (w[0]+' '+w[1]);
}
function telegramIntent(q){
q=String(q||'');
if(!/(텔레그램|텔레그렘|텔그)/.test(q)) return false;
if(/방법|어떻게|기능|활용|안\s*되|못\s*(해|보)|뭐야|설치|뜻|차단|탈퇴|삭제/.test(q)) return false;
if(/열어|열기|들어가|입장|이동|접속|찾아|보여|켜|가\s*줘|채팅|대화|방/.test(q)) return true;
return false;
}
function telegramParse(q){
q=String(q||'');
var lm=q.match(/(https?:\/\/)?t\.me\/[^\s]+/i);
if(lm){ var n=tgNorm(lm[0]); return { kind:'link', val:lm[0], title:n.path||lm[0], name:n.path||lm[0], raw:q }; }
var um=q.match(/@([A-Za-z0-9_]{4,32})/);
if(um) return { kind:'user', val:um[1], title:'@'+um[1], name:um[1], raw:q };
var t=q
.replace(/텔레그램|텔레그렘|텔그/g,' ')
.replace(/(에서|에게|한테)/g,' ')
.replace(/(채팅방|대화방|단톡방|단톡|채널|그룹)/g,' ')
.replace(/방(\s|$)/g,' ')
.replace(/(열어\s*줘?|열기|들어가\s*줘?|들어가|입장\s*해?\s*줘?|이동\s*해?\s*줘?|접속\s*해?\s*줘?|찾아\s*줘?|보여\s*줘?|켜\s*줘?|가\s*줘|줘|해\s*줘|좀|부탁\s*해?\s*줘?)/g,' ')
.replace(/\s+/g,' ').trim();
return { kind:'search', val:t, title:t, name:t, raw:q };
}
function goTelegramUser(uname){ uname=String(uname||'').replace(/^@/,''); _openApp('intent://resolve?domain='+encodeURIComponent(uname)+'#Intent;scheme=tg;package=org.telegram.messenger;S.browser_fallback_url=https%3A%2F%2Ft.me%2F'+encodeURIComponent(uname)+';end', null, null); }
function goTelegramLink(url){ var path=String(url).replace(/^https?:\/\/t\.me\//i,''); _openApp('intent://t.me/'+path+'#Intent;scheme=https;package=org.telegram.messenger;S.browser_fallback_url='+encodeURIComponent(url)+';end', null, null); }
function goTelegramScheme(url){ _openApp(url, null, null); }
function goTelegramSearch(query, copyText){ var ct=copyText||query; if(ct){ try{ navigator.clipboard.writeText(ct); }catch(e){} } _openApp('intent://search?query='+encodeURIComponent(query||'')+'#Intent;scheme=tg;package=org.telegram.messenger;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dorg.telegram.messenger;end', null, null); }
function goTelegramOpen(){ _openApp('intent:#Intent;package=org.telegram.messenger;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dorg.telegram.messenger;end', 'org.telegram.messenger'); }
function tgPick(info){
var fav = tgRoomFind(info&&info.name);
if(fav) return fav.val;
if(info && info.kind==='link') return info.val;
if(info && info.kind==='user') return '@'+info.val;
if(info && info.val) return info.val;
return '';
}
function goTelegram(info, force){
if(!(force || _hasGesture())) return;
window._vansActive=true;
var n = tgNorm(tgPick(info));
if(n.type==='scheme'){ goTelegramScheme(n.url); return; }
if(n.type==='link'){ goTelegramLink(n.url); return; }
if(n.type==='user'){ goTelegramUser(n.val); return; }
if(n.type==='search'){ goTelegramSearch(tgShortQuery(n.val), n.val); return; }
goTelegramOpen();
}
function vansTelegramBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var fav = tgRoomFind(info&&info.name);
var pick = tgPick(info);
var n = tgNorm(pick);
var direct = (n.type==='scheme'||n.type==='link'||n.type==='user');
var titleTxt = fav ? fav.name : ((info&&info.title)||'');
var TGB='#229ED9';
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:'+TGB+';margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(34,158,217,.35)'; t.textContent='✈️ 텔레그램 열기'+(titleTxt?(' — '+titleTxt):''); body.appendChild(t);
var shortQ = (n.type==='search') ? tgShortQuery(n.val) : '';
if(n.type!=='empty'){ var bx=document.createElement('div'); bx.style.cssText='font-size:15px;color:#141720;font-weight:700;background:rgba(34,158,217,.07);border-radius:10px;padding:12px 14px;margin:4px 0 12px;line-height:1.6';
bx.textContent = direct
? ((n.type==='user'?('아이디: @'+n.val):('링크: '+(n.path?('t.me/'+n.path):n.url)))+'  → 이 대화방으로 바로 들어가요')
: ('방 제목: "'+n.val+'"\n검색어: "'+shortQ+'"  (전체 제목은 복사해둠)');
body.appendChild(bx); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:4px 0 12px';
note.textContent = direct
? '링크/아이디는 텔레그램이 알아듣는 식별자라, 그 대화방으로 바로 들어가요. (검색 안 거침)'
: '전체 제목으로 검색하면 0건이 잘 떠서, 가장 또렷한 첫 단어 "'+shortQ+'"(으)로 검색을 열어요. 맨 위에 뜨는 그 방을 한 번 탭! 그래도 안 뜨면 ↓ 즐겨찾기에 그 방의 t.me 링크나 @아이디를 한 번만 저장하세요 — 다음부턴 검색 없이 바로 들어갑니다.';
body.appendChild(note);
function bigBtn(label, grad, fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
if(n.type==='empty'){
bigBtn('✈️ 텔레그램 열기', 'linear-gradient(135deg,#2AABEE,#229ED9)', function(){ window._vansActive=true; goTelegramOpen(); });
} else if(direct){
bigBtn('✈️ '+(titleTxt|| (n.type==='user'?('@'+n.val):'대화방'))+' 열기', 'linear-gradient(135deg,#2AABEE,#229ED9)', function(){ goTelegram(fav?{name:fav.name}:info, true); });
} else {
bigBtn('🔎 "'+shortQ+'"(으)로 텔레그램 검색 열기', 'linear-gradient(135deg,#2AABEE,#229ED9)', function(){ goTelegram(fav?{name:fav.name}:info, true); });
var cp=document.createElement('button'); cp.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:13px;border:none;border-radius:12px;cursor:pointer;font-family:inherit;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#6b7280,#4b5563)'; cp.textContent='📋 전체 제목 복사'; cp.onclick=function(){ try{ navigator.clipboard.writeText(n.val); cp.textContent='✅ 복사됨! 텔레그램 검색에 붙여넣기'; }catch(e){ alert('길게 눌러 복사: '+n.val); } }; body.appendChild(cp);
}
vansTgRoomUI(body, info);
}
function vansTgRoomUI(body, info){
var wrap=document.createElement('div'); wrap.style.cssText='margin-top:14px;padding:12px;border-radius:12px;background:rgba(34,158,217,.08);border:1px solid rgba(34,158,217,.4)';
var h=document.createElement('div'); h.style.cssText='font-size:13.5px;font-weight:800;color:#229ED9;margin-bottom:6px'; h.textContent='🔖 텔레그램 즐겨찾기 (한 번 등록하면 바로 직행)'; wrap.appendChild(h);
var guide=document.createElement('div'); guide.style.cssText='font-size:11.5px;color:#5b6178;line-height:1.55;margin-bottom:8px'; guide.textContent='등록법: 텔레그램에서 그 방 열기 → 방 이름(상단) 탭 → "초대 링크" 또는 "공유"로 t.me/… 복사 → 아래 칸에 붙여넣기. (공개방은 @아이디만 적어도 됨)'; wrap.appendChild(guide);
var list=document.createElement('div'); list.style.cssText='margin-bottom:8px';
function kindTag(v){ var n=tgNorm(v); if(n.type==='user') return '@'+n.val; if(n.type==='link') return 't.me/'+(n.path||''); if(n.type==='scheme') return n.url; return '"'+n.val+'" (검색)'; }
function refresh(){
while(list.firstChild) list.removeChild(list.firstChild);
var arr=tgRooms();
if(!arr.length){ var e=document.createElement('div'); e.style.cssText='font-size:12px;color:#9aa0b4;padding:4px 0'; e.textContent='저장된 방이 없어요.'; list.appendChild(e); return; }
arr.forEach(function(s){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.08)';
var nm=document.createElement('div'); nm.style.cssText='flex:1;min-width:0;font-size:13.5px;font-weight:700;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; nm.textContent=s.name+' '; var nc=document.createElement('span'); nc.style.cssText='font-size:11px;color:#9aa0b4;font-weight:600'; nc.textContent=kindTag(s.val); nm.appendChild(nc); row.appendChild(nm);
var goB=document.createElement('button'); goB.textContent='열기'; goB.style.cssText='padding:6px 12px;border:none;border-radius:8px;background:#229ED9;color:#fff;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; goB.onclick=function(){ goTelegram({name:s.name}, true); }; row.appendChild(goB);
var delB=document.createElement('button'); delB.textContent='삭제'; delB.style.cssText='padding:6px 9px;border:none;border-radius:8px;background:#e5e7eb;color:#555;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; delB.onclick=function(){ tgRoomDel(s.name); refresh(); }; row.appendChild(delB);
list.appendChild(row);
});
}
refresh(); wrap.appendChild(list);
var form=document.createElement('div'); form.style.cssText='display:flex;gap:6px;align-items:center';
var nIn=document.createElement('input'); nIn.type='text'; nIn.placeholder='이름(예: 코부기방)'; nIn.value=(info&&info.name)||''; nIn.style.cssText='width:96px;flex-shrink:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var vIn=document.createElement('input'); vIn.type='text'; vIn.placeholder='t.me 링크 / @아이디 / 방제목'; vIn.value=(info&&info.kind==='link'?info.val:(info&&info.val)||''); vIn.style.cssText='flex:1;min-width:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var sB=document.createElement('button'); sB.textContent='저장'; sB.style.cssText='padding:9px 12px;border:none;border-radius:8px;background:#1c87bb;color:#fff;font-size:13px;font-weight:800;font-family:inherit;cursor:pointer';
sB.onclick=function(){ if(tgRoomSave(nIn.value, vIn.value)){ vIn.value=''; refresh(); } else { alert('이름과 (t.me 링크/@아이디/방제목)을 입력해줘.'); } };
form.appendChild(nIn); form.appendChild(vIn); form.appendChild(sB); wrap.appendChild(form);
var hint=document.createElement('div'); hint.style.cssText='font-size:11px;color:#9aa0b4;margin-top:6px;line-height:1.5'; hint.textContent='이 기기에만 저장돼요(서버 없음). t.me 링크나 @아이디면 검색 없이 그 방 직행! 방제목만 적으면 첫 단어로 검색해요. "코부기방 텔레그램 열어줘"처럼 부르면 돼요.'; wrap.appendChild(hint);
body.appendChild(wrap);
}
function koToNum(str){
str=String(str).replace(/[\s,]/g,'').replace(/원$/,'');
if(/^\d+$/.test(str)) return parseInt(str,10);
var dig={영:0,공:0,일:1,한:1,두:2,이:2,세:3,삼:3,네:4,사:4,오:5,육:6,륙:6,칠:7,팔:8,구:9};
var unit={십:10,백:100,천:1000};
var total=0, section=0, num=0;
for(var i=0;i<str.length;i++){ var ch=str[i];
if(/\d/.test(ch)){ num=num*10+parseInt(ch,10); continue; }
if(dig[ch]!=null){ num=dig[ch]; continue; }
if(unit[ch]){ section+=(num||1)*unit[ch]; num=0; continue; }
if(ch==='만'){ total+=(section+num||1)*10000; section=0; num=0; continue; }
if(ch==='억'){ total+=(section+num||1)*100000000; section=0; num=0; continue; }
}
return total+section+num;
}
function tossAmount(s){
s=String(s||'').replace(/,/g,'');
var m=s.match(/(\d+)\s*만\s*(?:(\d+)\s*천)?/); if(m){ var v=parseInt(m[1],10)*10000; if(m[2]) v+=parseInt(m[2],10)*1000; return v; }
m=s.match(/(\d{3,})\s*원/); if(m) return parseInt(m[1],10);
m=s.match(/([영공일이삼사오육칠팔구십백천만한두세네]+)\s*원/); if(m){ var n=koToNum(m[1]); if(n) return n; }
m=s.match(/만\s*원/); if(m) return 10000;
m=s.match(/(\d{4,})/); if(m) return parseInt(m[1],10);
return 0;
}
function tossBank(b){ b=String(b||'').replace(/\s/g,''); var map={KB:'국민',국민:'국민',신한:'신한',우리:'우리',하나:'하나',농협:'농협',NH:'농협',기업:'기업',IBK:'기업',카카오뱅크:'카카오뱅크',카뱅:'카카오뱅크',토스뱅크:'토스뱅크',토뱅:'토스뱅크',케이뱅크:'케이뱅크',케뱅:'케이뱅크',새마을:'새마을금고',새마을금고:'새마을금고',우체국:'우체국',부산:'부산',대구:'아이엠뱅크',아이엠뱅크:'아이엠뱅크',경남:'경남',광주:'광주',전북:'전북',수협:'수협',신협:'신협',산업:'산업',SC:'SC제일',SC제일:'SC제일',제일:'SC제일',씨티:'한국씨티'}; return map[b]||b; }
function tossAccts(){ var a=lsG('podoai_toss_accts',[]); return Array.isArray(a)?a:[]; }
function tossAcctSave(name,bank,acc){ name=String(name||'').trim(); bank=String(bank||'').trim(); acc=String(acc||'').replace(/[^0-9]/g,''); if(!name||!acc) return false; var a=tossAccts().filter(function(s){return s.name!==name;}); a.push({name:name,bank:bank,acc:acc}); lsS('podoai_toss_accts',a); return true; }
function tossAcctDel(name){ lsS('podoai_toss_accts', tossAccts().filter(function(s){return s.name!==name;})); }
function tossAcctFind(name){ if(!name) return null; var s=String(name).replace(/\s/g,''); if(!s) return null; var a=tossAccts(); for(var i=0;i<a.length;i++){ if(String(a[i].name).replace(/\s/g,'')===s) return a[i]; } return null; }
function tossIntent(q){
q=String(q||'');
if(/문자|메시지|메세지|카톡|카카오톡/.test(q)) return false;
if(/방법|어떻게|얼마|뭐야|안\s*되|못\s*(해|보)|뜻|환율|시세|조회/.test(q)) return false;
if(/토스|송금|이체/.test(q)) return true;
var money=/\d[\d,]*\s*원|\d+\s*만|만\s*원|[일이삼사오육칠팔구십]\s*만/.test(q);
if(money && /보내|쏴|쏘|보낼|부쳐|부치/.test(q)) return true;
return false;
}
function tossParse(q){
q=String(q||'');
var prov='toss';
if(/네이버\s*페이|n\s*페이|엔\s*페이|네페|npay/i.test(q)) prov='naverpay';
else if(/카카오\s*페이|카페이|kakaopay|카카오페이/i.test(q)) prov='kakaopay';
var acc=''; var am=q.match(/(\d[\d-]{8,}\d)/); if(am) acc=am[1].replace(/[^0-9]/g,'');
var rest=q.replace(/(\d[\d-]{8,}\d)/,' ');
var bank=''; var bm=rest.match(/(국민|KB|신한|우리|하나|농협|NH|기업|IBK|카카오뱅크|카뱅|토스뱅크|토뱅|케이뱅크|케뱅|새마을금고|새마을|우체국|부산|대구|아이엠뱅크|경남|광주|전북|수협|신협|산업|SC제일|SC|씨티)/);
if(bm) bank=bm[1];
var amount=tossAmount(rest);
var nameSrc=rest.replace(/(\d+\s*만\s*(?:\d+\s*천)?\s*원?)|(\d{3,}\s*원)|([영공일이삼사오육칠팔구십백천만한두세네]+\s*원)|(만\s*원)|(\d{4,})/g,' ');
var name=''; var nm=nameSrc.match(/^\s*(.+?)(?:에게|한테|께서|께)/); if(nm) name=nm[1].replace(/(국민|KB|신한|우리|하나|농협|NH|기업|카카오뱅크|카뱅|토스뱅크|토뱅|케이뱅크|케뱅|토스|송금|이체|보내|부쳐)/gi,'').trim();
return { name:name, bank:bank, acc:acc, amount:amount, prov:prov, raw:q };
}
function goToss(info, force){
window._vansActive=true;
var bank=info&&info.bank, acc=info&&info.acc, amount=info&&info.amount;
if(!acc && info&&info.name){ var a=tossAcctFind(info.name); if(a){ bank=bank||a.bank; acc=a.acc; } }
if(!acc) return;
var qs='send?bank='+encodeURIComponent(tossBank(bank)||'')+'&accountNo='+encodeURIComponent(acc)+(amount?('&amount='+amount):'');
var intent='intent://'+qs+'#Intent;scheme=supertoss;package=viva.republica.toss;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dviva.republica.toss;end';
if(force || _hasGesture()){ _openApp(intent, null, null); }
}
function vansTossBack(info, fullq){
if(info && (info.prov==='naverpay' || info.prov==='kakaopay')){ vansPayManualBack(info, fullq); return; }
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var fav = (info&&info.acc) ? {name:(info&&info.name)||'', bank:info.bank, acc:info.acc} : tossAcctFind(info&&info.name);
var bank=(fav&&fav.bank)||(info&&info.bank)||''; var acc=(fav&&fav.acc)||(info&&info.acc)||''; var amount=info&&info.amount;
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#0064FF;margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(0,100,255,.3)'; t.textContent='💸 토스 송금'+((info&&info.name)?(' — '+info.name):''); body.appendChild(t);
if(acc){ var bx=document.createElement('div'); bx.style.cssText='font-size:15px;color:#141720;font-weight:700;background:rgba(0,100,255,.06);border-radius:10px;padding:12px 14px;margin:4px 0 12px;line-height:1.7'; bx.textContent='받는 곳: '+(tossBank(bank)||'(은행 미정)')+' '+acc+(amount?('\n보낼 금액: '+amount.toLocaleString()+'원'):'\n금액: 토스에서 입력'); body.appendChild(bx); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:4px 0 12px';
note.textContent = acc
? '토스 송금 화면이 은행·계좌'+(amount?'·금액':'')+'가 채워진 채로 열려요. 마지막에 비밀번호/지문 인증하고 "보내기"만 누르면 됩니다. (보안상 자동 전송은 안 돼요 — 본인이 꼭 확인하고 보내세요.)'
: ('"'+((info&&info.name)||'이 사람')+'"의 계좌가 아직 저장 안 됐어요. 아래에 은행·계좌를 한 번만 저장하면, 다음부턴 "'+((info&&info.name)||'OO')+'한테 3만원 보내줘" 한마디로 채워진 송금화면이 떠요. (은행·계좌·금액을 직접 말해도 바로 돼요.)');
body.appendChild(note);
if(acc){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:linear-gradient(135deg,#0064FF,#0050d0);box-shadow:0 4px 12px rgba(0,100,255,.25)'; b.textContent='💸 토스 송금화면 열기'+(amount?(' ('+amount.toLocaleString()+'원)'):''); b.onclick=function(){ goToss({name:(info&&info.name),bank:bank,acc:acc,amount:amount}, true); }; body.appendChild(b); }
vansTossAcctUI(body, info);
}
function vansTossAcctUI(body, info){
var wrap=document.createElement('div'); wrap.style.cssText='margin-top:14px;padding:12px;border-radius:12px;background:rgba(0,100,255,.07);border:1px solid rgba(0,100,255,.4)';
var h=document.createElement('div'); h.style.cssText='font-size:13.5px;font-weight:800;color:#0064FF;margin-bottom:8px'; h.textContent='🔖 송금 계좌부 (이름→은행·계좌 저장 후 바로 송금)'; wrap.appendChild(h);
var list=document.createElement('div'); list.style.cssText='margin-bottom:8px';
function refresh(){
while(list.firstChild) list.removeChild(list.firstChild);
var arr=tossAccts();
if(!arr.length){ var e=document.createElement('div'); e.style.cssText='font-size:12px;color:#9aa0b4;padding:4px 0'; e.textContent='저장된 계좌가 없어요.'; list.appendChild(e); return; }
arr.forEach(function(s){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.08)';
var nm=document.createElement('div'); nm.style.cssText='flex:1;min-width:0;font-size:13.5px;font-weight:700;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; nm.textContent=s.name+' '; var nc=document.createElement('span'); nc.style.cssText='font-size:11px;color:#9aa0b4;font-weight:600'; nc.textContent=(s.bank||'')+' '+s.acc; nm.appendChild(nc); row.appendChild(nm);
var goB=document.createElement('button'); goB.textContent='송금'; goB.style.cssText='padding:6px 12px;border:none;border-radius:8px;background:#0064FF;color:#fff;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; goB.onclick=function(){ goToss({name:s.name,bank:s.bank,acc:s.acc,amount:0}, true); }; row.appendChild(goB);
var delB=document.createElement('button'); delB.textContent='삭제'; delB.style.cssText='padding:6px 9px;border:none;border-radius:8px;background:#e5e7eb;color:#555;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; delB.onclick=function(){ tossAcctDel(s.name); refresh(); }; row.appendChild(delB);
list.appendChild(row);
});
}
refresh(); wrap.appendChild(list);
var form=document.createElement('div'); form.style.cssText='display:flex;gap:6px;align-items:center;flex-wrap:wrap';
var nIn=document.createElement('input'); nIn.type='text'; nIn.placeholder='이름'; nIn.value=(info&&info.name)||''; nIn.style.cssText='width:64px;flex-shrink:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var bIn=document.createElement('input'); bIn.type='text'; bIn.placeholder='은행'; bIn.value=(info&&info.bank)||''; bIn.style.cssText='width:64px;flex-shrink:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var aIn=document.createElement('input'); aIn.type='tel'; aIn.inputMode='numeric'; aIn.placeholder='계좌번호'; aIn.value=(info&&info.acc)||''; aIn.style.cssText='flex:1;min-width:90px;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var sB=document.createElement('button'); sB.textContent='저장'; sB.style.cssText='padding:9px 12px;border:none;border-radius:8px;background:#0050d0;color:#fff;font-size:13px;font-weight:800;font-family:inherit;cursor:pointer';
sB.onclick=function(){ if(tossAcctSave(nIn.value, bIn.value, aIn.value)){ aIn.value=''; refresh(); } else { alert('이름·계좌번호를 입력해줘(은행은 선택).'); } };
form.appendChild(nIn); form.appendChild(bIn); form.appendChild(aIn); form.appendChild(sB); wrap.appendChild(form);
var hint=document.createElement('div'); hint.style.cssText='font-size:11px;color:#9aa0b4;margin-top:6px;line-height:1.5'; hint.textContent='계좌는 이 기기에만 저장돼요(서버 없음). 실제 송금은 토스에서 인증 후 본인이 보내기를 눌러야 완료됩니다.'; wrap.appendChild(hint);
body.appendChild(wrap);
}
function goPayOpen(prov){
if(prov==='kakaopay'){ _openApp('intent:#Intent;package=com.kakaopay.app;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=https%3A%2F%2Fwww.kakaopay.com%2F;end', 'com.kakaopay.app'); return; }
var _npu='https://new-m.pay.naver.com/';
_openApp('intent://inappbrowser?url='+encodeURIComponent(_npu)+'&target=new&version=6#Intent;scheme=naversearchapp;package=com.nhn.android.search;S.browser_fallback_url='+encodeURIComponent(_npu)+';end', null, null);
}
function vansPayManualBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var label = info.prov==='kakaopay' ? '카카오페이' : '네이버페이';
var fav = (info&&info.acc) ? {bank:info.bank,acc:info.acc} : tossAcctFind(info&&info.name);
var bank=(fav&&fav.bank)||(info&&info.bank)||''; var acc=(fav&&fav.acc)||(info&&info.acc)||''; var amount=info&&info.amount;
var copyText=((tossBank(bank)||'')+' '+acc+(amount?(' '+amount+'원'):'')).trim();
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#03C75A;margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(3,199,90,.35)'; t.textContent='💸 '+label+' 송금'+((info&&info.name)?(' — '+info.name):''); body.appendChild(t);
if(acc){ var bx=document.createElement('div'); bx.style.cssText='font-size:15px;color:#141720;font-weight:700;background:rgba(0,0,0,.04);border-radius:10px;padding:12px 14px;margin:4px 0 12px;line-height:1.7'; bx.textContent='받는 곳: '+(tossBank(bank)||'(은행)')+' '+acc+(amount?('\n금액: '+amount.toLocaleString()+'원'):''); body.appendChild(bx); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:4px 0 12px';
note.textContent=label+'는 토스와 달리 외부에서 계좌·금액을 자동으로 채워 송금하는 기능을 안 열어놨어요(송금이 앱 안에서만 가능). 그래서 ① 계좌·금액을 복사해 드릴게요 → '+label+' 송금에서 붙여넣기, 또는 ② 토스는 자동 입력이 되니 토스로 바로 보낼 수도 있어요.';
body.appendChild(note);
function bigBtn(label2, grad, fn, dark){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:800;color:'+(dark?'#fff':'#fff')+';background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label2; b.onclick=fn; body.appendChild(b); }
if(copyText){ bigBtn('📋 계좌·금액 복사', 'linear-gradient(135deg,#6b7280,#4b5563)', function(){ try{ navigator.clipboard.writeText(copyText); alert('복사됨: '+copyText); }catch(e){ alert('길게 눌러 복사: '+copyText); } }); }
bigBtn('💚 '+label+' 열기'+(info.prov==='naverpay'?' (네이버 앱)':''), 'linear-gradient(135deg,#03C75A,#02a94c)', function(){ window._vansActive=true; goPayOpen(info.prov); });
if(acc){ bigBtn('💸 토스로 대신 보내기 (계좌·금액 자동입력)', 'linear-gradient(135deg,#0064FF,#0050d0)', function(){ goToss({name:(info&&info.name),bank:bank,acc:acc,amount:amount,prov:'toss'}, true); }); }
vansTossAcctUI(body, info);
}
function goNavi(q){
var dest='';
try{ var rr=instantRoute(q); if(rr && rr.id==='navi' && rr.q) dest=rr.q; }catch(e){}
if(!dest){ dest=String(q||'').replace(/(으?로\s*)?(길\s*안내|내비게이션|내비|네비게이션|네비|길\s*찾기|길찾기|가는\s*길|가는\s*법|어떻게\s*가(는|요|줘)?|찾아\s*가(줘|기)?|까지\s*가(줘|는|기)?|데려다\s*(줘)?|목적지|운전|틀어\s*줘?|켜\s*줘?|실행(해|해줘)?|시작(해|해줘)?|안내\s*해?\s*줘?|해\s*줘|좀)/g,'').replace(/\s+/g,' ').trim(); }
if(!dest) dest=q;
var done=false;
var fb=setTimeout(function(){ if(done)return; done=true; _naviPlace(dest); }, 7000);
_geocode(dest, function(lat,lng){
if(done)return; done=true; clearTimeout(fb);
if(lat&&lng){ _naviPlaceCoord(dest, lat, lng); } else { _naviPlace(dest); }
});
}
function _proxyUrl(){ try{ return (lsG('podoai_proxy','')||(typeof AFF!=='undefined'&&AFF.proxyUrl)||''); }catch(e){ return ''; } }
function _geocode(dest, cb){
var proxy=_proxyUrl();
if(proxy){
var key=''; try{ key=lsG('podoai_kakao_rest',''); }catch(e){}
try{
fetch(proxy, { method:'POST', headers:{'content-type':'text/plain;charset=utf-8'}, body: JSON.stringify({ type:'geocode', query:dest, key:key }) })
.then(function(r){ return r.json(); })
.then(function(d){
var doc=d&&d.documents&&d.documents[0];
var la=(d&&(d.lat||d.y))||(doc&&doc.y);
var ln=(d&&(d.lng||d.x))||(doc&&doc.x);
if(la&&ln){ cb(la, ln); } else { _geoOSM(dest, cb); }
})
.catch(function(){ _geoOSM(dest, cb); });
}catch(e2){ _geoOSM(dest, cb); }
return;
}
_geoOSM(dest, cb);
}
function _geoClean(s){
s=String(s||'').replace(/\s+/g,' ').trim();
var w=s.split(' ');
while(w.length>1 && (/(특별시|광역시|특별자치도|특별자치시|도|시|군|구)$/.test(w[0]) || /^(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)/.test(w[0]))){ w.shift(); }
var t=w.join(' ');
var nb=t.replace(/\s*\S*?(본점|지점|점)$/,'').trim();
return nb||t;
}
function _geoScore(p, dest){
if(!p) return -99;
var s=parseFloat(p.importance||0)||0;
var cls=String(p.class||p.category||''), typ=String(p.type||''), at=String(p.addresstype||'');
if(/place|amenity|building|shop|tourism|leisure|aeroway|railway|highway|office|harbour/.test(cls)) s+=0.4;
if(/(country|continent|state)/.test(typ) || /(country|continent|state)/.test(at)) s-=1.2;
var nm=String(p.display_name||p.name||'');
var core=String(dest||'').split(' ').pop();
if(core && nm.indexOf(core)>=0) s+=0.3;
return s;
}
function _geoPick(arr, dest){
if(!arr||!arr.length) return null;
var best=null, bs=-99;
for(var i=0;i<arr.length;i++){ var sc=_geoScore(arr[i], dest); if(sc>bs){ bs=sc; best=arr[i]; } }
return best;
}
function _geoOSM(dest, cb){
var qs=[String(dest||'').trim()];
var c=_geoClean(dest); if(c && c!==qs[0]) qs.push(c);
var i=0;
function next(){
if(i>=qs.length){ _geoPhoton(dest, cb); return; }
var q=qs[i++];
try{
fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&accept-language=ko&countrycodes=kr&q='+encodeURIComponent(q))
.then(function(r){ return r.json(); })
.then(function(arr){ var p=_geoPick(arr, dest); if(p&&p.lat&&p.lon){ cb(p.lat, p.lon); } else { next(); } })
.catch(function(){ next(); });
}catch(e){ next(); }
}
next();
}
function _geoPhoton(dest, cb){
try{
fetch('https://photon.komoot.io/api/?limit=5&bbox=124.5,33.0,131.9,38.7&q='+encodeURIComponent(dest))
.then(function(r){ return r.json(); })
.then(function(d){
var fs=d&&d.features; if(!fs||!fs.length){ cb(null,null); return; }
var f=fs[0], g=f&&f.geometry&&f.geometry.coordinates;
if(g&&g.length>=2){ cb(g[1], g[0]); } else { cb(null,null); }
})
.catch(function(){ cb(null,null); });
}catch(e){ cb(null,null); }
}
function _naviPlaceCoord(name, lat, lng){
openUrl('nmap://place?lat='+lat+'&lng='+lng+'&name='+encodeURIComponent(name)+'&appname=podoai','navi');
}
function _naviPlace(dest){
var e=encodeURIComponent(dest);
if(window.Android && typeof window.Android.openExternal==='function'){ try{ window.Android.openExternal('nmap://search?query='+e+'&appname=podoai'); return; }catch(_e){} }
openUrl('https://map.naver.com/p/search/'+e,'navi');
}
function proxyUrlStatus(){ var el=document.getElementById('proxy-url-sub'); if(el) el.textContent=(_proxyUrl()?'\u2705 \uC124\uC815\uB428 (\uC815\uBC00 \uC88C\uD45C)':'\uBBF8\uC124\uC815 (Apps Script URL)'); }
function openProxyUrl(){
var cur=''; try{ cur=lsG('podoai_proxy',''); }catch(e){}
var u=window.prompt('Apps Script \uC6F9\uC571 URL\uC744 \uBD99\uC5EC\uB123\uC73C\uC138\uC694 (\u2026/exec).\n\uCE74\uCE74\uC624 \uC815\uC2DD \uC9C0\uC624\uCF54\uB529\uC73C\uB85C \uAE38\uCC3E\uAE30 \uC815\uBC00\uB3C4\uAC00 \uC62C\uB77C\uAC11\uB2C8\uB2E4.\n\n\uBE44\uC6B0\uACE0 \uD655\uC778\uD558\uBA74 \uC0AD\uC81C\uB429\uB2C8\uB2E4.', cur);
if(u===null) return;
u=(u||'').trim(); try{ lsS('podoai_proxy', u); if(typeof AFF!=='undefined') AFF.proxyUrl=u||AFF.proxyUrl; }catch(e){}
proxyUrlStatus();
try{ alert(u?'\uD504\uB85D\uC2DC URL \uC800\uC7A5\uB428 \u2705':'\uD504\uB85D\uC2DC URL \uC0AD\uC81C\uB428'); }catch(e){}
}
function kakaoKeyStatus(){ var el=document.getElementById('kakao-key-sub'); if(el) el.textContent=(lsG('podoai_kakao_rest','')?'\u2705 \uB4F1\uB85D\uB428 (\uB0B4\uBE44 \uC88C\uD45C)':'\uBBF8\uB4F1\uB85D (\uC120\uD0DD \u00B7 \uAE38\uC548\uB0B4 \uC88C\uD45C)'); }
function openKakaoKey(){
var cur=lsG('podoai_kakao_rest','');
var k=window.prompt('\uCE74\uCE74\uC624 REST API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.\n(developers.kakao.com \u2192 \uB0B4 \uC571 \u2192 \uC571 \uD0A4 \u2192 REST API \uD0A4)\n\n\uBE44\uC6B0\uACE0 \uD655\uC778\uD558\uBA74 \uC0AD\uC81C\uB429\uB2C8\uB2E4.', cur);
if(k===null) return;
k=(k||'').trim(); try{ kakaoRest=k; }catch(e){} lsS('podoai_kakao_rest', k);
kakaoKeyStatus();
try{ alert(k?'\uCE74\uCE74\uC624 REST \uD0A4 \uC800\uC7A5\uB428 \u2705':'\uCE74\uCE74\uC624 REST \uD0A4 \uC0AD\uC81C\uB428'); }catch(e){}
}
function vansIsPlace(query, r){
if(r && r.id && /navermap|kakaomap|tmap|googlemap/.test(r.id)) return true;
if(r && r.n && /지도|맵/.test(r.n)) return true;
return /맛집|식당|밥집|카페|술집|지도|길찾기|가는\s*길|근처|주변|위치|어디|관광|명소|관광지|가볼만|가 볼만|여행|볼거리|놀거리|구경|명소|코스|당일치기|드라이브|투어|체험|축제|박물관|전망대|공원|계곡|폭포|온천|숙소|호텔|펜션|모텔|리조트|글램핑|주차|시장|해수욕장|해변|항구|선착장|섬/.test(query||'');
}
function vansMapBtns(q, small){
var maps=[{n:'네이버지도',c:'#03C75A',tc:'#fff',url:'https://map.naver.com/p/search/'+encodeURIComponent(q)},{n:'카카오지도',c:'#FEE500',tc:'#3a2e00',url:'https://map.kakao.com/?q='+encodeURIComponent(q)},{n:'티맵',c:'#E8003C',tc:'#fff',deep:'tmap://search?name='+encodeURIComponent(q),url:'https://www.tmap.co.kr'}];
var wrap=document.createElement('div'); wrap.style.cssText='display:flex;gap:7px;'+(small?'margin:6px 0 2px':'margin-bottom:14px');
maps.forEach(function(m){
var b=document.createElement('button');
b.style.cssText='flex:1;padding:'+(small?'10px 4px':'14px 4px')+';border-radius:'+(small?'10px':'13px')+';border:none;background:'+m.c+';color:'+m.tc+';font-size:'+(small?'12px':'13px')+';font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 6px rgba(0,0,0,.18)';
b.textContent='📍 '+m.n;
b.onclick=(function(mm){ return function(ev){ if(ev&&ev.stopPropagation)ev.stopPropagation();
if(mm.deep && window.Android && typeof window.Android.openExternal==='function'){ try{ window.Android.openExternal(mm.deep); return; }catch(e){} }
if(mm.deep){ try{ location.href=mm.deep; setTimeout(function(){ openUrl(mm.url,'vans'); },900); return; }catch(e){} }
openUrl(mm.url,'vans');
}; })(m);
wrap.appendChild(b);
});
return wrap;
}
function vansPlaceDetail(name){
var box=document.createElement('div');
var info=document.createElement('div'); info.style.cssText='display:flex;gap:7px;margin:4px 0 0';
function ib(label,url,bg,fg){ var b=document.createElement('button'); b.textContent=label;
b.style.cssText='flex:1;padding:10px 4px;border-radius:10px;border:1.5px solid rgba(0,0,0,.16);background:'+bg+';color:'+fg+';font-size:12px;font-weight:800;cursor:pointer;font-family:inherit';
b.onclick=function(ev){ if(ev&&ev.stopPropagation)ev.stopPropagation(); openUrl(url,'vans'); }; return b; }
info.appendChild(ib('🔍 소개·정보','https://search.naver.com/search.naver?query='+encodeURIComponent(name),'#eef4ff','#1247CC'));
info.appendChild(ib('🖼 사진','https://search.naver.com/search.naver?where=image&query='+encodeURIComponent(name),'#fff0f6','#c2185b'));
box.appendChild(info);
return box;
}
function vansAddCategories(container, q){
var E=encodeURIComponent, NM='https://map.naver.com/p/search/', NS='https://search.naver.com/search.naver?query=', NB='https://search.naver.com/search.naver?where=blog&query=';
var cats=[
{e:'🍽',t:'맛집',c:'#cf4f2a',bg:'#fff3ef',subs:[{t:'전체 맛집',u:NM+E(q+' 맛집')},{t:'횟집·해산물',u:NM+E(q+' 횟집')},{t:'고깃집',u:NM+E(q+' 고기집')},{t:'한식',u:NM+E(q+' 한식')},{t:'분식',u:NM+E(q+' 분식')},{t:'야식·술집',u:NM+E(q+' 술집')}]},
{e:'☕',t:'카페',c:'#8a5a2b',bg:'#f6efe5',subs:[{t:'분위기 카페',u:NM+E(q+' 분위기좋은 카페')},{t:'디저트·베이커리',u:NM+E(q+' 디저트 카페')},{t:'브런치',u:NM+E(q+' 브런치 카페')},{t:'바다뷰·전망',u:NM+E(q+' 오션뷰 카페')},{t:'전체 카페',u:NM+E(q+' 카페')}]},
{e:'🏨',t:'숙소',c:'#1f5fbf',bg:'#eef5ff',subs:[{t:'호텔·리조트',u:NM+E(q+' 호텔')},{t:'펜션',u:NM+E(q+' 펜션')},{t:'모텔',u:NM+E(q+' 모텔')},{t:'게스트하우스',u:NM+E(q+' 게스트하우스')},{t:'전체 숙소',u:NM+E(q+' 숙소')}]},
{e:'📷',t:'명소·가볼만한곳',c:'#1e9e57',bg:'#edfbf2',subs:[{t:'가볼만한 곳',u:NS+E(q+' 가볼만한곳')},{t:'관광지',u:NM+E(q+' 관광지')},{t:'전망대',u:NM+E(q+' 전망대')},{t:'공원·자연',u:NM+E(q+' 공원')},{t:'바다·해변',u:NM+E(q+' 해수욕장')}]},
{e:'🛍',t:'시장·쇼핑',c:'#c2417c',bg:'#fdf0f7',subs:[{t:'전통시장',u:NM+E(q+' 전통시장')},{t:'특산물·먹거리',u:NM+E(q+' 특산물')},{t:'쇼핑몰·마트',u:NM+E(q+' 쇼핑몰')}]},
{e:'🅿',t:'주차',c:'#4a5170',bg:'#eff1f8',subs:[{t:'주차장',u:NM+E(q+' 주차장')},{t:'공영주차장',u:NM+E(q+' 공영주차장')}]},
{e:'📝',t:'블로그 후기',c:'#2e8b57',bg:'#eef9f1',subs:[{t:'블로그 후기',u:NB+E(q+' 후기')},{t:'맛집 후기',u:NB+E(q+' 맛집 후기')},{t:'여행 후기',u:NB+E(q+' 여행 후기')}]},
{e:'🌤',t:'날씨',c:'#1f5fbf',bg:'#eef5ff',direct:NS+E(q+' 날씨')}
];
var t=document.createElement('div'); t.style.cssText='font-size:16.5px;font-weight:800;color:#0a7a96;margin:4px 0 14px;padding-bottom:8px;border-bottom:2px solid rgba(34,211,238,.3)'; t.textContent='🧭 카테고리별 둘러보기'; container.appendChild(t);
var list=document.createElement('div'); list.style.cssText='display:flex;flex-direction:column;gap:10px;margin-bottom:22px';
cats.forEach(function(c){
var item=document.createElement('div'); item.style.cssText='border-radius:15px;overflow:hidden;background:'+c.bg+';border:1px solid '+c.c+'1f';
var row=document.createElement('button'); row.style.cssText='display:flex;width:100%;align-items:center;gap:13px;padding:15px 15px;border:none;background:none;cursor:pointer;font-family:inherit;text-align:left';
var em=document.createElement('span'); em.textContent=c.e; em.style.cssText='font-size:23px;line-height:1;width:28px;text-align:center;flex-shrink:0';
var lb=document.createElement('span'); lb.textContent=c.t; lb.style.cssText='flex:1;font-size:16.5px;font-weight:800;color:'+c.c;
row.appendChild(em); row.appendChild(lb);
if(c.direct){
var go=document.createElement('span'); go.textContent='›'; go.style.cssText='color:'+c.c+';font-size:22px;font-weight:700;opacity:.6'; row.appendChild(go);
row.onclick=(function(u){ return function(){ openUrl(u,'vans'); }; })(c.direct);
item.appendChild(row); list.appendChild(item); return;
}
var caret=document.createElement('span'); caret.textContent='▾'; caret.style.cssText='color:'+c.c+';font-size:15px;font-weight:700;opacity:.7;flex-shrink:0'; row.appendChild(caret);
var det=document.createElement('div'); det.style.cssText='display:none;padding:2px 14px 14px';
var chips=document.createElement('div'); chips.style.cssText='display:flex;flex-wrap:wrap;gap:8px';
c.subs.forEach(function(s){
var cb=document.createElement('button'); cb.textContent=s.t;
cb.style.cssText='padding:10px 14px;border-radius:12px;border:1.5px solid '+c.c+'40;background:rgba(255,255,255,.75);color:'+c.c+';font-size:14px;font-weight:700;cursor:pointer;font-family:inherit';
cb.onclick=(function(u){ return function(ev){ if(ev&&ev.stopPropagation)ev.stopPropagation(); openUrl(u,'vans'); }; })(s.u);
chips.appendChild(cb);
});
det.appendChild(chips);
item.appendChild(row); item.appendChild(det);
row.onclick=function(){ var op=det.style.display!=='none'; det.style.display=op?'none':'block'; caret.textContent=op?'▾':'▴'; };
list.appendChild(item);
});
container.appendChild(list);
}
function bookingInfo(q){
q=(q||'').trim(); if(!q) return null;
if(!/(예약|숙박|묵을|묵고|박\s*\d+\s*일|\d+\s*박|체크인|빈\s*방|객실|방\s*잡)/.test(q)) return null;
var stayWord=/(콘도|리조트|펜션|호텔|모텔|민박|게스트하우스|글램핑|캠핑|숙소|풀빌라|롯지|료칸)/.test(q);
var stayPat=/(\d+\s*박|체크인|묵)/.test(q);
if(!stayWord && !stayPat) return null;
var ppl=2; var mp=q.match(/(\d+)\s*(명|인원|인|사람)/); if(mp){ var pn=parseInt(mp[1],10); if(pn>=1&&pn<=30) ppl=pn; }
var nights=1; var mn=q.match(/(\d+)\s*박/); if(mn){ var nn=parseInt(mn[1],10); if(nn>=1&&nn<=30) nights=nn; }
var ci='', co='';
var md=q.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일?/);
if(md){
var mm=parseInt(md[1],10), dd=parseInt(md[2],10), now=new Date(), y=now.getFullYear();
var d0=new Date(y,mm-1,dd), t0=new Date(now.getFullYear(),now.getMonth(),now.getDate());
if(d0<t0){ y+=1; d0=new Date(y,mm-1,dd); }
ci=bookingFmt(d0); co=bookingFmt(new Date(d0.getTime()+nights*86400000));
}
var name=q
.replace(/\d{1,2}\s*월\s*\d{1,2}\s*일?/g,' ')
.replace(/\d+\s*박\s*\d+\s*일/g,' ')
.replace(/\d+\s*박/g,' ')
.replace(/\d{1,2}\s*일/g,' ')
.replace(/\d+\s*명/g,' ')
.replace(/\d+\s*인(원)?/g,' ')
.replace(/오늘|내일|모레|이번\s*주말?|다음\s*주말?|주말|성인|어른|아이|어린이|유아/g,' ')
.replace(/예약(\s*해\s*줘|\s*해|\s*좀|\s*하기|\s*할게|\s*가능)?|예약해줘|숙박|묵을|묵고|체크인|빈\s*방|객실|방\s*잡아?\s*줘?|좀|해\s*줘/g,' ')
.replace(/\s+/g,' ').trim();
if(!name) name=q;
return { stay:name, ci:ci, co:co, ppl:ppl, nights:nights };
}
function bookingFmt(d){ function p(x){return (x<10?'0':'')+x;} return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate()); }
function stayAgodaQ(name){
return (name||'').replace(/^(강원특별자치도|제주특별자치도|세종특별자치시|강원도|경기도|충청북도|충청남도|전라북도|전라남도|경상북도|경상남도|충북|충남|전북|전남|경북|경남|제주도|제주|서울특별시|서울|부산광역시|부산|대구광역시|대구|인천광역시|인천|광주광역시|광주|대전광역시|대전|울산광역시|울산)\s+/,'').replace(/\s+/g,' ').trim();
}
function bookingUrls(info){
var E=encodeURIComponent, s=info.stay, ci=info.ci, co=info.co, ppl=info.ppl||2;
var ag=stayAgodaQ(s)||s;
return {
yeogi:'https://www.yeogi.com/domestic-accommodations?keyword='+E(s)+(ci?('&checkIn='+ci+'&checkOut='+co):'')+'&personal='+ppl+'&freeForm=true',
agoda:'https://www.agoda.com/ko-kr/search?textToSearch='+E(ag)+(ci?('&checkIn='+ci+'&checkOut='+co):'')+'&rooms=1&adults='+ppl+'&locale=ko-kr',
naver:'https://search.naver.com/search.naver?query='+E(s+' 예약'),
navermap:'https://map.naver.com/p/search/'+E(s),
google:'https://www.google.com/search?q='+E(s+' 예약'+(ci?(' '+ci):''))
};
}
function goBooking(info){ openUrl(bookingUrls(info).yeogi,'vans'); }
function vansBooking(info){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=info.stay;
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
vansAddBooking(body, info);
window._vansPlace=true;
if(typeof vansAddCategories==='function') vansAddCategories(body, info.stay);
}
function vansAddBooking(container, info){
var u=bookingUrls(info), s=info.stay, E=encodeURIComponent;
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#0a7a96;margin:4px 0 4px;padding-bottom:8px;border-bottom:2px solid rgba(34,211,238,.3)'; t.textContent='🏨 숙박 예약 · 가격 비교'; container.appendChild(t);
var sub=document.createElement('div'); sub.style.cssText='font-size:16px;font-weight:800;color:#141720;margin:9px 0 8px'; sub.textContent=s; container.appendChild(sub);
var info1=document.createElement('div'); info1.style.cssText='background:linear-gradient(135deg,#eef4ff,#f3eeff);border:1.5px solid rgba(34,211,238,.35);border-radius:14px;padding:13px 15px;margin-bottom:14px';
var dl=document.createElement('div'); dl.style.cssText='font-size:11px;font-weight:800;color:#5b6178;margin-bottom:4px'; dl.textContent='검색에 넣을 조건'; info1.appendChild(dl);
var dv=document.createElement('div'); dv.style.cssText='font-size:15.5px;font-weight:800;color:#141720;line-height:1.5';
dv.textContent='📅 '+(info.ci ? (info.ci+' ~ '+info.co) : '날짜 미지정')+'\n👥 '+info.ppl+'명';
dv.style.whiteSpace='pre-line'; info1.appendChild(dv);
container.appendChild(info1);
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin-bottom:14px'; note.textContent='여기어때는 날짜·인원이 자동으로 채워져요. 네이버·구글은 사이트에서 위 날짜를 한 번만 골라주세요.'; container.appendChild(note);
function bigcard(name,desc,color,url,badge){
var card=document.createElement('button');
card.style.cssText='display:flex;width:100%;align-items:center;gap:12px;margin-bottom:10px;padding:16px 15px;border-radius:15px;border:1.5px solid '+color+'33;border-left:6px solid '+color+';background:'+color+'0f;cursor:pointer;font-family:inherit;text-align:left';
var tx=document.createElement('div'); tx.style.flex='1';
var n1=document.createElement('div'); n1.textContent=name; n1.style.cssText='font-size:16.5px;font-weight:800;color:'+color;
var n2=document.createElement('div'); n2.textContent=desc; n2.style.cssText='font-size:12.5px;color:#5b6178;margin-top:3px';
tx.appendChild(n1); tx.appendChild(n2);
if(badge){ var bg=document.createElement('div'); bg.textContent=badge; bg.style.cssText='font-size:10.5px;font-weight:800;color:#0a7a96;background:rgba(34,211,238,.18);border-radius:8px;padding:4px 7px;margin-right:6px;flex-shrink:0'; card.appendChild(tx); card.appendChild(bg); }
else { card.appendChild(tx); }
var go=document.createElement('div'); go.textContent='›'; go.style.cssText='font-size:22px;font-weight:800;color:'+color+';flex-shrink:0;opacity:.7';
card.appendChild(go);
card.onclick=function(){ openUrl(url,'vans'); };
container.appendChild(card);
}
bigcard('여기어때','날짜·인원 자동 입력 · 쿠폰 할인가','#1A57E3',u.yeogi,'자동');
bigcard('네이버','객실·예약 보기 (날짜는 화면에서 선택)','#03C75A',u.naver,null);
var gb=document.createElement('button'); gb.style.cssText='width:100%;margin:4px 0 10px;padding:16px;border-radius:15px;border:none;background:linear-gradient(135deg,#4285F4,#1a73e8);color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;text-align:left;line-height:1.4';
gb.innerHTML='💰 여러 사이트 가격 한눈에 비교<br><span style="font-size:12px;font-weight:600;opacity:.92">아고다·부킹·트립닷컴·호텔스닷컴 등 (날짜는 화면에서 선택)</span>';
gb.onclick=function(){ openUrl('https://www.google.com/search?q='+E(s+' 호텔 가격'),'vans'); };
container.appendChild(gb);
var mb=document.createElement('button'); mb.style.cssText='width:100%;margin-bottom:20px;padding:12px;border-radius:13px;border:1px solid rgba(3,199,90,.4);background:rgba(3,199,90,.08);color:#03C75A;font-size:13.5px;font-weight:800;cursor:pointer;font-family:inherit';
mb.textContent='🗺 네이버지도에서 위치 보기';
mb.onclick=function(){ openUrl(u.navermap,'vans'); };
container.appendChild(mb);
}
function cleanShoppingTopic(q){
q=(q||'').replace(/\s+/g,' ').trim(); if(!q) return '';
var cut=['저렴','싼','싸게','싸고','가성비','최저가','리뷰','후기','구매','판매','인기','베스트','쇼핑몰','판매처','어디서','어디','알려','추천','골라','비교','어떤','뭐가','뭐 ','살 ','살수','살 수','사고','사는','제품','상품','모델','브랜드','바로','좀','정도','해줘','해 줘','나오게','검색','얼마','가격','좋고','좋은'];
var idx=q.length, p, k;
for(k=0;k<cut.length;k++){ p=q.indexOf(cut[k]); if(p>0 && p<idx) idx=p; }
var core=q.slice(0,idx).replace(/\d+\s*개/g,'').replace(/\s+/g,' ').trim();
return core.length>=2 ? core : q;
}
function shoppingDetect(q){
q=(q||'').trim(); if(!q) return '';
if(/(맛집|카페|식당|술집|숙소|펜션|호텔|모텔|리조트|콘도|글램핑|관광|여행|가볼만|놀거리|근처|주변|길\s*안내|예약|항공권|비행기표|전화|문자|메일)/.test(q)) return '';
if(/(방법|사용법|어떻게|고장|수리|청소(법)?|전기세|전기요금|원리|뜻|의미|증상|차이점)/.test(q)) return '';
var shopWord=/(쇼핑몰|쇼핑|최저가|가성비|판매처|구매|사고\s*싶|어디서\s*사|가격\s*비교|얼마|싸게\s*사|저렴|판매량|리뷰\s*많)/.test(q);
var prod=/(에어컨|선풍기|냉풍기|제습기|가습기|공기청정기|청소기|냉장고|세탁기|건조기|노트북|모니터|컴퓨터|키보드|마우스|이어폰|헤드폰|스피커|티비|텔레비전|전기장판|온수매트|매트리스|소파|의자|책상|카메라|드론|자전거|킥보드|텐트|밥솥|에어프라이어|전자레인지|커피머신|정수기|안마의자|러닝머신|프린터|태블릿|충전기|보조배터리|운동화|히터|난로|온풍기|블렌더|믹서기|세척기)/.test(q);
var buy=/(가성비|최저가|리뷰|구매|판매량|베스트|제품|상품|모델|브랜드|저렴|쇼핑|얼마|만원|원대)/.test(q);
var ask=/(추천|알려|골라|비교|어떤|뭐가\s*좋|뭐\s*살|살까)/.test(q);
if(shopWord || prod || (buy && ask)){ var topic=cleanShoppingTopic(q); return topic || q; }
return '';
}
function vansIsMusic(q){
q=(q||'');
var strongPlay=/(틀어|들려|재생|플레이|듣고\s*싶|노래\s*해)/.test(q);
var weakPlay=/(켜\s*줘|보여\s*줘)/.test(q);
var media=/(노래|음악|뮤직|곡|mv|뮤비|가요|팝송|클래식|음원|플레이\s*리스트|playlist|ost|앨범|영상|동영상)/i.test(q);
var yt=/(유튜브|유툽|유투브|youtube)/i.test(q);
return strongPlay || yt || (weakPlay && media);
}
function musicTopic(q){
return (q||'').replace(/유튜브에서|유튜브|유툽|유투브|youtube/gi,'').replace(/틀어\s*줘?|들려\s*줘?|재생\s*해?\s*줘?|재생|플레이\s*해?\s*줘?|play|좀|해\s*줘?|켜\s*줘?|찾아\s*줘?/g,'').replace(/\s+/g,' ').trim() || q;
}
function placeMapQuery(q){
return (q||'').replace(/알려\s*줘?|추천\s*해?\s*줘?|좀|해\s*줘?|찾아\s*줘?|보여\s*줘?|어디(야|있어|에)?/g,'').replace(/\s+/g,' ').trim() || q;
}
function placeMapIntent(q){
q=(q||'');
if(/(맛집|먹을\s*곳|먹거리|음식점|맛있는\s*곳)/.test(q)) return placeMapQuery(q);
if(/(가볼\s*만한|가볼만한곳|관광지|관광|명소|여행지|놀\s*거리|갈\s*만한\s*곳|볼거리)/.test(q)) return placeMapQuery(q);
return '';
}
function goShopping(topic){ openUrl('https://search.shopping.naver.com/search/all?query='+encodeURIComponent(topic)+'&sort=rel','shop'); }
function vansShoppingBack(topic, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||topic;
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var E=encodeURIComponent, kw=E(topic);
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#0a7a96;margin:4px 0 4px;padding-bottom:8px;border-bottom:2px solid rgba(34,211,238,.3)'; t.textContent='🛒 AI 쇼핑 추천'; body.appendChild(t);
var sub=document.createElement('div'); sub.style.cssText='font-size:16px;font-weight:800;color:#141720;margin:9px 0 6px'; sub.textContent=topic; body.appendChild(sub);
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin-bottom:16px'; note.textContent='각 버튼은 그 기준 상위 제품이 맨 위에 오는 실제 쇼핑몰 화면으로 바로 열려요. 사진·가격·리뷰 보고 바로 구매하면 돼요.'; body.appendChild(note);
function premCard(rank,label,desc,brand,grad,url){
var b=document.createElement('button');
b.style.cssText='display:block;width:100%;margin-bottom:12px;padding:0;border:none;border-radius:18px;overflow:hidden;cursor:pointer;font-family:inherit;background:'+grad+';box-shadow:0 4px 14px rgba(0,0,0,.16)';
var inner=document.createElement('div'); inner.style.cssText='display:flex;align-items:center;gap:13px;padding:18px 16px';
var ic=document.createElement('div'); ic.textContent=rank; ic.style.cssText='font-size:30px;line-height:1;flex-shrink:0';
var tx=document.createElement('div'); tx.style.cssText='flex:1;text-align:left';
var l1=document.createElement('div'); l1.textContent=label; l1.style.cssText='font-size:17px;font-weight:800;color:#fff;letter-spacing:-.3px';
var l2=document.createElement('div'); l2.textContent=desc; l2.style.cssText='font-size:12.5px;color:rgba(255,255,255,.92);margin-top:3px';
tx.appendChild(l1); tx.appendChild(l2);
var bd=document.createElement('div'); bd.textContent=brand; bd.style.cssText='font-size:11.5px;font-weight:800;color:#fff;background:rgba(255,255,255,.22);border-radius:20px;padding:7px 11px;flex-shrink:0';
inner.appendChild(ic); inner.appendChild(tx); inner.appendChild(bd);
b.appendChild(inner);
b.onclick=function(){ openUrl(url,'shop'); };
body.appendChild(b);
}
premCard('🏆','리뷰 많은 제품','후기 가장 많은 순으로 바로 보기','네이버쇼핑','linear-gradient(135deg,#04c95c,#019a48)','https://search.shopping.naver.com/search/all?query='+kw+'&sort=review');
premCard('🔥','판매량 많은 제품','가장 많이 산 순 · 로켓배송','쿠팡','linear-gradient(135deg,#ec5230,#c2371d)','https://www.coupang.com/np/search?q='+kw+'&sorter=saleCountDesc');
premCard('⭐','인기 많은 제품','랭킹·인기순으로 바로 보기','네이버쇼핑','linear-gradient(135deg,#3b82f6,#1450b5)','https://search.shopping.naver.com/search/all?query='+kw+'&sort=rel');
var dz=document.createElement('button'); dz.style.cssText='width:100%;margin:6px 0 20px;padding:14px;border-radius:14px;border:1.5px solid rgba(26,87,227,.4);background:rgba(26,87,227,.06);color:#1450b5;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit';
dz.textContent='💰 다나와에서 여러 쇼핑몰 최저가 비교';
dz.onclick=function(){ openUrl('https://search.danawa.com/dsearch.php?query='+kw,'shop'); };
body.appendChild(dz);
}
function vansAddMaps(container, q){
var t=document.createElement('div'); t.style.cssText='font-size:13.5px;font-weight:700;color:#5b6178;margin-bottom:8px'; t.textContent='🗺 지도에서 바로 찾기 — "'+q+'"'; container.appendChild(t);
container.appendChild(vansMapBtns(q,false));
}
function vansCardWrap(title){
var c=document.createElement('div'); c.style.cssText='margin:0 0 24px';
var h=document.createElement('div'); h.textContent=title; h.style.cssText='font-size:16.5px;font-weight:800;color:#0a7a96;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid rgba(34,211,238,.3)';
c.appendChild(h); return c;
}
function instantRoute(text){
var t=(text||'').trim(); if(!t) return null;
function clean(s){ ['에서','유튜브','유투브','유트브','튜브','유튜브뮤직','노래','음악','뮤직','좀'].forEach(function(w){ s=s.split(w).join(' '); }); ['틀어줘','틀어','들려줘','재생해줘','재생','찾아줘','찾아','알려줘','검색해줘','보여줘','해줘'].forEach(function(w){ s=s.split(w).join(' '); }); return s.replace(/\s+/g,' ').trim(); }
var bestId=null,bestLen=0;
try{ for(var id in KW){ if(!KW.hasOwnProperty(id)||!routeById(id)) continue; var ks=KW[id]; for(var k=0;k<ks.length;k++){ var kw=ks[k]; if(kw&&kw.length>=2&&t.indexOf(kw)>=0&&kw.length>bestLen){ bestId=id; bestLen=kw.length; } } } }catch(e){}
if(bestId){ var q=clean(t); return { id:bestId, q:(q||t) }; }
var rr=(typeof ruleRoute==='function')?ruleRoute(t):null;
if(rr) return rr;
if(/노래|음악|뮤직/.test(t) && routeById('ytmusic')) return { id:'ytmusic', q:clean(t)||t };
return null;
}
function voiceAnswer(query){
query=(query||'').trim(); if(!query) return;
if(typeof tossIntent==='function' && tossIntent(query)){ var _ts=tossParse(query); vansTossBack(_ts, query); if(_ts.prov==='toss') goToss(_ts); return; }
if(typeof callIntent==='function' && callIntent(query)){ var _cl=callParse(query); vansCallBack(_cl, query); goCall(_cl); return; }
if(typeof trainIntent==='function' && trainIntent(query)){ goTrain(trainParse(query)); return; }
if(typeof calIntent==='function' && calIntent(query)){ vansCalBack(calParse(query), query); return; }
if(typeof adminIntent==='function' && adminIntent(query)){ var _ad=adminParse(query); vansAdminBack(_ad, query); goAdmin(_ad, true); return; }
if(typeof kakaoOpenIntent==='function' && kakaoOpenIntent(query)){ var _ko=kakaoOpenParse(query); vansKakaoOpenBack(_ko, query); goKakaoOpenRoom(_ko, true); return; }
if(typeof kakaoIntent==='function' && kakaoIntent(query)){ var _kk=kakaoParse(query); vansKakaoBack(_kk, query); return; }
if(typeof telegramIntent==='function' && telegramIntent(query)){ var _tg=telegramParse(query); vansTelegramBack(_tg, query); goTelegram(_tg, true); return; }
if(typeof smsIntent==='function' && smsIntent(query)){ var _sm=smsParse(query); vansSmsBack(_sm, query); goSms(_sm); return; }
if(typeof taxiIntent==='function' && taxiIntent(query)){ vansTaxiBack(query); goTaxi(); return; }
if(typeof vansIsNavi==='function' && vansIsNavi(query)){ goNavi(query); return; }
if(typeof deliveryIntent==='function' && deliveryIntent(query)){ var _dvV=deliveryParse(query); vansDeliveryBack(_dvV, query); goDelivery(_dvV); return; }
vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=query;
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var rr=(typeof instantRoute==='function')?instantRoute(query):null;
var r0=rr?(routeById(rr.id)||routeById('navsearch')):routeById('navsearch');
var q0=(rr&&rr.q&&rr.q.length>0)?rr.q:query;
var _bk=(typeof bookingInfo==='function')?bookingInfo(query):null;
var aiQ=_bk ? (_bk.stay+' 이 숙소가 어떤 곳인지 위치·특징·주변 볼거리 중심으로 친근하게 소개해줘. 예약 가능 여부나 예약 방법, 사과(죄송) 표현은 절대 쓰지 마.') : query;
window._vansPlace=(typeof vansIsPlace==='function')?vansIsPlace(query, r0):false;
window._vansMusic=(typeof vansIsMusic==='function')?vansIsMusic(query):false;
if(_bk){ vansAddBooking(body, _bk); window._vansPlace=true; vansAddCategories(body, _bk.stay); }
else if(window._vansPlace){ vansAddMaps(body, q0); vansAddCategories(body, q0); }
else { vansAddOpen(body, r0, q0); if(r0 && r0.id==='navi'){ var _na0=applyRoute(r0,q0); setTimeout(function(){ try{ openNavi(q0,_na0.url); }catch(e){} },200); } }
var ai=document.createElement('div'); ai.id='vans-ai'; body.appendChild(ai);
if(typeof hasAIKey==='function' && !hasAIKey()){
while(ai.firstChild) ai.removeChild(ai.firstChild);
var nk=document.createElement('div'); nk.style.cssText='background:#eef0f7;border-radius:14px;padding:16px';
try{ freeAiNotice(nk); }catch(e){ nk.textContent='무료로 쓰려면 마이 탭에서 무료 키 또는 Puter를 켜줘.'; }
ai.appendChild(nk); return;
}
if(typeof hasWebSearch==='function' && hasWebSearch()){
var _l=ai.querySelector('span'); if(_l) _l.textContent='🌐 실시간 웹 검색 중...';
webSearch(aiQ, function(rs){
if(!rs||!rs.length){ vansPlainAI(aiQ); return; }
var _l2=ai.querySelector('span'); if(_l2) _l2.textContent='🤖 검색 결과로 답변 정리 중...';
var ctx=rs.map(function(x,i){ return '['+(i+1)+'] '+(x.title||'')+'\n'+(x.snippet||'')+'\n출처: '+(x.url||''); }).join('\n\n');
var sysW='너는 한국어 답변 도우미야. 아래 "웹 검색 결과"만 근거로 사용자 질문에 정확하고 최신 정보로 답해. 결과에 없는 내용은 지어내지 말고 모른다고 해. 반드시 JSON 객체 하나만 출력(마크다운/설명 금지):\n{"answer":"검색 결과에 근거한 핵심 답변 4~7문장, 문단은 \\n 으로 구분"}\n\n웹 검색 결과:\n'+ctx;
callAI({ system:sysW, messages:[{role:'user',content:aiQ}], maxTokens:1000, noLang:true },
function(txt){ var d=vansParse(txt); if(!d){ d={answer:String(txt||'').trim()}; } d.sources=rs; vansRenderWeb(d); },
function(e){ vansRenderWeb({answer:'', sources:rs}, (e&&e.message)||'오류'); });
}, function(){ vansPlainAI(aiQ, true); });
return;
}
vansPlainAI(aiQ);
}
function vansSpin(el, text){
while(el.firstChild) el.removeChild(el.firstChild);
var w=document.createElement('div'); w.style.cssText='display:flex;align-items:center;gap:10px;padding:12px 4px;color:#5b6178;font-size:14px;font-weight:700';
var sp=document.createElement('div'); sp.style.cssText='width:20px;height:20px;border:3px solid rgba(34,211,238,.25);border-top-color:#0a7a96;border-radius:50%;animation:reelSpin .8s linear infinite';
var t=document.createElement('span'); t.textContent=text; w.appendChild(sp); w.appendChild(t); el.appendChild(w);
}
function vansWarn(){ var w=document.createElement('div'); w.textContent='⚠️ AI가 정리한 답변이에요. 중요한 정보는 출처에서 꼭 확인하세요.'; w.style.cssText='background:#fff6e6;border:1px solid rgba(180,120,0,.35);border-radius:12px;padding:11px 13px;font-size:13px;font-weight:600;color:#7a5200;margin-bottom:14px;line-height:1.6'; return w; }
function vansAnswerCard(answer, label){
var card=vansCardWrap(label||'💬 AI 설명');
var blocks=String(answer||'').split(/\n+/).map(function(x){return x.trim();}).filter(Boolean);
if(!blocks.length){ var p0=document.createElement('div'); p0.style.cssText='font-size:15px;color:#5b6178'; p0.textContent='설명을 불러오지 못했어요.'; card.appendChild(p0); return card; }
var SHOW=8;
function para(t){ var p=document.createElement('div'); p.style.cssText='font-size:16px;color:#141720;line-height:1.9;margin-bottom:12px'; p.textContent=t; return p; }
var i; for(i=0;i<Math.min(SHOW,blocks.length);i++) card.appendChild(para(blocks[i]));
if(blocks.length>SHOW){ var more=document.createElement('div'); more.style.cssText='display:none'; for(i=SHOW;i<blocks.length;i++) more.appendChild(para(blocks[i])); card.appendChild(more);
var mb=document.createElement('button'); mb.textContent='더보기 ▾'; mb.style.cssText='margin-top:2px;background:none;border:none;color:#0a7a96;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit;padding:4px 0';
mb.onclick=function(){ if(more.style.display==='none'){ more.style.display='block'; mb.textContent='접기 ▴'; } else { more.style.display='none'; mb.textContent='더보기 ▾'; } }; card.appendChild(mb); }
return card;
}
function vansSourcesCard(sources){
var scU=vansCardWrap('📚 출처 (실시간 웹검색)');
sources.forEach(function(s){
if(!s||!s.url) return;
var row=document.createElement('button'); row.style.cssText='display:flex;width:100%;text-align:left;gap:8px;padding:10px 8px;border:none;border-bottom:1px solid rgba(0,0,0,.22);background:none;cursor:pointer;font-family:inherit;align-items:flex-start';
var ic=document.createElement('span'); ic.textContent='🔗'; ic.style.cssText='font-size:14px;margin-top:1px';
var tx=document.createElement('div'); tx.style.flex='1';
var t1=document.createElement('div'); t1.textContent=s.title||s.url; t1.style.cssText='font-size:14px;font-weight:700;color:#141720;line-height:1.4'; tx.appendChild(t1);
var t2=document.createElement('div'); t2.textContent=s.url; t2.style.cssText='font-size:11.5px;color:#0a7a96;margin-top:2px;word-break:break-all'; tx.appendChild(t2);
row.appendChild(ic); row.appendChild(tx);
row.onclick=(function(u){ return function(){ openUrl(u,'vans'); }; })(s.url);
scU.appendChild(row);
});
return scU;
}
function vansFillAnswer(answer, isErr){
var box=document.getElementById('vans-answer'); if(!box) return;
while(box.firstChild) box.removeChild(box.firstChild);
if(isErr){ var e=document.createElement('div'); e.style.cssText='color:#252a39;font-size:14.5px;line-height:1.7;padding:8px 4px'; e.textContent='AI 설명을 불러오지 못했어요. 위 바로 열기로 열 수 있어요.'; box.appendChild(e); return; }
box.appendChild(vansAnswerCard(answer));
}
function vansFillExtras(d){
var box=document.getElementById('vans-extras'); if(!box) return;
while(box.firstChild) box.removeChild(box.firstChild);
d=d||{};
if(d.recommend && d.recommend.length){
var rc=vansCardWrap('⭐ 추천');
d.recommend.forEach(function(item){
var it=String(item||'').trim(); if(!it) return;
var _pl=!!window._vansPlace; var _mu=!!window._vansMusic;
var itemBox=document.createElement('div'); itemBox.style.cssText='border-bottom:1px solid rgba(0,0,0,.22)';
var row=document.createElement('button'); row.style.cssText='display:flex;width:100%;text-align:left;align-items:center;gap:10px;padding:13px 2px;border:none;background:none;cursor:pointer;font-family:inherit';
var ic=document.createElement('span'); ic.textContent=_pl?'📍':(_mu?'▶':'🔍'); ic.style.cssText='color:'+(_pl?'#03C75A':(_mu?'#ff0000':'#0a7a96'))+';font-size:14px';
var sp=document.createElement('span'); sp.style.cssText='flex:1;color:#141720;font-size:15.5px;line-height:1.45'; sp.textContent=it;
row.appendChild(ic); row.appendChild(sp);
if(_pl){
var caret=document.createElement('span'); caret.textContent='▾'; caret.style.cssText='color:#8a90a3;font-size:13px;font-weight:700'; row.appendChild(caret);
var det=document.createElement('div'); det.style.cssText='display:none;padding:0 8px 12px';
var hint=document.createElement('div'); hint.style.cssText='font-size:13px;color:#5b6178;margin:0 0 2px'; hint.textContent='“'+it+'” 지도에서 보기';
det.appendChild(hint); det.appendChild(vansPlaceDetail(it));
itemBox.appendChild(row); itemBox.appendChild(det);
row.onclick=function(){ var op=det.style.display!=='none'; det.style.display=op?'none':'block'; caret.textContent=op?'▾':'▴'; };
} else {
itemBox.appendChild(row);
var _u=_mu?'https://www.youtube.com/results?search_query=':'https://search.naver.com/search.naver?query='; row.onclick=(function(t,u){ return function(){ openUrl(u+encodeURIComponent(t),'vans'); }; })(it,_u);
}
rc.appendChild(itemBox);
});
box.appendChild(rc);
}
if(d.videos && d.videos.length){
var vc=vansCardWrap('🎬 관련 영상');
d.videos.forEach(function(v){
if(!v||!v.title) return;
var row=document.createElement('button'); row.style.cssText='display:flex;width:100%;text-align:left;gap:10px;padding:12px 2px;border:none;border-bottom:1px solid rgba(0,0,0,.14);background:none;cursor:pointer;font-family:inherit;align-items:flex-start';
var ico=document.createElement('div'); ico.textContent='▶'; ico.style.cssText='color:#ff0000;font-size:16px;margin-top:1px';
var tx=document.createElement('div'); tx.style.flex='1';
var t1=document.createElement('div'); t1.textContent=v.title; t1.style.cssText='font-size:15.5px;font-weight:700;color:#141720;line-height:1.4'; tx.appendChild(t1);
if(v.desc){ var t2=document.createElement('div'); t2.textContent=v.desc; t2.style.cssText='font-size:13.5px;color:#252a39;margin-top:2px;line-height:1.5'; tx.appendChild(t2); }
row.appendChild(ico); row.appendChild(tx);
row.onclick=function(){ openUrl('https://www.youtube.com/results?search_query='+encodeURIComponent(v.title),'vans'); };
vc.appendChild(row);
});
box.appendChild(vc);
}
if(d.reads && d.reads.length){
var sc=vansCardWrap('📖 관련 이야기');
d.reads.forEach(function(rd){
if(!rd||!rd.title) return;
var blk=document.createElement('div'); blk.style.cssText='padding:10px 0;border-bottom:1px solid rgba(0,0,0,.22)';
var t1=document.createElement('div'); t1.textContent=rd.title; t1.style.cssText='font-size:15.5px;font-weight:700;color:#141720;margin-bottom:4px';
blk.appendChild(t1);
if(rd.desc){ var t2=document.createElement('div'); t2.textContent=rd.desc; t2.style.cssText='font-size:14px;color:#2a2e3d;line-height:1.7'; blk.appendChild(t2); }
var lk=document.createElement('button'); lk.textContent='관련 검색 ↗'; lk.style.cssText='margin-top:6px;background:none;border:none;color:#0a7a96;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;padding:0';
lk.onclick=(function(t){ return function(){ openUrl('https://search.naver.com/search.naver?query='+encodeURIComponent(t),'vans'); }; })(rd.title);
blk.appendChild(lk);
sc.appendChild(blk);
});
box.appendChild(sc);
}
box.appendChild(vansWarn());
}
function vansRenderWeb(d, err){
var ai=document.getElementById('vans-ai'); if(!ai) return;
while(ai.firstChild) ai.removeChild(ai.firstChild);
ai.appendChild(vansAnswerCard((d&&d.answer)||'', '💬 AI 설명 (실시간 웹검색)'));
if(d && d.sources && d.sources.length) ai.appendChild(vansSourcesCard(d.sources));
ai.appendChild(vansWarn());
}
function callAIStream(opts, onDelta, onDone, onError){
opts=opts||{};
if(!opts.noLang){ var _s=_aiLangSuffix(); if(_s) opts.system=(opts.system||'')+_s; }
if(aiModel==='puter'){ puterStream(opts,onDelta,onDone,onError); }
else if(aiModel==='gemini' && geminiKey){ geminiStream(opts,onDelta,onDone,onError); }
else if(apiKey){ claudeStream(opts,onDelta,onDone,onError); }
else { onError(new Error('NO_KEY')); }
}
function _pumpSSE(resp, pick, onDelta, onDone, onError){
if(!resp || !resp.ok || !resp.body){ onError(new Error('no stream')); return; }
var reader=resp.body.getReader(), dec=new TextDecoder(), buf='', full='';
function pump(){
return reader.read().then(function(r){
if(r.done){ onDone(full); return; }
buf+=dec.decode(r.value,{stream:true});
var idx;
while((idx=buf.indexOf('\n'))>=0){
var line=buf.slice(0,idx).trim(); buf=buf.slice(idx+1);
if(line.indexOf('data:')!==0) continue;
var data=line.slice(5).trim(); if(!data||data==='[DONE]') continue;
try{ var ev=JSON.parse(data); var t=pick(ev); if(t){ full+=t; onDelta(t); } }catch(_){}
}
return pump();
});
}
return pump();
}
function claudeStream(opts,onDelta,onDone,onError){
fetch('https://api.anthropic.com/v1/messages',{
method:'POST',
headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
body:JSON.stringify({ model: opts.fast?'claude-haiku-4-5-20251001':'claude-sonnet-4-6', max_tokens:opts.maxTokens||500, system:opts.system||'', messages:opts.messages, stream:true })
}).then(function(resp){
_pumpSSE(resp, function(ev){ return (ev.type==='content_block_delta'&&ev.delta&&typeof ev.delta.text==='string')?ev.delta.text:''; }, onDelta,onDone,onError);
}).catch(onError);
}
function geminiStream(opts,onDelta,onDone,onError){
var contents=[], msgs=opts.messages||[], i;
for(i=0;i<msgs.length;i++){ contents.push({role:msgs[i].role==='assistant'?'model':'user',parts:[{text:msgs[i].content}]}); }
if(opts.system && contents.length && contents[0].role==='user'){ contents[0].parts[0].text=opts.system+'\n\n'+contents[0].parts[0].text; }
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key='+geminiKey,{
method:'POST', headers:{'Content-Type':'application/json'},
body:JSON.stringify({ contents:contents, generationConfig:{maxOutputTokens:opts.maxTokens||500} })
}).then(function(resp){
_pumpSSE(resp, function(ev){ try{ return ev.candidates[0].content.parts[0].text||''; }catch(e){ return ''; } }, onDelta,onDone,onError);
}).catch(onError);
}
function puterStream(opts,onDelta,onDone,onError){
if(typeof puter==='undefined'||!puter.ai||!puter.ai.chat){ onError(new Error('no puter')); return; }
var msgs=(opts.messages||[]).slice(); if(opts.system) msgs.unshift({role:'system',content:opts.system});
(async function(){
try{
var stream=await puter.ai.chat(msgs,{ model:(opts.fast?'google/gemini-3.5-flash':PUTER_MODEL), stream:true, max_tokens:opts.maxTokens||500 });
var full='';
for await (const part of stream){ var t=(part&&part.text)||''; if(t){ full+=t; onDelta(t); } }
onDone(full);
}catch(e){ onError(e); }
})();
}
function _aiKey(q){ var x=String(q||'').trim().toLowerCase(), h=0,i; for(i=0;i<x.length;i++){ h=(h*31+x.charCodeAt(i))|0; } return 'podoai_ai_'+h; }
function aiCacheGet(q){ try{ var v=localStorage.getItem(_aiKey(q)); if(!v) return null; var o=JSON.parse(v); if(!o||(Date.now()-(o.t||0))>6048e5) return null; return o; }catch(e){ return null; } }
function aiCacheSet(q, patch){ try{ var o=aiCacheGet(q)||{}, p; for(p in patch){ o[p]=patch[p]; } o.t=Date.now(); localStorage.setItem(_aiKey(q), JSON.stringify(o)); }catch(e){} }
function vansPlainAI(query, webFailed){
var ai=document.getElementById('vans-ai'); if(!ai) return;
while(ai.firstChild) ai.removeChild(ai.firstChild);
if(webFailed){ var b=document.createElement('div'); b.textContent='⚠️ 실시간 웹검색 연결 실패(브라우저 CORS 제한) — AI 지식으로 답해요.'; b.style.cssText='background:#fff6e6;border:1px solid rgba(180,120,0,.35);border-radius:12px;padding:10px 12px;font-size:12.5px;font-weight:600;color:#7a5200;margin-bottom:12px;line-height:1.6'; ai.appendChild(b); }
var ansBox=document.createElement('div'); ansBox.id='vans-answer'; ai.appendChild(ansBox);
var exBox=document.createElement('div'); exBox.id='vans-extras'; ai.appendChild(exBox);
var _ck=aiCacheGet(query), _hA=!!(_ck&&_ck.a), _hB=!!(_ck&&_ck.b);
if(_hA) vansFillAnswer(_ck.a,false);
if(_hB) vansFillExtras(_ck.b);
if(_hA && _hB) return;
var sysA='너는 한국어 도우미야. 절대 "직접 재생/제어할 수 없다"거나 "죄송"으로 거절하지 마. 틀어/열어 달라고 하면 그 가수·영상·주제를 짧게 소개해줘. 2~4문장으로, 마크다운·JSON 없이 일반 문장으로만 답해.';
if(!_hA){
var _aBox=document.getElementById('vans-answer'), _sp=null;
if(_aBox){ while(_aBox.firstChild) _aBox.removeChild(_aBox.firstChild); var _card=vansCardWrap('💬 AI 설명'); _sp=document.createElement('div'); _sp.style.cssText='font-size:16px;color:#141720;line-height:1.9;white-space:pre-wrap'; _card.appendChild(_sp); _aBox.appendChild(_card); }
var _acc='';
callAIStream({ system:sysA, messages:[{role:'user',content:query}], maxTokens:650, noLang:true, fast:true },
function(delta){ _acc+=delta; if(_sp) _sp.textContent=_acc; },
function(full){ var t=(full||_acc||'').trim(); if(t){ vansFillAnswer(t,false); aiCacheSet(query,{a:t}); } else { vansFillAnswer('',true); } },
function(e){ callAI({ system:sysA, messages:[{role:'user',content:query}], maxTokens:650, noLang:true, fast:true }, function(txt){ var t=String(txt||'').trim(); vansFillAnswer(t,false); aiCacheSet(query,{a:t}); }, function(){ vansFillAnswer('',true); }); });
}
var sysB='너는 한국어 추천 도우미야. JSON 하나만(마크다운/설명 금지): {"recommend":["관련 추천 4~6개"],"videos":[{"title":"유튜브에서 찾을 영상 제목","desc":"한 줄 소개"}],"reads":[{"title":"관련 이야기/글 제목","desc":"1~2문장"}]}\nvideos 3개, reads 2개 이내.';
if(!_hB) callAI({ system:sysB, messages:[{role:'user',content:query}], maxTokens:650, noLang:true, fast:true },
function(txt){ var d=vansParse(txt)||{}; vansFillExtras(d); aiCacheSet(query,{b:d}); },
function(e){ vansFillExtras({}); });
}
var _usKind='research';
function uniScreenBuild(){
if(!document.getElementById('reel-kb-style')){ var st=document.createElement('style'); st.id='reel-kb-style'; st.textContent='@keyframes reelSpin{to{transform:rotate(360deg)}}'; document.head.appendChild(st); }
var ov=document.createElement('div'); ov.id='uniscreen-bg';
ov.style.cssText='position:fixed;inset:0;z-index:660;background:#ffffff;display:none;flex-direction:column';
var hd=document.createElement('div'); hd.style.cssText='flex-shrink:0;padding:14px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(0,0,0,.22);background:#ffffff';
var ti=document.createElement('div'); ti.id='us-title'; ti.style.cssText='flex:1;font-size:15px;font-weight:800;color:#6645dd'; ti.textContent='AI';
var back=document.createElement('button'); back.innerHTML='&#10005;'; back.style.cssText='width:34px;height:34px;border-radius:50%;border:none;background:rgba(0,0,0,.26);color:#141720;font-size:15px;cursor:pointer'; back.onclick=function(){ closeUniScreen(); };
hd.appendChild(ti); hd.appendChild(back); ov.appendChild(hd);
var ir=document.createElement('div'); ir.style.cssText='flex-shrink:0;padding:12px 16px;display:flex;gap:8px;background:#ffffff;border-bottom:1px solid rgba(0,0,0,.22)';
var inp=document.createElement('textarea'); inp.id='us-q'; inp.rows=1; inp.placeholder='내용을 적거나 말해줘';
inp.style.cssText='flex:1;min-width:0;padding:11px 12px;border-radius:12px;border:1px solid rgba(0,0,0,.3);background:#eef0f7;color:#141720;font-size:14px;font-family:inherit;outline:none;resize:none;line-height:1.4;max-height:90px';
var mic=document.createElement('button'); mic.id='us-mic'; mic.innerHTML='&#127908;';
mic.style.cssText='width:46px;flex-shrink:0;border-radius:12px;border:1px solid rgba(123,97,255,.4);background:rgba(123,97,255,.1);color:#6645dd;font-size:18px;cursor:pointer';
mic.onclick=function(){ sttStart('us-q','us-mic','&#127908;','&#9210;'); };
var run=document.createElement('button'); run.id='us-go'; run.textContent='실행';
run.style.cssText='padding:0 16px;flex-shrink:0;border-radius:12px;border:none;background:linear-gradient(135deg,#7b61ff,#22d3ee);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit';
run.onclick=function(){ uniScreenRun(); };
ir.appendChild(inp); ir.appendChild(mic); ir.appendChild(run); ov.appendChild(ir);
var err=document.createElement('div'); err.id='us-err'; err.style.cssText='display:none;margin:10px 16px 0;background:rgba(239,68,68,.1);border-radius:10px;padding:9px 12px;font-size:12px;color:#ef4444'; ov.appendChild(err);
var bodyWrap=document.createElement('div'); bodyWrap.style.cssText='flex:1;overflow-y:auto;padding:16px;-webkit-overflow-scrolling:touch';
var res=document.createElement('div'); res.id='us-result'; res.style.cssText='background:#eef0f7;border:1px solid rgba(0,0,0,.24);border-radius:16px;padding:16px;display:none';
bodyWrap.appendChild(res); ov.appendChild(bodyWrap);
document.body.appendChild(ov); return ov;
}
function openUniScreen(title, query, kind){
var ov=document.getElementById('uniscreen-bg')||uniScreenBuild();
ov.style.display='flex'; _usKind=kind;
var ti=document.getElementById('us-title'); if(ti) ti.textContent=title;
var q=document.getElementById('us-q'); if(q) q.value=query||'';
var er=document.getElementById('us-err'); if(er) er.style.display='none';
var res=document.getElementById('us-result'); if(res){ res.style.display='none'; res.innerHTML=''; }
history.pushState({p:true},'','');
uniScreenRun();
}
function closeUniScreen(){ try{ sttStop(); }catch(e){} var ov=document.getElementById('uniscreen-bg'); if(ov) ov.style.display='none'; }
function uniScreenRun(){
var q=document.getElementById('us-q'); var t=(q&&q.value||'').trim();
if(!t){ var er=document.getElementById('us-err'); if(er){ er.textContent='⚠️ 내용을 입력해줘'; er.style.display='block'; } return; }
if(typeof tossIntent==='function' && tossIntent(t)){ closeUniScreen(); var _ts=tossParse(t); vansTossBack(_ts, t); if(_ts.prov==='toss') goToss(_ts); return; }
if(typeof callIntent==='function' && callIntent(t)){ closeUniScreen(); var _cl=callParse(t); vansCallBack(_cl, t); goCall(_cl); return; }
if(typeof trainIntent==='function' && trainIntent(t)){ closeUniScreen(); goTrain(trainParse(t)); return; }
if(typeof calIntent==='function' && calIntent(t)){ closeUniScreen(); vansCalBack(calParse(t), t); return; }
if(typeof adminIntent==='function' && adminIntent(t)){ closeUniScreen(); var _ad=adminParse(t); vansAdminBack(_ad, t); goAdmin(_ad, true); return; }
if(typeof kakaoOpenIntent==='function' && kakaoOpenIntent(t)){ closeUniScreen(); var _ko=kakaoOpenParse(t); vansKakaoOpenBack(_ko, t); goKakaoOpenRoom(_ko, true); return; }
if(typeof kakaoIntent==='function' && kakaoIntent(t)){ closeUniScreen(); var _kk=kakaoParse(t); vansKakaoBack(_kk, t); return; }
if(typeof telegramIntent==='function' && telegramIntent(t)){ closeUniScreen(); var _tg=telegramParse(t); vansTelegramBack(_tg, t); goTelegram(_tg, true); return; }
if(typeof smsIntent==='function' && smsIntent(t)){ closeUniScreen(); var _sm=smsParse(t); vansSmsBack(_sm, t); goSms(_sm); return; }
if(typeof taxiIntent==='function' && taxiIntent(t)){ closeUniScreen(); vansTaxiBack(t); goTaxi(); return; }
if(typeof vansIsNavi==='function' && vansIsNavi(t)){ closeUniScreen(); goNavi(t); return; }
if(typeof deliveryIntent==='function' && deliveryIntent(t)){ closeUniScreen(); var _dvS=deliveryParse(t); vansDeliveryBack(_dvS, t); goDelivery(_dvS); return; }
if(typeof bookingInfo==='function'){ var _bkS=bookingInfo(t); if(_bkS){ closeUniScreen(); vansBooking(_bkS); goBooking(_bkS); return; } }
if(typeof vansIsMusic==='function' && vansIsMusic(t)){ closeUniScreen(); var _mq2=musicTopic(t); voiceAnswer(t); openUrl('https://www.youtube.com/results?search_query='+encodeURIComponent(_mq2),'vans'); return; }
if(typeof placeMapIntent==='function'){ var _pm2=placeMapIntent(t); if(_pm2){ closeUniScreen(); voiceAnswer(t); openUrl('https://map.kakao.com/?q='+encodeURIComponent(_pm2),'vans'); return; } }
if(_usKind!=='research' && typeof shoppingDetect==='function'){ var _shS=shoppingDetect(t); if(_shS){ closeUniScreen(); vansShoppingBack(_shS, t); goShopping(_shS); return; } }
if(typeof vansIsPlace==='function' && vansIsPlace(t)){ closeUniScreen(); voiceAnswer(t); return; }
if(_usKind==='research'){ _runResearch('us-q','us-err','us-result','us-go'); }
else { _runWorkflow('us-q','us-err','us-result','us-go'); }
}
var uniMode='auto';
function uniMic(){ VOICE_PREFIX='uni'; voiceActMic(); }
function uniSearch(){ VOICE_PREFIX='uni'; voiceActSearch(); }
function setUniMode(m){
uniMode=m;
var chips=document.querySelectorAll('.uni-chip');
for(var i=0;i<chips.length;i++){ if(chips[i].getAttribute('data-um')===m) chips[i].classList.add('on'); else chips[i].classList.remove('on'); }
var pre=document.getElementById('uni-presets'); if(pre) pre.style.display=(m==='draft')?'flex':'none';
var rw=document.getElementById('uni-result-wrap'); if(rw) rw.style.display='none';
var rs=document.getElementById('uni-result'); if(rs){ rs.style.display='none'; rs.innerHTML=''; }
var q=document.getElementById('uni-q');
if(q){ q.placeholder = (m==='open') ? '예) 유튜브 열어줘 / 동명항 길안내 / 엄마한테 전화'
: (m==='research') ? '예) 10만원대 무선이어폰 3개 비교 추천'
: (m==='draft') ? '작성할 내용을 입력하세요 (위에서 유형 선택)'
: '무엇이든 말하거나 적어보세요'; }
}
function uniDetectMode(t){
var draft=['작성','써줘','써 줘','적어줘','공지','홍보','예약확인','예약 확인','리뷰','답변','지출','정산','정리','안내문','안내 문','초안','문자 보내','문자보내','메시지 작성','메일 작성','메일 써','환불','교환','반품','배송지연','배송 지연','지연 안내','출고','당첨','경품','이벤트','추첨','감사','고마','단골','사과문','안내'];
var research=['비교','추천','알아봐','알아봐줘','뭐가 좋','뭐가좋','차이','vs',' 대비','후기','리서치','분석','조사','장단점','어떤 게 좋','뭐 살까'];
for(var i=0;i<draft.length;i++){ if(t.indexOf(draft[i])>=0) return 'draft'; }
for(var j=0;j<research.length;j++){ if(t.indexOf(research[j])>=0) return 'research'; }
return 'open';
}
function uniDetectPreset(t){
if(/환불|교환|반품/.test(t)) return 'refund';
if(/배송\s*지연|지연|늦어|물량|출고/.test(t)) return 'delay';
if(/당첨|경품|이벤트\s*당첨|추첨/.test(t)) return 'event';
if(/감사|고마|단골/.test(t)) return 'thanks';
if(/예약|노쇼|확정|예약확인/.test(t)) return 'booking';
if(/리뷰|후기|별점|답변/.test(t)) return 'review';
if(/지출|정산|영수증|비용/.test(t)) return 'expense';
return 'notice';
}
function uniRun(){
var qEl=document.getElementById('uni-q'); if(!qEl) return;
var t=(qEl.value||'').trim();
var er=document.getElementById('uni-err');
if(!t){ if(er){ er.textContent='⚠️ 무엇을 할지 말하거나 적어줘'; er.style.display='block'; } return; }
if(er) er.style.display='none';
var _ctx=_agentExecCtx; _agentExecCtx=null;
if(typeof routineIntent==="function"){ var _rtU=routineIntent(t); if(_rtU){ loadAgentRoutine(_rtU.id); return; } }
if(typeof podotalkIntent==="function"){ var _puni=podotalkIntent(t); if(_puni){ goPodotalk(_puni, podotalkMsg(t), _ctx); return; } }
if(typeof tossIntent==='function' && tossIntent(t)){ var _ts=tossParse(t); vansTossBack(_ts, t); if(_ts.prov==='toss') goToss(_ts, !!_ctx); return; }
if(typeof callIntent==='function' && callIntent(t)){ var _cl=callParse(t); vansCallBack(_cl, t); goCall(_cl); return; }
if(typeof trainIntent==='function' && trainIntent(t)){ goTrain(trainParse(t)); return; }
if(typeof calIntent==='function' && calIntent(t)){ vansCalBack(calParse(t), t); return; }
if(typeof adminIntent==='function' && adminIntent(t)){ var _ad=adminParse(t); vansAdminBack(_ad, t); goAdmin(_ad, true); return; }
if(typeof kakaoOpenIntent==='function' && kakaoOpenIntent(t)){ var _ko=kakaoOpenParse(t); vansKakaoOpenBack(_ko, t); goKakaoOpenRoom(_ko, true); return; }
if(typeof kakaoIntent==='function' && kakaoIntent(t)){ var _kk=kakaoParse(t); vansKakaoBack(_kk, t); if(_ctx) goKakao(_kk); return; }
if(typeof telegramIntent==='function' && telegramIntent(t)){ var _tg=telegramParse(t); vansTelegramBack(_tg, t); goTelegram(_tg, true); return; }
if(typeof smsIntent==='function' && smsIntent(t)){ var _sm=smsParse(t); vansSmsBack(_sm, t); goSms(_sm); return; }
if(typeof taxiIntent==='function' && taxiIntent(t)){ vansTaxiBack(t); goTaxi(); return; }
if(typeof vansIsNavi==='function' && vansIsNavi(t)){ goNavi(t); return; }
if(typeof deliveryIntent==='function' && deliveryIntent(t)){ var _dvU=deliveryParse(t); vansDeliveryBack(_dvU, t); goDelivery(_dvU); return; }
if((uniMode==='auto'||!uniMode) && typeof vansIsMusic==='function' && vansIsMusic(t)){ var _mq=musicTopic(t); voiceAnswer(t); openUrl('https://www.youtube.com/results?search_query='+encodeURIComponent(_mq),'vans'); return; }
if((uniMode==='auto'||!uniMode) && typeof placeMapIntent==='function'){ var _pm=placeMapIntent(t); if(_pm){ voiceAnswer(t); openUrl('https://map.kakao.com/?q='+encodeURIComponent(_pm),'vans'); return; } }
if(typeof bookingInfo==='function'){ var _bkU=bookingInfo(t); if(_bkU){ vansBooking(_bkU); goBooking(_bkU); return; } }
if((uniMode==='auto'||!uniMode) && typeof shoppingDetect==='function'){ var _shU=shoppingDetect(t); if(_shU){ vansShoppingBack(_shU, t); goShopping(_shU); return; } }
var mode=(uniMode && uniMode!=='auto') ? uniMode : uniDetectMode(t);
var rw=document.getElementById('uni-result-wrap'); if(rw) rw.style.display='none';
var rs=document.getElementById('uni-result'); if(rs){ rs.style.display='none'; rs.innerHTML=''; }
if(mode==='open'){
voiceAnswer(t);
} else if(mode==='research'){
if(typeof vansIsPlace==='function' && vansIsPlace(t)){ voiceAnswer(t); }
else { openUniScreen('🔎 AI 리서치', t, 'research'); }
} else {
if(uniMode==='auto'){ setWorkflowPreset(uniDetectPreset(t)); }
openUniScreen('✍️ AI 글쓰기', t, 'draft');
}
}
function _agentAiP(system, user, maxTokens){
return new Promise(function(resolve, reject){
if(!hasAIKey()){ reject(new Error('NO_KEY')); return; }
callAI({ system:system, messages:[{role:'user',content:user}], maxTokens:maxTokens||1200, noLang:true },
function(t){ resolve((t||'').trim()); }, function(e){ reject(e||new Error('AI_ERR')); });
});
}
function _agentEsc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function _agentParseJSON(txt){
if(!txt) return null;
var s=String(txt).replace(/```json/gi,'').replace(/```/g,'').trim();
var a=s.indexOf('{'), b=s.lastIndexOf('}');
if(a>=0 && b>a){ s=s.slice(a,b+1); }
try{ return JSON.parse(s); }catch(e){ return null; }
}
var AGENT_CAPS=[
  '전화걸기: "○○에게 전화" / "010-1234-5678 전화"',
  '문자(SMS): "○○에게 문자: <내용>"',
  '카카오톡: "○○방 카톡: <보낼 내용>" 또는 "카카오톡 ○○방에 메시지: <보낼 내용>" (방/상대 이름과 내용을 반드시 포함)',
  '송금: "○○에게 5만원 송금"(토스) · "○○에게 5만원 네이버페이로 송금" · "○○에게 5만원 카카오페이로 송금" — 사용자가 말한 결제수단(토스·네이버페이·카카오페이)을 command에 그대로 유지',
  '길찾기/내비: "○○ 가는 길"',
  '지도검색: "○○ 지도에서 찾아줘"',
  '음식배달: "○○ 배달 시켜줘"',
  '기차예매: "SRT 서울에서 부산 예매"',
  '캘린더 일정: "내일 오후 3시 ○○ 일정 등록"',
  '쇼핑/최저가: "쿠팡 <상품> 최저가로 담아줘"',
  '음악: "<노래> 틀어줘"',
  '예약: "○○ 예약"',
  '택시: "택시 불러줘"',
  '포도톡 방 열기: "포도톡 ○○방 열어줘"',
  '포도톡 방에 메시지: "포도톡 ○○방에 메시지: <보낼 내용>" (방을 열고 메시지가 입력창에 채워짐)'
].join('\n');
var _agentCatIcon={call:'📞',sms:'💬',kakao:'💛',toss:'💸',navi:'🧭',map:'🗺️',food:'🍔',train:'🚄',cal:'📅',shop:'🛒',music:'🎵',booking:'📌',taxi:'🚕',talk:'🍇',etc:'✨'};
function _agentLogHtml(rows){
var body=rows.map(function(r){
var ic=r.s==='done'?'✅':(r.s==='run'?'⏳':'•');
return '<div style="display:flex;gap:9px;align-items:flex-start;padding:6px 0"><span style="font-size:15px">'+ic+'</span><div><div style="font-weight:800;font-size:13px;color:#2a1a4a">'+_agentEsc(r.k)+'</div><div style="font-size:12.5px;color:#555">'+_agentEsc(r.t)+'</div></div></div>';
}).join('');
return '<div style="background:#f6f3ff;border:1px solid #e5dcfb;border-radius:14px;padding:12px 14px"><div style="font-weight:900;font-size:13px;color:#6d28d9;margin-bottom:4px">🤖 에이전트팀</div>'+body+'</div>';
}
function _agentIsMultiStep(t){
t=String(t||'');
var hasTalk=/포도톡|포톡|podotalk|potalk|카톡|카카오톡|문자|메시지|메세지|공지/i.test(t) || /(말해|말하|전해|알려|얘기|보내)\s*(?:주|줘|줄|달|주고|드려|드리)/.test(t);
var hasPay=/토스|송금|이체|입금/.test(t) || (/\d\s*만|\d[\d,]*\s*원|만\s*원/.test(t) && /보내|부쳐|쏴|쏘|송금|이체/.test(t));
if(hasTalk && hasPay) return true;
if(/[\n·;]|[,，]|및|\d[\.\)](\s|$)/.test(t)) return true;
if(/(그리고|그리곤|그런\s*다음|그\s*다음|그다음|다음에|이어서|그\s*후|그후|한\s*뒤|한뒤|한\s*다음|하고\s*나서|하고나서|하고|해서\s|주고|해주고|말해주고|보내주고|알려주고|전해주고|보내고|걸고|열고|찾고|잡고|시키고|등록하고|송금하고|전화하고)/.test(t)) return true;
return false;
}
function _agentHasPay(t){ return /토스|송금|이체|부쳐|계좌|입금|네이버\s*페이|카카오\s*페이|카페이|엔페이|n\s*페이|npay|페이로/i.test(t); }
function _agentAutoStartQueue(){
if(_aq) return;
var steps=window._agentSteps||[]; if(!steps.length) return;
var autoEl=document.getElementById('agent-auto'); if(autoEl) autoEl.checked=true;
try{ agentStartQueue(); }catch(e){}
}
function runAgentTeam(){
var qEl=document.getElementById('uni-q'); if(!qEl) return;
var req=(qEl.value||'').trim();
var panel=document.getElementById('agent-panel');
var err=document.getElementById('uni-err');
if(!req){ if(err){ err.textContent='⚠️ 무엇을 도와줄지 적어주세요 (예: "내일 3시 회의 잡고 김대리한테 문자 보내줘")'; err.style.display='block'; } return; }
if(err) err.style.display='none';
if(!panel) return;
_agentClearActive(); window._agentRestoreDone=true; _aq=null;
panel.style.display='block';
if(!_agentIsMultiStep(req)){
panel.innerHTML=_agentLogHtml([{k:'⚡ 바로 실행',s:'done',t:'분석 없이 즉시 실행했어요 · 여러 단계면 "그리고 / 다음에"로 이어 적어주세요'}]);
try{ uniRun(); }catch(e){}
return;
}
if(!hasAIKey()){ if(err){ err.textContent='⚠️ 여러 단계를 나누려면 AI 키가 필요해요. 설정에서 Claude/Gemini 키를 연결하거나 무료(Puter)로 바꿔주세요. (단일 명령은 키 없이 바로 실행돼요)'; err.style.display='block'; } panel.style.display='none'; return; }
panel.innerHTML='<div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:16px;font-size:14px;color:#666;text-align:center">⚡ 준비 중…</div>';
var planSys='너는 한국어 "실행 계획 분석가" 에이전트야. 사용자 요청을 앱이 실행할 수 있는 단계로 분해해.\n'+
    '각 단계의 command는 반드시 아래 자연어 명령 형태 중 하나여야 함:\n'+AGENT_CAPS+'\n\n'+
    '반드시 순수 JSON만 출력(설명·마크다운·코드펜스 금지). 형식:\n'+
    '{"summary":"한 줄 요약","steps":[{"title":"짧은 제목","command":"앱에 넣을 자연어 명령","detail":"무엇/왜 한 줄","cat":"call|sms|kakao|toss|navi|map|food|train|cal|shop|music|booking|taxi|talk|etc"}],"note":"지원 안 되거나 주의할 점(없으면 빈문자열)"}\n'+
    '송금 단계는 사용자가 말한 결제수단(토스/네이버페이/카카오페이)을 command에 그대로 포함(예: "수에게 2만원 네이버페이로 송금"). '+
    '문자/카톡/포도톡 메시지 단계는 command에 반드시 "메시지: <보낼 내용>" 형식으로 보낼 문구를 포함(예: "포도톡 세계테마기행방에 메시지: 금요일 파리 갑니다"). 지원 안 되는 일은 steps에 넣지 말고 note에 적어. 단계는 최대 6개.';
_agentAiP(planSys, '요청: '+req, 1400).then(function(planTxt){
var plan=_agentParseJSON(planTxt);
if(!plan || !plan.steps || !plan.steps.length){
panel.innerHTML='<div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:14px;font-size:14px;color:#333">실행할 만한 단계를 찾지 못했어요. 더 구체적으로 적어주세요.</div>';
return;
}
renderAgentProposals(req, plan, []);
_agentAutoStartQueue();
}).catch(function(e){
panel.innerHTML='<div style="background:#fff;border:1px solid #f3c;border-radius:12px;padding:14px;font-size:14px;color:#c0392b">⚠️ 에이전트 실행 실패: '+((e&&e.message==='NO_KEY')?'AI 키가 필요해요':'잠시 후 다시 시도해줘')+'</div>';
});
}
function _agentImportant(cat, cmd){ if(cat==='toss') return true; if(cmd && /토스|송금|이체|네이버\s*페이|카카오\s*페이|카페이|엔페이|npay/i.test(cmd)) return true; return false; }
function _agentPayMeta(cmd){
var m={prov:'toss', name:'토스', color:'#0064FF', grad:'linear-gradient(135deg,#0064FF,#0050d0)', txt:'#fff'};
try{ var pr=(typeof tossParse==='function')?tossParse(cmd||'').prov:'toss';
if(pr==='naverpay'){ m={prov:'naverpay', name:'네이버페이', color:'#03C75A', grad:'linear-gradient(135deg,#03C75A,#02a94c)', txt:'#fff'}; }
else if(pr==='kakaopay'){ m={prov:'kakaopay', name:'카카오페이', color:'#8a6d00', grad:'linear-gradient(135deg,#FFDE00,#FFCD00)', txt:'#3C1E1E'}; }
}catch(e){}
return m;
}
function renderAgentProposals(req, plan, cautions){
var panel=document.getElementById('agent-panel'); if(!panel) return;
window._agentSteps=plan.steps; window._agentReq=req||'';
var html='<div style="font-size:12px;font-weight:800;color:#6d28d9">✨ '+_agentEsc(plan.summary||(plan.steps.length+'단계'))+' · 아래에서 순서대로 실행돼요</div>';
plan.steps.forEach(function(st,i){
var ic=_agentCatIcon[st.cat]||'✨';
var imp=_agentImportant(st.cat, st.command);
html+='<div id="agstep-'+i+'" style="margin-top:9px;background:#fff;border:1px solid #ece7f7;border-radius:14px;padding:13px;box-shadow:0 3px 12px rgba(76,29,149,.05)">'+
      '<div style="display:flex;gap:9px;align-items:flex-start"><span style="font-size:20px">'+ic+'</span>'+
        '<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span style="font-weight:800;font-size:14.5px;color:#241436">'+_agentEsc(st.title||('단계 '+(i+1)))+'</span>'+
(imp?'<span style="font-size:10px;font-weight:800;color:#c2410c;background:#ffedd5;padding:2px 6px;border-radius:6px">확인 필요</span>':'')+
          '<span id="agstat-'+i+'" style="font-size:11px;font-weight:800;color:#9aa;margin-left:auto">대기</span></div>'+
        '<div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">'+_agentEsc(st.detail||'')+'</div>'+
        '<div style="font-size:12px;color:#7c3aed;margin-top:6px;background:#f6f3ff;border-radius:8px;padding:6px 9px;word-break:break-all">▶ '+_agentEsc(st.command||'')+'</div>'+
        '</div></div>'+
      '<button onclick="runAgentCmd('+i+')" style="width:100%;margin-top:10px;padding:11px;border-radius:11px;border:none;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit">▶️ 실행</button>'+
    '</div>';
});
if(cautions && cautions.length){
html+='<div style="margin-top:10px;background:#fff7e8;border:1px solid #f5e1b8;border-radius:12px;padding:12px 13px"><div style="font-weight:800;font-size:12.5px;color:#a5701f;margin-bottom:5px">⚠️ 검수관 주의</div>'+
cautions.map(function(c){ return '<div style="font-size:12.5px;color:#8a6d2f;line-height:1.6">• '+_agentEsc(c)+'</div>'; }).join('')+'</div>';
}
if(plan.note){ html+='<div style="margin-top:8px;font-size:12px;color:#888">📝 '+_agentEsc(plan.note)+'</div>'; }
html+='<div style="margin-top:14px;background:#f6f3ff;border:1px solid #e5dcfb;border-radius:14px;padding:13px 14px">'+
    '<div style="font-weight:900;font-size:13px;color:#6d28d9;margin-bottom:8px">🚀 순서대로 실행 (큐)</div>'+
    '<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#444;font-weight:700;margin-bottom:10px;cursor:pointer"><input type="checkbox" id="agent-auto" style="width:17px;height:17px;accent-color:#7c3aed">⚡ 자동 진행 (나머지는 바로 실행 · 💸 결재·송금 단계만 확인)</label>'+
    '<div style="display:flex;gap:8px">'+
      '<button onclick="agentStartQueue(true)" style="flex:1;padding:12px;border-radius:11px;border:none;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;font-size:14.5px;font-weight:800;cursor:pointer;font-family:inherit">▶️ 순서대로 실행</button>'+
      '<button onclick="saveCurrentAsRoutine()" style="padding:12px 14px;border-radius:11px;border:1.5px solid #7c3aed;background:#fff;color:#6d28d9;font-size:13.5px;font-weight:800;cursor:pointer;font-family:inherit">💾 루틴</button>'+
    '</div>'+
    '<div id="agent-queue-ctrl" style="margin-top:10px"></div>'+
    '<div style="margin-top:8px;font-size:11px;color:#9a8bc0;line-height:1.5">💡 앱(APK)에선 외부앱이 떠도 큐가 유지돼 매끄럽게 이어져요. 브라우저에선 외부 페이지로 이동 후 <b>뒤로가기</b>로 돌아오면 다음 단계를 이어서 실행할 수 있어요.</div>'+
  '</div>';
panel.innerHTML=html;
}
function runAgentCmd(i){
var steps=window._agentSteps||[]; var st=steps[i]; if(!st) return;
var q=document.getElementById('uni-q'); if(q){ q.value=st.command||''; }
_agentSetStat(i,'done');
try{ uniRun(); }catch(e){}
var m=document.getElementById('main'); if(m){ setTimeout(function(){ m.scrollTop=m.scrollHeight; }, 80); }
}
var _aq=null;
var _agentExecCtx=null;
function _agentSetStat(i, s){
if(_aq){ _aq.stat=_aq.stat||[]; _aq.stat[i]=s; }
var el=document.getElementById('agstat-'+i); if(!el) return;
var map={wait:['대기','#9aa'],cur:['진행 중','#7c3aed'],done:['완료 ✅','#16a34a'],skip:['건너뜀 ⏭️','#f59e0b']};
var m=map[s]||map.wait; el.textContent=m[0]; el.style.color=m[1];
var card=document.getElementById('agstep-'+i); if(card){ card.style.outline=(s==='cur')?'2px solid #7c3aed':'none'; card.style.outlineOffset='1px'; }
}
function _agentClearTimers(){ if(_aq){ if(_aq.timer){clearTimeout(_aq.timer);_aq.timer=null;} if(_aq.tick){clearInterval(_aq.tick);_aq.tick=null;} } }
function _agentExec(st){ try{ _agentExecCtx={ inQueue:true, hasNext:!!(_aq && _aq.ptr < _aq.steps.length) }; }catch(e){ _agentExecCtx=null; } var q=document.getElementById('uni-q'); if(q) q.value=st.command||''; try{ uniRun(); }catch(e){} }
function _agentSaveActive(){ if(!_aq) return; try{ lsS('podoai_agent_active', { steps:_aq.steps, ptr:_aq.ptr, auto:_aq.auto, log:_aq.log||[], stat:_aq.stat||[], req:(window._agentReq||''), ts:Date.now() }); }catch(e){} }
function _agentClearActive(){ try{ lsS('podoai_agent_active', null); }catch(e){} }
function _agentScrollCtrl(){
try{
var c=document.getElementById('agent-queue-ctrl'); if(!c || !c.offsetParent) return;
var vh=(window.innerHeight||document.documentElement.clientHeight||600);
var r=c.getBoundingClientRect();
if(r.top>=0 && r.bottom<=vh) return;
var m=document.getElementById('main');
if(m){ var top=r.top - m.getBoundingClientRect().top + m.scrollTop; m.scrollTop=Math.max(0, top - m.clientHeight*0.3); }
else if(c.scrollIntoView){ c.scrollIntoView({block:'center'}); }
}catch(e){}
}
function _agentRestoreActive(){
var panel=document.getElementById('agent-panel'); if(!panel) return;
if(_aq){
var _st=_aq.stat||[]; for(var _j=0;_j<_aq.steps.length;_j++){ if(_st[_j]) _agentSetStat(_j, _st[_j]); }
try{ agentQueueRun(); }catch(e){}
return;
}
var sv=null; try{ sv=lsG('podoai_agent_active', null); }catch(e){}
if(!sv || !sv.steps || !sv.steps.length){ return; }
if(sv.ptr>=sv.steps.length || (sv.ts && Date.now()-sv.ts>3600000)){ _agentClearActive(); return; }
window._agentSteps=sv.steps; window._agentReq=sv.req||'';
panel.style.display='block';
renderAgentProposals(sv.req||'', { summary:'이어서 진행 중인 큐', steps:sv.steps, note:'' }, []);
_aq={ steps:sv.steps, ptr:sv.ptr, auto:!!sv.auto, log:sv.log||[], stat:sv.stat||[], timer:null, tick:null };
var st=sv.stat||[], i; for(i=0;i<sv.steps.length;i++){ if(st[i]) _agentSetStat(i, st[i]); }
agentQueueRun();
_agentScrollCtrl();
}
try{ window.addEventListener('pageshow', function(e){
try{ _agentRestoreActive(); }catch(_e){}
try{ if(e && e.persisted && !_aq){ var m=document.getElementById('main'); if(m){ setTimeout(function(){ m.scrollTop=0; }, 60); } } }catch(_e){}
}); }catch(e){}
try{ document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible' && _aq){ try{ _agentRestoreActive(); }catch(_e){} } }); }catch(e){}
function agentStartQueue(forceAuto){
var steps=window._agentSteps||[]; if(!steps.length) return;
var autoEl=document.getElementById('agent-auto');
var isAuto = (forceAuto===true) ? true : !!(autoEl&&autoEl.checked);
if(forceAuto===true && autoEl){ autoEl.checked=true; }
_aq={ steps:steps, ptr:0, auto:isAuto, timer:null, tick:null, log:[], stat:[] };
for(var i=0;i<steps.length;i++){ _agentSetStat(i,'wait'); }
_agentSaveActive();
agentQueueRun();
}
function agentQueueRun(){
if(!_aq) return; _agentClearTimers();
var ctrl=document.getElementById('agent-queue-ctrl'); if(!ctrl) return;
if(_aq.ptr>=_aq.steps.length){
_agentClearActive();
ctrl.innerHTML=_agentReport(_aq.log||[]);
_aq=null; return;
}
var i=_aq.ptr, st=_aq.steps[i]; _agentSetStat(i,'cur');
_agentScrollCtrl();
var imp=_agentImportant(st.cat, st.command);
var pos=(i+1)+'/'+_aq.steps.length;
if(imp){
var pm=_agentPayMeta(st.command);
if(_aq.auto){
var _apk=(typeof isApk==='function' && isApk());
if(_apk){
ctrl.innerHTML='<div style="background:#eaf2ff;border:1px solid #b8d4ff;border-radius:11px;padding:12px">'+
          '<div style="font-size:12.5px;font-weight:800;color:'+pm.color+'">💸 '+pm.name+' 송금화면으로 이동합니다 ('+pos+')</div>'+
          '<div style="font-size:11.5px;color:#3b5b8c;margin:5px 0 8px;line-height:1.5">실제 전송은 '+pm.name+'에서 인증 후 직접 눌러야 완료돼요 (자동 이체 아님)</div>'+
          '<div style="display:flex;gap:8px">'+
            '<button onclick="agentQueueGo()" style="flex:1;padding:11px;border-radius:10px;border:none;background:'+pm.grad+';color:'+pm.txt+';font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">💸 지금 열기</button>'+
            '<button onclick="agentQueuePause()" style="flex:1;padding:11px;border-radius:10px;border:1.5px solid #b8d4ff;background:#fff;color:'+pm.color+';font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">⏸ 정지</button>'+
          '</div></div>';
_aq.timer=setTimeout(function(){ _agentClearTimers(); agentQueueGo(); }, 900);
} else {
ctrl.innerHTML='<div style="background:#eaf2ff;border:1px solid #b8d4ff;border-radius:11px;padding:13px">'+
          '<div style="font-size:13px;font-weight:800;color:'+pm.color+'">💸 마지막 단계: '+pm.name+' 송금 ('+pos+')</div>'+
          '<div style="font-size:12px;color:#0b3a7a;margin:5px 0;word-break:break-all">'+_agentEsc(st.command||'')+'</div>'+
          '<div style="font-size:11px;color:#3b5b8c;margin-bottom:9px;line-height:1.5">브라우저에선 앱 보안상 <b>한 번 눌러야</b> '+pm.name+'가 열려요 (APK에선 자동). 실제 전송은 '+pm.name+'에서 인증 후 본인이 눌러야 완료돼요.</div>'+
          '<div style="display:flex;gap:8px">'+
            '<button onclick="agentQueueGo()" style="flex:2;padding:14px;border-radius:11px;border:none;background:'+pm.grad+';color:'+pm.txt+';font-weight:800;font-size:15px;cursor:pointer;font-family:inherit;box-shadow:0 4px 12px rgba(0,0,0,.15)">💸 '+pm.name+'로 보내기</button>'+
            '<button onclick="agentQueueSkip()" style="flex:1;padding:14px;border-radius:11px;border:1.5px solid #d1d5db;background:#fff;color:#555;font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">건너뛰기</button>'+
          '</div></div>';
}
return;
}
ctrl.innerHTML='<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:11px;padding:12px">'+
      '<div style="font-size:12.5px;font-weight:800;color:#c2410c">⚠️ 중요 단계 ('+pos+') — '+pm.name+' 송금, 확인 후 실행</div>'+
      '<div style="font-size:12.5px;color:#7c2d12;margin:6px 0;word-break:break-all">'+_agentEsc(st.command||'')+'</div>'+
      '<div style="display:flex;gap:8px">'+
        '<button onclick="agentQueueGo()" style="flex:1;padding:11px;border-radius:10px;border:none;background:#ea580c;color:#fff;font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">▶️ 실행</button>'+
        '<button onclick="agentQueueSkip()" style="flex:1;padding:11px;border-radius:10px;border:1.5px solid #d1d5db;background:#fff;color:#555;font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">⏭️ 건너뛰기</button>'+
      '</div></div>';
return;
}
if(_aq.auto){
var _apk2=(typeof isApk==='function' && isApk());
var isK=(st.cat==='kakao')||/카톡|카카오톡/.test(st.command||'');
var isC=(st.cat==='call')||(/전화/.test(st.command||'')&&!isK);
var isS=(st.cat==='sms')||(/문자/.test(st.command||'')&&!isK);
if(!_apk2 && (isK||isC||isS)){
var em = isK?{n:'카톡',g:'linear-gradient(135deg,#FEE500,#F9D000)',c:'#3b2f00',tip:'카톡이 열리고 메시지가 복사돼요 · 채팅방에서 입력창을 길게 눌러 붙여넣기 (앱 정책상 특정 방 자동입장·자동전송은 불가)'}
: isS?{n:'문자',g:'linear-gradient(135deg,#34d399,#10b981)',c:'#fff',tip:'문자앱이 열리고 내용이 채워져요 · 보내기만 누르면 돼요'}
: {n:'전화',g:'linear-gradient(135deg,#60a5fa,#3b82f6)',c:'#fff',tip:'전화 앱이 열려요'};
ctrl.innerHTML='<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:11px;padding:13px">'+
        '<div style="font-size:13px;font-weight:800;color:#92400e">💬 '+em.n+' 열기 ('+pos+')</div>'+
        '<div style="font-size:12px;color:#7c2d12;margin:5px 0;word-break:break-all">'+_agentEsc(st.command||'')+'</div>'+
        '<div style="font-size:11px;color:#8a6d2f;margin-bottom:9px;line-height:1.5">브라우저에선 <b>한 번 눌러야</b> 앱이 열려요 (APK에선 자동). '+em.tip+'</div>'+
        '<div style="display:flex;gap:8px">'+
          '<button onclick="agentQueueGo()" style="flex:2;padding:14px;border-radius:11px;border:none;background:'+em.g+';color:'+em.c+';font-weight:800;font-size:15px;cursor:pointer;font-family:inherit">💬 '+em.n+' 열기</button>'+
          '<button onclick="agentQueueSkip()" style="flex:1;padding:14px;border-radius:11px;border:1.5px solid #d1d5db;background:#fff;color:#555;font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">건너뛰기</button>'+
        '</div></div>';
return;
}
ctrl.innerHTML='<div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:11px;padding:12px">'+
      '<div style="font-size:12.5px;font-weight:800;color:#6d28d9">⚡ 자동 실행 중 ('+pos+'): '+_agentEsc(st.title||'')+'</div>'+
      '<div style="display:flex;gap:8px;margin-top:8px">'+
        '<button onclick="agentQueueGo()" style="flex:1;padding:10px;border-radius:10px;border:none;background:#7c3aed;color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">지금 실행</button>'+
        '<button onclick="agentQueuePause()" style="flex:1;padding:10px;border-radius:10px;border:1.5px solid #c4b5fd;background:#fff;color:#6d28d9;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">⏸ 정지</button>'+
      '</div></div>';
_aq.timer=setTimeout(function(){ _agentClearTimers(); agentQueueGo(); }, 1200);
} else {
ctrl.innerHTML='<div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:11px;padding:12px">'+
      '<div style="font-size:12.5px;font-weight:800;color:#6d28d9">다음 단계 ('+pos+'): '+_agentEsc(st.title||'')+'</div>'+
      '<div style="display:flex;gap:8px;margin-top:8px">'+
        '<button onclick="agentQueueGo()" style="flex:1;padding:11px;border-radius:10px;border:none;background:#7c3aed;color:#fff;font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">▶️ 이 단계 실행</button>'+
        '<button onclick="agentQueueSkip()" style="flex:1;padding:11px;border-radius:10px;border:1.5px solid #d1d5db;background:#fff;color:#555;font-weight:800;font-size:13.5px;cursor:pointer;font-family:inherit">⏭️ 건너뛰기</button>'+
      '</div></div>';
}
}
function agentQueueGo(){
if(!_aq) return; _agentClearTimers();
var i=_aq.ptr, st=_aq.steps[i]; if(!st){ agentQueueRun(); return; }
if(_aq.log) _aq.log.push({ title:st.title||('단계 '+(i+1)), command:st.command||'', cat:st.cat||'', o:'done' });
_agentSetStat(i,'done'); _aq.ptr++; _agentSaveActive(); _agentExec(st);
setTimeout(function(){ agentQueueRun(); }, 500);
}
function agentQueueSkip(){ if(!_aq) return; _agentClearTimers(); var i=_aq.ptr, st=_aq.steps[i]||{}; if(_aq.log) _aq.log.push({ title:st.title||('단계 '+(i+1)), command:st.command||'', cat:st.cat||'', o:'skip' }); _agentSetStat(i,'skip'); _aq.ptr++; _agentSaveActive(); agentQueueRun(); }
function agentQueuePause(){ if(!_aq) return; _agentClearTimers(); _aq.auto=false; agentQueueRun(); }
function _agentReport(log){
log=log||[];
var done=0, skip=0, i;
for(i=0;i<log.length;i++){ if(log[i].o==='done') done++; else skip++; }
var rows=log.map(function(x){
return '<div style="display:flex;gap:7px;align-items:flex-start;font-size:12.5px;padding:4px 0;border-top:1px solid #d9f4e6">'+
      '<span>'+(x.o==='done'?'✅':'⏭️')+'</span><div style="flex:1;min-width:0">'+
      '<b style="color:#14532d">'+_agentEsc(x.title)+'</b>'+
      '<div style="color:#4b7a5e;word-break:break-all">'+_agentEsc(x.command)+'</div></div></div>';
}).join('');
return '<div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:13px">'+
    '<div style="font-weight:900;font-size:13.5px;color:#16a34a;margin-bottom:6px">🏁 큐 완료 · 실행 '+done+' · 건너뜀 '+skip+'</div>'+
rows+
    '<div style="display:flex;gap:8px;margin-top:11px">'+
      '<button onclick="saveCurrentAsRoutine()" style="flex:1;padding:10px;border-radius:10px;border:1.5px solid #7c3aed;background:#fff;color:#6d28d9;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">💾 루틴 저장</button>'+
      '<button onclick="agentStartQueue()" style="flex:1;padding:10px;border-radius:10px;border:none;background:#7c3aed;color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">🔁 다시 실행</button>'+
    '</div></div>';
}
function agentRoutines(){ var a=lsG('podoai_agent_routines',[]); return (a&&a.length!==undefined)?a:[]; }
function saveAgentRoutines(a){ lsS('podoai_agent_routines', a||[]); }
function saveCurrentAsRoutine(){
var steps=window._agentSteps||[]; if(!steps.length){ alert('저장할 큐(제안)가 없어요'); return; }
var def=(window._agentReq||'내 루틴'); if(def.length>18) def=def.slice(0,18);
var name=prompt('이 큐를 루틴으로 저장할 이름을 입력하세요', def);
if(name==null) return; name=(name||'').trim()||'내 루틴';
var arr=agentRoutines();
arr.unshift({ id:'rt_'+Date.now().toString(36), name:name, req:(window._agentReq||''), steps:steps, ts:Date.now() });
if(arr.length>30) arr=arr.slice(0,30);
saveAgentRoutines(arr);
alert('루틴 "'+name+'"을 저장했어요 💾\n다음엔 "📁 저장된 루틴"에서 바로 불러올 수 있어요.');
}
function showAgentRoutines(){
var panel=document.getElementById('agent-panel'); if(!panel) return; panel.style.display='block';
var arr=agentRoutines();
var html='<div style="background:#f6f3ff;border:1px solid #e5dcfb;border-radius:14px;padding:13px 14px">'+
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-weight:900;font-size:13px;color:#6d28d9">📁 저장된 루틴</span>'+
    '<button onclick="document.getElementById(\'agent-panel\').style.display=\'none\'" style="margin-left:auto;font-size:12px;color:#9aa;background:none;border:none;cursor:pointer">닫기</button></div>';
if(!arr.length){
html+='<div style="font-size:13px;color:#888;line-height:1.6">저장된 루틴이 없어요.<br>🤖 에이전트팀으로 큐를 만든 뒤 <b>💾 루틴 저장</b>을 누르면 여기에 쌓여요.</div>';
} else {
arr.forEach(function(rt){
html+='<div style="background:#fff;border:1px solid #ece7f7;border-radius:12px;padding:11px 12px;margin-bottom:8px">'+
        '<div style="font-weight:800;font-size:14px;color:#241436">'+_agentEsc(rt.name)+' <span style="font-size:11px;color:#9aa;font-weight:700">'+((rt.steps&&rt.steps.length)||0)+'단계</span></div>'+
(rt.req?'<div style="font-size:11.5px;color:#888;margin-top:2px;word-break:break-all">'+_agentEsc(rt.req)+'</div>':'')+
        '<div style="display:flex;gap:8px;margin-top:9px">'+
          '<button onclick="loadAgentRoutine(\''+rt.id+'\')" style="flex:1;padding:9px;border-radius:9px;border:none;background:#7c3aed;color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">▶️ 불러오기</button>'+
          '<button onclick="toggleRoutinePin(\''+rt.id+'\')" style="padding:9px 12px;border-radius:9px;border:1.5px solid '+(rt.pinned?'#7c3aed':'#e5e7eb')+';background:'+(rt.pinned?'#f5f3ff':'#fff')+';color:'+(rt.pinned?'#6d28d9':'#999')+';font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">'+(rt.pinned?'📌 고정됨':'📌 고정')+'</button>'+
          '<button onclick="deleteAgentRoutine(\''+rt.id+'\')" style="padding:9px 12px;border-radius:9px;border:1.5px solid #e5e7eb;background:#fff;color:#999;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">삭제</button>'+
        '</div></div>';
});
}
html+='</div>';
panel.innerHTML=html;
}
function loadAgentRoutine(id){
var arr=agentRoutines(), rt=null, i;
for(i=0;i<arr.length;i++){ if(arr[i].id===id) rt=arr[i]; }
if(!rt){ return; }
_agentClearActive(); window._agentRestoreDone=true; _aq=null;
var panel=document.getElementById('agent-panel'); if(panel) panel.style.display='block';
renderAgentProposals(rt.req||rt.name, { summary:'저장된 루틴: '+rt.name, steps:(rt.steps||[]), note:'' }, []);
if(panel && panel.scrollIntoView){ setTimeout(function(){ try{ panel.scrollIntoView({block:'start'}); }catch(e){} }, 60); }
}
function deleteAgentRoutine(id){
if(!confirm('이 루틴을 삭제할까요?')) return;
var arr=agentRoutines().filter(function(r){ return r.id!==id; });
saveAgentRoutines(arr); showAgentRoutines(); if(typeof renderAgentPins==='function') renderAgentPins();
}
function toggleRoutinePin(id){
var arr=agentRoutines(), i; for(i=0;i<arr.length;i++){ if(arr[i].id===id){ arr[i].pinned=!arr[i].pinned; } }
saveAgentRoutines(arr); showAgentRoutines(); renderAgentPins();
}
function renderAgentPins(){
var box=document.getElementById('agent-pins'); if(!box) return;
var arr=agentRoutines().filter(function(r){ return r.pinned; });
if(!arr.length){ box.style.display='none'; box.innerHTML=''; return; }
box.style.display='flex';
box.innerHTML='<div style="width:100%;font-size:11px;font-weight:800;color:#8b7bb0;margin-bottom:1px">📌 바로가기 루틴</div>'+
arr.map(function(r){
return '<button onclick="loadAgentRoutine(\''+r.id+'\')" style="flex:0 0 auto;padding:9px 13px;border-radius:20px;border:1.5px solid #c4b5fd;background:#f5f3ff;color:#6d28d9;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">📌 '+_agentEsc(r.name)+'</button>';
}).join('');
}
function voiceOverview(px){
var q=(voiceActQuery||voiceActText||'').trim(); if(!q) return;
var out=document.getElementById(px+'-overview'); if(!out) return;
out.style.display='block';
out.innerHTML='<div style="color:#252a39;font-size:13px">&#128214; AI 개요 불러오는 중...</div>';
function done(text){ out.innerHTML=''; var h=document.createElement('div'); h.style.cssText='font-size:11px;font-weight:800;color:#0a7a96;margin-bottom:6px'; h.textContent='📖 AI 개요'; out.appendChild(h); var b=document.createElement('div'); b.style.cssText='color:#141720;font-size:13px;line-height:1.7;white-space:pre-wrap;word-break:break-word'; b.textContent=text||'정보를 찾지 못했어요'; out.appendChild(b); }
function fail(e){ out.innerHTML=''; var ed=document.createElement('div'); ed.style.cssText='color:#ef4444;font-size:12px'; ed.textContent='⚠️ '+((e&&e.message)||'개요 생성 실패. AI 키 또는 프리미엄이 필요할 수 있어요.'); out.appendChild(ed); }
if(isPremium()){
callAgent(q+' 에 대해 핵심 정보를 알려줘 (무엇인지, 위치·특징, 가볼/이용할 이유). 너무 길지 않게.', function(t){ done(t); }, fail, {search:true, kind:'research', system:'너는 장소·정보 개요 비서야. 한국어로 핵심만 간결히.'});
} else if(hasAIKey()){
callAI({system:'너는 장소·정보 개요 비서야. 한국어로 핵심만 간결히 알려줘.', messages:[{role:'user',content:q+' 에 대해 핵심 정보를 간단히 알려줘 (무엇인지, 위치·특징).'}], maxTokens:500}, function(t){ done(t); }, fail);
} else {
out.innerHTML='<div style="color:#1f2430;font-size:12px;line-height:1.6">AI 개요는 무료(Puter) 또는 키 설정 시 제공돼요.</div>';
}
}
var naviDest='', naviUrl='', naviTimer=null, naviTick=null, naviStarted=false;
function openNavi(dest, url){
naviDest=dest||''; naviUrl=url||''; naviStarted=false;
if(naviTimer){clearTimeout(naviTimer);naviTimer=null;} if(naviTick){clearInterval(naviTick);naviTick=null;}
var t=document.getElementById('navi-title'); if(t) t.textContent=naviDest||'목적지';
var note=document.getElementById('navi-note'); if(note) note.textContent='';
document.getElementById('navi-bg').style.display='flex';
history.pushState({p:true},'','');
naviLoadOverview();
}
function closeNavi(){
if(naviTimer){clearTimeout(naviTimer);naviTimer=null;} if(naviTick){clearInterval(naviTick);naviTick=null;}
naviStarted=true;
document.getElementById('navi-bg').style.display='none'; history.pushState({p:true},'','');
}
function getNaviApp(){ return lsG('podoai_navi_app','gmap'); }
function naviLabel(app){ return app==='tmap'?'티맵':(app==='naver'?'네이버지도':'구글맵'); }
function naviUrlFor(app){
var e=encodeURIComponent(naviDest||'');
if(app==='tmap')  return 'tmap://route?goalname='+e;
if(app==='naver') return 'nmap://search?query='+e+'&appname=podoai';
return 'https://www.google.com/maps/dir/?api=1&destination='+e+'&travelmode=driving';
}
function naviStartWith(app){
if(naviTimer){clearTimeout(naviTimer);naviTimer=null;} if(naviTick){clearInterval(naviTick);naviTick=null;}
naviStarted=true; lsS('podoai_navi_app', app);
var note=document.getElementById('navi-note'); if(note) note.textContent='🧭 '+naviLabel(app)+'(으)로 내비 시작...';
var e=encodeURIComponent(naviDest||'');
if(window.Android && typeof window.Android.openExternal==='function'){ try{ window.Android.openExternal(naviUrlFor(app)); return; }catch(_e){} }
var web = app==='gmap' ? 'https://www.google.com/maps/dir/?api=1&destination='+e+'&travelmode=driving' : 'https://map.naver.com/p/search/'+e;
openUrl(web);
}
function naviStartNow(){ if(naviStarted) return; naviStartWith(getNaviApp()); }
function naviScheduleAutoStart(){
if(naviStarted || naviTimer) return;
var note=document.getElementById('navi-note'); var app=getNaviApp(); var sec=3;
function msg(s){ return s+'초 후 '+naviLabel(app)+' 자동 시작 (아래에서 선택 가능)'; }
if(note) note.textContent=msg(sec);
naviTick=setInterval(function(){ sec--; if(sec>0){ if(note) note.textContent=msg(sec); } }, 1000);
naviTimer=setTimeout(function(){ if(naviTick){clearInterval(naviTick);naviTick=null;} naviTimer=null; naviStartNow(); }, 3000);
}
function naviLoadOverview(){
var out=document.getElementById('navi-overview'); if(out){ out.style.display='none'; }
naviScheduleAutoStart();
}
function voiceAgentDo(px){
var task = voiceActText || ((document.getElementById(px+'-q')||{}).value||'');
task=(task||'').trim(); if(!task) return;
var out=document.getElementById(px+'-agent-out'); if(!out) return;
out.style.display='block';
if(!hasAIKey()){ freeAiNotice(out); return; }
out.innerHTML='<div style="color:#252a39;font-size:13px">&#129302; 알아보고 정리하는 중...</div>';
callAgent(task, function(text){
out.innerHTML='';
var b=document.createElement('div'); b.style.cssText='color:#141720;font-size:14px;line-height:1.7;white-space:pre-wrap;word-break:break-word'; b.textContent=text||'결과 없음'; out.appendChild(b);
appendPaidGuideBtn(out);
}, function(e){
out.innerHTML=''; var ed=document.createElement('div'); ed.style.cssText='color:#ef4444;font-size:13px'; ed.textContent='⚠️ '+((e&&e.message)||'오류'); out.appendChild(ed);
});
}
var briefWeatherText='';
function openBriefing(){
var h=new Date().getHours();
var greet = h<11?'좋은 아침이에요 ☀️':(h<17?'좋은 오후예요':(h<21?'좋은 저녁이에요':'편안한 밤 되세요 🌙'));
var g=document.getElementById('brief-greet'); if(g) g.textContent=greet;
var days=['일','월','화','수','목','금','토']; var n=new Date();
var dt=document.getElementById('brief-date'); if(dt) dt.textContent=(n.getMonth()+1)+'월 '+n.getDate()+'일 ('+days[n.getDay()]+')';
var ai=document.getElementById('brief-ai'); if(ai){ ai.style.display='none'; ai.innerHTML=''; }
renderBriefTodos();
briefFetchWeather();
document.getElementById('briefing-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeBriefing(){ document.getElementById('briefing-bg').style.display='none'; history.pushState({p:true},'',''); }
window.vmLen=15;
function openVideoMaker(){
var ex=document.getElementById('vmaker-bg'); if(ex) ex.remove();
window.vmLen=15; window.vmPurpose='광고';
var bg=document.createElement('div'); bg.id='vmaker-bg';
bg.style.cssText='position:fixed;inset:0;background:#0b0b14;z-index:900;display:flex;flex-direction:column;overflow-y:auto;color:#fff;font-family:inherit';
bg.innerHTML=
    '<div style="padding:16px 16px 6px;display:flex;align-items:center;gap:11px">'+
      '<button onclick="closeVideoMaker()" style="background:rgba(255,255,255,.12);border:none;color:#fff;width:38px;height:38px;border-radius:50%;font-size:18px;cursor:pointer;font-family:inherit">✕</button>'+
      '<div><div style="font-size:19px;font-weight:900">🎬 영상 제작</div><div style="font-size:11.5px;color:#9aa0b4">AI가 프롬프트 완성 → 힉스필드 씨댄스 2.0에서 생성</div></div></div>'+
    '<div style="padding:10px 16px 34px;max-width:460px;width:100%;margin:0 auto;box-sizing:border-box">'+
      '<div style="background:linear-gradient(135deg,#1c1636,#251a48);border:1px solid #3a2f66;border-radius:14px;padding:13px 14px;margin-bottom:18px">'+
        '<div style="font-size:13.5px;font-weight:900;color:#c4b5fd;margin-bottom:6px">✨ 여기서 만들면 뭐가 좋아요?</div>'+
        '<div style="font-size:12px;color:#d2d5e8;line-height:1.75">한마디만 적으면 AI가 <b style="color:#fff">우리 가게·상품에 딱 맞는 촬영감독급 프롬프트</b>로 완성해드려요.<br>'+
          '• 영어·전문용어 몰라도 OK — <b style="color:#fff">한국어</b>로 이해<br>'+
          '• 업종·용도·길이까지 반영한 <b style="color:#fff">맞춤 프롬프트</b><br>'+
          '• 힉스필드에 <b style="color:#fff">붙여넣기만</b> 하면 바로 프로 영상<br>'+
          '<span style="color:#9089b8">힉스필드에서 바로 쓰면 영어 위주라 우리 가게 느낌이 잘 안 살아요. 여기서 다듬어 가면 훨씬 잘 나와요.</span></div>'+
      '</div>'+
      '<div style="font-size:13.5px;color:#c7cbe0;margin-bottom:8px;font-weight:700">① 어떤 영상을 원하세요? <span style="color:#8890a8;font-weight:400">(편하게 한마디로)</span></div>'+
      '<textarea id="vmIdea" placeholder="예: 우리 국밥집 홍보 영상 / 새로 나온 수제청 소개 / 미용실 이벤트 알림" style="width:100%;box-sizing:border-box;min-height:74px;padding:14px;border-radius:14px;border:1.5px solid #2a2a3c;background:#15151f;color:#fff;font-size:15px;font-family:inherit;resize:vertical;line-height:1.5"></textarea>'+
      '<div style="font-size:12.5px;color:#c7cbe0;margin:15px 0 7px;font-weight:700">용도</div>'+
      '<div id="vmPurpose" style="display:flex;flex-wrap:wrap;gap:7px">'+
        '<button class="vm-ex on" data-v="광고" onclick="vmPickPurpose(this)">📢 홍보·광고</button>'+
        '<button class="vm-ex" data-v="SNS릴" onclick="vmPickPurpose(this)">📱 SNS 릴·쇼츠</button>'+
        '<button class="vm-ex" data-v="가게소개" onclick="vmPickPurpose(this)">🏪 가게 소개</button>'+
        '<button class="vm-ex" data-v="제품소개" onclick="vmPickPurpose(this)">🛍️ 제품 소개</button>'+
      '</div>'+
      '<div style="font-size:12.5px;color:#c7cbe0;margin:16px 0 7px;font-weight:700">② 영상 길이</div>'+
      '<div style="display:flex;gap:8px" id="vmLenBox">'+
        '<button class="vm-len on" data-s="15" onclick="vmSetLen(this)">15초</button>'+
        '<button class="vm-len" data-s="20" onclick="vmSetLen(this)">20초</button>'+
        '<button class="vm-len" data-s="30" onclick="vmSetLen(this)">30초</button>'+
      '</div>'+
      '<div style="font-size:11.5px;color:#8890a8;margin-top:8px;line-height:1.6">💡 씨댄스는 한 샷 최대 15초예요. <b>20·30초</b>는 여러 샷을 이어서 만들어요.</div>'+
      '<button id="vmMakeBtn" onclick="vmMakePrompt()" style="width:100%;margin-top:20px;padding:16px;border-radius:14px;border:none;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;font-weight:900;font-size:16px;cursor:pointer;font-family:inherit;box-shadow:0 6px 20px rgba(168,85,247,.35)">✨ AI로 완성 프롬프트 만들기</button>'+
      '<div id="vmResultWrap" style="display:none;margin-top:20px">'+
        '<div style="font-size:12.5px;color:#c7cbe0;margin-bottom:7px;font-weight:700">✅ 완성된 프롬프트 <span style="color:#8890a8;font-weight:400">(수정 가능)</span></div>'+
        '<textarea id="vmPrompt" style="width:100%;box-sizing:border-box;min-height:140px;padding:14px;border-radius:14px;border:1.5px solid #4b3a7a;background:#17131f;color:#fff;font-size:15px;font-family:inherit;resize:vertical;line-height:1.6"></textarea>'+
        '<button onclick="vmGo()" style="width:100%;margin-top:12px;padding:16px;border-radius:14px;border:none;background:linear-gradient(135deg,#7c5cff,#5b3cff);color:#fff;font-weight:900;font-size:16px;cursor:pointer;font-family:inherit;box-shadow:0 6px 20px rgba(124,92,255,.35)">📋 복사하고 🎬 힉스필드에서 만들기 →</button>'+
        '<div style="font-size:11.5px;color:#8890a8;margin-top:13px;line-height:1.7;background:#15151f;border:1px solid #24242f;border-radius:12px;padding:12px">힉스필드에서 → 모델 <b style="color:#c7cbe0">Seedance 2.0</b> 선택 → <b style="color:#c7cbe0">붙여넣기</b> → 길이 설정 → 생성.<br><span style="color:#6b7288">※ 생성·결제는 힉스필드 계정(플랜/크레딧)에서 진행돼요.</span></div>'+
      '</div>'+
    '</div>';
document.body.appendChild(bg);
try{ history.pushState({p:true},'',''); }catch(e){}
}
function closeVideoMaker(){ var b=document.getElementById('vmaker-bg'); if(b) b.remove(); }
function vmPickPurpose(el){ window.vmPurpose=el.getAttribute('data-v')||'광고'; var bs=document.querySelectorAll('#vmPurpose .vm-ex'); for(var i=0;i<bs.length;i++) bs[i].classList.toggle('on', bs[i]===el); }
function vmSetLen(el){
window.vmLen=parseInt(el.getAttribute('data-s'),10)||15;
var bs=document.querySelectorAll('#vmLenBox .vm-len');
for(var i=0;i<bs.length;i++) bs[i].classList.toggle('on', bs[i]===el);
}
function vmMakePrompt(){
var t=document.getElementById('vmIdea'); var idea=t?(t.value||'').trim():'';
if(!idea){ try{ alert('어떤 영상을 원하는지 한마디 적어주세요'); }catch(e){} if(t) t.focus(); return; }
if(typeof hasAIKey==='function' && !hasAIKey()){ try{ alert('AI 프롬프트 만들기는 Claude/Gemini 키가 필요해요 (마이 탭에서 연결)'); }catch(e){} return; }
var len=window.vmLen||15, purpose=window.vmPurpose||'광고';
var btn=document.getElementById('vmMakeBtn'); if(btn){ btn.disabled=true; btn.textContent='✨ 만드는 중…'; }
var sys='너는 한국 소상공인(1인 사장님)을 돕는 영상 프롬프트 감독이야. 사용자의 짧은 아이디어를 AI 영상생성(Seedance 2.0)에 바로 넣을 "완성 프롬프트"로 확장해.\n'+
    '규칙:\n'+
    '- 한국어로, 촬영감독처럼 구체적으로: 피사체·구도·카메라 무빙·조명·색감·분위기·속도.\n'+
    '- 장면이 여러 개면 "→"로 순서대로 연결.\n'+
    '- 용도에 맞게: 광고=시선을 끄는 임팩트, SNS릴=트렌디하고 빠른 컷, 가게소개=따뜻하고 신뢰감, 제품소개=제품이 돋보이게.\n'+
    '- 길이에 맞춰 장면 수 조절(15초≈1~2장면, 30초≈3~4장면).\n'+
    '- 과장·불가능 표현 금지, 실제 촬영 가능한 묘사만.\n'+
    '- 설명·머리말 없이 프롬프트 본문만 출력. 3~5문장 이내.';
var user='아이디어: '+idea+'\n용도: '+purpose+'\n길이: '+len+'초\n\n위 내용을 Seedance 2.0용 완성 프롬프트로 만들어줘.';
callAI({ system:sys, messages:[{role:'user', content:user}], maxTokens:650, noLang:true }, function(txt){
var out=String(txt||'').trim().replace(/^["'\s]+/,'').replace(/["'\s]+$/,'');
var pt=document.getElementById('vmPrompt'); if(pt) pt.value=out;
var w=document.getElementById('vmResultWrap'); if(w){ w.style.display='block'; try{ setTimeout(function(){ w.scrollIntoView({behavior:'smooth',block:'center'}); }, 90); }catch(e){} }
if(btn){ btn.disabled=false; btn.textContent='✨ AI로 다시 만들기'; }
}, function(e){
if(btn){ btn.disabled=false; btn.textContent='✨ AI로 완성 프롬프트 만들기'; }
try{ if(typeof toast==='function') toast('생성 실패: '+((e&&e.message)||'잠시 후 다시')); }catch(x){}
});
}
function vmGo(){
var t=document.getElementById('vmPrompt'); var p=t?(t.value||'').trim():'';
var len=window.vmLen||15;
if(!p){ try{ alert('먼저 프롬프트를 만들어주세요'); }catch(e){} return; }
var full=p+'\n\n(영상 길이 '+len+'초 · 모델: Seedance 2.0)';
try{ navigator.clipboard.writeText(full); }catch(e){}
try{ if(typeof toast==='function') toast('프롬프트 복사됨 · 힉스필드에서 붙여넣기 🎬'); }catch(e){}
if(typeof openUrl==='function') openUrl('https://higgsfield.ai/seedance/2.0');
else location.href='https://higgsfield.ai/seedance/2.0';
}
var AW_PY=null, AW_LOADING=false, AW_FILE=null;
function awLoadPyodide(onReady, onProgress){
if(AW_PY){ onReady(AW_PY); return; }
if(AW_LOADING){ setTimeout(function(){ awLoadPyodide(onReady,onProgress); }, 500); return; }
AW_LOADING=true;
if(onProgress) onProgress('⚙️ 자동화 엔진을 준비하는 중… (처음 한 번, 10~20초)');
var s=document.createElement('script');
s.src='https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
s.onload=function(){
loadPyodide({ indexURL:'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' }).then(function(py){
AW_PY=py; AW_LOADING=false; onReady(py);
}).catch(function(){ AW_LOADING=false; if(onProgress) onProgress('❌ 파이썬 엔진 로드 실패 (인터넷 확인)'); });
};
s.onerror=function(){ AW_LOADING=false; if(onProgress) onProgress('❌ 파이썬 엔진을 못 불러왔어요'); };
document.head.appendChild(s);
}
function openAutoWork(){
var ex=document.getElementById('awork-bg'); if(ex) ex.remove();
var bg=document.createElement('div'); bg.id='awork-bg';
bg.style.cssText='position:fixed;inset:0;background:#0d1117;z-index:900;display:flex;flex-direction:column;overflow-y:auto;color:#fff;font-family:inherit';
bg.innerHTML=
    '<div style="position:sticky;top:0;background:#0d1117;padding:14px 16px 8px;display:flex;align-items:center;gap:11px;z-index:2;border-bottom:1px solid #1e2330">'+
      '<button onclick="closeAutoWork()" style="background:rgba(255,255,255,.12);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;font-family:inherit">✕</button>'+
      '<div style="flex:1"><div style="font-size:18px;font-weight:900">⚙️ AI 업무 자동화</div><div style="font-size:11px;color:#8b94a8">말만 하면 엑셀·데이터를 알아서 정리해요</div></div>'+
      '<label style="display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:#8b94a8;font-weight:700;cursor:pointer"><input type="checkbox" id="aw-adv" onchange="awToggleAdv(this.checked)" style="width:15px;height:15px;accent-color:#3b82f6">고급</label></div>'+
    '<div style="padding:12px 15px 30px;max-width:520px;width:100%;margin:0 auto;box-sizing:border-box">'+
      '<div style="font-size:12.5px;color:#c7cbe0;font-weight:700;margin-bottom:7px">① 파일 올리기 <span style="color:#8b94a8;font-weight:400">(엑셀·CSV · 선택)</span></div>'+
      '<label style="display:block;border:1.5px dashed #2f3646;border-radius:13px;padding:15px;text-align:center;background:#131824;cursor:pointer;font-size:13px;color:#8b94a8">'+
        '<input type="file" id="aw-file" accept=".csv,.xlsx,.xls,.txt,.json" onchange="awPickFile(this)" style="display:none">'+
        '<span id="aw-fname">📂 탭해서 파일 선택 (없어도 괜찮아요)</span></label>'+
      '<div style="font-size:12.5px;color:#c7cbe0;font-weight:700;margin:17px 0 7px">② 무엇을 하고 싶으세요?</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">'+
        '<button class="aw-chip" onclick="awPreset(this)" data-p="올린 파일에서 월별 매출 합계를 내고, 막대그래프로 그려줘">📊 매출 정리</button>'+
        '<button class="aw-chip" onclick="awPreset(this)" data-p="올린 파일에서 품목별 판매량과 매출을 집계해서 많이 팔린 순서대로 표로 보여줘">🏆 베스트셀러</button>'+
        '<button class="aw-chip" onclick="awPreset(this)" data-p="올린 파일의 금액 합계, 부가세(10%), 공급가액을 계산해서 표로 정리해줘">🧾 부가세 계산</button>'+
        '<button class="aw-chip" onclick="awPreset(this)" data-p="올린 파일에서 재고가 부족한 품목(수량 10 이하)을 찾아 발주 목록을 만들어줘">📦 발주 목록</button>'+
        '<button class="aw-chip" onclick="awPreset(this)" data-p="올린 파일을 깔끔하게 정리(빈칸·중복 제거)하고 요약 통계를 보여줘">🧹 데이터 정리</button>'+
      '</div>'+
      '<textarea id="aw-ask" placeholder="예: 매출 엑셀에서 상위 5개 품목만 뽑아서 그래프로 그려줘" style="width:100%;box-sizing:border-box;min-height:80px;padding:13px;border-radius:13px;border:1.5px solid #2a3040;background:#131824;color:#fff;font-size:15px;font-family:inherit;resize:vertical;line-height:1.5"></textarea>'+
      '<button id="aw-run" onclick="awRun()" style="width:100%;margin-top:14px;padding:16px;border-radius:13px;border:none;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;font-weight:900;font-size:16px;cursor:pointer;font-family:inherit;box-shadow:0 6px 20px rgba(59,130,246,.32)">⚙️ 자동으로 처리하기</button>'+
      '<div id="aw-status" style="display:none;margin-top:13px;font-size:12.5px;color:#8b94a8;background:#131824;border:1px solid #232838;border-radius:11px;padding:11px;line-height:1.6"></div>'+
      '<div id="aw-out" style="display:none;margin-top:14px"></div>'+
      '<div id="aw-codewrap" style="display:none;margin-top:14px">'+
        '<div onclick="awToggleCode()" style="font-size:12px;color:#8b94a8;cursor:pointer;font-weight:700">🔧 실행된 코드 보기 ▾</div>'+
        '<pre id="aw-code" style="display:none;margin-top:8px;background:#0a0e16;border:1px solid #232838;border-radius:11px;padding:12px;font-size:11.5px;color:#a5b4cb;overflow-x:auto;line-height:1.5;white-space:pre"></pre>'+
      '</div>'+
      '<div id="aw-ide" style="display:none;margin-top:22px;border-top:1px solid #1e2330;padding-top:16px">'+
        '<div style="font-size:13px;font-weight:800;color:#60a5fa;margin-bottom:7px">🧰 고급 — 파이썬 직접 실행 (IDE)</div>'+
        '<textarea id="aw-ide-code" spellcheck="false" style="width:100%;box-sizing:border-box;min-height:180px;padding:12px;border-radius:11px;border:1.5px solid #2a3040;background:#0a0e16;color:#d6e2f5;font-size:12.5px;font-family:ui-monospace,Menlo,monospace;line-height:1.55;resize:vertical">print("안녕하세요, PodoAI 파이썬 엔진입니다")\nfor i in range(1, 6):\n    print(i, i*i)</textarea>'+
        '<button onclick="awRunIDE()" style="width:100%;margin-top:9px;padding:13px;border-radius:11px;border:none;background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;font-weight:800;font-size:14px;cursor:pointer;font-family:inherit">▶ 코드 실행</button>'+
        '<pre id="aw-ide-out" style="margin-top:9px;background:#0a0e16;border:1px solid #232838;border-radius:11px;padding:12px;font-size:12px;color:#9be89b;min-height:50px;overflow-x:auto;white-space:pre-wrap;line-height:1.5"></pre>'+
      '</div>'+
      '<div style="font-size:10.5px;color:#5b6478;margin-top:18px;line-height:1.6;text-align:center">파이썬이 이 폰 안에서 직접 실행돼요(서버 없음). 파일은 어디에도 올라가지 않아요.</div>'+
    '</div>';
document.body.appendChild(bg);
try{ history.pushState({p:true},'',''); }catch(e){}
}
function closeAutoWork(){ var b=document.getElementById('awork-bg'); if(b) b.remove(); }
function awToggleAdv(on){ var e=document.getElementById('aw-ide'); if(e) e.style.display=on?'block':'none'; if(on) awLoadPyodide(function(){}, awStatus); }
function awToggleCode(){ var c=document.getElementById('aw-code'); if(c) c.style.display=(c.style.display==='none')?'block':'none'; }
function awPreset(el){ var t=document.getElementById('aw-ask'); if(t){ t.value=el.getAttribute('data-p')||''; } var cs=document.querySelectorAll('.aw-chip'); for(var i=0;i<cs.length;i++) cs[i].classList.toggle('on', cs[i]===el); }
function awStatus(msg){ var s=document.getElementById('aw-status'); if(s){ s.style.display='block'; s.innerHTML=msg; } }
function awPickFile(inp){
var f=inp.files&&inp.files[0]; if(!f) return;
var lbl=document.getElementById('aw-fname'); if(lbl) lbl.textContent='📄 '+f.name+' ('+Math.round(f.size/1024)+'KB)';
var r=new FileReader();
if(/\.(xlsx|xls)$/i.test(f.name)){ r.onload=function(){ AW_FILE={name:f.name, bin:new Uint8Array(r.result), kind:'xlsx'}; }; r.readAsArrayBuffer(f); }
else { r.onload=function(){ AW_FILE={name:f.name, text:r.result, kind:'text'}; }; r.readAsText(f, 'utf-8'); }
}
function awRunPy(code, onDone){
awLoadPyodide(function(py){
awStatus('⚙️ 실행 중…');
var pre='import sys, io, json\n_out=io.StringIO()\nsys.stdout=_out\n';
var post='\nsys.stdout=sys.__stdout__\n_out.getvalue()';
py.runPythonAsync(pre+code+post).then(function(res){
onDone(String(res||''), null);
}).catch(function(e){ onDone('', String(e&&e.message||e)); });
}, awStatus);
}
function awRun(){
var ask=(document.getElementById('aw-ask')||{}).value||''; ask=ask.trim();
if(!ask){ try{ alert('무엇을 하고 싶은지 적어주세요'); }catch(e){} return; }
if(typeof hasAIKey==='function' && !hasAIKey()){ try{ alert('AI 자동화는 Claude/Gemini 키가 필요해요 (마이 탭)'); }catch(e){} return; }
var btn=document.getElementById('aw-run'); if(btn){ btn.disabled=true; btn.textContent='⚙️ 처리 중…'; }
var out=document.getElementById('aw-out'); if(out){ out.style.display='none'; out.innerHTML=''; }
awStatus('🧠 AI가 처리 방법을 만드는 중…');
var fileInfo = AW_FILE ? ('파일이 있음: '+AW_FILE.name+' (변수 DATA 에 문자열로 들어있음)') : '파일 없음';
var sys='너는 파이썬 데이터 처리 코드를 만드는 도우미야. 사용자의 한국어 요청을 실행 가능한 파이썬 코드로만 출력해.\n'+
    '환경: Pyodide(브라우저 파이썬). 표준 라이브러리와 csv, json, math, statistics, re 만 사용. pandas·numpy·matplotlib 사용 금지(무거움).\n'+
    '규칙:\n'+
    '- '+fileInfo+'. 파일이 있으면 변수 DATA(문자열)에서 읽어. csv면 csv.reader(io.StringIO(DATA)).\n'+
    '- 결과는 반드시 print()로 사람이 읽기 좋은 한국어 표/요약으로 출력. 표는 텍스트 정렬로.\n'+
    '- 숫자는 천단위 콤마. 합계·비율 등 유용한 통계 포함.\n'+
    '- 그래프 요청이면 텍스트 막대(█)로 그려.\n'+
    '- 설명·마크다운·코드펜스 없이 파이썬 코드만 출력.';
var user='요청: '+ask + (AW_FILE&&AW_FILE.kind==='text' ? ('\n\n파일 앞부분 미리보기:\n'+String(AW_FILE.text).slice(0,600)) : '');
callAI({ system:sys, messages:[{role:'user', content:user}], maxTokens:1400, noLang:true }, function(txt){
var code=String(txt||'').replace(/^```(?:python)?\s*/i,'').replace(/```\s*$/,'').trim();
var cw=document.getElementById('aw-codewrap'); if(cw){ cw.style.display='block'; var ce=document.getElementById('aw-code'); if(ce) ce.textContent=code; }
var prefix='';
if(AW_FILE && AW_FILE.kind==='text'){ prefix='DATA='+JSON.stringify(String(AW_FILE.text))+'\n'; }
else if(AW_FILE && AW_FILE.kind==='xlsx'){ prefix='DATA=""\n'; }
awRunPy(prefix+code, function(res, err){
if(btn){ btn.disabled=false; btn.textContent='⚙️ 자동으로 처리하기'; }
if(err){ awStatus('❌ 실행 오류: '+_agentEsc(err)); return; }
awStatus('✅ 완료!');
var o=document.getElementById('aw-out');
if(o){ o.style.display='block'; o.innerHTML='<div style="background:#131824;border:1px solid #232838;border-radius:13px;padding:14px"><div style="font-size:12.5px;font-weight:800;color:#60a5fa;margin-bottom:8px">📋 결과</div><pre style="font-size:12.5px;color:#dbe4f0;white-space:pre-wrap;line-height:1.6;margin:0;font-family:ui-monospace,Menlo,monospace">'+_agentEsc(res||'(출력 없음)')+'</pre>'+
        '<button onclick="awCopyOut()" style="width:100%;margin-top:11px;padding:11px;border-radius:10px;border:1.5px solid #2f3646;background:#0d1117;color:#c7cbe0;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">📋 결과 복사</button></div>';
window._awOut=res; }
});
}, function(){ if(btn){ btn.disabled=false; btn.textContent='⚙️ 자동으로 처리하기'; } awStatus('❌ AI 응답 실패'); });
}
function awCopyOut(){ try{ navigator.clipboard.writeText(window._awOut||''); toast('결과를 복사했어요 📋'); }catch(e){} }
function awRunIDE(){
var code=(document.getElementById('aw-ide-code')||{}).value||'';
var o=document.getElementById('aw-ide-out'); if(o) o.textContent='⏳ 실행 중…';
awRunPy(code, function(res, err){ if(o) o.textContent = err ? ('❌ '+err) : (res||'(출력 없음)'); });
}
function briefOpenCalendar(){ openUrl('https://calendar.google.com/calendar/u/0/r/day'); }
var COUNTRY_KEY='podoai_country';
var COUNTRIES={
KR:{ flag:'🇰🇷', name:'대한민국', lang:'ko', label:'🇰🇷 한국 주요 뉴스', feeds:[
{ name:'연합뉴스', color:'#0b5bab', url:'https://www.yna.co.kr/rss/news.xml' },
{ name:'SBS',     color:'#00a6e2', url:'https://news.sbs.co.kr/news/headlineRssFeed.do?plink=RSSREADER&cooper=RSSREADER' },
{ name:'경향신문', color:'#d5232f', url:'https://www.khan.co.kr/rss/rssdata/total_news.xml' },
{ name:'한겨레',   color:'#1c6cb5', url:'https://www.hani.co.kr/rss/' },
{ name:'오마이뉴스', color:'#00a4a0', url:'http://rss.ohmynews.com/rss/ohmynews.xml' },
{ name:'머니투데이', color:'#e8471f', url:'https://rss.mt.co.kr/mt_news.xml' },
{ name:'노컷뉴스', color:'#e60012', url:'https://rss.nocutnews.co.kr/Home.xml' }
]},
US:{ flag:'🇺🇸', name:'United States', lang:'en', label:'🇺🇸 US News', feeds:[
{ name:'NPR',      color:'#3a7ec1', url:'https://feeds.npr.org/1001/rss.xml' },
{ name:'CBS News', color:'#0033a0', url:'https://www.cbsnews.com/latest/rss/main' },
{ name:'ABC News', color:'#888', url:'https://abcnews.go.com/abcnews/topstories' },
{ name:'CNBC',     color:'#0d8ce0', url:'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114' }
]},
GB:{ flag:'🇬🇧', name:'United Kingdom', lang:'en', label:'🇬🇧 UK News', feeds:[
{ name:'BBC',      color:'#bb1919', url:'https://feeds.bbci.co.uk/news/rss.xml' },
{ name:'Sky News', color:'#f60', url:'https://feeds.skynews.com/feeds/rss/uk.xml' },
{ name:'Guardian', color:'#4d9bd7', url:'https://www.theguardian.com/uk/rss' }
]},
JP:{ flag:'🇯🇵', name:'日本', lang:'ja', label:'🇯🇵 日本のニュース', feeds:[
{ name:'NHK',      color:'#0075c2', url:'https://www.nhk.or.jp/rss/news/cat0.xml' },
{ name:'共同通信', color:'#c00', url:'https://www.kyodo.co.jp/feed/' }
]},
DE:{ flag:'🇩🇪', name:'Deutschland', lang:'de', label:'🇩🇪 Nachrichten', feeds:[
{ name:'DW', color:'#00a5e6', url:'https://rss.dw.com/rdf/rss-de-all' },
{ name:'Tagesschau', color:'#4b90d4', url:'https://www.tagesschau.de/index~rss2.xml' }
]},
FR:{ flag:'🇫🇷', name:'France', lang:'fr', label:'🇫🇷 Actualités', feeds:[
{ name:'France24', color:'#2b7fd4', url:'https://www.france24.com/fr/rss' },
{ name:'Le Monde', color:'#999', url:'https://www.lemonde.fr/rss/une.xml' }
]},
CN:{ flag:'🇨🇳', name:'中国', lang:'zh', label:'🇨🇳 中文新闻', feeds:[
{ name:'BBC中文', color:'#bb1919', url:'https://feeds.bbci.co.uk/zhongwen/simp/rss.xml' }
]},
TW:{ flag:'🇹🇼', name:'台灣', lang:'zh', label:'🇹🇼 台灣新聞', feeds:[
{ name:'BBC中文', color:'#bb1919', url:'https://feeds.bbci.co.uk/zhongwen/trad/rss.xml' }
]}
};
var WORLD={
KR:['🇰🇷','대한민국','ko'], US:['🇺🇸','United States','en'], GB:['🇬🇧','United Kingdom','en'],
JP:['🇯🇵','日本','ja'], DE:['🇩🇪','Deutschland','de'], FR:['🇫🇷','France','fr'],
CN:['🇨🇳','中国','zh'], TW:['🇹🇼','台灣','zh'], HK:['🇭🇰','香港','zh'],
ES:['🇪🇸','España','es'], MX:['🇲🇽','México','es'], AR:['🇦🇷','Argentina','es'],
CO:['🇨🇴','Colombia','es'], CL:['🇨🇱','Chile','es'], PE:['🇵🇪','Perú','es'],
VE:['🇻🇪','Venezuela','es'], CU:['🇨🇺','Cuba','es'], EC:['🇪🇨','Ecuador','es'],
GT:['🇬🇹','Guatemala','es'], BO:['🇧🇴','Bolivia','es'], UY:['🇺🇾','Uruguay','es'],
PY:['🇵🇾','Paraguay','es'], CR:['🇨🇷','Costa Rica','es'], PA:['🇵🇦','Panamá','es'],
DO:['🇩🇴','Rep. Dominicana','es'], BR:['🇧🇷','Brasil','pt'], PT:['🇵🇹','Portugal','pt'],
IT:['🇮🇹','Italia','it'], NL:['🇳🇱','Nederland','nl'], BE:['🇧🇪','België','nl'],
CH:['🇨🇭','Schweiz','de'], AT:['🇦🇹','Österreich','de'], SE:['🇸🇪','Sverige','sv'],
NO:['🇳🇴','Norge','no'], DK:['🇩🇰','Danmark','da'], FI:['🇫🇮','Suomi','fi'],
IS:['🇮🇸','Ísland','is'], IE:['🇮🇪','Ireland','en'], PL:['🇵🇱','Polska','pl'],
CZ:['🇨🇿','Česko','cs'], SK:['🇸🇰','Slovensko','sk'], HU:['🇭🇺','Magyarország','hu'],
RO:['🇷🇴','România','ro'], BG:['🇧🇬','България','bg'], GR:['🇬🇷','Ελλάδα','el'],
TR:['🇹🇷','Türkiye','tr'], RU:['🇷🇺','Россия','ru'], UA:['🇺🇦','Україна','uk'],
BY:['🇧🇾','Беларусь','ru'], KZ:['🇰🇿','Қазақстан','ru'], RS:['🇷🇸','Srbija','sr'],
HR:['🇭🇷','Hrvatska','hr'], SI:['🇸🇮','Slovenija','sl'], LT:['🇱🇹','Lietuva','lt'],
LV:['🇱🇻','Latvija','lv'], EE:['🇪🇪','Eesti','et'],
IN:['🇮🇳','India','en'], PK:['🇵🇰','Pakistan','en'], BD:['🇧🇩','Bangladesh','bn'],
LK:['🇱🇰','Sri Lanka','en'], NP:['🇳🇵','Nepal','ne'], ID:['🇮🇩','Indonesia','id'],
MY:['🇲🇾','Malaysia','ms'], SG:['🇸🇬','Singapore','en'], TH:['🇹🇭','ไทย','th'],
VN:['🇻🇳','Việt Nam','vi'], PH:['🇵🇭','Philippines','en'], MM:['🇲🇲','Myanmar','en'],
KH:['🇰🇭','Cambodia','en'], LA:['🇱🇦','Laos','en'], MN:['🇲🇳','Mongolia','en'],
AU:['🇦🇺','Australia','en'], NZ:['🇳🇿','New Zealand','en'],
CA:['🇨🇦','Canada','en'], SA:['🇸🇦','السعودية','ar'], AE:['🇦🇪','الإمارات','ar'],
EG:['🇪🇬','مصر','ar'], MA:['🇲🇦','المغرب','ar'], DZ:['🇩🇿','الجزائر','ar'],
TN:['🇹🇳','تونس','ar'], IQ:['🇮🇶','العراق','ar'], JO:['🇯🇴','الأردن','ar'],
LB:['🇱🇧','لبنان','ar'], KW:['🇰🇼','الكويت','ar'], QA:['🇶🇦','قطر','ar'],
BH:['🇧🇭','البحرين','ar'], OM:['🇴🇲','عُمان','ar'], IL:['🇮🇱','ישראל','he'],
IR:['🇮🇷','ایران','fa'], NG:['🇳🇬','Nigeria','en'], KE:['🇰🇪','Kenya','en'],
ZA:['🇿🇦','South Africa','en'], GH:['🇬🇭','Ghana','en'], ET:['🇪🇹','Ethiopia','en'],
TZ:['🇹🇿','Tanzania','en'], UG:['🇺🇬','Uganda','en'], ZW:['🇿🇼','Zimbabwe','en'],
SN:['🇸🇳','Sénégal','fr'], CI:['🇨🇮',"Côte d'Ivoire",'fr'], CM:['🇨🇲','Cameroun','fr'],
CD:['🇨🇩','RD Congo','fr'], LU:['🇱🇺','Luxembourg','fr'], CY:['🇨🇾','Κύπρος','el']
};
function uiLangFor(l){ return (typeof UI_TEXT!=='undefined' && UI_TEXT[l]) ? l : 'en'; }
function countryConf(code){
if(COUNTRIES[code]) return COUNTRIES[code];
var w=WORLD[code]; if(!w) return COUNTRIES.KR;
var flag=w[0], name=w[1], lang=w[2];
var gl=code, hl=lang;
if(code==='CN'){ gl='HK'; hl='zh-HK'; }
else if(code==='TW'){ hl='zh-TW'; }
else if(code==='HK'){ hl='zh-HK'; }
else if(code==='MX'||code==='AR'||code==='CO'||code==='CL'||code==='PE'||code==='VE'||code==='EC'||code==='BO'||code==='UY'||code==='PY'||code==='CR'||code==='PA'||code==='DO'||code==='GT'||code==='CU'){ hl='es-419'; }
var ceid=gl+':'+hl;
var g='https://news.google.com/rss?hl='+encodeURIComponent(hl)+'&gl='+gl+'&ceid='+encodeURIComponent(ceid);
var g2='https://news.google.com/rss?hl=en-US&gl='+gl+'&ceid='+gl+':en';
return { flag:flag, name:name, lang:lang, label:flag+' '+name, google:true,
feeds:[{ name:name, color:'#4285f4', url:g, alt:g2 }] };
}
function detectCountry(){
var tag=(navigator.language||navigator.userLanguage||'ko-KR');
var parts=String(tag).split('-');
var region=(parts[1]||'').toUpperCase();
if(WORLD[region]) return region;
var lang=(parts[0]||'ko').toLowerCase();
for(var k in WORLD){ if(WORLD[k][2]===lang) return k; }
return 'KR';
}
function curCountry(){ var s=lsG(COUNTRY_KEY,'auto'); return (s==='auto'||!WORLD[s])?detectCountry():s; }
function curCountryConf(){ return countryConf(curCountry()); }
function setCountry(code, stayInNews){
lsS(COUNTRY_KEY, code);
var c=countryConf((code==='auto')?detectCountry():code);
if(c && typeof setLang==='function'){ try{ setLang(uiLangFor(c.lang)); }catch(e){} }
try{ renderCountryUI(); }catch(e){}
try{ toast((code==='auto'?'🌐 자동 · ':'')+c.flag+' '+c.name); }catch(e){}
if(!stayInNews){
try{ var nbg=document.getElementById('ainews-bg'); if(nbg) nbg.remove(); }catch(e){}
try{ var ht=document.querySelector('.t-home'); if(ht && typeof switchTab==='function') switchTab('home', ht); }catch(e){}
}
}
function aiNewsFeeds(){ return curCountryConf().feeds; }
function renderCountryUI(){
var sel=document.getElementById('country-sel'); if(!sel) return;
var saved=lsG(COUNTRY_KEY,'auto'), det=detectCountry();
var html='<option value="auto"'+(saved==='auto'?' selected':'')+'>🌐 자동 ('+WORLD[det][0]+' '+WORLD[det][1]+')</option>';
var keys=Object.keys(WORLD).sort(function(a,b){ return WORLD[a][1].localeCompare(WORLD[b][1]); });
keys.forEach(function(k){ html+='<option value="'+k+'"'+(saved===k?' selected':'')+'>'+WORLD[k][0]+' '+WORLD[k][1]+'</option>'; });
sel.innerHTML=html;
}
function aiNewsEmoji(t){
t=String(t||'');
if(/대통령|국회|정치|의원|여당|야당|정부|외교|장관|president|congress|politic|election|minister|parliament/i.test(t)) return '🏛️';
if(/증시|코스피|주가|환율|경제|금리|투자|기업|실적|stock|market|econom|inflation|trade|fed|business/i.test(t)) return '📈';
if(/사건|사고|경찰|검찰|화재|재판|법원|crime|police|court|fire|arrest|killed/i.test(t)) return '🚨';
if(/날씨|기온|태풍|폭염|한파|weather|storm|heat|rain|snow|flood/i.test(t)) return '🌤️';
if(/축구|야구|배구|올림픽|월드컵|스포츠|선수|경기|sport|soccer|football|match|olympic|cricket/i.test(t)) return '⚽';
if(/AI|인공지능|반도체|IT|테크|스마트폰|네이버|카카오|삼성|애플|구글|tech|apple|google|chip|robot|software/i.test(t)) return '💻';
if(/연예|배우|가수|드라마|영화|아이돌|entertain|movie|actor|singer|music|film|celebrity/i.test(t)) return '🎬';
if(/의료|병원|건강|백신|질병|약|health|hospital|vaccine|disease|medical|drug/i.test(t)) return '🏥';
if(/교육|학교|대학|입시|학생|school|university|student|educat/i.test(t)) return '🎓';
if(/전쟁|군|국방|미사일|우크라이나|중동|war|military|missile|ukraine|attack|troops/i.test(t)) return '⚔️';
if(/부동산|아파트|집값|전세|housing|estate|rent|mortgage/i.test(t)) return '🏠';
if(/환경|기후|탄소|에너지|원전|climate|energy|carbon|nuclear|emission/i.test(t)) return '🌱';
return '📰';
}
var AINEWS_BBC=[
{ name:'BBC World', color:'#bb1919', url:'https://feeds.bbci.co.uk/news/world/rss.xml' },
{ name:'BBC Business', color:'#e07b39', url:'https://feeds.bbci.co.uk/news/business/rss.xml' }
];
var AINEWS_PROXIES=[
function(u){ return 'https://api.allorigins.win/raw?url='+encodeURIComponent(u); },
function(u){ return 'https://api.codetabs.com/v1/proxy?quest='+encodeURIComponent(u); },
function(u){ return 'https://corsproxy.io/?url='+encodeURIComponent(u); },
function(u){ return 'https://api.cors.lol/?url='+encodeURIComponent(u); }
];
function aiNewsFetchTimeout(url, ms){
return new Promise(function(res, rej){
var done=false;
var t=setTimeout(function(){ if(!done){ done=true; rej(new Error('timeout')); } }, ms||9000);
fetch(url).then(function(r){ if(done) return; clearTimeout(t); done=true; if(!r.ok) rej(new Error('http')); else res(r.text()); })
.catch(function(e){ if(done) return; clearTimeout(t); done=true; rej(e); });
});
}
function aiNewsPx3(u){ return 'https://api.codetabs.com/v1/proxy/?quest='+encodeURIComponent(u); }
function aiNewsClean(s){
s=String(s||'').replace(/<!\[CDATA\[|\]\]>/g,'');
var ta=document.createElement('textarea'); ta.innerHTML=s; s=ta.value;
return s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
}
function aiNewsNorm(t){ return String(t||'').replace(/[^가-힣a-zA-Z0-9]/g,'').toLowerCase().slice(0,20); }
function aiNewsTime(ts){ if(!ts) return ''; var d=(Date.now()-ts)/60000; if(d<1) return '방금'; if(d<60) return Math.floor(d)+'분 전'; if(d<1440) return Math.floor(d/60)+'시간 전'; return Math.floor(d/1440)+'일 전'; }
function aiNewsParse(xml, feed){
var out=[];
try{
var doc=new DOMParser().parseFromString(xml, 'text/xml');
var nodes=doc.getElementsByTagName('item'); if(!nodes.length) nodes=doc.getElementsByTagName('entry');
for(var i=0;i<nodes.length && i<(feed.url.indexOf("news.google.com")>=0?40:12);i++){
var it=nodes[i];
var g=function(tag){ var e=it.getElementsByTagName(tag)[0]; return e?(e.textContent||''):''; };
var title=aiNewsClean(g('title'));
var link=aiNewsClean(g('link')); if(!link){ var la=it.getElementsByTagName('link')[0]; if(la&&la.getAttribute) link=la.getAttribute('href')||''; }
var summary=aiNewsClean(g('description')||g('summary')||'').slice(0,95);
var ts=Date.parse(g('pubDate')||g('published')||g('updated')||'')||0;
var press=feed.name, color=feed.color;
if(feed.url.indexOf('news.google.com')>=0){
var srcEl=it.getElementsByTagName('source')[0];
if(srcEl && srcEl.textContent) press=aiNewsClean(srcEl.textContent).slice(0,20);
var dash=title.lastIndexOf(' - ');
if(dash>10){ if(press===feed.name) press=title.slice(dash+3).slice(0,20); title=title.slice(0,dash); }
summary='';
}
if(title&&link) out.push({ title:title, link:link, summary:summary, press:press, color:color, ts:ts, emoji:aiNewsEmoji(title+' '+summary) });
}
}catch(e){}
return out;
}
function aiNewsFetchOne(feed){
function tryUrl(u){
var i=0;
function next(){
if(i>=AINEWS_PROXIES.length) return Promise.resolve([]);
var px=AINEWS_PROXIES[i++];
return aiNewsFetchTimeout(px(u), 9000)
.then(function(x){ var arr=aiNewsParse(x, feed); if(!arr.length) throw new Error('empty'); return arr; })
.catch(function(){ return next(); });
}
return next();
}
return tryUrl(feed.url).then(function(arr){
if(arr.length || !feed.alt) return arr;
return tryUrl(feed.alt);
});
}
function aiNewsDedupe(all){
all.sort(function(a,b){ return (b.ts||0)-(a.ts||0); });
var seen={}, out=[];
all.forEach(function(it){ var k=aiNewsNorm(it.title); if(!k) return; if(seen[k]){ seen[k].dups=(seen[k].dups||1)+1; return; } seen[k]=it; it.dups=1; out.push(it); });
return out;
}
function openAINews(force, bbcTried){
var ex=document.getElementById('ainews-bg'); if(ex) ex.remove();
window._aiNewsBBC=false;
var conf=curCountryConf();
var bg=document.createElement('div'); bg.id='ainews-bg';
bg.style.cssText='position:fixed;inset:0;background:#0f1117;z-index:900;display:flex;flex-direction:column;overflow-y:auto;color:#fff;font-family:inherit';
bg.innerHTML=
    '<div style="position:sticky;top:0;background:#0f1117;padding:14px 16px 8px;display:flex;align-items:center;gap:11px;z-index:2;border-bottom:1px solid #1e2230">'+
      '<button onclick="closeAINews()" style="background:rgba(255,255,255,.12);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;font-family:inherit">✕</button>'+
      '<div style="flex:1"><div style="font-size:18px;font-weight:900">🗞️ AI 뉴스</div><div style="font-size:11px;color:#8b94a8" id="ainews-sub">'+conf.label+'</div></div>'+
      '<select onchange="setCountry(this.value,true);openAINews(true)" style="background:#1a1f2b;border:1px solid #2b3244;color:#fff;padding:8px 6px;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;max-width:130px">'+
        '<option value="auto"'+(lsG(COUNTRY_KEY,'auto')==='auto'?' selected':'')+'>🌐 자동</option>'+
Object.keys(WORLD).sort(function(a,b){ return WORLD[a][1].localeCompare(WORLD[b][1]); }).map(function(k){ return '<option value="'+k+'"'+(lsG(COUNTRY_KEY,'auto')===k?' selected':'')+'>'+WORLD[k][0]+' '+WORLD[k][1]+'</option>'; }).join('')+
      '</select>'+
      '<button onclick="openAINews(true)" style="background:rgba(255,255,255,.12);border:none;color:#fff;padding:8px 11px;border-radius:20px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">🔄</button></div>'+
    '<div id="ainews-body" style="padding:12px 14px 30px;max-width:520px;width:100%;margin:0 auto;box-sizing:border-box">'+
      '<div style="text-align:center;padding:50px 0;color:#8b94a8">📰 뉴스를 모으는 중이에요…<br><span style="font-size:11px">'+conf.label+' · 몇 초 걸려요</span></div>'+
    '</div>';
document.body.appendChild(bg);
try{ history.pushState({p:true},'',''); }catch(e){}
var ck='podoai_ainews_'+curCountry(), cache=null;
try{ cache=JSON.parse(localStorage.getItem(ck)||'null'); }catch(e){}
if(!force && cache && cache.items && (Date.now()-cache.ts)<600000){ aiNewsRender(cache.items); return; }
Promise.all(aiNewsFeeds().map(aiNewsFetchOne)).then(function(res){
var all=[]; res.forEach(function(arr){ all=all.concat(arr); });
if(!all.length && conf.google){
return aiNewsFetchOne({ name:'BBC World', color:'#bb1919', url:'https://feeds.bbci.co.uk/news/world/rss.xml' }).then(function(fb){
if(fb.length){ aiNewsRender(fb); var s2=document.getElementById('ainews-sub'); if(s2) s2.textContent=conf.flag+' '+conf.name+' · 🌍 국제 뉴스로 대체'; return; }
aiNewsFail();
});
}
if(!all.length){
if(!bbcTried){
var b0=document.getElementById('ainews-body');
if(b0) b0.innerHTML='<div style="text-align:center;padding:46px 16px;color:#8b94a8;line-height:1.7">🌍 이 나라 뉴스를 못 가져와서<br><b style="color:#c7cbe0">BBC 국제뉴스(영문)</b>로 대신 불러오는 중…</div>';
Promise.all(AINEWS_BBC.map(aiNewsFetchOne)).then(function(r2){
var b2=[]; r2.forEach(function(a){ b2=b2.concat(a); });
if(!b2.length){ aiNewsFail(); return; }
var sub=document.getElementById('ainews-sub');
if(sub) sub.textContent=conf.flag+' '+conf.name+' → 🌍 BBC World (영문 대체)';
window._aiNewsBBC=true;
aiNewsRender(b2);
});
return;
}
aiNewsFail(); return;
}
try{ localStorage.setItem(ck, JSON.stringify({ ts:Date.now(), items:all })); }catch(e){}
aiNewsRender(all);
});
}
function aiNewsFail(){
var b=document.getElementById('ainews-body'); if(!b) return;
b.innerHTML='<div style="text-align:center;padding:46px 16px;color:#8b94a8;line-height:1.7">😥 이 나라 뉴스를 지금 못 가져왔어요.<br><span style="font-size:11.5px">무료 프록시가 불안정하거나, 해당 지역 피드가 없을 수 있어요.</span><br><button onclick="openAINews(true)" style="margin-top:14px;background:#2563eb;border:none;color:#fff;padding:11px 18px;border-radius:12px;font-weight:800;cursor:pointer;font-family:inherit">🔄 다시 시도</button><br><button onclick="setCountry(\'US\',true);openAINews(true)" style="margin-top:9px;background:transparent;border:1.5px solid #2b3244;color:#8b94a8;padding:9px 16px;border-radius:11px;font-weight:700;font-size:12.5px;cursor:pointer;font-family:inherit">🇺🇸 미국 뉴스로 보기</button></div>';
}
function closeAINews(){ var b=document.getElementById('ainews-bg'); if(b) b.remove(); }
function aiNewsCard(it, big){
var dup=(it.dups>1)?'<span style="background:#dc2626;color:#fff;font-size:9px;font-weight:800;padding:1px 6px;border-radius:8px;margin-left:5px">🔴 '+it.dups+'</span>':'';
if(big){
return '<div onclick="openUrl('+JSON.stringify(it.link)+')" style="display:flex;gap:11px;background:#161a24;border:1px solid #232838;border-left:3px solid '+(it.color||'#3b82f6')+';border-radius:13px;padding:13px 12px;cursor:pointer;margin-bottom:9px">'+
      '<div style="font-size:26px;line-height:1;flex-shrink:0;margin-top:1px">'+it.emoji+'</div>'+
      '<div style="flex:1;min-width:0"><div style="font-size:14.5px;font-weight:800;line-height:1.45">'+_agentEsc(it.title)+'</div>'+
(it.summary?'<div style="font-size:11.5px;color:#98a2b6;margin-top:5px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+_agentEsc(it.summary)+'</div>':'')+
      '<div style="font-size:10.5px;color:#8b94a8;margin-top:6px"><span style="color:'+(it.color||'#8b94a8')+';font-weight:800">'+_agentEsc(it.press)+'</span> · '+aiNewsTime(it.ts)+dup+'</div></div></div>';
}
return '<div onclick="openUrl('+JSON.stringify(it.link)+')" style="display:flex;gap:9px;background:#12161f;border:1px solid #1e2330;border-radius:11px;padding:10px;cursor:pointer;margin-bottom:7px">'+
    '<div style="font-size:19px;line-height:1.2;flex-shrink:0">'+it.emoji+'</div>'+
    '<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:700;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+_agentEsc(it.title)+'</div>'+
    '<div style="font-size:10px;color:#7d8698;margin-top:4px">'+aiNewsTime(it.ts)+dup+'</div></div></div>';
}
function aiNewsRender(all){
var body=document.getElementById('ainews-body'); if(!body) return;
window._aiNewsAll=all;
var conf=curCountryConf();
if(window._aiNewsBBC){ conf={ flag:'🌍', name:'BBC World', label:'🌍 BBC World (영문 대체)', google:false, feeds:AINEWS_BBC }; }
var sub=document.getElementById('ainews-sub'); if(sub) sub.textContent=conf.label+' · '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
var deduped=aiNewsDedupe(all.slice());
var top=deduped.slice(0,8);
var html='';
html+='<button onclick="aiNewsSummary()" id="ainews-sumbtn" style="width:100%;margin-bottom:14px;padding:13px;border-radius:13px;border:none;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;font-weight:800;font-size:14px;cursor:pointer;font-family:inherit">✨ AI로 오늘의 핵심만 요약</button>';
html+='<div id="ainews-summary" style="display:none;background:#1a1430;border:1px solid #35275e;border-radius:13px;padding:13px;margin-bottom:16px;font-size:13.5px;line-height:1.75;white-space:pre-wrap"></div>';
html+='<div style="font-size:14px;font-weight:900;margin:2px 0 10px">🔥 오늘의 핵심 이슈 <span style="font-size:11px;color:#8b94a8;font-weight:600">(중복 제거)</span></div>';
html+=top.map(function(it){ return aiNewsCard(it, true); }).join('');
if(!conf.google){
html+='<div style="font-size:14px;font-weight:900;margin:20px 0 10px">🗞️ 언론사별</div>';
conf.feeds.forEach(function(f){
var list=all.filter(function(x){ return x.press===f.name; }).sort(function(a,b){return (b.ts||0)-(a.ts||0);}).slice(0,6);
if(!list.length) return;
html+='<div style="margin:14px 0 8px;font-size:13px;font-weight:800;color:'+f.color+';display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:'+f.color+';display:inline-block"></span>'+f.name+'</div>';
html+=list.map(function(it){ return aiNewsCard(it, false); }).join('');
});
} else {
html+='<div style="font-size:14px;font-weight:900;margin:20px 0 10px">📰 더 많은 뉴스</div>';
html+=deduped.slice(8,30).map(function(it){ return aiNewsCard(it, false); }).join('');
}
html+='<div style="font-size:10.5px;color:#5b6478;margin-top:18px;line-height:1.6;text-align:center">위 국가를 바꾸면 그 나라 뉴스와 앱 언어가 함께 바뀌어요. 카드를 탭하면 원문으로 이동해요.</div>';
body.innerHTML=html;
window._aiNewsTop=top;
}
function aiNewsSummary(){
if(typeof hasAIKey==='function' && !hasAIKey()){ try{ alert('AI 요약은 Claude/Gemini 키가 필요해요 (마이 탭)'); }catch(e){} return; }
var top=window._aiNewsTop||[]; if(!top.length) return;
var btn=document.getElementById('ainews-sumbtn'); if(btn){ btn.disabled=true; btn.textContent='✨ 요약 중…'; }
var heads=top.map(function(it,i){ return (i+1)+'. '+it.title+' ('+it.press+')'; }).join('\n');
var sys='You are a news briefing editor. From the headlines below, extract only the 3-5 most important things to know today. Each line: a relevant emoji + one short sentence. Skip duplicates and gossip, order by importance. No markdown asterisks.';
callAI({ system:sys, messages:[{role:'user', content:heads}], maxTokens:600 }, function(txt){
var box=document.getElementById('ainews-summary'); if(box){ box.style.display='block'; box.textContent=String(txt||'').trim(); }
if(btn){ btn.disabled=false; btn.textContent='✨ 다시 요약'; }
}, function(){ if(btn){ btn.disabled=false; btn.textContent='✨ AI로 오늘의 핵심만 요약'; } try{ toast('요약 실패'); }catch(e){} });
}
function briefAddEvent(){
var inp=document.getElementById('brief-event-input');
var title=inp?(inp.value||'').trim():'';
var pad=function(x){return (x<10?'0':'')+x;};
var n=new Date();
var ymd=n.getFullYear()+pad(n.getMonth()+1)+pad(n.getDate());
var t2=new Date(n.getTime()+86400000);
var ymd2=t2.getFullYear()+pad(t2.getMonth()+1)+pad(t2.getDate());
var url='https://calendar.google.com/calendar/render?action=TEMPLATE&dates='+ymd+'/'+ymd2;
if(title) url+='&text='+encodeURIComponent(title);
openUrl(url);
if(inp) inp.value='';
}
