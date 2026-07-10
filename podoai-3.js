/* PodoAI v4.82 - part 3/3 */
function briefFetchWeather(){
var el=document.getElementById('brief-weather'); if(!el) return;
briefWeatherText='';
if(!navigator.geolocation){ el.textContent='위치 권한이 없어 날씨를 못 불러와요'; return; }
el.textContent='📡 날씨 불러오는 중...';
navigator.geolocation.getCurrentPosition(function(pos){
fetch('https://api.open-meteo.com/v1/forecast?latitude='+pos.coords.latitude+'&longitude='+pos.coords.longitude+'&current=temperature_2m,apparent_temperature,relative_humidity_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FSeoul&forecast_days=1')
.then(function(r){return r.json();}).then(function(d){
var cd=d.current, code=cd.weathercode, icon=WI[code]||'🌤', desc=WC[code]||'';
var t=Math.round(cd.temperature_2m), feels=Math.round(cd.apparent_temperature);
var mx=Math.round(d.daily.temperature_2m_max[0]), mn=Math.round(d.daily.temperature_2m_min[0]);
var pop=(d.daily.precipitation_probability_max&&d.daily.precipitation_probability_max[0]!=null)?d.daily.precipitation_probability_max[0]:null;
briefWeatherText='오늘 날씨: '+desc+' '+t+'도(체감 '+feels+'도), 최고 '+mx+'/최저 '+mn+(pop!=null?(', 강수확률 '+pop+'%'):'');
el.innerHTML='<div style="display:flex;align-items:center;gap:12px"><div style="font-size:34px">'+icon+'</div><div><div style="font-size:18px;font-weight:800;color:#141720">'+t+'° <span style="font-size:13px;color:#1a1d28;font-weight:600">'+desc+'</span></div><div style="font-size:11px;color:#1a1d28;font-weight:600">체감 '+feels+'° · 최고 '+mx+'° / 최저 '+mn+'°'+(pop!=null?(' · 강수 '+pop+'%'):'')+'</div></div></div>';
}).catch(function(){ el.textContent='날씨를 불러오지 못했어요'; });
}, function(){ el.textContent='위치 권한을 허용하면 오늘 날씨를 보여줄게요'; });
}
function getTodos(){ return lsG('podoai_todos',[]); }
function setTodos(a){ lsS('podoai_todos',a); }
function briefAddTodo(){
var inp=document.getElementById('brief-todo-input'); if(!inp) return;
var v=(inp.value||'').trim(); if(!v) return;
var a=getTodos(); a.push({t:v,done:false}); setTodos(a); inp.value=''; renderBriefTodos();
}
function briefToggleTodo(i){ var a=getTodos(); if(a[i]){ a[i].done=!a[i].done; setTodos(a); renderBriefTodos(); } }
function briefDelTodo(i){ var a=getTodos(); a.splice(i,1); setTodos(a); renderBriefTodos(); }
function renderBriefTodos(){
var box=document.getElementById('brief-todos'); if(!box) return;
var a=getTodos(); box.innerHTML='';
if(!a.length){ box.innerHTML='<div style="font-size:12px;color:#1f2430">할 일을 추가해보세요</div>'; return; }
a.forEach(function(it,i){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:9px;padding:6px 0';
var ck=document.createElement('button'); ck.style.cssText='width:20px;height:20px;border-radius:6px;border:1.5px solid '+(it.done?'#22c55e':'rgba(0,0,0,.25)')+';background:'+(it.done?'#22c55e':'transparent')+';color:#16181f;font-size:12px;cursor:pointer;flex-shrink:0;line-height:1'; ck.textContent=it.done?'✓':''; ck.onclick=function(){ briefToggleTodo(i); };
var tx=document.createElement('div'); tx.style.cssText='flex:1;font-size:14px;color:'+(it.done?'#1f2430':'#141720')+(it.done?';text-decoration:line-through':''); tx.textContent=it.t;
var del=document.createElement('button'); del.style.cssText='background:none;border:none;color:#1f2430;font-size:18px;cursor:pointer;line-height:1'; del.textContent='×'; del.onclick=function(){ briefDelTodo(i); };
row.appendChild(ck); row.appendChild(tx); row.appendChild(del); box.appendChild(row);
});
}
function briefGenerate(){
var out=document.getElementById('brief-ai'); if(!out) return;
out.style.display='block';
var todos=getTodos().filter(function(x){return !x.done;}).map(function(x){return x.t;});
var days=['일','월','화','수','목','금','토']; var n=new Date();
var dateStr=(n.getMonth()+1)+'월 '+n.getDate()+'일 ('+days[n.getDay()]+')';
var ctx='오늘은 '+dateStr+'.'+(briefWeatherText?(' '+briefWeatherText+'.'):'')+(todos.length?(' 오늘 할 일: '+todos.join(', ')+'.'):' 등록된 할 일은 없음.');
var btn=document.getElementById('brief-go'); var old=btn.innerHTML; btn.innerHTML='&#9203; 브리핑 작성 중...'; btn.disabled=true;
out.innerHTML='<div style="color:#252a39;font-size:13px">&#129302; 오늘의 브리핑을 준비하는 중...</div>';
function done(text, note){
btn.innerHTML=old; btn.disabled=false; out.innerHTML='';
var b=document.createElement('div'); b.style.cssText='color:#141720;font-size:14px;line-height:1.7;white-space:pre-wrap;word-break:break-word'; b.textContent=text||'브리핑을 만들지 못했어요'; out.appendChild(b);
if(note){ var nt=document.createElement('div'); nt.style.cssText='color:#1f2430;font-size:11px;margin-top:10px'; nt.textContent=note; out.appendChild(nt); }
}
function fail(e){ btn.innerHTML=old; btn.disabled=false; out.innerHTML=''; var ed=document.createElement('div'); ed.style.cssText='color:#ef4444;font-size:13px'; ed.textContent='⚠️ '+((e&&e.message)||'브리핑 생성 실패. AI 키 설정 또는 프리미엄이 필요할 수 있어요.'); out.appendChild(ed); }
if(isPremium()){
var task=ctx+'\n\n위 정보로 오늘 하루 시작 브리핑을 작성해줘. 1) 한 줄 인사 2) 오늘 한국 주요 뉴스 2~3개 요약(웹검색) 3) 날씨·할 일을 고려한 오늘의 포커스 한 줄. 너무 길지 않게.';
callAgent(task, function(text){ done(text); }, fail, {search:true, kind:'research', system:'너는 아침 브리핑 비서야. 한국어로 간결하게, 이모지 적당히.'});
} else {
var sys='너는 아침 브리핑 비서야. 한국어로 간결하게, 이모지 적당히. 실시간 뉴스는 모를 수 있으니 일정·할 일·동기부여 위주로.';
var msg=ctx+'\n\n위 정보로 오늘을 시작하는 짧은 브리핑(인사 + 할 일 정리 + 응원 한 줄)을 작성해줘.';
callAI({system:sys, messages:[{role:'user',content:msg}], maxTokens:600}, function(text){ done(text, '※ 실시간 뉴스·날씨 종합 브리핑은 프리미엄에서 제공돼요.'); }, fail);
}
}
var WORKFLOW_PRESETS={
notice:{label:'공지·홍보', ph:'예) 이번 주말 전메뉴 20% 할인 / 매장명 포도카페 / 토~일', sys:'너는 소상공인 사장님의 카피라이터야. 입력을 바탕으로 고객에게 보낼 공지/홍보 문구를 정중하고 매력적으로 작성해. 일정·혜택·매장명 등 핵심을 빠뜨리지 말고 너무 길지 않게 1~2개 버전으로.'},
booking:{label:'예약확인', ph:'예) 김민수님 6/20 저녁7시 4명 포도식당', sys:'너는 예약 확인 메시지 작성 도우미야. 입력된 예약 정보로 정중한 확인 메시지를 작성해. 날짜·시간·인원·매장명·변경/취소 안내를 포함.'},
review:{label:'리뷰답변', ph:'예) "맛있는데 좀 짰어요" 라는 고객 리뷰', sys:'너는 사장님 대신 고객 리뷰에 답하는 도우미야. 진심 있고 정중하게, 긍정이면 감사·부정이면 사과+개선 약속. 너무 길지 않게.'},
expense:{label:'지출정리', ph:'예) 식자재 12만 임대료 80만 전기세 9만 알바비 60만', sys:'너는 사장님의 지출 정리 도우미야. 입력된 내역을 항목별로 분류하고 합계를 내서 보기 좋게 목록/표로 한국어로 정리해.'},
thanks:{label:'감사인사', ph:'예) 단골 김민수님께 감사 / 다음 방문 시 음료 서비스', sys:'너는 사장님의 감사 메시지 작성 도우미야. 고객에게 따뜻하고 진심 있게 감사를 전하는 문구를 작성해. 과하지 않게, 혜택이 있으면 자연스럽게 안내하고 2~3문장으로.'},
refund:{label:'환불·교환 안내', ph:'예) 사이즈 안 맞는 신발 교환 요청 / 영수증 지참 / 7일 이내', sys:'너는 사장님 대신 환불·교환을 안내하는 도우미야. 정중하고 명확하게 처리 절차·필요 서류(영수증 등)·기간·조건을 안내해. 고객이 기분 상하지 않게 공손한 어조로.'},
delay:{label:'배송 지연 안내', ph:'예) 물량 폭주로 2~3일 지연 / 주문번호 1234 / 사과', sys:'너는 사장님 대신 배송 지연을 안내하는 도우미야. 진심으로 사과하고 지연 사유·예상 도착일·보상(있으면)을 명확히 전해. 신뢰를 잃지 않도록 정중하고 책임감 있게.'},
event:{label:'이벤트 당첨 안내', ph:'예) 인스타 이벤트 당첨 / 스타벅스 기프티콘 / 3일 내 수령', sys:'너는 사장님 대신 이벤트 당첨을 알리는 도우미야. 축하 인사와 함께 경품·수령 방법·기한·문의처를 명확히 안내해. 밝고 정중하게, 사칭 오해가 없도록 매장명을 포함해.'}
};
var workflowPreset='notice';
var workflowResultText='';
function openWorkflow(){
workflowResultText='';
var q=document.getElementById('workflow-q'); if(q) q.value='';
var er=document.getElementById('workflow-err'); if(er) er.style.display='none';
var res=document.getElementById('workflow-result'); if(res){ res.style.display='none'; res.innerHTML=''; }
setWorkflowPreset('notice');
document.getElementById('workflow-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeWorkflow(){ document.getElementById('workflow-bg').style.display='none'; history.pushState({p:true},'',''); }
function setWorkflowPreset(id){
workflowPreset=id;
var p=WORKFLOW_PRESETS[id]||WORKFLOW_PRESETS.notice;
['workflow-q','wfi-q'].forEach(function(qid){ var q=document.getElementById(qid); if(q) q.placeholder=p.ph; });
var chips=document.querySelectorAll('.wf-chip');
for(var i=0;i<chips.length;i++){ chips[i].classList.toggle('on', chips[i].getAttribute('data-wf')===id); }
}
function _runWorkflow(qId, errId, resId, goId){
var t=(document.getElementById(qId).value||'').trim();
var er=document.getElementById(errId);
var res=document.getElementById(resId);
if(!t){ if(er){ er.textContent='⚠️ 내용을 입력해줘'; er.style.display='block'; } return; }
if(er) er.style.display='none';
res.style.display='block';
if(!isPremium() && !hasAIKey()){ freeAiNotice(res); return; }
var preset=WORKFLOW_PRESETS[workflowPreset]||WORKFLOW_PRESETS.notice;
var btn=document.getElementById(goId); var old=btn.innerHTML; btn.innerHTML='&#9203; 작성 중...'; btn.disabled=true;
res.innerHTML='<div style="color:#252a39;font-size:13px">&#9997;&#65039; AI가 작성하는 중...</div>';
function render(text, d){
btn.innerHTML=old; btn.disabled=false; workflowResultText=text||''; res.innerHTML='';
var b=document.createElement('div'); b.style.cssText='color:#141720;font-size:14px;line-height:1.7;white-space:pre-wrap;word-break:break-word'; b.textContent=text||'결과 없음'; res.appendChild(b);
var bar=document.createElement('div'); bar.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-top:12px';
bar.innerHTML='<button onclick="copyWorkflowResult()" style="flex:1;min-width:88px;padding:11px;border-radius:11px;border:1px solid rgba(0,0,0,.3);background:transparent;color:#252a39;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">&#128203; 복사</button>'
+'<button onclick="wfToAlimtalk()" style="flex:1;min-width:88px;padding:11px;border-radius:11px;border:none;background:#FFCD00;color:#3a1d1d;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">&#128172; 알림톡</button>'
+'<button onclick="wfToSMS()" style="flex:1;min-width:88px;padding:11px;border-radius:11px;border:none;background:#03C75A;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">&#128241; 문자</button>';
res.appendChild(bar);
if(d&&d.limit){ var q=document.createElement('div'); q.style.cssText='color:#1f2430;font-size:11px;margin-top:10px;text-align:right'; q.textContent='이번 달 사용 '+(d.used||'?')+' / '+d.limit; res.appendChild(q); }
}
function fail(e){ btn.innerHTML=old; btn.disabled=false; res.innerHTML=''; var ed=document.createElement('div'); ed.style.cssText='color:#ef4444;font-size:13px'; ed.textContent='⚠️ '+((e&&e.message)||'오류'); res.appendChild(ed); }
if(isPremium()){
callAgent(t, function(text,d){ render(text,d); }, fail, {search:false, system:preset.sys, kind:'workflow'});
} else {
callAI({system:preset.sys, messages:[{role:'user',content:t}], maxTokens:1000}, function(text){ render(text, null); }, fail);
}
}
function runWorkflow(){ _runWorkflow('workflow-q','workflow-err','workflow-result','workflow-go'); }
function wfiRun(){ _runWorkflow('wfi-q','wfi-err','wfi-result','wfi-go'); }
function wfiMic(){ sttStart('wfi-q','wfi-mic','&#127908; 말하기','&#9210; 듣는 중...'); }
function copyWorkflowResult(){ if(!workflowResultText) return; if(navigator.clipboard) navigator.clipboard.writeText(workflowResultText).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#22d3ee,#7b61ff)'); }); }
function wfToAlimtalk(){ if(!workflowResultText) return; var _us=document.getElementById('uniscreen-bg'); if(_us) _us.style.display='none'; closeWorkflow(); openKakaoAlimtalk(); setTimeout(function(){ var m=document.getElementById('alimtalk-msg'); if(m) m.value=workflowResultText; },350); }
function wfToSMS(){ if(!workflowResultText) return; var _us=document.getElementById('uniscreen-bg'); if(_us) _us.style.display='none'; closeWorkflow(); openNaverSMS(); setTimeout(function(){ var m=document.getElementById('sms-msg'); if(m) m.value=workflowResultText; },350); }
function openResearch(){
var q=document.getElementById('research-q'); if(q) q.value='';
var er=document.getElementById('research-err'); if(er) er.style.display='none';
var res=document.getElementById('research-result'); if(res){ res.style.display='none'; res.innerHTML=''; }
document.getElementById('research-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeResearch(){ document.getElementById('research-bg').style.display='none'; history.pushState({p:true},'',''); }
function _runResearch(qId, errId, resId, goId){
var t=(document.getElementById(qId).value||'').trim();
var er=document.getElementById(errId);
var res=document.getElementById(resId);
if(!t){ if(er){ er.textContent='⚠️ 무엇을 알아볼지 적어줘'; er.style.display='block'; } return; }
if(er) er.style.display='none';
res.style.display='block';
if(!isPremium() && !hasAIKey()){ freeAiNotice(res); return; }
var btn=document.getElementById(goId); var old=btn.innerHTML; btn.innerHTML='&#9203; 알아보는 중...'; btn.disabled=true;
function render(text, d, note){
btn.innerHTML=old; btn.disabled=false; res.innerHTML='';
var body=document.createElement('div'); body.style.cssText='color:#141720;font-size:14px;line-height:1.7;white-space:pre-wrap;word-break:break-word'; body.textContent=text||'결과가 비어있어요. 다시 시도해줘.'; res.appendChild(body);
if(d && d.limit){ var qd=document.createElement('div'); qd.style.cssText='color:#1f2430;font-size:11px;margin-top:12px;text-align:right'; qd.textContent='이번 달 사용 '+(d.used||'?')+' / '+d.limit; res.appendChild(qd); }
if(note){ var nt=document.createElement('div'); nt.style.cssText='color:#1f2430;font-size:11px;margin-top:10px;line-height:1.5'; nt.textContent=note; res.appendChild(nt); }
}
function fail(e){ btn.innerHTML=old; btn.disabled=false; res.innerHTML=''; var ed=document.createElement('div'); ed.style.cssText='color:#ef4444;font-size:13px;line-height:1.6'; ed.textContent='⚠️ '+((e&&e.message)||'오류가 났어. 잠시 후 다시 시도해줘.'); res.appendChild(ed); }
if(isPremium()){
res.innerHTML='<div style="color:#252a39;font-size:13px;line-height:1.6">&#128270; 웹을 검색하고 정리하는 중이에요... (최대 30초)</div>';
callAgent(t, function(text,d){ render(text,d); }, fail, {search:true, kind:'research'});
} else {
res.innerHTML='<div style="color:#252a39;font-size:13px;line-height:1.6">&#128270; 정리하는 중이에요...</div>';
callAI({system:'너는 리서치·비교 비서야. 한국어로 핵심만 간결히 정리하고 마지막에 한 줄 추천을 제시해. 실시간 웹검색은 못하니 일반 지식 기준으로 답해.', messages:[{role:'user',content:t}], maxTokens:900}, function(text){ render(text, null, '※ 무료는 실시간 웹검색 없이 AI 지식 기반이에요.'); appendPaidGuideBtn(res); }, fail);
}
}
function runResearch(){ _runResearch('research-q','research-err','research-result','research-go'); }
function rsRun(){ _runResearch('rs-q','rs-err','rs-result','rs-go'); }
function rsMic(){ sttStart('rs-q','rs-mic','&#127908; 말하기','&#9210; 듣는 중...'); }
function freeAiNotice(res){
res.innerHTML='<div style="color:#141720;font-weight:700;margin-bottom:8px">&#9889; 무료로 사용하기</div>'
+'<div style="color:#252a39;font-size:13px;line-height:1.6">키 없이 무료로 쓰려면 Puter(무료 로그인)를 켜거나, 마이 탭에서 무료 Gemini 키를 넣어주세요. 켠 뒤 다시 실행을 눌러주세요.</div>'
+'<button onclick="enablePuterFree()" style="width:100%;margin-top:12px;padding:13px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#0891b2);color:#06222b;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit">&#9889; Puter 무료로 켜기</button>'
+'<button onclick="var b=document.querySelector(\'.t-my\'); if(b) b.click();" style="width:100%;margin-top:8px;padding:11px;border-radius:12px;border:1px solid rgba(0,0,0,.32);background:transparent;color:#252a39;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">무료 Gemini 키 입력하러 가기</button>';
}
function noKeyInto(wrapId, resId){
var w=document.getElementById(wrapId); if(w) w.style.display='block';
var r=document.getElementById(resId); if(!r) return;
freeAiNotice(r);
var note=document.createElement('div'); note.style.cssText='color:#1f2430;font-size:11px;margin-top:10px;line-height:1.6';
note.textContent='💎 더 강력하게(고품질)는 본인 유료 키 — 요금은 본인 부담이에요.';
r.appendChild(note);
}
function hasVisionKey(){ return !!geminiKey || !!apiKey; }
function visionGuideInto(wrapId, resId){
var w=document.getElementById(wrapId); if(w) w.style.display='block';
var r=document.getElementById(resId); if(!r) return;
r.innerHTML='<div style="color:#141720;font-weight:700;margin-bottom:8px">&#128247; 이미지 분석 켜기</div>'
+'<div style="color:#252a39;font-size:13px;line-height:1.7">이미지 분석은 <b>무료 Gemini 키</b>로 쓸 수 있어요. (키리스 Puter는 이미지 분석을 지원하지 않아요.) 마이 탭에서 무료 키를 넣어주세요.<br>&#128142; 더 정확하게는 본인 <b>Claude 유료 키</b> — 요금은 본인 부담이에요.</div>'
+'<button onclick="var b=document.querySelector(\'.t-my\'); if(b) b.click();" style="width:100%;margin-top:12px;padding:13px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#7b61ff);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit">마이 탭에서 키 넣기</button>';
}
function copyHostedUrl(){
var u=lsG('podoai_hosted_url','');
if(u && navigator.clipboard){ navigator.clipboard.writeText(u); showToast('📋 주소 복사됨','linear-gradient(135deg,#22d3ee,#0891b2)'); }
}
function publishToPuter(){
var box=document.getElementById('puter-host-result');
function setBox(html){ if(box){ box.style.display='block'; box.innerHTML=html; } }
if(typeof puter==='undefined' || !puter.hosting || !puter.fs){
setBox('<div style="color:#ef4444;font-size:13px">⚠️ Puter를 불러오지 못했어요. 인터넷 연결을 확인하거나, 이 파일을 https 주소로 열어주세요.</div>');
return;
}
setBox('<div style="color:#252a39;font-size:13px">⏳ Puter 로그인 확인 중...</div>');
function ensureSignIn(){
return new Promise(function(res,rej){
try{
if(puter.auth && puter.auth.isSignedIn && puter.auth.isSignedIn()) return res();
if(puter.auth && puter.auth.signIn){ puter.auth.signIn().then(function(){res();}).catch(function(e){rej(e);}); }
else res();
}catch(e){ res(); }
});
}
function getHtml(){
return fetch(location.href).then(function(r){ return r.text(); }).catch(function(){
return '<!DOCTYPE html>\n'+document.documentElement.outerHTML;
});
}
ensureSignIn().then(function(){
setBox('<div style="color:#252a39;font-size:13px">⏳ 앱을 Puter에 올리는 중... (10~30초)</div>');
return getHtml();
}).then(function(html){
var dir = puter.randName();
return puter.fs.mkdir(dir)
.then(function(){ return puter.fs.write(dir+'/index.html', html); })
.then(function(){ return puter.hosting.create(puter.randName(), dir); });
}).then(function(site){
var url = 'https://'+site.subdomain+'.puter.site';
lsS('podoai_hosted_url', url);
setBox(
      '<div style="color:#22c55e;font-weight:800;font-size:14px;margin-bottom:8px">✅ 웹주소 생성 완료!</div>'
+'<div style="background:#f4f6fb;border:1px solid rgba(34,211,238,.3);border-radius:10px;padding:11px;color:#0a7a96;font-size:13px;word-break:break-all;margin-bottom:10px">'+url+'</div>'
+'<div style="display:flex;gap:8px">'
+'<button onclick="copyHostedUrl()" style="flex:1;padding:11px;border-radius:10px;border:1px solid rgba(0,0,0,.32);background:transparent;color:#252a39;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">📋 주소 복사</button>'
+'<a href="'+url+'" target="_blank" rel="noopener" style="flex:1;text-align:center;padding:11px;border-radius:10px;border:none;background:linear-gradient(135deg,#22d3ee,#22c55e);color:#06222b;font-size:13px;font-weight:800;text-decoration:none;font-family:inherit">🌐 지금 열기</a>'
+'</div>'
+'<div style="color:#1f2430;font-size:11px;margin-top:10px;line-height:1.7">① 이 주소를 크롬에서 열기 → ② 메뉴 → "홈 화면에 추가"로 앱처럼 사용. <b style="color:#1f2430">이 주소에선 Puter 로그인·Gemini·번역이 모두 정상 작동</b>해요.</div>'
);
showToast('✅ Puter 웹주소 생성 완료!','linear-gradient(135deg,#22d3ee,#22c55e)');
}).catch(function(e){
setBox('<div style="color:#ef4444;font-size:13px;line-height:1.6">⚠️ 실패: '+((e&&e.message)||'다시 시도해줘')+'<br><span style="color:#1f2430;font-size:11px">로그인 창이 막히면, 잠시 후 다시 눌러주세요.</span></div>');
});
}
function enablePuterFree(){
aiModel='puter'; lsS('podoai_model','puter');
if(typeof updateMyStatus==='function') updateMyStatus();
if(typeof puter!=='undefined' && puter.auth){
try{
var signed = puter.auth.isSignedIn && puter.auth.isSignedIn();
if(signed){
showToast('⚡ Puter 무료 모드 켜짐 — 바로 사용하세요','linear-gradient(135deg,#22d3ee,#0891b2)');
} else {
showToast('Puter 로그인 창을 여는 중...','rgba(0,0,0,.85)');
puter.auth.signIn().then(function(){
showToast('✅ Puter 로그인 완료 — 무료로 사용하세요','linear-gradient(135deg,#22d3ee,#22c55e)');
if(typeof updateMyStatus==='function') updateMyStatus();
if(typeof i18nRender==='function'){ try{ i18nRender(); }catch(e){} }
}).catch(function(){
showToast('로그인이 취소됐어요. 무료 Gemini 키로도 쓸 수 있어요 (마이 탭)','rgba(0,0,0,.85)');
});
}
}catch(e){
showToast('⚡ Puter 켜짐 — 첫 실행 시 로그인 창이 떠요','linear-gradient(135deg,#22d3ee,#0891b2)');
}
} else {
showToast('Puter를 불러오지 못했어요. 무료 Gemini 키를 써보세요 (마이 탭)','rgba(0,0,0,.85)');
}
}
function paidGuideHtml(){
return '<div style="background:#f2f4fa;border:1px solid rgba(123,97,255,.25);border-radius:12px;padding:14px">'
+'<div style="color:#6645dd;font-weight:800;font-size:13px;margin-bottom:8px">&#128142; 더 강력하게 — 비용은 사용자 부담</div>'
+'<div style="color:#252a39;font-size:12px;line-height:1.8">무료(Puter·무료 Gemini 키)로도 쓸 수 있어요. 웹검색·최신정보·고품질이 필요하면 아래 중 하나로 직접 켜세요. <b>요금은 본인 계정에 부과</b>돼요.<br>'
+'· <b>본인 유료 API 키</b> 입력 (Claude/Gemini 유료) — 마이 탭<br>'
+'· <b>Puter 유료</b> 업그레이드 (키 없이 더 많은 사용량)</div>'
+'<button onclick="var b=document.querySelector(\'.t-my\'); if(b) b.click();" style="width:100%;margin-top:10px;padding:11px;border-radius:10px;border:none;background:linear-gradient(135deg,#22d3ee,#7b61ff);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">설정하러 가기</button>'
+'</div>';
}
function appendPaidGuideBtn(container){
return;
if(!container) return;
var btn=document.createElement('button');
btn.style.cssText='width:100%;margin-top:10px;padding:11px;border-radius:11px;border:1px solid rgba(123,97,255,.4);background:rgba(123,97,255,.1);color:#6645dd;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit';
btn.textContent='💎 웹검색·최신정보로 더 강력하게 (유료 안내)';
var guide=document.createElement('div'); guide.style.cssText='margin-top:10px;display:none';
btn.onclick=function(){ if(guide.style.display==='none'){ guide.innerHTML=paidGuideHtml(); guide.style.display='block'; } else { guide.style.display='none'; } };
container.appendChild(btn); container.appendChild(guide);
}
function ruleRoute(text){
var t=(text||'').trim(); if(!t) return null;
var best=null, bestLen=0;
for(var i=0;i<ROUTES.length;i++){
var r=ROUTES[i]; var trig=(r.hint||'').split('(')[0].split('/');
for(var j=0;j<trig.length;j++){ var kw=trig[j].trim(); if(kw.length<2) continue; if(t.indexOf(kw)>=0 && kw.length>bestLen){ best=r; bestLen=kw.length; } }
}
if(!best) return null;
var q=t; (best.hint||'').split('(')[0].split('/').forEach(function(kw){ kw=kw.trim(); if(kw) q=q.split(kw).join(' '); });
['찾아서','찾아줘','찾아','알려줘','검색해줘','보여줘','틀어줘','해줘','좀'].forEach(function(w){ q=q.split(w).join(' '); });
q=q.replace(/\s+/g,' ').trim();
return { id:best.id, q:q };
}
function goPremium(){ ['research-bg','workflow-bg'].forEach(function(id){ var e=document.getElementById(id); if(e) e.style.display='none'; }); var b=document.querySelector('.t-my'); if(b) b.click(); }
function openCompanion(){
window.PODO_PERSONA=COMPANION_PROMPT;
var pref=null; try{ pref=localStorage.getItem('podoai_tts'); }catch(e){}
window.PODO_TTS=(pref!=='0');
window.PODO_TTS_LANG='ko';
switchTab('chat', document.querySelector('.t-chat'));
clearChat();
setChatHeaderName(COMPANION_NAME,'💜 컴패니언 모드');
updateTTSBtn();
addMsg('ai','안녕! 나 포도야 🍇 오늘 하루 어땠어? 무슨 얘기든 편하게 해도 돼.');
}
function openNormalChat(el){
window.PODO_PERSONA=null;
window.PODO_TTS=false;
window.PODO_TTS_LANG='ko';
if(ttsSupported()) window.speechSynthesis.cancel();
setChatHeaderName('PodoAI','🟢 온라인');
updateTTSBtn();
switchTab('chat', el);
}
function ttsSupported(){ return ('speechSynthesis' in window) && (typeof SpeechSynthesisUtterance!=='undefined'); }
function updateTTSBtn(){
var b=document.getElementById('tts-btn'); if(!b) return;
b.innerHTML = window.PODO_TTS ? '&#128266;' : '&#128263;';
b.style.color = window.PODO_TTS ? '#a855f7' : '#1f2430';
b.style.borderColor = window.PODO_TTS ? 'rgba(168,85,247,.4)' : 'rgba(0,0,0,.26)';
}
function toggleTTS(){
if(!ttsSupported()){ showToast('이 기기는 음성 읽기를 지원하지 않아요','rgba(0,0,0,.85)'); return; }
window.PODO_TTS = !window.PODO_TTS;
try{ localStorage.setItem('podoai_tts', window.PODO_TTS?'1':'0'); }catch(e){}
if(!window.PODO_TTS) window.speechSynthesis.cancel();
updateTTSBtn();
showToast(window.PODO_TTS?'🔊 음성 읽기 켬':'🔇 음성 읽기 끔','linear-gradient(135deg,#a855f7,#7c3aed)');
}
function speak(text){
if(!window.PODO_TTS || !ttsSupported() || !text) return;
try{
var lang=(window.PODO_TTS_LANG==='en')?'en':'ko';
var clean=String(text)
.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}]/gu,'')
.replace(/[#*_`>~]/g,'');
if(lang==='en'){ clean=clean.replace(/\([^)]*[가-힣][^)]*\)/g,''); }
clean=clean.replace(/\s+/g,' ').trim();
if(!clean) return;
window.speechSynthesis.cancel();
var u=new SpeechSynthesisUtterance(clean);
u.lang=(lang==='en')?'en-US':'ko-KR'; u.rate=(lang==='en')?0.95:1.0; u.pitch=1.05;
var vs=window.speechSynthesis.getVoices()||[];
for(var i=0;i<vs.length;i++){ if(vs[i].lang && vs[i].lang.toLowerCase().indexOf(lang)===0){ u.voice=vs[i]; break; } }
window.speechSynthesis.speak(u);
}catch(e){}
}
var studySubject='수학', studyImgB64=null, studyImgMime='';
function openStudy(){
studyImgB64=null; studyImgMime='';
var pw=document.getElementById('study-preview-wrap'); if(pw) pw.style.display='none';
var ua=document.getElementById('study-upload'); if(ua) ua.style.display='block';
var rw=document.getElementById('study-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('study-err'); if(er) er.style.display='none';
var fi=document.getElementById('study-file'); if(fi) fi.value='';
document.getElementById('study-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeStudy(){ document.getElementById('study-bg').style.display='none'; history.pushState({p:true},'',''); }
function selStudy(el,v){ studySubject=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function onStudyImage(e){
var f=e.target.files[0]; if(!f) return;
var r=new FileReader();
r.onload=function(ev){
studyImgB64=ev.target.result.split(',')[1]; studyImgMime=f.type||'image/jpeg';
document.getElementById('study-preview').src=ev.target.result;
document.getElementById('study-preview-wrap').style.display='block';
document.getElementById('study-upload').style.display='none';
};
r.readAsDataURL(f);
}
function clearStudyImage(){
studyImgB64=null; studyImgMime='';
document.getElementById('study-preview-wrap').style.display='none';
document.getElementById('study-upload').style.display='block';
var fi=document.getElementById('study-file'); if(fi) fi.value='';
}
function studySystem(){
if(studySubject==='요약') return '너는 학습 도우미야. 주어진 내용을 한국어로 핵심만 알기 쉽게 요약하고 중요한 포인트를 정리해줘.';
return '너는 친절한 '+studySubject+' 과외 선생님이야. 학생이 이해할 수 있게 한국어로 단계별로 풀이/설명해줘. 정답만 주지 말고 풀이 과정과 왜 그런지, 핵심 개념을 짚어줘. 필요하면 쉬운 예시도 들어줘.';
}
function studyErr(msg){ var e=document.getElementById('study-err'); if(e){ e.textContent='⚠️ '+msg; e.style.display='block'; } }
function showStudyResult(txt){
document.getElementById('study-result').textContent=txt;
document.getElementById('study-result-wrap').style.display='block';
}
function copyStudy(){
var t=document.getElementById('study-result').textContent;
if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#22c55e,#0ea5e9)'); });
}
function runStudy(){
var q=(document.getElementById('study-q').value||'').trim();
if(!q && !studyImgB64){ studyErr('질문을 적거나 문제 사진을 올려줘'); return; }
if(!hasAIKey()){ studyErr(getNoKeyMsg().replace(/\n/g,' ')); return; }
var btn=document.getElementById('study-go'); var old=btn.textContent; btn.textContent='⏳ 풀이 중...'; btn.disabled=true;
var er=document.getElementById('study-err'); if(er) er.style.display='none';
function done(txt){ btn.textContent=old; btn.disabled=false; showStudyResult(txt||'(응답이 비어 있어요)'); }
function fail(e){ btn.textContent=old; btn.disabled=false; studyErr((e&&e.message)||'오류가 발생했어요'); }
if(studyImgB64){
var prompt=(q?('[질문] '+q+'\n\n'):'')+'위 사진 속 문제/내용을 풀이하고 설명해줘.';
studyVision(studySystem()+'\n\n'+prompt, studyImgB64, studyImgMime, done, fail);
} else {
callAI({ system:studySystem(), messages:[{role:'user',content:q}], maxTokens:1200 }, done, fail);
}
}
function studyVision(prompt, b64, mime, onOk, onErr, skipLang){
if(!skipLang){ var _vs=_aiLangSuffix(); if(_vs) prompt=(prompt||'')+_vs; }
var VISION_GUIDE='이미지 분석은 무료 Gemini 키로 쓸 수 있어요. 마이 탭에서 무료 키를 넣어주세요. (더 정확하게는 본인 Claude 유료 키 — 요금은 본인 부담)';
var useGemini = !!geminiKey && (aiModel==='gemini' || !apiKey);
if(useGemini){
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+geminiKey,{
method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({contents:[{role:'user',parts:[{inline_data:{mime_type:mime,data:b64}},{text:prompt}]}],generationConfig:{maxOutputTokens:1200}})
}).then(function(r){return r.json();}).then(function(d){
if(d.error) throw new Error(d.error.message);
var t=''; try{t=d.candidates[0].content.parts.map(function(p){return p.text||'';}).join('');}catch(e){}
onOk(t.trim());
}).catch(onErr);
} else if(apiKey){
fetch('https://api.anthropic.com/v1/messages',{
method:'POST',
headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1200,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:mime,data:b64}},{type:'text',text:prompt}]}]})
}).then(function(r){return r.json();}).then(function(d){
if(d.error) throw new Error(d.error.message);
var t=(d.content||[]).map(function(b){return b.text||'';}).join('').trim();
onOk(t);
}).catch(onErr);
} else {
onErr(new Error(VISION_GUIDE));
}
}
function makeLauncher(){
var d=document.createElement('div'); d.className='lcard';
var h=document.createElement('div'); h.className='lhead';
var tr=document.createElement('div'); tr.className='ltrow';
tr.innerHTML='<span class="lttxt">ALL SERVICES</span>'
+'<span class="ltcnt" style="font-size:9px;font-weight:800;letter-spacing:1.5px;background:linear-gradient(90deg,#ff6b9d,#f59e0b,#00e5ff,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">'
+(actCat==='전체'?'PODOAI SERVICES':actCat)+' </span>';
h.appendChild(tr);
var tabs=document.createElement('div'); tabs.className='ctabs';
var allCats=['전체','AI뉴스','AI업무자동화'].concat(CATS);
for(var ci=0;ci<allCats.length;ci++){
(function(cat){
var b=document.createElement('button');
if(cat==='AI뉴스'){
b.className='ctab ctab-news';
b.innerHTML='🗞️ AI뉴스';
b.onclick=function(){ try{ openAINews(); }catch(e){} };
tabs.appendChild(b); return;
}
if(cat==='AI업무자동화'){
b.className='ctab ctab-auto';
b.innerHTML='⚙️ AI업무자동화';
b.onclick=function(){ try{ openAutoWork(); }catch(e){} };
tabs.appendChild(b); return;
}
b.className='ctab'+(cat===actCat?' on':'');
b.textContent=(cat==='전체'?'TALK':cat);
b.onclick=function(){
actCat=cat;
var ci2=CAT_PAGES.indexOf(cat);
if(ci2>=0) swipeIdx=ci2;
var nl=makeLauncher(); d.replaceWith(nl);
setTimeout(function(){
var onTab=document.querySelector('.ctab.on');
if(onTab) onTab.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
},50);
};
tabs.appendChild(b);
})(allCats[ci]);
}
h.appendChild(tabs); d.appendChild(h);
var MORE_IDS=[];
function makeBtn(svc, size){
var b=document.createElement('button'); b.className='abtn';
b.dataset.id=svc.id;
b._svc=svc;
b.setAttribute('draggable','true');
b.onclick=function(){
if(window._podoMenuTs && Date.now()-window._podoMenuTs<600) return;
var a=svc._action||'';
if(a==='open_app'){ launchExternalApp(svc); return; }
if(a==='kakao_alimtalk'){ openKakaoAlimtalk(); return; }
if(a==='naver_sms'){ openNaverSMS(); return; }
if(a==='open_navermap'){ openMapSearch('naver'); return; }
if(a==='open_kakaomap'){ openMapSearch('kakao'); return; }
if(a==='open_gcal'){ connectGoogleCal(); return; }
if(a==='open_kcal'){ connectKakaoCal(); return; }
if(a==='open_kis'){ openSheet(svc); return; }
if(a==='open_youtube'){ openYoutubeSearch(); return; }
if(a==='open_gmail'){ openGmailSheet(); return; }
if(a==='open_kweather'){ openKWeather(); return; }
if(a==='open_nshop'){ openNShop(); return; }
if(a==='open_upbit'){ openUpbit(); return; }
if(a==='open_gdocs'){ openGDocs(); return; }
if(a==='open_gsheets'){ openGSheets(); return; }
if(svc.direct){ openUrl(svc.h); }
else { openSheet(svc); }
};
var sz=size||52;
var iconId=svc.id;
if(svc.id==='navermap') iconId='navermap_more';
if(svc.id==='kakaomap') iconId='kakaomap_more';
var ic=document.createElement('div'); ic.className='aic';
if(ICONS[iconId]){
var img=document.createElement('img');
img.src=ICONS[iconId]; img.alt=svc.n;
img.style.cssText='width:'+sz+'px;height:'+sz+'px;display:block;border-radius:'+Math.round(sz*0.28)+'px;flex-shrink:0;';
ic.appendChild(img);
} else {
var fb=document.createElement('div');
fb.style.cssText='width:'+sz+'px;height:'+sz+'px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#16181f;border-radius:'+Math.round(sz*0.28)+'px;background:'+svc.c+';flex-shrink:0;';
fb.textContent=svc.n.slice(0,2);
ic.appendChild(fb);
}
b.appendChild(ic);
var lb=document.createElement('div'); lb.className='alb'; lb.textContent=svc.n;
b.appendChild(lb);
return b;
}
var SERVICES_ORDER_KEY='podoai_services_order';
var FEATURES_ORDER_KEY='podoai_feat_order';
var ALLAPP_ORDER_KEY='podoai_allapp_order';
function applyOrder(grid, storageKey){
var saved=lsG(storageKey,[]);
if(!saved||!saved.length) return;
var btns=Array.from(grid.querySelectorAll('.abtn'));
var btnMap={};
btns.forEach(function(b){ btnMap[b.dataset.id]=b; });
saved.forEach(function(id){ if(btnMap[id]) grid.appendChild(btnMap[id]); });
}
function enableDrag(grid, storageKey){
var canReorder = !!storageKey;
var dragSrcBtn=null, dragOver=null, saveBtn=null;
if(canReorder){
saveBtn=document.createElement('button');
saveBtn.style.cssText='width:calc(100% - 28px);margin:6px 14px 0;padding:10px;border-radius:12px;border:1.5px solid rgba(0,229,255,.3);background:rgba(0,229,255,.07);color:#08819f;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:none';
saveBtn.innerHTML='✅ 순서 저장';
saveBtn.onclick=function(){
var order=Array.from(grid.querySelectorAll('.abtn')).map(function(b){return b.dataset.id;}).filter(Boolean);
lsS(storageKey, order);
saveBtn.style.display='none';
showToast('✅ 순서 저장됐어!','linear-gradient(135deg,#00e5ff,#7b61ff)');
};
grid.parentNode.insertBefore(saveBtn, grid.nextSibling);
}
function showSave(){ if(saveBtn) saveBtn.style.display='block'; }
Array.from(grid.querySelectorAll('.abtn')).forEach(function(btn){
if(canReorder){
btn.addEventListener('dragstart',function(e){
dragSrcBtn=btn; btn.style.opacity='0.45'; btn.style.transform='scale(0.9)';
e.dataTransfer.effectAllowed='move';
});
btn.addEventListener('dragend',function(){
btn.style.opacity=''; btn.style.transform='';
if(dragOver){dragOver.style.outline=''; dragOver=null;}
dragSrcBtn=null; showSave();
});
btn.addEventListener('dragover',function(e){
e.preventDefault(); e.dataTransfer.dropEffect='move';
if(btn!==dragSrcBtn&&btn!==dragOver){
if(dragOver) dragOver.style.outline='';
dragOver=btn; btn.style.outline='2px solid rgba(0,229,255,.5)';
}
});
btn.addEventListener('dragleave',function(){
btn.style.outline='';
if(dragOver===btn) dragOver=null;
});
btn.addEventListener('drop',function(e){
e.preventDefault();
if(dragSrcBtn&&dragSrcBtn!==btn&&dragSrcBtn.parentNode===grid){
var btns=Array.from(grid.querySelectorAll('.abtn'));
var si=btns.indexOf(dragSrcBtn), ti=btns.indexOf(btn);
if(si<ti) grid.insertBefore(dragSrcBtn,btn.nextSibling);
else grid.insertBefore(dragSrcBtn,btn);
btn.style.outline='';
}
});
}
btn.addEventListener('contextmenu',function(e){ e.preventDefault(); window._podoMenuTs=Date.now(); showAppMenu(btn._svc, btn); });
var pressTimer=null, armed=false, moved=false, touchClone=null, sx=0, sy=0;
btn.addEventListener('touchstart',function(e){
var t=e.touches[0]; sx=t.clientX; sy=t.clientY; moved=false; armed=false;
pressTimer=setTimeout(function(){
armed=true;
if(navigator.vibrate) navigator.vibrate(15);
btn.style.transition='transform .12s';
btn.style.transform='scale(1.12)';
btn.style.zIndex='10';
btn.style.filter='drop-shadow(0 6px 14px rgba(0,0,0,.55))';
},PODO_LONGPRESS_MS);
},{passive:true});
btn.addEventListener('touchmove',function(e){
var t=e.touches[0];
var dx=t.clientX-sx, dy=t.clientY-sy;
if(!armed){
if(Math.abs(dx)>16||Math.abs(dy)>16) clearTimeout(pressTimer);
return;
}
if(e.cancelable) e.preventDefault();
if(Math.abs(dx)>6||Math.abs(dy)>6) moved=true;
window._podoIconDrag=true;
if(!canReorder) return;
if(!touchClone){
dragSrcBtn=btn;
touchClone=btn.cloneNode(true);
touchClone.style.cssText='position:fixed;z-index:9999;width:'+btn.offsetWidth+'px;opacity:0.92;pointer-events:none;transform:scale(1.1);transition:none;';
document.body.appendChild(touchClone);
btn.style.opacity='0.25';
showSave();
}
touchClone.style.left=(t.clientX-btn.offsetWidth/2)+'px';
touchClone.style.top=(t.clientY-btn.offsetHeight/2)+'px';
var el=document.elementFromPoint(t.clientX,t.clientY);
var target=el&&el.closest('.abtn');
if(target&&target!==dragSrcBtn&&target.parentNode===grid){
var btns=Array.from(grid.querySelectorAll('.abtn'));
var si=btns.indexOf(dragSrcBtn), ti=btns.indexOf(target);
if(si<ti) grid.insertBefore(dragSrcBtn,target.nextSibling);
else grid.insertBefore(dragSrcBtn,target);
}
},{passive:false});
function endTouch(){
clearTimeout(pressTimer);
if(armed){ window._podoMenuTs=Date.now(); }
var didReorder = !!touchClone;
if(touchClone){touchClone.remove(); touchClone=null;}
btn.style.opacity=''; btn.style.transform=''; btn.style.filter=''; btn.style.zIndex='';
if(armed && !moved){
window._podoMenuTs=Date.now();
showAppMenu(btn._svc, btn);
} else if(didReorder && canReorder && storageKey){
var order=Array.from(grid.querySelectorAll('.abtn')).map(function(b){return b.dataset.id;}).filter(Boolean);
lsS(storageKey, order);
if(saveBtn) saveBtn.style.display='none';
showToast('✅ 순서 저장됨','linear-gradient(135deg,#00e5ff,#7b61ff)');
}
armed=false; moved=false; dragSrcBtn=null;
}
btn.addEventListener('touchend', endTouch,{passive:true});
btn.addEventListener('touchcancel', endTouch,{passive:true});
});
}
if(actCat==='전체'){
var uni=document.createElement('div');
uni.style.cssText='padding:14px 14px 6px';
uni.innerHTML =
      '<div style="background:#eef6fb;border:2px solid rgba(34,211,238,.5);border-radius:18px;padding:14px;box-shadow:0 4px 20px rgba(123,97,255,.15)">'
+'<div style="display:flex;align-items:center;margin-bottom:11px">'
+'<span style="font-size:22px;margin-right:9px">&#129302;</span>'
+'<div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:800;color:#0a7a96;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">AI 자동화 열기</div>'
+'</div>'
+'<button onclick="showFeatureGuide()" style="flex-shrink:0;padding:7px 12px;border-radius:11px;border:1px solid rgba(8,129,159,.45);background:rgba(34,211,238,.14);color:#0a7a96;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit">&#128203; 기능</button>'
+'</div>'
+'<div id="uni-presets" style="display:none;gap:7px;flex-wrap:wrap;margin-bottom:9px">'
+'<button class="wf-chip" data-wf="notice" onclick="setWorkflowPreset(\'notice\')">&#128226; 공지·홍보</button>'
+'<button class="wf-chip" data-wf="booking" onclick="setWorkflowPreset(\'booking\')">&#9989; 예약확인</button>'
+'<button class="wf-chip" data-wf="review" onclick="setWorkflowPreset(\'review\')">&#128172; 리뷰답변</button>'
+'<button class="wf-chip" data-wf="expense" onclick="setWorkflowPreset(\'expense\')">&#129534; 지출정리</button>'
+'<button class="wf-chip" data-wf="thanks" onclick="setWorkflowPreset(\'thanks\')">&#128591; 감사인사</button>'
+'<button class="wf-chip" data-wf="refund" onclick="setWorkflowPreset(\'refund\')">&#128184; 환불·교환</button>'
+'<button class="wf-chip" data-wf="delay" onclick="setWorkflowPreset(\'delay\')">&#128230; 배송지연</button>'
+'<button class="wf-chip" data-wf="event" onclick="setWorkflowPreset(\'event\')">&#127881; 이벤트당첨</button>'
+'</div>'
+'<textarea id="uni-q" placeholder="무엇이든 말하거나 적어보세요" style="width:100%;background:#eef0f7;border:1.5px solid rgba(34,211,238,.35);border-radius:13px;padding:12px;color:#141720;font-size:15px;line-height:1.5;outline:none;font-family:inherit;resize:none;min-height:60px;box-sizing:border-box"></textarea>'
+'<div style="display:flex;gap:8px;margin-top:8px">'
+'<button id="uni-mic" onclick="uniMic()" style="flex:1;padding:13px;border-radius:12px;border:1.5px solid rgba(8,129,159,.65);background:rgba(34,211,238,.18);color:#055f78;font-size:15.5px;font-weight:800;cursor:pointer;font-family:inherit">&#127908; 말하기</button>'
+'<button id="uni-go" onclick="uniRun()" style="flex:1;padding:13px;border-radius:12px;border:none;background:linear-gradient(135deg,#0ea5c4,#6d4aff);color:#fff;font-size:15.5px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(109,74,255,.3)">&#10145;&#65039; 실행</button>'
+'</div>'
+'<button id="uni-agent-btn" onclick="runAgentTeam()" style="width:100%;margin-top:8px;padding:12px;border-radius:12px;border:1.5px solid rgba(124,58,237,.5);background:rgba(124,58,237,.1);color:#6d28d9;font-size:14.5px;font-weight:800;cursor:pointer;font-family:inherit">&#129302; 에이전트팀으로 바로실행</button>'
+'<button onclick="showAgentRoutines()" style="width:100%;margin-top:7px;padding:10px;border-radius:12px;border:1.5px solid #e5dcfb;background:#faf8ff;color:#6d28d9;font-size:13.5px;font-weight:800;cursor:pointer;font-family:inherit">&#128193; 저장된 루틴 열기</button>'
+'<div id="agent-pins" style="display:none;flex-wrap:wrap;gap:7px;margin-top:8px"></div>'
+'<div id="uni-err" style="display:none;background:rgba(239,68,68,.1);border-radius:10px;padding:8px 11px;font-size:13.5px;color:#ef4444;margin-top:9px"></div>'
+'<div id="uni-result-wrap" style="display:none;margin-top:12px;background:#f2f4fa;border-radius:12px;border:1px solid rgba(34,211,238,.25);padding:14px">'
+'<div id="uni-detect" style="font-size:15px;font-weight:700;color:#0a7a96">&#9654; 열기</div>'
+'<div id="uni-query" style="font-size:13px;color:#252a39;margin:4px 0 14px;word-break:break-all"></div>'
+'<button id="uni-open" onclick="doVoiceOpen()" style="width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#0891b2);color:#06222b;font-size:16px;font-weight:800;cursor:pointer;font-family:inherit">열기</button>'
+'<button id="uni-ov" onclick="voiceOverview(\'uni\')" style="width:100%;margin-top:8px;padding:11px;border-radius:12px;border:1px solid rgba(34,211,238,.4);background:rgba(34,211,238,.1);color:#0a7a96;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">&#128214; AI 개요</button>'
+'<div id="uni-overview" style="display:none;margin-top:10px;background:#f4f6fb;border-radius:12px;border:1px solid rgba(34,211,238,.25);padding:14px"></div>'
+'<button onclick="uniSearch()" style="width:100%;margin-top:8px;padding:11px;border-radius:12px;border:1px solid rgba(0,0,0,.3);background:transparent;color:#252a39;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">이게 아니에요? 네이버에서 검색</button>'
+'<button onclick="voiceAgentDo(\'uni\')" style="width:100%;margin-top:8px;padding:12px;border-radius:12px;border:1px solid rgba(123,97,255,.4);background:rgba(123,97,255,.12);color:#6645dd;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">&#129302; 대신 해줘 (AI가 답해줘)</button>'
+'<div id="uni-agent-out" style="display:none;margin-top:12px;background:#f4f6fb;border-radius:12px;border:1px solid rgba(123,97,255,.25);padding:14px"></div>'
+'</div>'
+'<div id="uni-result" style="display:none;margin-top:12px;background:#f2f4fa;border-radius:12px;border:1px solid rgba(123,97,255,.25);padding:14px"></div>'
+'<div id="agent-panel" style="display:none;margin-top:12px"></div>'
+'</div>';
d.appendChild(uni);
setWorkflowPreset(workflowPreset);
setUniMode('auto');
try{ setTimeout(function(){ if(typeof _agentRestoreActive==='function') _agentRestoreActive(); if(typeof renderAgentPins==='function') renderAgentPins(); }, 150); }catch(e){}
var pdo=document.createElement('div');
pdo.style.cssText='padding:2px 14px 4px';
pdo.innerHTML=
      '<div style="background:linear-gradient(135deg,#faf5ff,#f2e6ff);border:1.5px solid rgba(139,53,224,.28);border-radius:18px;padding:13px 14px;box-shadow:0 4px 18px rgba(139,53,224,.14)">'
+'<div style="font-size:16px;font-weight:900;color:#7a24c9;letter-spacing:.3px">Pododa <span style="font-size:12px;font-weight:700;color:#a855f7">포도다</span></div>'
+'<div style="font-size:11.5px;color:#8a7aa0;margin:2px 0 9px">내 가게·상품을 직접 등록하세요</div>'
+'<div style="display:flex;gap:7px">'
+'<button onclick="goPodotalkOpen()" style="flex:1;padding:11px 4px;border-radius:11px;border:none;background:linear-gradient(135deg,#8b35e0,#a855f7);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(139,53,224,.3)">&#128172; 포도톡</button>'
+'<button onclick="openPododaReg(\'shop\')" style="flex:1;padding:11px 4px;border-radius:11px;border:none;background:linear-gradient(135deg,#8b35e0,#a855f7);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(139,53,224,.3)">&#128717;&#65039; 상품등록</button>'
+'<button onclick="openPododaReg(\'food\')" style="flex:1;padding:11px 4px;border-radius:11px;border:none;background:linear-gradient(135deg,#8b35e0,#a855f7);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(139,53,224,.3)">&#127869;&#65039; 음식점등록</button>'
+'</div>'
+'</div>';
d.appendChild(pdo);
var ebc=document.createElement('div');
ebc.id='econbrief-card';
ebc.style.cssText='padding:2px 14px 6px';
d.appendChild(ebc);
try{ renderBriefsCard(ebc); }catch(e){}
try{ briefsCheck(); if(!window._econBriefTimer){ window._econBriefTimer=setInterval(function(){ try{ briefsCheck(); }catch(e){} }, 60000); } }catch(e){}
var savedSvcOrder=lsG(SERVICES_ORDER_KEY,[]);
var svcList=[];
var allow={}; MORE_IDS.forEach(function(id){ allow[id]=true; });
savedSvcOrder.forEach(function(id){
if(allow[id]){ for(var i=0;i<SV.length;i++){ if(SV[i].id===id){ svcList.push(SV[i]); break; } } allow[id]=false; }
});
MORE_IDS.forEach(function(id){
if(allow[id]){ for(var i=0;i<SV.length;i++){ if(SV[i].id===id){ svcList.push(SV[i]); break; } } }
});
svcList=svcList.filter(function(s){ return !podoHidden(s.id) && !podoDeleted(s.id); });
var gSvc=document.createElement('div'); gSvc.className='lgrid';
gSvc.style.paddingBottom='4px';
svcList.forEach(function(svc){ gSvc.appendChild(makeBtn(svc,52)); });
d.appendChild(gSvc);
enableDrag(gSvc, SERVICES_ORDER_KEY);
var sep=document.createElement('div');
sep.style.cssText='display:flex;align-items:center;gap:10px;padding:12px 14px 6px;';
sep.innerHTML='<div style="flex:1;height:1px;background:rgba(0,0,0,.26)"></div>'
+'<span style="font-size:13px;font-weight:800;color:#8b35e0;letter-spacing:.5px">🍇 PodoAI 기능 <span style="font-size:10px;color:#9aa0b4;font-weight:600">v4.82 🌍</span></span>'
+'<div style="flex:1;height:1px;background:rgba(0,0,0,.26)"></div>';
d.appendChild(sep);
var savedFeat=lsG(FEATURES_ORDER_KEY,[]);
var featList=PODO_FEATURES.filter(function(f){ return !podoHidden(f.id) && !podoDeleted(f.id); });
if(savedFeat.length){
var fmm={}; featList.forEach(function(f){ fmm[f.id]=f; });
var ford=[];
savedFeat.forEach(function(id){ if(fmm[id]){ ford.push(fmm[id]); delete fmm[id]; } });
featList.forEach(function(f){ if(fmm[f.id]) ford.push(f); });
featList=ford;
}
var gFeat=document.createElement('div'); gFeat.className='lgrid';
gFeat.style.paddingBottom='8px';
featList.forEach(function(f){ gFeat.appendChild(makeFeatureBtn(f)); });
d.appendChild(gFeat);
enableDrag(gFeat, FEATURES_ORDER_KEY);
} else {
var catApps=SV.filter(function(s){ return (s.cat===actCat || (actCat==='검색·연락'&&(s.cat==='검색'||s.cat==='연락'))) && !podoHidden(s.id) && !podoDeleted(s.id) && CAT_HIDE.indexOf(s.id)<0; });
var catKey='podoai_cat_order_'+actCat;
var savedCat=lsG(catKey,[]);
if(savedCat.length){
var cm={}; catApps.forEach(function(s){ cm[s.id]=s; });
var ord=[];
savedCat.forEach(function(id){ if(cm[id]){ ord.push(cm[id]); delete cm[id]; } });
catApps.forEach(function(s){ if(cm[s.id]) ord.push(s); });
catApps=ord;
}
var gCat=document.createElement('div'); gCat.className='lgrid';
gCat.style.paddingBottom='20px';
for(var ci3=0;ci3<catApps.length;ci3++){
gCat.appendChild(makeBtn(catApps[ci3],52));
}
d.appendChild(gCat);
enableDrag(gCat, catKey);
}
var foot=document.createElement('div'); foot.className='lfoot';
foot.innerHTML='<div class="fbar"></div><span class="fbrand">PODOAI</span><div class="fbar"></div>';
d.appendChild(foot);
return d;
}
function makeShopPanel(){
var wrap=document.createElement('div');
wrap.style.cssText='display:flex;flex-direction:column;gap:10px;padding:10px 0 6px;';
var t1=document.createElement('div');
t1.style.cssText='padding:4px 14px 0;font-size:11px;font-weight:700;color:#b5740a;letter-spacing:1px';
t1.textContent='🛍️ 쇼핑 & 배달';
wrap.appendChild(t1);
var c1=document.createElement('div'); c1.className='lcard';
var g1=document.createElement('div'); g1.className='lgrid';
SV.filter(function(s){return s.cat==='쇼핑'||s.cat==='배달';}).forEach(function(svc){
var b=document.createElement('button'); b.className='abtn';
b.onclick=function(){openSheet(svc);};
b.appendChild(makeIconImg(svc));
var lb=document.createElement('div'); lb.className='alb'; lb.textContent=svc.n;
b.appendChild(lb); g1.appendChild(b);
});
c1.appendChild(g1); wrap.appendChild(c1);
var t2=document.createElement('div');
t2.style.cssText='padding:4px 14px 0;font-size:11px;font-weight:700;color:#b5740a;letter-spacing:1px';
t2.textContent='🎞️ 영상 · 음악 · 웹툰';
wrap.appendChild(t2);
var c2=document.createElement('div'); c2.className='lcard';
var g2=document.createElement('div'); g2.className='lgrid';
SV.filter(function(s){return s.cat==='영상'||s.cat==='음악'||s.cat==='웹툰';}).forEach(function(svc){
var b=document.createElement('button'); b.className='abtn';
b.onclick=function(){openSheet(svc);};
b.appendChild(makeIconImg(svc));
var lb=document.createElement('div'); lb.className='alb'; lb.textContent=svc.n;
b.appendChild(lb); g2.appendChild(b);
});
c2.appendChild(g2); wrap.appendChild(c2);
return wrap;
}
function makeStartCard(){
var d=document.createElement('div'); d.className='scard'; d.id='startcard';
d.innerHTML='<div style="font-size:30px;text-align:center;margin-bottom:7px">🍇</div>'
+'<div style="font-size:15px;font-weight:700;color:#141720;text-align:center;margin-bottom:4px">PodoAI</div>'
+'<div style="font-size:11px;color:#1f2430;text-align:center;line-height:1.6;margin-bottom:14px">AI가 도와주는 스마트 런처<br>런처 무료 · AI 채팅은 API 키 필요</div>'
+'<button class="scta" onclick="openUp()">🍇 AI 채팅 이용하기</button>'
+'<div style="text-align:center;margin-top:8px;font-size:9.5px;color:rgba(0,0,0,.28)">채팅·글쓰기 탭 → 마이 탭에서 API 키 등록</div>';
return d;
}
function CM(){return document.getElementById('chatmain');}
function cbot(){setTimeout(function(){var m=CM();if(m)m.scrollTop=m.scrollHeight;},60);}
function showChatWelcome(){
var cm=CM(); if(!cm) return;
if(cm.querySelector('#chat-welcome')) return;
if(cm.children.length>0) return;
var w=document.createElement('div'); w.id='chat-welcome'; w.className='';
w.style.cssText='display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;padding:30px 20px;text-align:center';
w.innerHTML='<div style="font-size:52px;margin-bottom:14px">&#127815;</div>'
+'<div style="font-size:18px;font-weight:700;color:#141720;margin-bottom:8px">PodoAI 채팅</div>'
+'<div style="font-size:13px;color:#1f2430;line-height:1.7">AI와 자유롭게 대화해봐요<br>무엇이든 물어보세요!</div>';
cm.appendChild(w);
}
function quickChat(el){
var inp=document.getElementById('inp');
if(inp){inp.value=el.textContent; inp.dispatchEvent(new Event('input')); doSend();}
}
function clearChat(){
var cm=CM(); if(!cm) return;
hist=[];
cm.innerHTML='';
showChatWelcome();
}
function addMsg(role,text){
var cm=CM();
var w=document.getElementById('chat-welcome'); if(w) w.remove();
var wrap=document.createElement('div'); wrap.className='mrow'+(role==='me'?' me':'');
if(role!=='me'){var av=document.createElement('div'); av.className='mav'; av.textContent='AI'; wrap.appendChild(av);}
var b=document.createElement('div'); b.className='mbub '+(role==='me'?'me':'ai'); b.textContent=text;
wrap.appendChild(b); cm.appendChild(wrap); cbot();
if(role!=='me') speak(text);
}
function addDots(){
var cm=CM(); var w=document.createElement('div'); w.className='mrow'; w.id='dots';
var av=document.createElement('div'); av.className='mav'; av.textContent='AI';
var b=document.createElement('div'); b.className='mbub ai'; b.style.padding='12px 16px';
b.innerHTML='<span class="dots"><span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span></span>';
w.appendChild(av); w.appendChild(b); cm.appendChild(w); cbot();
}
function rmDots(){var d=document.getElementById('dots');if(d)d.remove();}
function switchTab(tab,el){
var _ov=['url-guide-sheet','carddetail-bg','cardscan-bg','cardlist-bg','voiceact-bg','navi-bg','briefing-bg','research-bg','workflow-bg','senior-bg','study-bg','travel-bg','fridge-bg','name-bg','fortune-bg','quiz-bg','obj-bg','ocr-bg','label-bg','biz-bg','ledger-bg','addappbg','myapplistbg','gworkspace-bg','navinbg','alimtalkbg','smsbg','mapbg','gcalbg','kcalbg','nshopbg','upbitbg','kweatherbg','gmailbg'];
for(var _i=0;_i<_ov.length;_i++){ var _e=document.getElementById(_ov[_i]); if(_e) _e.style.display='none'; }
var tabs=document.querySelectorAll('.tab-item');
for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('active');
if(el) el.classList.add('active');
var main=M(), wp=document.getElementById('writepanel'), my=document.getElementById('mypanel'), cp=document.getElementById('chatpanel'), hi=document.getElementById('homeibar'), sp=document.getElementById('shortspanel'), ip=document.getElementById('imagepanel');
main.style.display='none'; wp.classList.remove('show'); my.classList.remove('show'); cp.classList.remove('show'); hi.classList.remove('show'); sp.classList.remove('show'); ip.classList.remove('show');
if(tab==='home'){main.style.display='flex'; hi.classList.add('show'); showHome();}
else if(tab==='shorts'){sp.classList.add('show');}
else if(tab==='image'){ip.classList.add('show');}
else if(tab==='write'){wp.classList.add('show');}
else if(tab==='chat'){cp.classList.add('show'); showChatWelcome();}
else if(tab==='my'){my.classList.add('show'); updateMyStatus();}
}
function updateMyStatus(){
var el = document.getElementById('my-api-status');
if(el){
if(aiModel==='puter') el.textContent='🆓 키 없이 무료 (Puter) 사용 중';
else if(aiModel==='gemini'&&geminiKey) el.textContent='💎 Gemini (무료) 사용 중';
else if(aiModel==='claude'&&apiKey) el.textContent='🍇 Claude 사용 중';
else if(aiModel==='gemini') el.textContent='💎 Gemini 선택됨 · 키 미등록';
else el.textContent='🍇 Claude 선택됨 · 키 미등록';
}
var MODELS=['claude','gemini','puter'];
for(var i=0;i<MODELS.length;i++){
var m=MODELS[i];
var row=document.getElementById('model-'+m), chk=document.getElementById('check-'+m);
if(row){ if(aiModel===m) row.classList.add('active'); else row.classList.remove('active'); }
if(chk){ chk.style.display = (aiModel===m) ? 'flex' : 'none'; }
}
var pm = document.getElementById('puter-models');
if(pm){
pm.style.display = (aiModel==='puter') ? 'block' : 'none';
var chips = pm.querySelectorAll('.puter-chip');
for(var j=0;j<chips.length;j++){
chips[j].classList.toggle('on', chips[j].getAttribute('data-m')===PUTER_MODEL);
}
}
var cs=document.getElementById('claude-key-sub'), gs=document.getElementById('gemini-key-sub');
if(cs) cs.textContent=apiKey?'✅ 등록됨':'미등록';
if(gs) gs.textContent=geminiKey?'✅ 등록됨':'미등록 (무료 발급 가능)';
try{ webKeyStatus(); }catch(e){}
try{ kakaoKeyStatus(); }catch(e){}
try{ proxyUrlStatus(); }catch(e){}
if(typeof applyLang === 'function') applyLang();
}
function selectModel(model){
aiModel=model; lsS('podoai_model',model); updateMyStatus();
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);border:1px solid rgba(0,0,0,.28);color:#141720;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:600;z-index:999;pointer-events:none';
t.textContent = model==='gemini' ? '💎 Gemini로 변경됐어!'
: model==='puter'  ? '🆓 키 없이 무료(Puter)로 변경됐어!'
: '🍇 Claude로 변경됐어!';
document.body.appendChild(t); setTimeout(function(){t.remove();},1800);
}
function setPuterModel(m, el){
PUTER_MODEL = m; lsS('podoai_puter_model', m);
if(el){
var p = el.parentNode.querySelectorAll('.puter-chip');
for(var i=0;i<p.length;i++) p[i].classList.remove('on');
el.classList.add('on');
}
if(typeof showToast==='function') showToast('Puter 모델: '+m, 'linear-gradient(135deg,#22d3ee,#0891b2)');
}
function openGeminiKey(){document.getElementById('geminibg').style.display='flex'; history.pushState({p:true},'','');}
function closeGeminiKey(){document.getElementById('geminibg').style.display='none'; history.pushState({p:true},'','');}
function verifyGeminiKey(){
var ki=document.getElementById('gemini-ki'); var k=ki?ki.value.trim():'';
if(!k){showGeminiErr('API 키를 붙여넣어 줘');return;}
if(k.length < 20){showGeminiErr('올바른 Gemini API 키를 넣어줘');return;}
var btn=document.getElementById('gemini-vb');
btn.textContent='⏳ 확인 중…'; btn.disabled=true; hideGeminiErr();
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+k,{
method:'POST', headers:{'Content-Type':'application/json'},
body:JSON.stringify({contents:[{role:'user',parts:[{text:'hi'}]}],generationConfig:{maxOutputTokens:5}})
}).then(function(r){return r.json();}).then(function(d){
var isKeyValid = !d.error || (d.error && (d.error.message.indexOf('quota')>-1 || d.error.message.indexOf('limit')>-1));
if(!isKeyValid) throw new Error(d.error.message);
geminiKey=k; lsS('podoai_gk',k); aiModel='gemini'; lsS('podoai_model','gemini');
closeGeminiKey(); updateMyStatus();
btn.textContent='💎 Gemini 연결하기'; btn.disabled=false;
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#4285F4,#34A853);color:#fff;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:700;z-index:999;pointer-events:none';
t.textContent='💎 Gemini 연결 완료! AI 기능을 사용할 수 있어요 🎉';
document.body.appendChild(t); setTimeout(function(){t.remove();},3000);
}).catch(function(e){showGeminiErr('확인 실패: '+e.message); btn.textContent='💎 Gemini 연결하기'; btn.disabled=false;});
}
function showGeminiErr(m){var e=document.getElementById('gemini-err');if(e){e.textContent='⚠️ '+m;e.style.display='block';}}
function hideGeminiErr(){var e=document.getElementById('gemini-err');if(e)e.style.display='none';}
function showHome(){
swipeIdx = 0;
actCat = '전체';
var m=M(); m.innerHTML='';
m.style.display='flex';
m.appendChild(makeWeatherWidget());
m.appendChild(makeLauncher());
m.scrollTop=0;
updateClock();
if(typeof i18nTick==='function') i18nTick();
fetchWeather();
}
function openLauncherSettings(){
var el=document.getElementById('lsbg');
if(el){el.style.display='flex'; history.pushState({p:true},'','');}
}
function closeLs(){
var el=document.getElementById('lsbg');
if(el){el.style.display='none'; history.pushState({p:true},'','');}
}
function closePodo(){
var el=document.getElementById('podobg');
if(el){el.style.display='none'; history.pushState({p:true},'','');}
}
function goToSystemSettings(){
if(window.Android && typeof window.Android.openHomeSettings === 'function'){
window.Android.openHomeSettings();
closeLs();
} else {
showSettingsGuide();
}
}
function setPodoAsHome(){
if(window.Android && typeof window.Android.setPodoAsHome === 'function'){
window.Android.setPodoAsHome();
closeLs();
} else {
closeLs();
var el=document.getElementById('podobg');
if(el){el.style.display='flex'; history.pushState({p:true},'','');}
}
}
function showSettingsGuide(){
var overlay=document.createElement('div');
overlay.style.cssText='position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.82);backdrop-filter:blur(8px);display:flex;align-items:flex-end;justify-content:center';
overlay.innerHTML='<div style="width:min(390px,100vw);background:linear-gradient(160deg,#eef1f8,#ffffff);border-radius:24px 24px 0 0;border:1px solid rgba(0,0,0,.3);padding:20px 18px 36px">'
+'<div style="display:flex;align-items:center;margin-bottom:16px">'
+'<div style="font-size:22px;margin-right:10px">&#128241;</div>'
+'<div style="font-size:17px;font-weight:800;color:#141720">기본 홈앱 변경 안내</div>'
+'<button onclick="this.closest(\'div[style]\').remove()" style="margin-left:auto;background:rgba(0,0,0,.24);border:none;width:30px;height:30px;border-radius:9px;color:#1f2430;font-size:14px;cursor:pointer">&#10005;</button>'
+'</div>'
+'<div style="background:rgba(0,0,0,.16);border-radius:14px;padding:14px;border:1px solid rgba(0,0,0,.24);margin-bottom:12px">'
+'<div style="font-size:12px;font-weight:700;color:#141720;margin-bottom:8px">&#128241; Android (삼성/LG/기타)</div>'
+'<div style="font-size:11px;color:#252a39;line-height:1.8">1. 설정 앱 열기<br>2. 앱 (또는 애플리케이션)<br>3. 기본 앱 선택 (또는 기본으로 설정)<br>4. 홈 앱 → 원하는 런처 선택</div>'
+'</div>'
+'<div style="background:rgba(0,0,0,.16);border-radius:14px;padding:14px;border:1px solid rgba(0,0,0,.24);margin-bottom:16px">'
+'<div style="font-size:12px;font-weight:700;color:#141720;margin-bottom:8px">&#128187; 삼성 One UI</div>'
+'<div style="font-size:11px;color:#252a39;line-height:1.8">설정 → 앱 → 우측 상단 ⋮ → 기본 앱 → 홈 앱</div>'
+'</div>'
+'<button onclick="this.closest(\'div[style]\').remove()" style="width:100%;padding:13px;border-radius:13px;border:none;background:linear-gradient(135deg,#1f2430,#4a5080);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">확인</button>'
+'</div>';
document.body.appendChild(overlay);
history.pushState({p:true},'','');
}
function deleteAccount(){
var box=document.createElement('div');
box.style.cssText='position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px';
box.innerHTML='<div style="width:100%;max-width:320px;background:linear-gradient(160deg,#eef1f8,#ffffff);border-radius:20px;border:1px solid rgba(239,68,68,.3);padding:24px">'
+'<div style="font-size:36px;text-align:center;margin-bottom:12px">&#9888;&#65039;</div>'
+'<div style="font-size:16px;font-weight:700;color:#141720;text-align:center;margin-bottom:8px">계정 삭제</div>'
+'<div style="font-size:12px;color:#1f2430;text-align:center;line-height:1.7;margin-bottom:20px">API 키와 모든 대화 기록,<br>저장된 설정이 삭제됩니다.<br>이 작업은 되돌릴 수 없어요.</div>'
+'<div style="display:flex;flex-direction:column;gap:8px">'
+'<button onclick="confirmDelete(this)" style="width:100%;padding:13px;border-radius:12px;border:none;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">&#128683; 삭제 확인</button>'
+'<button onclick="this.closest(\'div[style]\').remove()" style="width:100%;padding:12px;border-radius:12px;border:1px solid rgba(0,0,0,.28);background:rgba(0,0,0,.16);color:#1f2430;font-size:13px;cursor:pointer;font-family:inherit">취소</button>'
+'</div>'
+'</div>';
document.body.appendChild(box);
history.pushState({p:true},'','');
}
function confirmDelete(btn){
try { localStorage.clear(); } catch(e){}
apiKey=''; hist=[];
btn.closest('div[style]').remove();
var done=document.createElement('div');
done.style.cssText='position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px';
done.innerHTML='<div style="font-size:50px">&#127815;</div>'
+'<div style="font-size:18px;font-weight:700;color:#141720;text-align:center">모든 데이터 삭제 완료</div>'
+'<div style="font-size:12px;color:#1f2430;text-align:center;line-height:1.7">API 키와 모든 기록이 삭제됐어<br>PodoAI를 다시 사용하려면<br>마이 탭에서 API 키를 등록해줘</div>'
+'<button onclick="location.reload()" style="margin-top:8px;padding:13px 28px;border-radius:13px;border:none;background:linear-gradient(135deg,#00e5ff,#7b61ff);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">&#127775; 처음부터 시작</button>';
document.body.appendChild(done);
}
var IMG_GALLERY_KEY = 'podoai_img_gallery';
function getGallery(){ return lsG(IMG_GALLERY_KEY, []); }
function saveToGallery(){
var outImg = document.getElementById('img-out');
var dlBtn = document.getElementById('img-dl');
var promptEl = document.getElementById('img-prompt-used');
if(!outImg || !outImg.src || outImg.src === window.location.href) return;
var gallery = getGallery();
var entry = {
id: Date.now(),
url: dlBtn ? dlBtn.href : outImg.src,
prompt: promptEl ? promptEl.textContent.replace(/^[✅📝]\s*/,'') : '',
date: new Date().toLocaleDateString('ko-KR',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})
};
gallery.unshift(entry);
if(gallery.length > 50) gallery = gallery.slice(0,50);
lsS(IMG_GALLERY_KEY, gallery);
showToast('📷 갤러리에 저장됐어!', 'linear-gradient(135deg,#a855f7,#7c3aed)');
}
function openGallery(){
renderGallery();
document.getElementById('gallerybg').style.display = 'flex';
history.pushState({p:true},'','');
}
function closeGallery(){
document.getElementById('gallerybg').style.display = 'none';
history.pushState({p:true},'','');
}
function renderGallery(){
var grid = document.getElementById('gallery-grid');
var empty = document.getElementById('gallery-empty');
var count = document.getElementById('gallery-count');
var gallery = getGallery();
if(count) count.textContent = gallery.length + '개';
grid.innerHTML = '';
if(gallery.length === 0){
grid.innerHTML = '<div id="gallery-empty" style="grid-column:1/-1;text-align:center;padding:30px;color:#1f2430;font-size:13px">저장된 이미지가 없어요<br><span style="font-size:11px;color:rgba(0,0,0,.28)">이미지 생성 후 갤러리 버튼을 눌러줘</span></div>';
return;
}
for(var i=0;i<gallery.length;i++){
(function(entry){
var card = document.createElement('div');
card.style.cssText = 'border-radius:12px;overflow:hidden;background:#eef1f8;border:1px solid rgba(0,0,0,.26);position:relative;';
card.innerHTML = '<img src="'+entry.url+'" style="width:100%;aspect-ratio:1;object-fit:cover;display:block" onerror="this.style.display=\'none\'">'
+'<div style="padding:6px 8px">'
+'<div style="font-size:10px;color:rgba(0,0,0,.5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+entry.prompt.slice(0,40)+'</div>'
+'<div style="font-size:9px;color:#1f2430;margin-top:2px">'+entry.date+'</div>'
+'</div>'
+'<button onclick="deleteGalleryItem('+entry.id+',event)" style="position:absolute;top:5px;right:5px;background:rgba(0,0,0,.6);border:none;border-radius:6px;width:22px;height:22px;color:#16181f;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center">&#10005;</button>';
grid.appendChild(card);
})(gallery[i]);
}
}
function deleteGalleryItem(id, e){
e.stopPropagation();
var gallery = getGallery().filter(function(g){return g.id !== id;});
lsS(IMG_GALLERY_KEY, gallery);
renderGallery();
}
var SHORTS_IDEAS_KEY = 'podoai_shorts_ideas';
function getShortsIdeas(){ return lsG(SHORTS_IDEAS_KEY, []); }
function saveShortsIdea(){
var titleEl = document.getElementById('sr-titles');
var scriptEl = document.getElementById('sr-script');
var tagEl = document.getElementById('sr-tags');
var topicEl = document.getElementById('shorts-topic');
if(!scriptEl || !scriptEl.textContent.trim()){
alert('저장할 쇼츠 콘텐츠가 없어요!\n먼저 AI 쇼츠를 생성해줘.'); return;
}
var ideas = getShortsIdeas();
var firstTitle = '';
if(titleEl){
var firstLine = titleEl.querySelector('div');
if(firstLine) firstTitle = firstLine.textContent.replace(/^\d+\.\s*/,'').trim().slice(0,40);
}
if(!firstTitle && topicEl) firstTitle = topicEl.value.trim().slice(0,40);
var entry = {
id: Date.now(),
title: firstTitle || '쇼츠 아이디어',
topic: topicEl ? topicEl.value.trim() : '',
len: shortsLen,
style: shortsStyle,
script: scriptEl.textContent.trim(),
tags: tagEl ? (tagEl.getAttribute('data-plain') || tagEl.textContent) : '',
date: new Date().toLocaleDateString('ko-KR',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})
};
ideas.unshift(entry);
if(ideas.length > 30) ideas = ideas.slice(0,30);
lsS(SHORTS_IDEAS_KEY, ideas);
showToast('💾 쇼츠 아이디어가 저장됐어!', 'linear-gradient(135deg,#ff0050,#ff4d4d)');
}
function openShortsIdeas(){
renderShortsIdeas();
document.getElementById('shortssavedbg').style.display = 'flex';
history.pushState({p:true},'','');
}
function closeShortsIdeas(){
document.getElementById('shortssavedbg').style.display = 'none';
history.pushState({p:true},'','');
}
function renderShortsIdeas(){
var list = document.getElementById('shorts-ideas-list');
var ideas = getShortsIdeas();
list.innerHTML = '';
if(ideas.length === 0){
list.innerHTML = '<div style="text-align:center;padding:30px;color:#1f2430;font-size:13px">저장된 아이디어가 없어요<br><span style="font-size:11px;color:rgba(0,0,0,.28)">쇼츠 생성 후 저장 버튼을 눌러줘</span></div>';
return;
}
for(var i=0;i<ideas.length;i++){
(function(entry){
var item = document.createElement('div');
item.style.cssText = 'background:rgba(0,0,0,.16);border:1px solid rgba(0,0,0,.24);border-radius:12px;padding:12px;margin-bottom:8px;cursor:pointer;';
item.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
+'<div style="font-size:13px;font-weight:700;color:#141720;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">🎬 '+entry.title+'</div>'
+'<button onclick="deleteIdeaItem('+entry.id+',event)" style="background:rgba(239,68,68,.12);border:none;border-radius:7px;padding:3px 8px;color:#ef4444;font-size:11px;cursor:pointer;font-family:inherit;flex-shrink:0">삭제</button>'
+'</div>'
+'<div style="display:flex;gap:6px;margin-bottom:6px">'
+'<span style="font-size:10px;background:rgba(255,0,80,.12);color:#e23b67;padding:2px 7px;border-radius:6px">'+entry.len+'</span>'
+'<span style="font-size:10px;background:rgba(0,0,0,.22);color:#1f2430;padding:2px 7px;border-radius:6px">'+entry.style+'</span>'
+'<span style="font-size:10px;color:rgba(0,0,0,.25);margin-left:auto">'+entry.date+'</span>'
+'</div>'
+'<div style="font-size:11px;color:#1f2430;line-height:1.6;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">'+entry.script.slice(0,80)+'...</div>'
+'<button onclick="loadShortsIdea('+entry.id+')" style="margin-top:8px;width:100%;padding:8px;border-radius:9px;border:1px solid rgba(255,0,80,.2);background:rgba(255,0,80,.07);color:#e23b67;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">📋 불러오기</button>';
list.appendChild(item);
})(ideas[i]);
}
}
function loadShortsIdea(id){
var ideas = getShortsIdeas();
var entry = null;
for(var i=0;i<ideas.length;i++){ if(ideas[i].id===id){entry=ideas[i];break;} }
if(!entry) return;
var shortsTab = document.querySelector('.t-shorts');
if(shortsTab) switchTab('shorts', shortsTab);
var topicEl = document.getElementById('shorts-topic');
if(topicEl) topicEl.value = entry.topic;
var scriptEl = document.getElementById('sr-script');
var tagEl = document.getElementById('sr-tags');
if(scriptEl) scriptEl.textContent = entry.script;
if(tagEl){
var tags = entry.tags.split(/\s+/).filter(function(t){return t.startsWith('#');});
tagEl.innerHTML = tags.map(function(t){
return '<span style="display:inline-block;margin:3px;padding:5px 10px;border-radius:20px;background:rgba(255,0,80,.1);border:1px solid rgba(255,0,80,.2);color:#e23b67;font-size:11px">'+t+'</span>';
}).join('');
tagEl.setAttribute('data-plain', entry.tags);
}
var result = document.getElementById('shorts-result');
if(result){ result.style.display='flex'; result.style.flexDirection='column'; result.style.gap='10px'; }
closeShortsIdeas();
showToast('📂 쇼츠 아이디어를 불러왔어!', 'rgba(0,0,0,.85)');
}
function deleteIdeaItem(id, e){
e.stopPropagation();
var ideas = getShortsIdeas().filter(function(i){return i.id!==id;});
lsS(SHORTS_IDEAS_KEY, ideas);
renderShortsIdeas();
}
var WP_LIST_KEY = 'podoai_write_list';
function getWpList(){ return lsG(WP_LIST_KEY, []); }
function copyWpResult(){
var txt = document.getElementById('wpresulttxt').textContent;
if(!txt.trim()){ showToast('복사할 내용이 없어요','rgba(0,0,0,.85)'); return; }
if(navigator.clipboard){ navigator.clipboard.writeText(txt).then(function(){ showToast('✅ 복사됐어!','rgba(168,85,247,.9)'); }); }
else { var ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showToast('✅ 복사됐어!','rgba(168,85,247,.9)'); }
}
function saveWpResult(){
var txt = document.getElementById('wpresulttxt').textContent.trim();
var topic = document.getElementById('wptxt').value.trim();
if(!txt){ showToast('저장할 내용이 없어요','rgba(0,0,0,.85)'); return; }
var list = getWpList();
var entry = {
id: Date.now(),
type: wpType,
title: topic.slice(0,30) || wpType+' 글',
content: txt,
date: new Date().toLocaleDateString('ko-KR',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})
};
list.unshift(entry);
if(list.length > 50) list = list.slice(0,50);
lsS(WP_LIST_KEY, list);
showToast('💾 저장됐어!','linear-gradient(135deg,#a855f7,#7c3aed)');
}
function exportWpResult(){
var txt = document.getElementById('wpresulttxt').textContent.trim();
var topic = document.getElementById('wptxt').value.trim().slice(0,20) || 'podoai_글쓰기';
if(!txt){ showToast('내보낼 내용이 없어요','rgba(0,0,0,.85)'); return; }
var blob = new Blob([txt], {type:'text/plain;charset=utf-8'});
var url = URL.createObjectURL(blob);
var a = document.createElement('a');
a.href = url; a.download = topic+'.txt';
document.body.appendChild(a); a.click();
document.body.removeChild(a); URL.revokeObjectURL(url);
showToast('⬇️ 파일로 내보냈어!','linear-gradient(135deg,#00e5ff,#0ea5e9)');
}
function openWriteList(){
renderWpList();
document.getElementById('wplistbg').style.display = 'flex';
history.pushState({p:true},'','');
}
function closeWriteList(){
document.getElementById('wplistbg').style.display = 'none';
history.pushState({p:true},'','');
}
function renderWpList(){
var list = document.getElementById('wp-saved-list');
var count = document.getElementById('wp-saved-count');
var items = getWpList();
if(count) count.textContent = items.length+'개';
list.innerHTML = '';
if(items.length === 0){
list.innerHTML = '<div style="text-align:center;padding:30px;color:#1f2430;font-size:13px">저장된 글이 없어요<br><span style="font-size:11px;color:rgba(0,0,0,.28)">AI 작성 후 저장 버튼을 눌러줘</span></div>';
return;
}
for(var i=0;i<items.length;i++){
(function(entry){
var el = document.createElement('div');
el.style.cssText = 'background:rgba(0,0,0,.16);border:1px solid rgba(0,0,0,.24);border-radius:12px;padding:12px;margin-bottom:8px;';
el.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
+'<span style="font-size:10px;background:rgba(168,85,247,.15);color:#8b35e0;padding:2px 7px;border-radius:6px;flex-shrink:0">'+entry.type+'</span>'
+'<div style="font-size:13px;font-weight:700;color:#141720;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+entry.title+'</div>'
+'<span style="font-size:10px;color:#1f2430;flex-shrink:0">'+entry.date+'</span>'
+'</div>'
+'<div style="font-size:12px;color:#1f2430;line-height:1.6;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">'+entry.content.slice(0,80)+'...</div>'
+'<div style="display:flex;gap:6px;margin-top:8px">'
+'<button onclick="loadWpItem('+entry.id+')" style="flex:1;padding:8px;border-radius:9px;border:1px solid rgba(168,85,247,.2);background:rgba(168,85,247,.07);color:#8b35e0;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">불러오기</button>'
+'<button onclick="exportWpItem('+entry.id+')" style="flex:1;padding:8px;border-radius:9px;border:1px solid rgba(0,0,0,.28);background:rgba(0,0,0,.16);color:#1f2430;font-size:12px;cursor:pointer;font-family:inherit">⬇️ 내보내기</button>'
+'<button onclick="deleteWpItem('+entry.id+',event)" style="padding:8px 12px;border-radius:9px;border:none;background:rgba(239,68,68,.12);color:#ef4444;font-size:12px;cursor:pointer;font-family:inherit">삭제</button>'
+'</div>';
list.appendChild(el);
})(items[i]);
}
}
function loadWpItem(id){
var entry = getWpList().filter(function(e){return e.id===id;})[0];
if(!entry) return;
document.getElementById('wpresulttxt').textContent = entry.content;
document.getElementById('wpresult').style.display = 'block';
document.getElementById('wptxt').value = entry.title;
closeWriteList();
showToast('📂 불러왔어!','rgba(0,0,0,.85)');
}
function exportWpItem(id){
var entry = getWpList().filter(function(e){return e.id===id;})[0];
if(!entry) return;
var blob = new Blob([entry.content], {type:'text/plain;charset=utf-8'});
var url = URL.createObjectURL(blob);
var a = document.createElement('a'); a.href=url; a.download=entry.title+'.txt';
document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
function deleteWpItem(id, e){
if(e) e.stopPropagation();
var list = getWpList().filter(function(e){return e.id!==id;});
lsS(WP_LIST_KEY, list);
renderWpList();
}
var APP_ORDER_KEY = 'podoai_app_order';
var customOrder = [];
function openCustom(){
var saved = lsG(APP_ORDER_KEY, []);
if(saved.length > 0){
customOrder = saved.slice();
} else {
customOrder = SV.map(function(s){return s.id;});
}
renderCustomList();
document.getElementById('custombg').style.display = 'flex';
history.pushState({p:true},'','');
}
function closeCustom(){
document.getElementById('custombg').style.display = 'none';
history.pushState({p:true},'','');
}
function renderCustomList(){
var list = document.getElementById('custom-list');
list.innerHTML = '';
for(var i=0;i<customOrder.length;i++){
(function(idx){
var id = customOrder[idx];
var svc = SM[id];
if(!svc) return;
var row = document.createElement('div');
row.style.cssText = 'display:flex;align-items:center;gap:10px;background:rgba(0,0,0,.16);border:1px solid rgba(0,0,0,.24);border-radius:12px;padding:10px 12px;';
var ic = document.createElement('div');
ic.style.cssText = 'width:36px;height:36px;border-radius:10px;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:'+svc.c;
var img = document.createElement('img');
img.src = ICONS[id] || '';
img.style.cssText = 'width:100%;height:100%;object-fit:contain';
img.onerror = function(){ ic.textContent = svc.n.slice(0,1); ic.style.color='#fff'; ic.style.fontWeight='700'; };
ic.appendChild(img);
row.appendChild(ic);
var nm = document.createElement('div');
nm.style.cssText = 'flex:1;font-size:14px;font-weight:600;color:#141720';
nm.textContent = svc.n;
row.appendChild(nm);
var num = document.createElement('div');
num.style.cssText = 'font-size:11px;color:#1f2430;flex-shrink:0';
num.textContent = (idx+1)+'번';
row.appendChild(num);
var up = document.createElement('button');
up.textContent = '▲';
up.disabled = idx === 0;
up.style.cssText = 'width:30px;height:30px;border-radius:8px;border:1px solid rgba(0,0,0,.28);background:rgba(0,0,0,.2);color:'+(idx===0?'rgba(0,0,0,.28)':'#141720')+';font-size:13px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center';
up.onclick = function(){
var tmp=customOrder[idx]; customOrder[idx]=customOrder[idx-1]; customOrder[idx-1]=tmp;
renderCustomList();
};
row.appendChild(up);
var dn = document.createElement('button');
dn.textContent = '▼';
dn.disabled = idx === customOrder.length-1;
dn.style.cssText = 'width:30px;height:30px;border-radius:8px;border:1px solid rgba(0,0,0,.28);background:rgba(0,0,0,.2);color:'+(idx===customOrder.length-1?'rgba(0,0,0,.28)':'#141720')+';font-size:13px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center';
dn.onclick = function(){
var tmp=customOrder[idx]; customOrder[idx]=customOrder[idx+1]; customOrder[idx+1]=tmp;
renderCustomList();
};
row.appendChild(dn);
list.appendChild(row);
})(i);
}
}
function saveCustomOrder(){
lsS(APP_ORDER_KEY, customOrder);
applyCustomOrder();
closeCustom();
showToast('✅ 앱 순서가 저장됐어!','linear-gradient(135deg,#00e5ff,#7b61ff)');
}
function resetCustomOrder(){
customOrder = SV.map(function(s){return s.id;});
lsS(APP_ORDER_KEY, []);
renderCustomList();
showToast('🔄 기본 순서로 초기화됐어!','rgba(0,0,0,.85)');
}
function applyCustomOrder(){
var saved = lsG(APP_ORDER_KEY, []);
if(saved.length === 0) return;
var newSV = [];
for(var i=0;i<saved.length;i++){
for(var j=0;j<SV.length;j++){
if(SV[j].id === saved[i]){ newSV.push(SV[j]); break; }
}
}
for(var j=0;j<SV.length;j++){
if(saved.indexOf(SV[j].id) < 0) newSV.push(SV[j]);
}
if(newSV.length > 0) SV = newSV;
for(var i=0;i<SV.length;i++) SM[SV[i].id] = SV[i];
}
var ALIMTALK_KEY='podoai_alimtalk';
function openKakaoAlimtalk(){
var s=lsG(ALIMTALK_KEY,null);
if(s){document.getElementById('alimtalk-apikey').value=s.apikey||'';document.getElementById('alimtalk-sender').value=s.sender||'';}
document.getElementById('alimtalk-err').style.display='none';
document.getElementById('alimtalkbg').style.display='flex';
history.pushState({p:true},'','');
}
function closeAlimtalk(){document.getElementById('alimtalkbg').style.display='none';history.pushState({p:true},'','');}
function saveAlimtalkKey(){
var k=document.getElementById('alimtalk-apikey').value.trim();
if(!k){showToast('API 키를 입력해줘','rgba(0,0,0,.85)');return;}
lsS(ALIMTALK_KEY,{apikey:k,sender:document.getElementById('alimtalk-sender').value.trim()});
showToast('✅ 저장됐어!','rgba(255,205,0,.9)');
}
function relayUrl(){ return lsG('podoai_relay_url','') || lsG('podoai_sub_server_url',''); }
function sendAlimtalk(){
var cfg=lsG(ALIMTALK_KEY,null),to=document.getElementById('alimtalk-to').value.trim().replace(/-/g,''),msg=document.getElementById('alimtalk-msg').value.trim(),err=document.getElementById('alimtalk-err');
if(!cfg||!cfg.apikey){err.textContent='⚠️ API 키를 먼저 설정해줘';err.style.display='block';return;}
if(!to||to.length<10){err.textContent='⚠️ 전화번호를 입력해줘';err.style.display='block';return;}
if(!msg){err.textContent='⚠️ 메시지를 입력해줘';err.style.display='block';return;}
err.style.display='none';
var serverUrl=relayUrl();
if(!serverUrl){err.textContent='⚠️ Apps Script 서버 URL 설정 필요';err.style.display='block';return;}
fetch(serverUrl+'?action=alimtalk&to='+encodeURIComponent(to)+'&msg='+encodeURIComponent(msg)+'&apikey='+encodeURIComponent(cfg.apikey)+'&sender='+encodeURIComponent(cfg.sender||''))
.then(function(r){return r.json();}).then(function(d){
if(d.success||d.resultCode==='0000'){document.getElementById('alimtalk-to').value='';document.getElementById('alimtalk-msg').value='';closeAlimtalk();showToast('✅ 알림톡 발송 완료!','rgba(255,205,0,.9)');}
else{err.textContent='❌ '+(d.message||'발송 실패');err.style.display='block';}
}).catch(function(e){err.textContent='❌ 서버 오류: '+e.message;err.style.display='block';});
}
var SMS_KEY='podoai_naver_sms';
function openNaverSMS(){
var s=lsG(SMS_KEY,null);
if(s){document.getElementById('sms-access-key').value=s.accessKey||'';document.getElementById('sms-secret-key').value=s.secretKey||'';document.getElementById('sms-service-id').value=s.serviceId||'';document.getElementById('sms-from').value=s.from||'';}
document.getElementById('sms-err').style.display='none';
document.getElementById('sms-count').textContent='(0/90)';
document.getElementById('sms-type').textContent='SMS';
document.getElementById('smsbg').style.display='flex';
history.pushState({p:true},'','');
}
function closeSMS(){document.getElementById('smsbg').style.display='none';history.pushState({p:true},'','');}
function saveSMSKey(){
var d={accessKey:document.getElementById('sms-access-key').value.trim(),secretKey:document.getElementById('sms-secret-key').value.trim(),serviceId:document.getElementById('sms-service-id').value.trim(),from:document.getElementById('sms-from').value.trim().replace(/-/g,'')};
if(!d.accessKey||!d.secretKey||!d.serviceId||!d.from){showToast('모든 항목을 입력해줘','rgba(0,0,0,.85)');return;}
lsS(SMS_KEY,d);showToast('✅ SMS 설정 저장됐어!','rgba(3,199,90,.9)');
}
function updateSMSCount(){
var len=document.getElementById('sms-msg').value.length;
var c=document.getElementById('sms-count'),t=document.getElementById('sms-type');
if(c)c.textContent='('+len+(len>90?'/LMS':'/90')+')';
if(t){t.textContent=len>90?'LMS':'SMS';t.style.color=len>90?'#f59e0b':'#1f2430';}
}
function sendSMS(){
var cfg=lsG(SMS_KEY,null),to=document.getElementById('sms-to').value.trim().replace(/-/g,''),msg=document.getElementById('sms-msg').value.trim(),err=document.getElementById('sms-err');
if(!cfg||!cfg.accessKey){err.textContent='⚠️ API 키를 먼저 설정해줘';err.style.display='block';return;}
if(!to||to.length<10){err.textContent='⚠️ 전화번호를 입력해줘';err.style.display='block';return;}
if(!msg){err.textContent='⚠️ 메시지를 입력해줘';err.style.display='block';return;}
err.style.display='none';
var serverUrl=relayUrl();
if(!serverUrl){err.textContent='⚠️ Apps Script 서버 URL 설정 필요';err.style.display='block';return;}
var type=msg.length>90?'LMS':'SMS';
fetch(serverUrl+'?action=sms&to='+encodeURIComponent(to)+'&msg='+encodeURIComponent(msg)+'&type='+type+'&accessKey='+encodeURIComponent(cfg.accessKey)+'&secretKey='+encodeURIComponent(cfg.secretKey)+'&serviceId='+encodeURIComponent(cfg.serviceId)+'&from='+encodeURIComponent(cfg.from))
.then(function(r){return r.json();}).then(function(d){
if(d.statusCode==='202'||d.success){document.getElementById('sms-to').value='';document.getElementById('sms-msg').value='';updateSMSCount();closeSMS();showToast('✅ '+type+' 발송 완료!','linear-gradient(135deg,#03C75A,#02a34d)');}
else{err.textContent='❌ '+(d.statusName||d.message||'발송 실패');err.style.display='block';}
}).catch(function(e){err.textContent='❌ 서버 오류: '+e.message;err.style.display='block';});
}
var CARDS_KEY = 'podoai_cards';
var cardImageBase64 = null;
function getCards(){ return lsG(CARDS_KEY, []); }
function updateCardCountUI(){
var cards = getCards();
var sub = document.getElementById('card-count-sub');
if(sub) sub.textContent = cards.length > 0 ? cards.length + '개 저장됨' : '스캔한 명함 보기/관리';
}
function openCardScanner(){
cardImageBase64 = null;
document.getElementById('card-preview-wrap').style.display = 'none';
document.getElementById('card-scan-btn').style.display = 'none';
var _cvn0=document.getElementById('card-vision-note'); if(_cvn0) _cvn0.style.display='none';
document.getElementById('card-result-wrap').style.display = 'none';
document.getElementById('card-err').style.display = 'none';
document.getElementById('card-upload-area').style.display = 'block';
document.getElementById('cardscan-bg').style.display = 'flex';
history.pushState({p:true},'','');
}
function closeCardScanner(){
document.getElementById('cardscan-bg').style.display = 'none';
history.pushState({p:true},'','');
}
function onCardImageSelected(e){
var file = e.target.files[0];
if(!file) return;
var reader = new FileReader();
reader.onload = function(ev){
cardImageBase64 = ev.target.result.split(',')[1];
var img = document.getElementById('card-preview-img');
img.src = ev.target.result;
document.getElementById('card-upload-area').style.display = 'none';
document.getElementById('card-preview-wrap').style.display = 'block';
document.getElementById('card-scan-btn').style.display = 'block';
var _cvn=document.getElementById('card-vision-note'); if(_cvn) _cvn.style.display='block';
document.getElementById('card-result-wrap').style.display = 'none';
document.getElementById('card-err').style.display = 'none';
};
reader.readAsDataURL(file);
}
function scanCardWithAI(){
if(!cardImageBase64){ showToast('먼저 명함 사진을 선택해줘','rgba(0,0,0,.85)'); return; }
var errEl=document.getElementById('card-err');
if(errEl) errEl.style.display='none';
var btn = document.getElementById('card-scan-btn');
btn.textContent = '⏳ AI 분석 중...'; btn.disabled = true;
var prompt = '이 명함 이미지에서 다음 정보를 JSON으로만 추출해줘. 없는 항목은 빈 문자열로.\n\n{"name":"이름","company":"회사명","title":"직책","phone":"전화번호(대표 1개)","email":"이메일","address":"주소","website":"웹사이트"}';
studyVision(prompt, cardImageBase64, 'image/jpeg', function(text){
btn.textContent = '🤖 AI로 명함 정보 추출하기'; btn.disabled = false;
try{
var m=(text||'').match(/\{[\s\S]*\}/); if(!m) throw new Error('정보를 읽지 못했어요. 다시 시도해줘.');
var info=JSON.parse(m[0]);
document.getElementById('card-name').value    = info.name    || '';
document.getElementById('card-company').value = info.company || '';
document.getElementById('card-title').value   = info.title   || '';
document.getElementById('card-phone').value   = info.phone   || '';
document.getElementById('card-email').value   = info.email   || '';
document.getElementById('card-address').value = info.address || '';
document.getElementById('card-memo').value    = '';
document.getElementById('card-result-wrap').style.display = 'block';
if(errEl) errEl.style.display = 'none';
showToast('✅ 명함 정보 추출 완료!','linear-gradient(135deg,#00e5ff,#7b61ff)');
}catch(err){
if(errEl){ errEl.textContent='❌ '+err.message; errEl.style.display='block'; }
}
}, function(err){
btn.textContent = '🤖 AI로 명함 정보 추출하기'; btn.disabled = false;
if(errEl){ errEl.textContent='⚠️ '+((err&&err.message)||'분석 실패'); errEl.style.display='block'; }
}, true);
}
function callCardPhone(){
var phone = document.getElementById('card-phone').value.trim().replace(/\s/g,'');
if(!phone){ showToast('전화번호가 없어요','rgba(0,0,0,.85)'); return; }
window.location.href = 'tel:' + phone;
}
function smsCardPhone(){
var phone = document.getElementById('card-phone').value.trim().replace(/\s/g,'');
if(!phone){ showToast('전화번호가 없어요','rgba(0,0,0,.85)'); return; }
window.location.href = 'sms:' + phone;
}
function emailCard(){
var email = document.getElementById('card-email').value.trim();
if(!email){ showToast('이메일이 없어요','rgba(0,0,0,.85)'); return; }
window.location.href = 'mailto:' + email;
}
function saveCard(){
var name = document.getElementById('card-name').value.trim();
if(!name){ showToast('이름을 입력해줘','rgba(0,0,0,.85)'); return; }
var card = {
id: 'card_' + Date.now(),
name:    name,
company: document.getElementById('card-company').value.trim(),
title:   document.getElementById('card-title').value.trim(),
phone:   document.getElementById('card-phone').value.trim(),
email:   document.getElementById('card-email').value.trim(),
address: document.getElementById('card-address').value.trim(),
memo:    document.getElementById('card-memo').value.trim(),
date:    new Date().toLocaleDateString('ko-KR'),
img:     cardImageBase64 ? 'data:image/jpeg;base64,' + cardImageBase64 : null
};
var cards = getCards();
cards.unshift(card);
lsS(CARDS_KEY, cards);
updateCardCountUI();
closeCardScanner();
showToast('📇 ' + name + ' 명함이 저장됐어!','linear-gradient(135deg,#00e5ff,#7b61ff)');
}
function openCardList(){
renderCardList('');
document.getElementById('cardlist-bg').style.display = 'flex';
document.getElementById('cardlist-search').value = '';
history.pushState({p:true},'','');
}
function closeCardList(){
document.getElementById('cardlist-bg').style.display = 'none';
history.pushState({p:true},'','');
}
function filterCards(){
var q = document.getElementById('cardlist-search').value.trim();
renderCardList(q);
}
function renderCardList(query){
var wrap = document.getElementById('cardlist-wrap');
var countEl = document.getElementById('cardlist-count');
var cards = getCards();
var filtered = query
? cards.filter(function(c){ return (c.name+c.company+c.phone+c.email).toLowerCase().indexOf(query.toLowerCase()) >= 0; })
: cards;
if(countEl) countEl.textContent = filtered.length + '개';
wrap.innerHTML = '';
if(!filtered.length){
wrap.innerHTML = '<div style="text-align:center;padding:30px;color:#1f2430;font-size:13px">'+(query?'검색 결과가 없어요':'저장된 명함이 없어요<br><span style="font-size:11px;color:rgba(0,0,0,.28)">마이 탭 → 명함 스캔에서 추가해줘</span>')+'</div>';
return;
}
filtered.forEach(function(card){
var el = document.createElement('div');
el.style.cssText = 'background:rgba(0,0,0,.16);border:1px solid rgba(0,0,0,.24);border-radius:14px;padding:13px 14px;cursor:pointer;transition:background .15s';
el.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px">'
+'<div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#00e5ff,#7b61ff);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#16181f;flex-shrink:0">'+(card.name||'?').slice(0,1)+'</div>'
+'<div style="flex:1;min-width:0">'
+'<div style="font-size:14px;font-weight:700;color:#141720">'+(card.name||'이름없음')+'</div>'
+'<div style="font-size:13px;color:#1f2430;margin-top:2px">'+(card.company?card.company+(card.title?' · '+card.title:''):card.title||'')+'</div>'
+'<div style="font-size:13px;color:#252a39;margin-top:2px">'+(card.phone||card.email||'')+'</div>'
+'</div>'
+'<div style="font-size:10px;color:#1f2430;text-align:right;flex-shrink:0">'+(card.date||'')+'<br>'
+'<button onclick="event.stopPropagation();deleteCard(\''+card.id+'\')" style="margin-top:4px;background:rgba(239,68,68,.1);border:none;border-radius:6px;padding:3px 8px;color:#ef4444;font-size:10px;cursor:pointer;font-family:inherit">삭제</button>'
+'</div>'
+'</div>';
el.onclick = function(){ openCardDetail(card); };
if(card.phone || card.email){
var actions = document.createElement('div');
actions.style.cssText = 'display:flex;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid rgba(0,0,0,.2)';
if(card.phone){
var cBtn = document.createElement('button');
cBtn.style.cssText = 'flex:1;padding:7px;border-radius:9px;border:1px solid rgba(34,197,94,.25);background:rgba(34,197,94,.08);color:#22c55e;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit';
cBtn.innerHTML = '&#128222; 전화';
cBtn.onclick = function(e){ e.stopPropagation(); window.location.href='tel:'+card.phone.replace(/\s/g,''); };
actions.appendChild(cBtn);
var sBtn = document.createElement('button');
sBtn.style.cssText = 'flex:1;padding:7px;border-radius:9px;border:1px solid rgba(59,130,246,.25);background:rgba(59,130,246,.08);color:#3b82f6;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit';
sBtn.innerHTML = '&#128172; 문자';
sBtn.onclick = function(e){ e.stopPropagation(); window.location.href='sms:'+card.phone.replace(/\s/g,''); };
actions.appendChild(sBtn);
}
if(card.email){
var eBtn = document.createElement('button');
eBtn.style.cssText = 'flex:1;padding:7px;border-radius:9px;border:1px solid rgba(234,67,53,.25);background:rgba(234,67,53,.08);color:#EA4335;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit';
eBtn.innerHTML = '&#128140; 메일';
eBtn.onclick = function(e){ e.stopPropagation(); window.location.href='mailto:'+card.email; };
actions.appendChild(eBtn);
}
el.appendChild(actions);
}
wrap.appendChild(el);
});
}
function deleteCard(id){
var cards = getCards().filter(function(c){ return c.id !== id; });
lsS(CARDS_KEY, cards);
updateCardCountUI();
renderCardList(document.getElementById('cardlist-search').value);
showToast('🗑️ 명함이 삭제됐어요','rgba(0,0,0,.85)');
}
function openCardDetail(card){
var title = document.getElementById('carddetail-title');
var content = document.getElementById('carddetail-content');
if(title) title.textContent = card.name || '명함 상세';
var rows = [
{label:'이름', value:card.name},
{label:'회사', value:card.company},
{label:'직책', value:card.title},
{label:'전화', value:card.phone},
{label:'이메일', value:card.email},
{label:'주소', value:card.address},
{label:'메모', value:card.memo},
{label:'등록일', value:card.date}
];
var html = '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">';
rows.forEach(function(r){
if(!r.value) return;
html += '<div style="display:flex;gap:12px;padding:10px;background:rgba(0,0,0,.16);border-radius:10px">'
+'<div style="font-size:11px;color:#1f2430;width:44px;flex-shrink:0;padding-top:1px">'+r.label+'</div>'
+'<div style="font-size:13px;color:#141720;flex:1;word-break:break-all">'+r.value+'</div>'
+'</div>';
});
html += '</div>';
if(card.img){
html += '<img src="'+card.img+'" style="width:100%;border-radius:12px;margin-bottom:14px;object-fit:contain;max-height:160px;background:#eef0f7" alt="명함">';
}
html += '<div style="display:flex;gap:8px">';
if(card.phone){
html += '<button onclick="window.location.href=\'tel:\'+\''+card.phone.replace(/\s/g,'')+'\'" style="flex:1;padding:12px;border-radius:12px;border:1px solid rgba(34,197,94,.3);background:rgba(34,197,94,.1);color:#22c55e;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">&#128222; 전화</button>';
html += '<button onclick="window.location.href=\'sms:\'+\''+card.phone.replace(/\s/g,'')+'\'" style="flex:1;padding:12px;border-radius:12px;border:1px solid rgba(59,130,246,.3);background:rgba(59,130,246,.1);color:#3b82f6;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">&#128172; 문자</button>';
}
if(card.email){
html += '<button onclick="window.location.href=\'mailto:'+card.email+'\'" style="flex:1;padding:12px;border-radius:12px;border:1px solid rgba(234,67,53,.3);background:rgba(234,67,53,.1);color:#EA4335;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">&#128140; 메일</button>';
}
html += '</div>';
if(content) content.innerHTML = html;
document.getElementById('carddetail-bg').style.display = 'flex';
history.pushState({p:true},'','');
}
function closeCardDetail(){
document.getElementById('carddetail-bg').style.display = 'none';
history.pushState({p:true},'','');
}
var MY_APPS_KEY='podoai_my_apps';
var addAppCat='검색';
var addAppColor='#00e5ff';
function getMyApps(){ return lsG(MY_APPS_KEY,[]); }
function makeIconSVG(color,text){
var letter=(text||'앱').slice(0,2);
return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="18" fill="'+color+'"/><text x="29" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="white" font-family="Apple SD Gothic Neo,Noto Sans KR,sans-serif">'+letter+'</text></svg>');
}
function updateMyAppCountUI(){
var apps=getMyApps();
var sub=document.getElementById('custom-app-count-sub');
var sub2=document.getElementById('my-app-list-sub');
if(sub)sub.textContent=apps.length>0?apps.length+'개 등록됨':'카테고리에 앱 직접 등록';
if(sub2)sub2.textContent=apps.length>0?apps.length+'개 등록됨':'추가한 앱 보기/삭제';
}
var APP_DB=JSON.parse('{"틱톡":{"url":"https://www.tiktok.com","cat":"영상","color":"#010101"},"트위치":{"url":"https://www.twitch.tv","cat":"영상","color":"#9146FF"},"밴드":{"url":"https://band.us","cat":"메시지","color":"#00C73C"},"당근":{"url":"https://www.daangn.com","cat":"쇼핑","color":"#FF6F0F"},"올리브영":{"url":"https://www.oliveyoung.co.kr","cat":"쇼핑","color":"#6AAB3B"},"무신사":{"url":"https://www.musinsa.com","cat":"쇼핑","color":"#111111"},"에이블리":{"url":"https://www.a-bly.com","cat":"쇼핑","color":"#FF5C8A"},"오늘의집":{"url":"https://ohou.se","cat":"쇼핑","color":"#3CC8C8"},"번개장터":{"url":"https://www.bunjang.co.kr","cat":"쇼핑","color":"#F15A2B"},"스타벅스":{"url":"https://www.starbucks.co.kr","cat":"검색","color":"#00704A"},"배달의민족":{"url":"https://www.baemin.com","cat":"배달","color":"#2AC1BC"},"요기요":{"url":"https://www.yogiyo.co.kr","cat":"배달","color":"#FA0050"},"쿠팡이츠":{"url":"https://www.coupangeats.com","cat":"배달","color":"#C00000"},"멜론":{"url":"https://www.melon.com","cat":"음악","color":"#00CD3C"},"지니":{"url":"https://www.genie.co.kr","cat":"음악","color":"#1C3F94"},"왓챠":{"url":"https://watcha.com","cat":"영상","color":"#FF0558"},"넷플릭스":{"url":"https://www.netflix.com","cat":"영상","color":"#E50914"},"인스타그램":{"url":"https://www.instagram.com","cat":"메시지","color":"#E1306C"},"인스타":{"url":"https://www.instagram.com","cat":"메시지","color":"#E1306C"},"트위터":{"url":"https://x.com","cat":"메시지","color":"#1DA1F2"},"페이스북":{"url":"https://www.facebook.com","cat":"메시지","color":"#1877F2"},"라인":{"url":"https://line.me","cat":"연락","color":"#06C755"},"텔레그램":{"url":"https://web.telegram.org","cat":"연락","color":"#2AABEE"},"줌":{"url":"https://zoom.us","cat":"연락","color":"#2D8CFF"},"토스":{"url":"https://toss.im","cat":"금융","color":"#0064FF"},"카카오페이":{"url":"https://www.kakaopay.com","cat":"금융","color":"#FFCD00"}}');
function searchAppInfo(){
var name=document.getElementById('addapp-name').value.trim();
if(!name){var e=document.getElementById('addapp-err');e.textContent='앱 이름을 입력해줘';e.style.display='block';return;}
document.getElementById('addapp-err').style.display='none';
document.getElementById('addapp-search-result').style.display='none';
document.getElementById('addapp-notfound').style.display='none';
document.getElementById('addapp-url-wrap').style.display='none';
var btn=document.getElementById('addapp-search-btn');
btn.textContent='⏳ 찾는 중...';btn.disabled=true;
setTimeout(function(){
btn.textContent='🔍 찾기';btn.disabled=false;
var key=name.toLowerCase().replace(/\s/g,'');
var dbMatch=null;
for(var k in APP_DB){
if(k.replace(/\s/g,'')===key||name.indexOf(k)>=0||k.indexOf(name)>=0){dbMatch=APP_DB[k];break;}
}
if(dbMatch){
showFoundApp(name,dbMatch.url,dbMatch.cat,dbMatch.color);
} else {
document.getElementById('addapp-notfound').style.display='block';
document.getElementById('addapp-url-wrap').style.display='block';
}
},400);
}
function showFoundApp(name,url,cat,color){
var cats=document.querySelectorAll('.addapp-cat');
for(var i=0;i<cats.length;i++){cats[i].classList.remove('on');if(cats[i].textContent===cat){cats[i].classList.add('on');addAppCat=cat;}}
addAppColor=color||'#00e5ff';
var ic=document.getElementById('addapp-found-ic');
var nm=document.getElementById('addapp-found-name');
var ul=document.getElementById('addapp-found-url');
var ct=document.getElementById('addapp-found-cat');
if(ic){ic.style.background=addAppColor;ic.textContent=(name||'앱').slice(0,2);}
if(nm)nm.textContent=name;
if(ul)ul.textContent=url;
if(ct)ct.textContent='📂 '+cat+' 카테고리';
document.getElementById('addapp-name').value=name;
var urlEl=document.getElementById('addapp-url');if(urlEl)urlEl.value=url;
document.getElementById('addapp-search-result').style.display='block';
updateAddAppPreview();
}
function editAddAppUrl(){
document.getElementById('addapp-url-wrap').style.display='block';
var u=document.getElementById('addapp-url');if(u)u.focus();
}
function openPlayStore(){
var name=(document.getElementById('addapp-name').value||'앱').trim();
openUrl('https://play.google.com/store/search?q='+encodeURIComponent(name)+'&c=apps');
}
function openUrlGuide(){var g=document.getElementById('url-guide-sheet');if(g){g.style.display='flex';history.pushState({p:true},'','');}}
function closeUrlGuide(){var g=document.getElementById('url-guide-sheet');if(g){g.style.display='none';history.pushState({p:true},'','');}}
function openAddApp(){
var n=document.getElementById('addapp-name');if(n)n.value='';
var e=document.getElementById('addapp-err');if(e)e.style.display='none';
document.getElementById('addapp-search-result').style.display='none';
document.getElementById('addapp-notfound').style.display='none';
document.getElementById('addapp-url-wrap').style.display='none';
var u=document.getElementById('addapp-url');if(u)u.value='';
addAppCat='검색';addAppColor='#00e5ff';
var cats=document.querySelectorAll('.addapp-cat');for(var i=0;i<cats.length;i++)cats[i].classList.remove('on');
var fc=document.querySelector('.addapp-cat');if(fc)fc.classList.add('on');
var colors=document.querySelectorAll('.addapp-color');for(var i=0;i<colors.length;i++)colors[i].classList.remove('on');
var fco=document.querySelector('.addapp-color');if(fco)fco.classList.add('on');
updateAddAppPreview();
var ni=document.getElementById('addapp-name');if(ni)ni.oninput=function(){document.getElementById('addapp-search-result').style.display='none';updateAddAppPreview();};
document.getElementById('addappbg').style.display='flex';history.pushState({p:true},'','');
}
function closeAddApp(){document.getElementById('addappbg').style.display='none';history.pushState({p:true},'','');}
function selAddCat(el,cat){addAppCat=cat;var cats=document.querySelectorAll('.addapp-cat');for(var i=0;i<cats.length;i++)cats[i].classList.remove('on');el.classList.add('on');updateAddAppPreview();}
function selAddColor(el,color){addAppColor=color;var colors=document.querySelectorAll('.addapp-color');for(var i=0;i<colors.length;i++)colors[i].classList.remove('on');el.classList.add('on');updateAddAppPreview();}
function updateAddAppPreview(){
var nm=(document.getElementById('addapp-name')||{}).value||'앱 이름';nm=nm.trim()||'앱 이름';
var ic=document.getElementById('addapp-preview-ic');var pn=document.getElementById('addapp-preview-name');var pc=document.getElementById('addapp-preview-cat');
if(ic){ic.style.background=addAppColor;ic.textContent=nm.slice(0,2);}
if(pn)pn.textContent=nm;if(pc)pc.textContent=addAppCat+' 카테고리';
}
function saveAddApp(){
var name=(document.getElementById('addapp-name').value||'').trim();
var urlEl=document.getElementById('addapp-url');
var foundUrl=(document.getElementById('addapp-found-url')||{}).textContent||'';
var url=(urlEl&&urlEl.value.trim())||foundUrl;
var errEl=document.getElementById('addapp-err');
if(!name){errEl.textContent='앱 이름을 입력해줘';errEl.style.display='block';return;}
if(!url){errEl.textContent='앱을 찾거나 URL을 입력해줘';errEl.style.display='block';return;}
if(!url.startsWith('http'))url='https://'+url;
errEl.style.display='none';
var id='myapp_'+Date.now();var h=url;
ICONS[id]=makeIconSVG(addAppColor,name);
var newApp={id:id,n:name,c:addAppColor,cat:addAppCat,nt:'',h:h,_isCustom:true,
s:(function(u){return function(q){return u+(u.indexOf('?')>=0?'&':'?')+'q='+encodeURIComponent(q);};})(h),
lk:(function(u){return [{e:'🔗',t:'열기',u:function(q){return u;}}];})(h)};
SV.push(newApp);SM[id]=newApp;
var apps=getMyApps();apps.push({id:id,n:name,c:addAppColor,cat:addAppCat,nt:'',h:h,_isCustom:true});lsS(MY_APPS_KEY,apps);
closeAddApp();updateMyAppCountUI();
actCat=addAppCat;showHome();
showToast('✅ '+name+' 이 '+addAppCat+' 카테고리에 추가됐어!','linear-gradient(135deg,#00e5ff,#7b61ff)');
}
function openMyAppList(){renderMyAppList();document.getElementById('myapplistbg').style.display='flex';history.pushState({p:true},'','');}
function closeMyAppList(){document.getElementById('myapplistbg').style.display='none';history.pushState({p:true},'','');}
function renderMyAppList(){
var list=document.getElementById('my-app-list'),count=document.getElementById('my-app-count');
var apps=getMyApps();if(count)count.textContent=apps.length+'개';list.innerHTML='';
if(!apps.length){list.innerHTML='<div style="text-align:center;padding:30px;color:#1f2430;font-size:13px">추가한 앱이 없어요</div>';return;}
apps.forEach(function(app){
var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:12px;background:rgba(0,0,0,.16);border:1px solid rgba(0,0,0,.24);border-radius:12px;padding:11px 13px;';
var ic=document.createElement('div');ic.style.cssText='width:38px;height:38px;border-radius:11px;background:'+app.c+';display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#16181f;flex-shrink:0';ic.textContent=(app.n||'앱').slice(0,2);row.appendChild(ic);
var info=document.createElement('div');info.style.cssText='flex:1;min-width:0';
var nm=document.createElement('div');nm.style.cssText='font-size:14px;font-weight:700;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';nm.textContent=app.n;
var ct=document.createElement('div');ct.style.cssText='font-size:13.5px;color:#141720;margin-top:3px';ct.textContent=app.cat+' · '+app.h.replace('https://','').slice(0,22);
info.appendChild(nm);info.appendChild(ct);row.appendChild(info);
var del=document.createElement('button');del.style.cssText='background:rgba(239,68,68,.12);border:none;border-radius:8px;padding:6px 10px;color:#ef4444;font-size:12px;cursor:pointer;font-family:inherit;flex-shrink:0';del.textContent='삭제';
del.onclick=function(){deleteMyApp(app.id);};row.appendChild(del);list.appendChild(row);
});
}
function deleteMyApp(id){
lsS(MY_APPS_KEY,getMyApps().filter(function(a){return a.id!==id;}));
SV=SV.filter(function(s){return s.id!==id;});delete SM[id];delete ICONS[id];
renderMyAppList();updateMyAppCountUI();showHome();
showToast('🗑️ 앱이 삭제됐어!','rgba(0,0,0,.85)');
}
function openGDocs(){ openGoogleWorkspace('docs'); }
function openGSheets(){ openGoogleWorkspace('sheets'); }
function openGoogleWorkspace(type){
var cfgs={
docs:{title:'Google Docs',color:'#4285F4',border:'rgba(66,133,244,.25)',
newUrl:'https://docs.google.com/document/create',
listUrl:'https://docs.google.com/document/u/0/',
icon:'📄',desc:'문서 작성 · 편집 · 공유'},
sheets:{title:'Google Sheets',color:'#0F9D58',border:'rgba(15,157,88,.25)',
newUrl:'https://docs.google.com/spreadsheets/create',
listUrl:'https://docs.google.com/spreadsheets/u/0/',
icon:'📊',desc:'스프레드시트 작성 · 편집 · 공유'}
};
var cfg=cfgs[type]; if(!cfg)return;
var bg=document.getElementById('gworkspace-bg'); if(!bg)return;
var t=document.getElementById('gworkspace-title'); if(t)t.textContent=cfg.icon+' '+cfg.title;
var nb=document.getElementById('gworkspace-new-btn');
if(nb){nb.style.background='linear-gradient(135deg,'+cfg.color+','+cfg.color+'bb)';nb.textContent='+ 새 '+(type==='docs'?'문서':'시트')+' 만들기';nb.onclick=function(){openUrl(cfg.newUrl);};}
var lb=document.getElementById('gworkspace-list-btn');
if(lb){lb.style.color=cfg.color;lb.textContent='📂 내 '+(type==='docs'?'문서':'시트')+' 목록';lb.onclick=function(){openUrl(cfg.listUrl);};}
var al=document.getElementById('gworkspace-ai-label');
if(al)al.textContent='🤖 AI로 '+(type==='docs'?'문서 초안':'시트 구조')+' 작성';
var ai=document.getElementById('gworkspace-ai-input');
if(ai){ai.value='';ai.placeholder=type==='docs'?'예) 회의록, 사업계획서, 자기소개서':'예) 월별매출정리, 가계부, 일정표';}
var res=document.getElementById('gworkspace-ai-result');if(res)res.style.display='none';
var ab=document.getElementById('gworkspace-ai-btn');
if(ab)ab.onclick=function(){
var input=document.getElementById('gworkspace-ai-input').value.trim();
if(!input){showToast('내용을 입력해줘','rgba(0,0,0,.85)');return;}
var resEl=document.getElementById('gworkspace-ai-result');
resEl.style.display='block';resEl.textContent='⏳ AI 작성 중...';
var prompt=type==='docs'
?'"'+input+'" 주제로 Google Docs에 쓸 문서 초안을 작성해줘.'
:'"'+input+'" 주제로 Google Sheets 열 이름과 예시 데이터 2~3행을 작성해줘.';
callAI({system:type==='docs'?'한국어 문서 작성 전문가.':'스프레드시트 전문가. 표 형태로 작성.',
messages:[{role:'user',content:prompt}],maxTokens:600},
function(text){
resEl.textContent=text;
if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){showToast('📋 복사됐어! 문서에 붙여넣어줘','linear-gradient(135deg,'+cfg.color+','+cfg.color+'cc)');});}
openUrl(cfg.newUrl);
},function(){resEl.textContent='AI 불가. API 키를 설정해줘.';});
};
bg.style.display='flex';history.pushState({p:true},'','');
}
function closeGWorkspace(){document.getElementById('gworkspace-bg').style.display='none';history.pushState({p:true},'','');}
var naviMode='car';
var NAVI_RECENT_KEY='podoai_navi_recent';
function openNaverNavi(){
naviMode='car';
var modes=document.querySelectorAll('.navi-mode');
for(var i=0;i<modes.length;i++) modes[i].classList.remove('on');
var first=document.querySelector('.navi-mode');if(first)first.classList.add('on');
var f=document.getElementById('navi-from');if(f){f.value='';delete f.dataset.lat;delete f.dataset.lng;}
var t=document.getElementById('navi-to');if(t)t.value='';
document.getElementById('navi-err').style.display='none';
renderNaviRecent();
document.getElementById('navinbg').style.display='flex';
history.pushState({p:true},'','');
setTimeout(function(){var t=document.getElementById('navi-to');if(t)t.focus();},300);
}
function openNaverNaviGPS(){openNaverNavi();useMyLocForNavi();}
function closeNavin(){document.getElementById('navinbg').style.display='none';history.pushState({p:true},'','');}
function selNaviMode(el,mode){
naviMode=mode;
var modes=document.querySelectorAll('.navi-mode');
for(var i=0;i<modes.length;i++) modes[i].classList.remove('on');
el.classList.add('on');
}
function useMyLocForNavi(){
if(!navigator.geolocation){showToast('위치 권한이 필요해요','rgba(0,0,0,.85)');return;}
var f=document.getElementById('navi-from');if(f)f.value='📡 위치 확인 중...';
navigator.geolocation.getCurrentPosition(function(pos){
var lat=pos.coords.latitude.toFixed(6),lng=pos.coords.longitude.toFixed(6);
if(f){f.value='현재 위치 ('+lat+','+lng+')';f.dataset.lat=lat;f.dataset.lng=lng;}
},function(){if(f)f.value='';showToast('⚠️ 위치 권한을 허용해줘','rgba(0,0,0,.85)');});
}
function startNavi(){
var toEl=document.getElementById('navi-to'),fromEl=document.getElementById('navi-from');
var errEl=document.getElementById('navi-err');
var to=toEl?toEl.value.trim():'',from=fromEl?fromEl.value.trim():'';
if(!to){errEl.textContent='⚠️ 목적지를 입력해줘';errEl.style.display='block';return;}
errEl.style.display='none';
var recent=lsG(NAVI_RECENT_KEY,[]);
recent=recent.filter(function(r){return r!==to;});recent.unshift(to);
if(recent.length>6)recent=recent.slice(0,6);lsS(NAVI_RECENT_KEY,recent);
var fromPart='-';
if(fromEl&&fromEl.dataset.lat&&fromEl.dataset.lng){
fromPart=fromEl.dataset.lat+','+fromEl.dataset.lng+',현재+위치';
} else if(from&&!from.startsWith('📡')){
fromPart=encodeURIComponent(from);
}
var url='https://map.naver.com/p/directions/'+fromPart+'/'+encodeURIComponent(to)+'/'+naviMode;
closeNavin();
openUrl(url);
showToast('🧭 내비게이션 시작!','linear-gradient(135deg,#03C75A,#02a34d)');
}
function renderNaviRecent(){
var recent=lsG(NAVI_RECENT_KEY,[]);
var wrap=document.getElementById('navi-recent-wrap'),list=document.getElementById('navi-recent-list');
if(!wrap||!list)return;
if(recent.length===0){wrap.style.display='none';return;}
wrap.style.display='block';list.innerHTML='';
recent.forEach(function(dest){
var btn=document.createElement('button');
btn.style.cssText='padding:6px 11px;border-radius:16px;border:1px solid rgba(0,0,0,.28);background:rgba(0,0,0,.2);color:#252a39;font-size:11px;cursor:pointer;font-family:inherit';
btn.textContent='📍 '+dest;
btn.onclick=function(){var t=document.getElementById('navi-to');if(t){t.value=dest;t.focus();}};
list.appendChild(btn);
});
}
var mapMode='naver';
var MAP_CONFIG={
naver:{title:'네이버 지도',color:'#03C75A',border:'rgba(3,199,90,.25)',btnBg:'linear-gradient(135deg,#03C75A,#02a34d)',
search:function(q){return 'https://map.naver.com/p/search/'+encodeURIComponent(q);},
locSearch:function(lat,lng){return 'https://map.naver.com/p/search/주변?c='+lng+','+lat+',15,0,0,0,dh';},
quick:[{e:'🍽',t:'맛집',q:'맛집'},{e:'☕',t:'카페',q:'카페'},{e:'🏥',t:'병원',q:'병원'},{e:'🏧',t:'ATM',q:'ATM'},{e:'⛽',t:'주유소',q:'주유소'},{e:'🅿',t:'주차장',q:'주차장'},{e:'🏪',t:'편의점',q:'편의점'},{e:'💊',t:'약국',q:'약국'}],
funcs:[
{e:'🧭',t:'내비게이션 (목적지 입력)',action:'naver_navi'},
{e:'📍',t:'현재 위치 → 목적지 내비',action:'naver_navi_gps'},
{e:'🚌',t:'대중교통 길찾기',u:'https://map.naver.com/p/directions/-/-/transit'},
{e:'🚗',t:'자동차 길찾기',u:'https://map.naver.com/p/directions/-/-/car'},
{e:'🚶',t:'도보 길찾기',u:'https://map.naver.com/p/directions/-/-/walk'},
{e:'🚲',t:'자전거 길찾기',u:'https://map.naver.com/p/directions/-/-/bicycle'},
{e:'🗺',t:'지도 전체보기',u:'https://map.naver.com'}
]},
kakao:{title:'카카오 지도',color:'#F9A825',border:'rgba(249,168,37,.25)',btnBg:'linear-gradient(135deg,#F9A825,#e69920)',
search:function(q){return 'https://map.kakao.com/?q='+encodeURIComponent(q);},
locSearch:function(lat,lng){return 'https://map.kakao.com/?map_type=TYPE_MAP&q=현재위치';},
quick:[{e:'🍽',t:'맛집',q:'맛집'},{e:'☕',t:'카페',q:'카페'},{e:'🏥',t:'병원',q:'병원'},{e:'🏧',t:'ATM',q:'ATM'},{e:'⛽',t:'주유소',q:'주유소'},{e:'🅿',t:'주차장',q:'주차장'},{e:'🏪',t:'편의점',q:'편의점'},{e:'💊',t:'약국',q:'약국'}],
funcs:[
{e:'🚌',t:'대중교통 길찾기',u:'https://map.kakao.com/?target=transit'},
{e:'🚗',t:'자동차 길찾기',u:'https://map.kakao.com/?target=car'},
{e:'🚶',t:'도보 길찾기',u:'https://map.kakao.com/?target=walk'},
{e:'👀',t:'로드뷰',u:'https://map.kakao.com/?roadview=true'},
{e:'🗺',t:'지도 전체보기',u:'https://map.kakao.com'}
]}
};
function openMapSearch(mode){
mapMode=mode||'naver';var cfg=MAP_CONFIG[mapMode];
var titleEl=document.getElementById('map-title'); if(titleEl)titleEl.textContent=cfg.title;
var sheet=document.getElementById('map-sheet'); if(sheet)sheet.style.border='1px solid '+cfg.border;
var btn=document.getElementById('map-search-btn'); if(btn)btn.style.background=cfg.btnBg;
var naviSec=document.getElementById('map-navi-section');
if(naviSec) naviSec.style.display=(mapMode==='naver'?'block':'none');
var qbox=document.getElementById('map-quick-btns');
if(qbox){qbox.innerHTML='';cfg.quick.forEach(function(item){var b=document.createElement('button');b.style.cssText='padding:8px 12px;border-radius:20px;border:1px solid rgba(0,0,0,.28);background:rgba(0,0,0,.16);color:#141720;font-size:12px;cursor:pointer;font-family:inherit';b.innerHTML=item.e+' '+item.t;b.onclick=function(){openUrl(cfg.search(item.q));};qbox.appendChild(b);});}
var fbox=document.getElementById('map-func-btns');
if(fbox){fbox.innerHTML='';cfg.funcs.forEach(function(item){
var b=document.createElement('button');
b.style.cssText='width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(0,0,0,.26);background:rgba(0,0,0,.16);color:#141720;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:10px;text-align:left';
b.innerHTML='<span style="font-size:18px">'+item.e+'</span><span>'+item.t+'</span><span style="margin-left:auto;color:#1f2430">&#8250;</span>';
b.onclick=function(){
if(item.action==='naver_navi'){ openNaverNavi(); return; }
if(item.action==='naver_navi_gps'){ openNaverNaviGPS(); return; }
openUrl(item.u);
};
fbox.appendChild(b);
});}
var inp=document.getElementById('map-search-input');if(inp){inp.value='';inp.focus();}
document.getElementById('mapbg').style.display='flex';history.pushState({p:true},'','');
}
function closeMap(){document.getElementById('mapbg').style.display='none';history.pushState({p:true},'','');}
function doMapSearch(){
var q=document.getElementById('map-search-input').value.trim();
if(!q){showToast('검색어를 입력해줘','rgba(0,0,0,.85)');return;}
openUrl(MAP_CONFIG[mapMode].search(q));
}
function useMyLocation(){
if(!navigator.geolocation){showToast('위치 서비스를 지원하지 않아요','rgba(0,0,0,.85)');return;}
showToast('📡 위치 확인 중...','rgba(0,0,0,.85)');
navigator.geolocation.getCurrentPosition(function(pos){
var cfg=MAP_CONFIG[mapMode],q=document.getElementById('map-search-input').value.trim();
openUrl(q?cfg.search(q):cfg.locSearch(pos.coords.latitude,pos.coords.longitude));
},function(){showToast('⚠️ 위치 권한을 허용해줘','rgba(0,0,0,.85)');});
}
var GCAL_KEY='podoai_gcal_client_id',GCAL_TOKEN_KEY='podoai_gcal_token';
function connectGoogleCal(){
var saved=lsG(GCAL_KEY,'');
var el=document.getElementById('gcal-client-id');if(el&&saved)el.value=saved;
document.getElementById('gcalbg').style.display='flex';history.pushState({p:true},'','');
}
function closeGCal(){document.getElementById('gcalbg').style.display='none';history.pushState({p:true},'','');}
function saveGCalConfig(){
var cid=document.getElementById('gcal-client-id').value.trim();
if(!cid||!cid.includes('googleusercontent.com')){document.getElementById('gcal-err').textContent='올바른 클라이언트 ID를 입력해줘';document.getElementById('gcal-err').style.display='block';return;}
lsS(GCAL_KEY,cid);
var scope='https://www.googleapis.com/auth/calendar.events';
var redirectUri=window.location.href.split('#')[0];
var authUrl='https://accounts.google.com/o/oauth2/v2/auth?client_id='+encodeURIComponent(cid)+'&redirect_uri='+encodeURIComponent(redirectUri)+'&response_type=token&scope='+encodeURIComponent(scope)+'&prompt=consent';
var popup=window.open(authUrl,'gcal_auth','width=500,height=600,noopener');
var timer=setInterval(function(){
try{var url=popup.location.href;if(url&&url.includes('access_token')){clearInterval(timer);var m=url.match(/access_token=([^&]+)/);if(m){lsS(GCAL_TOKEN_KEY,{token:m[1],exp:Date.now()+3500000});popup.close();closeGCal();showToast('✅ 구글 캘린더 연결됐어!','linear-gradient(135deg,#4285F4,#34A853)');}}
}catch(e){}
if(popup&&popup.closed)clearInterval(timer);
},500);
}
function getGCalToken(){var s=lsG(GCAL_TOKEN_KEY,null);if(!s||Date.now()>s.exp)return null;return s.token;}
function addGCalEvent(title,startDt,endDt,desc){
var token=getGCalToken();if(!token)return Promise.reject(new Error('구글 캘린더가 연결되지 않았어요'));
return fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events',{method:'POST',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({summary:title,description:desc||'PodoAI에서 추가',start:{dateTime:startDt,timeZone:'Asia/Seoul'},end:{dateTime:endDt,timeZone:'Asia/Seoul'}})}).then(function(r){return r.json();}).then(function(d){if(d.error)throw new Error(d.error.message);return d;});
}
var KCAL_KEY='podoai_kcal_app_key',KCAL_TOKEN_KEY='podoai_kcal_token';
function connectKakaoCal(){
var saved=lsG(KCAL_KEY,'');
var el=document.getElementById('kcal-app-key');if(el&&saved)el.value=saved;
document.getElementById('kcalbg').style.display='flex';history.pushState({p:true},'','');
}
function closeKCal(){document.getElementById('kcalbg').style.display='none';history.pushState({p:true},'','');}
function saveKCalConfig(){
var key=document.getElementById('kcal-app-key').value.trim();
if(!key||key.length<10){document.getElementById('kcal-err').textContent='앱 키를 입력해줘';document.getElementById('kcal-err').style.display='block';return;}
lsS(KCAL_KEY,key);
loadKakaoSDK(key,function(){
if(!window.Kakao||!window.Kakao.Auth){document.getElementById('kcal-err').textContent='카카오 SDK 로드 실패';document.getElementById('kcal-err').style.display='block';return;}
window.Kakao.Auth.loginWithNewScopes({scope:'calendar',success:function(a){lsS(KCAL_TOKEN_KEY,{token:a.access_token,exp:Date.now()+(a.expires_in*1000)});closeKCal();showToast('✅ 카카오 캘린더 연결됐어!','linear-gradient(135deg,#FFCD00,#FFA500)');},fail:function(e){document.getElementById('kcal-err').textContent='로그인 실패: '+JSON.stringify(e);document.getElementById('kcal-err').style.display='block';}});
});
}
function loadKakaoSDK(key,cb){
if(window.Kakao){if(!window.Kakao.isInitialized())window.Kakao.init(key);cb();return;}
var s=document.createElement('script');s.src='https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';s.onload=function(){window.Kakao.init(key);cb();};s.onerror=cb;document.head.appendChild(s);
}
function getKCalToken(){var s=lsG(KCAL_TOKEN_KEY,null);if(!s||Date.now()>s.exp)return null;return s.token;}
function addKCalEvent(title,startDt,endDt,desc){
var token=getKCalToken();if(!token)return Promise.reject(new Error('카카오 캘린더가 연결되지 않았어요'));
var st=startDt.slice(0,16)+'T00+09:00',et=endDt.slice(0,16)+'T00+09:00';
return fetch('https://kapi.kakao.com/v2/api/calendar/create/event',{method:'POST',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({title:title,time:{start_at:st,end_at:et,time_zone:'Asia/Seoul'},description:desc||'PodoAI에서 추가'})}).then(function(r){return r.json();}).then(function(d){if(d.code&&d.code<0)throw new Error(d.msg||'카카오 API 오류');return d;});
}
function quickAddEvent(){
var text=document.getElementById('cal-quick-input'); if(!text)return;
var t=text.value.trim();if(!t){showToast('일정 내용을 입력해줘','rgba(0,0,0,.85)');return;}
var gToken=getGCalToken(),kToken=getKCalToken();
if(!gToken&&!kToken){showToast('먼저 PODOAI SERVICES에서 캘린더를 연결해줘','rgba(0,0,0,.85)');return;}
var resEl=document.getElementById('cal-result');if(resEl){resEl.style.display='block';resEl.textContent='⏳ AI가 일정 분석 중...';}
var now=new Date();
callAI({system:'날짜 파싱 전문가. JSON만 출력.',messages:[{role:'user',content:'지금:'+now.toLocaleString('ko-KR')+'\n"'+t+'"\n\n{"title":"제목","start":"2024-01-15T15:00:00","end":"2024-01-15T16:00:00","description":"설명"}\n시간 없으면 9시, 끝 없으면 1시간 후, 날짜 없으면 오늘, 상대날짜 계산.'}],maxTokens:150,noLang:true},function(txt){
try{
var m=txt.replace(/```json|```/g,'').trim().match(/\{[\s\S]*\}/);if(!m)throw new Error();
var ev=JSON.parse(m[0]);if(!ev.title||!ev.start)throw new Error();
if(!ev.end){var st=new Date(ev.start);st.setHours(st.getHours()+1);ev.end=st.toISOString().slice(0,19);}
if(resEl)resEl.textContent='📅 등록 중: '+ev.title;
var promises=[];
if(gToken)promises.push(addGCalEvent(ev.title,ev.start,ev.end,ev.description||''));
if(kToken)promises.push(addKCalEvent(ev.title,ev.start,ev.end,ev.description||''));
Promise.all(promises).then(function(){
text.value='';
var names=[];if(gToken)names.push('구글');if(kToken)names.push('카카오');
if(resEl)resEl.innerHTML='✅ <b style="color:#22c55e">'+ev.title+'</b><br>'+ev.start.slice(0,16).replace('T',' ')+' ~ '+ev.end.slice(11,16)+'<br><span style="font-size:10px;color:#1f2430">'+names.join(', ')+' 캘린더 추가 완료</span>';
showToast('📅 일정 추가 완료!','linear-gradient(135deg,#4285F4,#22c55e)');
}).catch(function(e){if(resEl)resEl.textContent='❌ 추가 실패: '+e.message;});
}catch(e2){if(resEl)resEl.textContent='❌ 날짜 파싱 실패. 더 명확하게 입력해줘';}
},function(){if(resEl)resEl.textContent='❌ AI 사용 불가. API 키를 설정해줘.';});
}
var nshopSort='price_asc';
function openNShop(){
nshopSort='price_asc';
var sorts=document.querySelectorAll('.nshop-sort');for(var i=0;i<sorts.length;i++)sorts[i].classList.remove('on');
var first=document.querySelector('.nshop-sort');if(first)first.classList.add('on');
var inp=document.getElementById('nshop-input');if(inp)inp.value='';
document.getElementById('nshopbg').style.display='flex';history.pushState({p:true},'','');
setTimeout(function(){var inp=document.getElementById('nshop-input');if(inp)inp.focus();},300);
}
function closeNShop(){document.getElementById('nshopbg').style.display='none';history.pushState({p:true},'','');}
function selNShopSort(el,sort){nshopSort=sort;var btns=document.querySelectorAll('.nshop-sort');for(var i=0;i<btns.length;i++)btns[i].classList.remove('on');el.classList.add('on');}
function doNShopSearch(){var q=document.getElementById('nshop-input').value.trim();if(!q){showToast('검색어를 입력해줘','rgba(0,0,0,.85)');return;}openUrl('https://search.shopping.naver.com/search/all?query='+encodeURIComponent(q)+'&sort='+nshopSort);}
function doNShopCat(cat){openUrl('https://search.shopping.naver.com/search/all?query='+encodeURIComponent(cat)+'&sort='+nshopSort);}
var UPBIT_TICKERS=[
{id:'KRW-BTC',name:'비트코인',symbol:'BTC',color:'#F7931A'},
{id:'KRW-ETH',name:'이더리움',symbol:'ETH',color:'#627EEA'},
{id:'KRW-XRP',name:'리플',symbol:'XRP',color:'#00AAE4'},
{id:'KRW-SOL',name:'솔라나',symbol:'SOL',color:'#9945FF'},
{id:'KRW-DOGE',name:'도지코인',symbol:'DOGE',color:'#C2A633'},
{id:'KRW-ADA',name:'에이다',symbol:'ADA',color:'#0033AD'},
{id:'KRW-AVAX',name:'아발란체',symbol:'AVAX',color:'#E84142'}
];
function openUpbit(){document.getElementById('upbitbg').style.display='flex';history.pushState({p:true},'','');fetchUpbitData();}
function closeUpbit(){document.getElementById('upbitbg').style.display='none';history.pushState({p:true},'','');}
function fetchUpbitData(){
var list=document.getElementById('upbit-list'),upd=document.getElementById('upbit-updated');
if(list)list.innerHTML='<div style="text-align:center;padding:20px;color:#1f2430">⏳ 불러오는 중...</div>';
fetch('https://api.upbit.com/v1/ticker?markets='+UPBIT_TICKERS.map(function(t){return t.id;}).join(','))
.then(function(r){return r.json();}).then(function(data){
if(!list)return;
list.innerHTML='';
var now=new Date();if(upd)upd.textContent=now.getHours()+':'+now.getMinutes().toString().padStart(2,'0')+' 실시간';
data.forEach(function(t){
var info=null;for(var i=0;i<UPBIT_TICKERS.length;i++){if(UPBIT_TICKERS[i].id===t.market){info=UPBIT_TICKERS[i];break;}}
if(!info)return;
var price=t.trade_price,chg=t.signed_change_rate*100,isUp=chg>=0,chgColor=isUp?'#ef4444':'#4DA6FF';
function fp(p){if(p>=1000000)return (p/1000000).toFixed(2)+'M';if(p>=1000)return p.toLocaleString();return p.toFixed(4);}
var el=document.createElement('div');
el.style.cssText='background:rgba(0,0,0,.16);border:1px solid rgba(0,0,0,.24);border-radius:12px;padding:12px 14px;cursor:pointer;margin-bottom:4px';
el.onclick=function(){openUrl('https://upbit.com/exchange?code=CRIX.UPBIT.'+t.market);};
el.innerHTML='<div style="display:flex;align-items:center;gap:10px">'
+'<div style="width:38px;height:38px;border-radius:10px;background:'+info.color+';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#16181f;flex-shrink:0">'+info.symbol+'</div>'
+'<div style="flex:1"><div style="font-size:13px;font-weight:700;color:#141720">'+info.name+'</div>'
+'<div style="font-size:10px;color:#1f2430">'+info.symbol+'/KRW</div></div>'
+'<div style="text-align:right"><div style="font-size:15px;font-weight:800;color:#141720">'+fp(price)+'원</div>'
+'<div style="font-size:11px;font-weight:700;color:'+chgColor+'">'+(isUp?'▲':'▼')+Math.abs(chg).toFixed(2)+'%</div></div>'
+'</div>'
+'<div style="display:flex;gap:10px;margin-top:7px;padding-top:7px;border-top:1px solid rgba(0,0,0,.2)">'
+'<span style="font-size:10px;color:#1f2430">고가 <b style="color:#ef4444">'+fp(t.high_price)+'</b></span>'
+'<span style="font-size:10px;color:#1f2430">저가 <b style="color:#4DA6FF">'+fp(t.low_price)+'</b></span>'
+'</div>';
list.appendChild(el);
});
}).catch(function(){if(list)list.innerHTML='<div style="text-align:center;padding:20px;color:#ef4444">❌ 시세 로드 실패</div>';});
}
var WC={0:'맑음',1:'대체로 맑음',2:'구름 조금',3:'흐림',45:'안개',48:'안개',51:'이슬비',53:'이슬비',55:'강한 이슬비',61:'비',63:'비',65:'강한 비',71:'눈',73:'눈',75:'강한 눈',80:'소나기',81:'소나기',82:'강한 소나기',95:'뇌우',96:'뇌우',99:'강한 뇌우'};
var WI={0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',71:'🌨',73:'❄️',75:'❄️',80:'🌦',81:'🌦',82:'🌧',95:'⛈',96:'⛈',99:'⛈'};
function openKWeather(){
var kw=document.getElementById('kw-detail');if(kw)kw.style.display='none';
var cur=document.getElementById('kw-current');if(cur)cur.innerHTML='<div style="text-align:center;color:rgba(0,0,0,.5);font-size:13px">📍 지역 선택 또는 현재 위치 버튼</div>';
document.getElementById('kweatherbg').style.display='flex';history.pushState({p:true},'','');
}
function closeKWeather(){document.getElementById('kweatherbg').style.display='none';history.pushState({p:true},'','');}
function fetchKWeatherByLocation(){
if(!navigator.geolocation){showToast('위치 권한이 필요해요','rgba(0,0,0,.85)');return;}
var cur=document.getElementById('kw-current');if(cur)cur.innerHTML='<div style="text-align:center;color:rgba(0,0,0,.6)">📡 위치 확인 중...</div>';
navigator.geolocation.getCurrentPosition(function(pos){fetchKWeatherData(pos.coords.latitude,pos.coords.longitude,'현재 위치');},function(){if(cur)cur.innerHTML='<div style="text-align:center;color:#ef4444">⚠️ 위치 권한을 허용해줘</div>';});
}
function fetchKWeatherByCity(name,lat,lng){fetchKWeatherData(lat,lng,name);}
function fetchKWeatherData(lat,lng,name){
var cur=document.getElementById('kw-current'),det=document.getElementById('kw-detail');
if(cur)cur.innerHTML='<div style="text-align:center;color:rgba(0,0,0,.6)">⏳ 날씨 불러오는 중...</div>';
fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lng+'&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FSeoul&forecast_days=7')
.then(function(r){return r.json();}).then(function(d){
var cd=d.current,code=cd.weathercode,icon=WI[code]||'🌤',desc=WC[code]||'알 수 없음';
var temp=Math.round(cd.temperature_2m),feels=Math.round(cd.apparent_temperature),humid=cd.relative_humidity_2m,wind=Math.round(cd.windspeed_10m),rain=cd.precipitation;
if(cur)cur.innerHTML='<div style="width:100%"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><div><div style="font-size:13px;font-weight:700;color:rgba(0,0,0,.8)">'+name+'</div></div><div style="font-size:38px">'+icon+'</div></div><div style="display:flex;align-items:flex-end;gap:8px;margin-bottom:6px"><div style="font-size:40px;font-weight:800;color:#16181f;line-height:1">'+temp+'°</div><div style="font-size:15px;color:rgba(0,0,0,.7);padding-bottom:4px">'+desc+'</div></div><div style="display:flex;gap:14px"><span style="font-size:11px;color:rgba(0,0,0,.6)">체감 '+feels+'°</span><span style="font-size:11px;color:rgba(0,0,0,.6)">습도 '+humid+'%</span><span style="font-size:11px;color:rgba(0,0,0,.6)">풍속 '+wind+'m/s</span>'+(rain>0?'<span style="font-size:11px;color:#7EC8FF">'+rain+'mm</span>':'')+'</div></div>';
var dy=d.daily,days=['일','월','화','수','목','금','토'],html='<div style="font-size:10px;font-weight:700;color:rgba(0,0,0,.66);margin-bottom:8px">7일 예보</div>';
for(var i=0;i<7;i++){
var date=new Date(dy.time[i]),dn=i===0?'오늘':i===1?'내일':days[date.getDay()];
var di=WI[dy.weathercode[i]]||'🌤',mx=Math.round(dy.temperature_2m_max[i]),mn=Math.round(dy.temperature_2m_min[i]);
html+='<div style="display:flex;align-items:center;gap:10px;padding:7px 8px;border-radius:9px;background:'+(i===0?'rgba(0,116,217,.2)':'rgba(0,0,0,.03)')+';margin-bottom:4px"><div style="width:30px;font-size:12px;font-weight:'+(i===0?'800':'500')+';color:'+(i===0?'#4DA6FF':'rgba(0,0,0,.55)')+'">'+dn+'</div><div style="font-size:17px">'+di+'</div><div style="flex:1"></div><div style="font-size:12px;font-weight:700;color:#ef4444">'+mx+'°</div><div style="font-size:12px;color:rgba(0,0,0,.66);margin:0 2px">/</div><div style="font-size:12px;color:#4DA6FF">'+mn+'°</div></div>';
}
if(document.getElementById('kw-detail-content'))document.getElementById('kw-detail-content').innerHTML=html;
if(det)det.style.display='block';
}).catch(function(){if(cur)cur.innerHTML='<div style="text-align:center;color:#ef4444">❌ 날씨 로드 실패</div>';});
}
function openGmailSheet(){
var dr=document.getElementById('gmail-draft-result');if(dr)dr.style.display='none';
var t=document.getElementById('gmail-to');if(t)t.value='';
var s=document.getElementById('gmail-subject');if(s)s.value='';
var p=document.getElementById('gmail-prompt');if(p)p.value='';
document.getElementById('gmailbg').style.display='flex';history.pushState({p:true},'','');
}
function closeGmailSheet(){document.getElementById('gmailbg').style.display='none';history.pushState({p:true},'','');}
function draftGmail(){
var to=document.getElementById('gmail-to').value.trim();
var subject=document.getElementById('gmail-subject').value.trim();
var prompt=document.getElementById('gmail-prompt').value.trim();
if(!prompt){showToast('메일 내용을 설명해줘','rgba(0,0,0,.85)');return;}
var resEl=document.getElementById('gmail-draft-result');
resEl.style.display='block';resEl.textContent='⏳ AI가 메일 초안 작성 중...';
callAI({system:'한국어 이메일 작성 전문가. 자연스럽고 정중한 이메일 본문만 작성.',messages:[{role:'user',content:'받는 사람: '+(to||'미정')+'\n제목: '+(subject||'미정')+'\n내용 요청: '+prompt}],maxTokens:500},function(body){
resEl.textContent=body;
var url='https://mail.google.com/mail/u/0/?view=cm&fs=1'+(to?'&to='+encodeURIComponent(to):'')+(subject?'&su='+encodeURIComponent(subject):'')+'&body='+encodeURIComponent(body);
openUrl(url);
showToast('📧 Gmail 작성창이 열렸어!','linear-gradient(135deg,#EA4335,#C62828)');
},function(){resEl.textContent='AI를 사용할 수 없어요. Gmail에서 직접 작성해줘.';openUrl('https://mail.google.com/mail/u/0/#compose');});
}
function openYoutubeSearch(){
var q=prompt('유튜브에서 검색할 내용을 입력해줘');
if(!q)return;
openUrl('https://www.youtube.com/results?search_query='+encodeURIComponent(q));
}
function showToast(msg, bg){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:'+bg+';color:#16181f;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:700;z-index:999;pointer-events:none;border:1px solid rgba(0,0,0,.28);white-space:nowrap';
t.textContent=msg;
document.body.appendChild(t); setTimeout(function(){t.remove();},2200);
}
var imgStyle = 'realistic';
var imgW = '1024';
var imgH = '1024';
var imgTimer = null;
function selImgStyle(el, val){
imgStyle = val;
document.querySelectorAll('#imagepanel .img-section:nth-child(2) .img-chip').forEach(function(b){ b.classList.remove('on'); });
el.classList.add('on');
}
function selImgRatio(el, w, h){
imgW = w; imgH = h;
document.querySelectorAll('#imagepanel .img-section:nth-child(3) .img-chip').forEach(function(b){ b.classList.remove('on'); });
el.classList.add('on');
}
function setExample(el){
var txt = el.textContent.replace(/^[^\s]+\s/,'');
document.getElementById('img-prompt').value = txt;
}
function genImage(){
var prompt = document.getElementById('img-prompt').value.trim();
if(!prompt){ alert('이미지 설명을 입력해줘!'); return; }
var btn = document.querySelector('.img-genbtn');
btn.textContent = '⏳ 생성 중...';
btn.disabled = true;
var result = document.getElementById('img-result');
result.style.display = 'flex';
result.style.flexDirection = 'column';
result.style.gap = '10px';
document.getElementById('img-loading').style.display = 'block';
document.getElementById('img-wrap').style.display = 'none';
document.getElementById('img-error').style.display = 'none';
var bar = document.getElementById('img-bar');
bar.style.width = '0%';
var prog = 0;
if(imgTimer) clearInterval(imgTimer);
imgTimer = setInterval(function(){
prog = Math.min(prog + Math.random() * 8, 90);
bar.style.width = prog + '%';
}, 600);
if(hasAIKey()){
callAI({
system:'You are an image prompt translator. Translate Korean image descriptions to detailed English prompts for AI image generation. Output ONLY the English prompt, no explanation.',
messages:[{role:'user', content:'주제: '+prompt+'\n스타일: '+imgStyle+'\n\n위 내용을 Stable Diffusion용 영문 프롬프트로 변환해줘. 품질 키워드(high quality, detailed, masterpiece 등)도 포함해.'}],
maxTokens:200, noLang:true
}, function(enPrompt){
if(!enPrompt) enPrompt = prompt + ', ' + imgStyle + ', high quality, detailed';
fetchPollinationsImage(enPrompt);
}, function(){
fetchPollinationsImage(prompt + ', ' + imgStyle + ', high quality, detailed');
});
} else {
fetchPollinationsImage(prompt + ', ' + imgStyle + ', high quality');
}
}
function getImageSources(enPrompt){
var seed = Math.floor(Math.random() * 999999);
var w = imgW; var h = imgH;
return [
    'https://image.pollinations.ai/prompt/' + encodeURIComponent(enPrompt)
+ '?width='+w+'&height='+h+'&seed='+seed+'&nologo=true&model=flux',
    'https://image.pollinations.ai/prompt/' + encodeURIComponent(enPrompt)
+ '?width='+w+'&height='+h+'&seed='+seed+'&nologo=true',
    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1/v1/generate?prompt=' + encodeURIComponent(enPrompt)
];
}
function fetchPollinationsImage(enPrompt){
var sources = getImageSources(enPrompt);
var outImg = document.getElementById('img-out');
var bar = document.getElementById('img-bar');
var sourceNames = ['Pollinations (flux)', 'Pollinations', 'Hugging Face'];
function showClaudeFallback(){
clearInterval(imgTimer);
var loadingEl = document.getElementById('img-loading');
if(loadingEl){
var desc = loadingEl.querySelector('div:nth-child(2)');
if(desc) desc.textContent = 'AI가 이미지를 텍스트로 묘사 중...';
}
if(!hasAIKey()){
document.getElementById('img-loading').style.display = 'none';
document.getElementById('img-errmsg').textContent = '이미지 서버 연결 실패.\nAI 묘사 기능도 API 키가 필요해요.\n마이 탭에서 Claude 또는 Gemini 키를 등록해줘.';
document.getElementById('img-error').style.display = 'block';
var btn = document.querySelector('.img-genbtn');
btn.textContent = '🎨 이미지 생성'; btn.disabled = false;
return;
}
callAI({
system: '당신은 이미지를 생생하게 묘사하는 전문가예요. 요청된 이미지를 마치 눈앞에 있는 것처럼 아주 상세하고 생동감 있게 한국어로 묘사해주세요. 색감, 구도, 분위기, 세부 요소를 포함해서 3~4문단으로 작성해주세요.',
messages: [{role:'user', content: '"'+enPrompt+'" 이 주제의 이미지를 상세히 묘사해줘'}],
maxTokens: 600
}, function(description){
document.getElementById('img-loading').style.display = 'none';
var wrap = document.getElementById('img-wrap');
outImg.style.display = 'none';
var existingCard = document.getElementById('ai-desc-card');
if(existingCard) existingCard.remove();
var card = document.createElement('div');
card.id = 'ai-desc-card';
card.style.cssText = 'padding:18px;background:linear-gradient(135deg,rgba(168,85,247,.08),rgba(0,229,255,.05));border-radius:14px 14px 0 0;';
card.innerHTML = '<div style="font-size:10px;font-weight:700;color:#8b35e0;margin-bottom:10px;letter-spacing:.5px">🎨 AI 이미지 묘사 (이미지 서버 불안정)</div>'
+ '<div style="font-size:13px;color:#141720;line-height:1.8;white-space:pre-wrap">'+description+'</div>';
wrap.insertBefore(card, wrap.firstChild);
document.getElementById('img-prompt-used').textContent = '📝 AI 텍스트 묘사 | ' + enPrompt;
wrap.style.display = 'block';
wrap.scrollIntoView({behavior:'smooth', block:'start'});
var btn = document.querySelector('.img-genbtn');
btn.textContent = '🎨 이미지 생성'; btn.disabled = false;
}, function(e){
document.getElementById('img-loading').style.display = 'none';
document.getElementById('img-errmsg').textContent = '이미지 서버와 AI 모두 연결 실패.\n인터넷 연결을 확인하고 다시 시도해봐요.\n오류: ' + e.message;
document.getElementById('img-error').style.display = 'block';
var btn = document.querySelector('.img-genbtn');
btn.textContent = '🎨 이미지 생성'; btn.disabled = false;
});
}
function trySource(idx){
if(idx >= sources.length){
showClaudeFallback();
return;
}
var loadingEl = document.getElementById('img-loading');
if(loadingEl){
var desc = loadingEl.querySelector('div:nth-child(2)');
if(desc) desc.textContent = idx===0 ? 'AI가 이미지를 그리는 중...' : sourceNames[idx]+' 시도 중...';
}
var url = sources[idx];
var done = false;
var timeout = setTimeout(function(){
if(done) return;
done = true;
trySource(idx + 1);
}, idx < 2 ? 35000 : 20000);
outImg.style.display = 'block';
outImg.onload = function(){
if(done) return;
done = true;
clearTimeout(timeout);
clearInterval(imgTimer);
bar.style.width = '100%';
setTimeout(function(){
document.getElementById('img-loading').style.display = 'none';
var wrap = document.getElementById('img-wrap');
var card = document.getElementById('ai-desc-card');
if(card) card.remove();
outImg.style.display = 'block';
document.getElementById('img-dl').href = url;
document.getElementById('img-prompt-used').textContent = '✅ ' + sourceNames[idx] + '  |  ' + enPrompt;
wrap.style.display = 'block';
wrap.scrollIntoView({behavior:'smooth', block:'start'});
var btn = document.querySelector('.img-genbtn');
btn.textContent = '🎨 이미지 생성'; btn.disabled = false;
}, 200);
};
outImg.onerror = function(){
if(done) return;
done = true;
clearTimeout(timeout);
trySource(idx + 1);
};
outImg.src = '';
outImg.src = url;
}
trySource(0);
}
var shortsLen = '15초';
var shortsStyle = '정보/팁';
function selLen(el, val){
shortsLen = val;
var cs = el.parentNode.querySelectorAll('.shorts-chip');
for(var i=0;i<cs.length;i++) cs[i].classList.remove('on');
el.classList.add('on');
}
function selStyle(el, val){
shortsStyle = val;
var cs = el.parentNode.querySelectorAll('.shorts-chip');
for(var i=0;i<cs.length;i++) cs[i].classList.remove('on');
el.classList.add('on');
}
var _reel = { scenes:[], imgs:[], idx:0, playing:false, raf:null, elapsed:0, secPerScene:3, narrate:true, total:15, ended:false };
function _reelStopNarr(){
try{ if(window.Android && window.Android.stopSpeak) window.Android.stopSpeak(); }catch(e){}
try{ if(window.speechSynthesis) window.speechSynthesis.cancel(); }catch(e){}
}
function _reelLangTag(){
var l=(typeof i18nCur==='function')?i18nCur():'ko';
return ({ko:'ko-KR',en:'en-US',ja:'ja-JP',zh:'zh-CN',es:'es-ES',fr:'fr-FR',de:'de-DE'})[l]||'ko-KR';
}
function _reelNarrate(text){
if(!_reel.narrate || !text) return;
var clean=String(text).replace(/[#*_`>~]/g,'').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu,'').replace(/\s+/g,' ').trim();
if(!clean) return;
if(window.Android && typeof window.Android.speak==='function'){ try{ window.Android.speak(clean); return; }catch(e){} }
if(!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance==='undefined') return;
try{
window.speechSynthesis.cancel();
var tag=_reelLangTag(), pre=tag.slice(0,2).toLowerCase();
var u=new SpeechSynthesisUtterance(clean);
u.lang=tag; u.rate=1.0; u.pitch=1.05;
var vs=window.speechSynthesis.getVoices()||[];
for(var i=0;i<vs.length;i++){ if(vs[i].lang && vs[i].lang.toLowerCase().indexOf(pre)===0){ u.voice=vs[i]; break; } }
window.speechSynthesis.speak(u);
}catch(e){}
}
function _reelImgUrl(prompt, seed, model){
if(seed==null) seed=Math.floor(Math.random()*999999);
var p=encodeURIComponent(String(prompt||'cinematic scene').slice(0,200)+', cinematic vertical, vibrant');
var u='https://image.pollinations.ai/prompt/'+p+'?width=720&height=1280&seed='+seed+'&nologo=true';
if(model && model!=='none') u+='&model='+model;
return u;
}
function _reelGrad(i){
var g=[['#3a1c71','#d76d77'],['#0f2027','#2c5364'],['#42275a','#734b6d'],['#1a2980','#26d0ce'],['#603813','#b29f94'],['#16222a','#3a6073'],['#4b1248','#f0c27b']];
var c=g[i%g.length];
return 'linear-gradient(160deg,'+c[0]+','+c[1]+')';
}
function _reelSplitLocal(script, topic){
var raw=String(script||'').split(/\n+/).map(function(s){
return s.replace(/^[\-\*\u2022\d\.\)\s]+/,'').replace(/^(후킹|훅|인트로|도입|본문|전개|마무리|아웃트로|결론|클로징|장면\s*\d+|씬\s*\d+)\s*[:：\-]?\s*/,'').trim();
}).filter(function(s){ return s && s.length>1; });
if(raw.length===0) raw=[topic||'쇼츠'];
var maxN=6;
if(raw.length>maxN){
var merged=[], per=Math.ceil(raw.length/maxN), i;
for(i=0;i<raw.length;i+=per){ merged.push(raw.slice(i,i+per).join(' ')); }
raw=merged.slice(0,maxN);
}
return raw.map(function(cap){ return { cap:cap, img:(topic? topic+', '+cap : cap) }; });
}
function _reelBuildScenes(script, topic, style, done){
var fb=_reelSplitLocal(script, topic);
if(!hasAIKey()){ done(fb); return; }
var _lang=(typeof i18nCur==='function')?i18nCur():'ko';
var _capLang=(typeof i18nLangName==='function')?i18nLangName(_lang):'Korean';
var fin=false;
var to=setTimeout(function(){ if(fin)return; fin=true; done(fb); }, 25000);
callAI({
system:'You are a viral short-form (Reels/Shorts) storyboard director. Split the script into 4-6 scenes. The FIRST scene MUST be a scroll-stopping hook. Output ONLY a JSON array, no markdown. Each item: {"cap":"a VERY short punchy on-screen caption (max ~10 words) in '+_capLang+'","img":"a detailed ENGLISH, cinematic, vertical image-generation prompt for this scene (specific subject, setting, mood, lighting)"}. Keep captions high-retention and easy to read.',
messages:[{role:'user', content:'Topic: '+topic+'\nStyle: '+style+'\nScript:\n'+script}],
maxTokens:900, noLang:true
}, function(text){
if(fin)return; fin=true; clearTimeout(to);
try{
var m=String(text||'').replace(/```json|```/g,'').trim();
var s=m.indexOf('['), e=m.lastIndexOf(']');
if(s>-1&&e>s) m=m.slice(s,e+1);
var arr=JSON.parse(m);
if(Array.isArray(arr)){
var sc=arr.filter(function(x){return x&&x.cap;}).map(function(x){return {cap:String(x.cap).trim(), img:String(x.img||topic||x.cap).trim()};});
if(sc.length){ done(sc); return; }
}
}catch(err){}
done(fb);
}, function(){ if(fin)return; fin=true; clearTimeout(to); done(fb); });
}
function _reelStop(){
_reel.playing=false;
if(_reel.raf){ clearTimeout(_reel.raf); _reel.raf=null; }
_reelStopNarr();
var ov=document.getElementById('shorts-preview-bg');
if(ov) ov.style.display='none';
}
function _reelShowScene(i){
for(var k=0;k<_reel.imgs.length;k++){
var im=_reel.imgs[k];
if(k===i){
im.style.opacity='1';
im.style.animation='none'; void im.offsetWidth;
im.style.animation='reelKB '+(_reel.secPerScene+0.8).toFixed(2)+'s ease-out forwards';
} else { im.style.opacity='0'; }
}
for(var b=0;b<_reel.scenes.length;b++){
var f=document.getElementById('reel-fill-'+b);
if(f) f.style.width = (b<i) ? '100%' : '0%';
}
var cap=document.getElementById('reel-cap');
if(cap) cap.textContent=_reel.scenes[i].cap||'';
var ld=document.getElementById('reel-loading');
var ready=_reel.imgs[i] && _reel.imgs[i].dataset.loaded==='1';
if(ld) ld.style.display=ready?'none':'flex';
}
function _reelTick(){
if(!_reel.playing) return;
_reel.elapsed+=0.05;
var frac=Math.min(1,_reel.elapsed/_reel.secPerScene);
var fill=document.getElementById('reel-fill-'+_reel.idx);
if(fill) fill.style.width=(frac*100)+'%';
if(frac>=1){ _reelGo(_reel.idx+1); return; }
_reel.raf=setTimeout(_reelTick,50);
}
function _reelGo(i){
if(_reel.raf){ clearTimeout(_reel.raf); _reel.raf=null; }
if(i>=_reel.scenes.length){ _reelEnd(); return; }
if(i<0) i=0;
_reel.idx=i; _reel.elapsed=0;
_reelShowScene(i);
_reelNarrate(_reel.scenes[i].cap);
var _waited=0;
(function startWhenReady(){
if(!_reel.playing) return;
var im=_reel.imgs[i];
if((im && im.dataset.loaded==='1') || _waited>=7000){
var ld=document.getElementById('reel-loading'); if(ld) ld.style.display='none';
_reel.raf=setTimeout(_reelTick,50);
} else {
_waited+=150;
var ld2=document.getElementById('reel-loading'); if(ld2) ld2.style.display='flex';
_reel.raf=setTimeout(startWhenReady,150);
}
})();
}
function _reelEnd(){
_reel.playing=false; _reel.ended=true; _reelStopNarr();
if(_reel.raf){ clearTimeout(_reel.raf); _reel.raf=null; }
var f=document.getElementById('reel-fill-'+(_reel.scenes.length-1)); if(f) f.style.width='100%';
var ic=document.getElementById('reel-playicon'); if(ic){ ic.textContent='↺'; ic.style.opacity='1'; }
}
function _reelJump(i){
if(i<0) i=0;
if(i>=_reel.scenes.length){ _reelEnd(); return; }
_reel.ended=false; _reel.playing=true;
var ic=document.getElementById('reel-playicon'); if(ic) ic.style.opacity='0';
_reelGo(i);
}
function _reelToggle(){
if(_reel.ended){ _reelReplay(); return; }
if(_reel.playing){
_reel.playing=false;
if(_reel.raf){ clearTimeout(_reel.raf); _reel.raf=null; }
_reelStopNarr();
var ic=document.getElementById('reel-playicon'); if(ic){ ic.textContent='▶'; ic.style.opacity='1'; }
} else {
_reel.playing=true;
var ic2=document.getElementById('reel-playicon'); if(ic2) ic2.style.opacity='0';
_reelNarrate(_reel.scenes[_reel.idx].cap);
_reel.raf=setTimeout(_reelTick,50);
}
}
function _reelReplay(){
_reel.ended=false; _reel.playing=true;
var ic=document.getElementById('reel-playicon'); if(ic){ ic.textContent='▶'; ic.style.opacity='0'; }
_reelGo(0);
}
function _reelToggleNarr(){
_reel.narrate=!_reel.narrate;
var b=document.getElementById('reel-narrbtn');
if(b) b.textContent=_reel.narrate?'🔊':'🔇';
if(!_reel.narrate) _reelStopNarr();
else if(_reel.playing && _reel.scenes[_reel.idx]) _reelNarrate(_reel.scenes[_reel.idx].cap);
}
function openShortsPreview(){
var script=(document.getElementById('sr-script')||{}).textContent||'';
var topic=(document.getElementById('shorts-topic')||{}).value||'';
var titlesEl=document.getElementById('sr-titles');
if(!script.trim()){ alert('먼저 쇼츠를 생성해줘!'); return; }
var title='';
if(titlesEl){ var ls=(titlesEl.textContent||'').split('\n').map(function(x){return x.trim();}).filter(Boolean); title=(ls[0]||'').replace(/^\d+[.)]\s*/,''); }
if(!title) title=topic||'쇼츠';
_reel.total=parseInt(shortsLen,10)||15;
if(!document.getElementById('reel-kb-style')){
var st=document.createElement('style'); st.id='reel-kb-style';
st.textContent='@keyframes reelKB{0%{transform:scale(1.05)}100%{transform:scale(1.2)}}@keyframes reelSpin{to{transform:rotate(360deg)}}';
document.head.appendChild(st);
}
var ov=document.getElementById('shorts-preview-bg');
if(!ov){
ov=document.createElement('div'); ov.id='shorts-preview-bg';
ov.style.cssText='position:fixed;inset:0;z-index:700;background:rgba(0,0,0,.94);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:14px';
ov.addEventListener('click',function(e){ if(e.target===ov){ _reelStop(); } });
document.body.appendChild(ov);
}
ov.style.display='flex';
while(ov.firstChild) ov.removeChild(ov.firstChild);
var phone=document.createElement('div');
phone.style.cssText='position:relative;width:min(330px,92vw);aspect-ratio:9/16;max-height:92vh;background:#000;border-radius:22px;overflow:hidden;box-shadow:0 18px 60px rgba(255,0,80,.35);border:1px solid rgba(0,0,0,.26)';
var stage=document.createElement('div');
stage.id='reel-stage';
stage.style.cssText='position:absolute;inset:0;background:#0a0a14;overflow:hidden';
phone.appendChild(stage);
var grad=document.createElement('div');
grad.style.cssText='position:absolute;left:0;right:0;bottom:0;height:46%;background:linear-gradient(to top,rgba(0,0,0,.88),rgba(0,0,0,.35) 55%,transparent);pointer-events:none;z-index:4';
phone.appendChild(grad);
var cap=document.createElement('div');
cap.id='reel-cap';
cap.style.cssText='position:absolute;left:16px;right:16px;bottom:66px;color:#16181f;font-size:18px;font-weight:800;line-height:1.45;text-shadow:0 2px 12px rgba(0,0,0,.95);z-index:5;pointer-events:none';
phone.appendChild(cap);
var bars=document.createElement('div');
bars.id='reel-bars';
bars.style.cssText='position:absolute;top:10px;left:10px;right:10px;display:flex;gap:4px;z-index:6';
phone.appendChild(bars);
var tchip=document.createElement('div');
tchip.textContent=title;
tchip.style.cssText='position:absolute;top:24px;left:12px;right:54px;color:#16181f;font-size:12px;font-weight:700;text-shadow:0 1px 6px rgba(0,0,0,.95);z-index:6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
phone.appendChild(tchip);
var close=document.createElement('button');
close.textContent='✕';
close.style.cssText='position:absolute;top:18px;right:12px;width:32px;height:32px;border-radius:50%;border:none;background:rgba(0,0,0,.5);color:#16181f;font-size:15px;cursor:pointer;z-index:7';
close.onclick=function(){ _reelStop(); };
phone.appendChild(close);
var playicon=document.createElement('div');
playicon.id='reel-playicon';
playicon.textContent='▶';
playicon.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:rgba(0,0,0,.45);color:#16181f;font-size:24px;display:flex;align-items:center;justify-content:center;z-index:5;opacity:0;transition:opacity .2s;pointer-events:none';
phone.appendChild(playicon);
var loading=document.createElement('div');
loading.id='reel-loading';
loading.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:6;background:rgba(10,10,20,.6)';
var sp=document.createElement('div');
sp.style.cssText='width:38px;height:38px;border:3px solid rgba(0,0,0,.26);border-top-color:#ff0050;border-radius:50%;animation:reelSpin .8s linear infinite';
var lt=document.createElement('div'); lt.textContent='🎬 장면 만드는 중...'; lt.style.cssText='color:#16181f;font-size:13px;font-weight:700';
loading.appendChild(sp); loading.appendChild(lt);
phone.appendChild(loading);
function zone(side){
var z=document.createElement('div');
z.style.cssText='position:absolute;top:56px;bottom:96px;z-index:5;'+(side==='left'?'left:0;width:32%':side==='right'?'right:0;width:32%':'left:32%;width:36%');
return z;
}
var zl=zone('left'), zc=zone('center'), zr=zone('right');
zl.onclick=function(){ _reelJump(_reel.idx-1); };
zr.onclick=function(){ _reelJump(_reel.idx+1); };
zc.onclick=function(){ _reelToggle(); };
phone.appendChild(zl); phone.appendChild(zc); phone.appendChild(zr);
var bar2=document.createElement('div');
bar2.style.cssText='position:absolute;left:0;right:0;bottom:0;display:flex;gap:8px;padding:12px;z-index:7;justify-content:center';
function tb(txt,fn,id){
var b=document.createElement('button'); if(id) b.id=id; b.textContent=txt;
b.style.cssText='padding:9px 14px;border-radius:20px;border:1px solid rgba(0,0,0,.26);background:rgba(0,0,0,.5);color:#16181f;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit';
b.onclick=fn; return b;
}
bar2.appendChild(tb('↺ 다시보기', function(){ _reelReplay(); }));
bar2.appendChild(tb(_reel.narrate?'🔊':'🔇', function(){ _reelToggleNarr(); }, 'reel-narrbtn'));
bar2.appendChild(tb('🎬 저장', function(){ exportReel(); }));
phone.appendChild(bar2);
ov.appendChild(phone);
if(typeof history!=='undefined' && history.pushState) history.pushState({p:true},'','');
_reel.scenes=[]; _reel.imgs=[]; _reel.idx=0; _reel.elapsed=0; _reel.ended=false; _reel.playing=false;
_reelBuildScenes(script, topic, shortsStyle, function(scenes){
if(!document.getElementById('shorts-preview-bg') || document.getElementById('shorts-preview-bg').style.display!=='flex') return;
_reel.scenes=scenes;
_reel.secPerScene=Math.max(2.2, _reel.total/scenes.length);
while(bars.firstChild) bars.removeChild(bars.firstChild);
for(var b=0;b<scenes.length;b++){
var track=document.createElement('div');
track.style.cssText='flex:1;height:3px;border-radius:3px;background:rgba(0,0,0,.32);overflow:hidden';
var fill=document.createElement('div'); fill.id='reel-fill-'+b;
fill.style.cssText='height:100%;width:0%;background:#fff;transition:width .05s linear';
track.appendChild(fill); bars.appendChild(track);
}
for(var i=0;i<scenes.length;i++){
(function(idx){
var im=document.createElement('img');
im.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .4s';
im.dataset.loaded='0';
im.style.background=_reelGrad(idx);
stage.appendChild(im);
_reel.imgs.push(im);
var done=false, tmr=null, tries=0, maxTries=2;
function finish(){
if(done) return; done=true;
if(tmr){ clearTimeout(tmr); tmr=null; }
im.dataset.loaded='1';
if(idx===_reel.idx){ var ld=document.getElementById('reel-loading'); if(ld) ld.style.display='none'; }
}
function tryLoad(){
if(done) return; tries++;
if(tmr) clearTimeout(tmr);
tmr=setTimeout(function(){ if(done) return; if(tries<maxTries) tryLoad(); else finish(); }, 9000);
im.src=_reelImgUrl(scenes[idx].img, idx*137+tries*9901, tries===1?'flux':'none');
}
im.onload=function(){ finish(); };
im.onerror=function(){ if(done) return; if(tries<maxTries) tryLoad(); else finish(); };
tryLoad();
})(i);
}
_reel.playing=true;
_reelGo(0);
});
}
function _reelPickMime(){
if(typeof MediaRecorder==='undefined' || !MediaRecorder.isTypeSupported) return '';
var c=['video/mp4;codecs=h264','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'];
for(var i=0;i<c.length;i++){ try{ if(MediaRecorder.isTypeSupported(c[i])) return c[i]; }catch(e){} }
return '';
}
function _reelLoadCORS(url, cb){
var im=new Image(); im.crossOrigin='anonymous';
var done=false, t=setTimeout(function(){ if(done)return; done=true; cb(null); }, 12000);
im.onload=function(){ if(done)return; done=true; clearTimeout(t); cb(im); };
im.onerror=function(){ if(done)return; done=true; clearTimeout(t); cb(null); };
im.src=url;
}
function _reelWrapDraw(ctx, text, cx, baseY, maxW, lh, maxLines){
var words=String(text||'').split(/\s+/), line='', lines=[];
for(var i=0;i<words.length;i++){
var test=line?line+' '+words[i]:words[i];
if(ctx.measureText(test).width>maxW && line){ lines.push(line); line=words[i]; }
else line=test;
}
if(line) lines.push(line);
if(maxLines && lines.length>maxLines) lines=lines.slice(0,maxLines);
var startY=baseY-(lines.length-1)*lh;
for(var j=0;j<lines.length;j++){
var ly=startY+j*lh;
ctx.strokeText(lines[j], cx, ly);
ctx.fillText(lines[j], cx, ly);
}
}
function reelEnsureScenes(done){
if(_reel.scenes && _reel.scenes.length){ _reel.total=parseInt(shortsLen,10)||_reel.total||15; done(_reel.scenes); return; }
var script=(document.getElementById('sr-script')||{}).textContent||'';
var topic=(document.getElementById('shorts-topic')||{}).value||'';
if(!script.trim()){ alert('먼저 "AI 릴 만들기"로 콘텐츠를 생성해줘!'); return; }
_reel.total=parseInt(shortsLen,10)||15;
_reelBuildScenes(script, topic, shortsStyle, function(scenes){ _reel.scenes=scenes; done(scenes); });
}
var _reelAC=null;
var _reelAudio={ mode:'none', buffer:null, fileName:'' };
function _reelEnsureAC(){
try{
if(!_reelAC){ var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return null; _reelAC=new AC(); }
if(_reelAC.state==='suspended'){ _reelAC.resume(); }
return _reelAC;
}catch(e){ return null; }
}
function selReelAudio(mode, el){
_reelAudio.mode=mode;
var grp=el.parentNode, cs=grp.querySelectorAll('.shorts-chip'), i;
for(i=0;i<cs.length;i++) cs[i].classList.remove('on');
el.classList.add('on');
if(mode!=='none') _reelEnsureAC();
var nm=document.getElementById('reel-audio-name'); if(nm && mode!=='file') nm.style.display='none';
}
function pickReelMusicFile(input){
var f=input.files && input.files[0]; if(!f) return;
var ac=_reelEnsureAC(); if(!ac){ alert('이 브라우저는 오디오 처리를 지원하지 않아요.'); return; }
var nm=document.getElementById('reel-audio-name');
if(nm){ nm.style.display='block'; nm.textContent='⏳ '+f.name+' 불러오는 중...'; }
var r=new FileReader();
r.onload=function(){
try{
ac.decodeAudioData(r.result.slice(0), function(buf){
_reelAudio.buffer=buf; _reelAudio.mode='file'; _reelAudio.fileName=f.name;
var chips=document.querySelectorAll('#reel-audio-section .shorts-chip');
for(var i=0;i<chips.length;i++) chips[i].classList.remove('on');
if(chips.length) chips[chips.length-1].classList.add('on');
if(nm) nm.textContent='🎵 '+f.name+' · 저작권은 본인 책임이에요';
}, function(){ if(nm) nm.textContent='❌ 이 오디오 형식을 못 읽었어요 (mp3/m4a/wav 권장)'; });
}catch(e){ if(nm) nm.textContent='❌ 오디오 처리 실패'; }
};
r.readAsArrayBuffer(f);
}
function toggleReelLicense(){
var el=document.getElementById('reel-license'); if(!el) return;
el.style.display=(el.style.display==='none'||!el.style.display)?'block':'none';
}
function _reelMusic(ctx, dest, mode, total){
var master=ctx.createGain(); master.connect(dest);
var now=ctx.currentTime, vol=(mode==='calm')?0.16:0.2;
master.gain.setValueAtTime(0, now);
master.gain.linearRampToValueAtTime(vol, now+0.8);
master.gain.setValueAtTime(vol, Math.max(now+0.9, now+total-1.0));
master.gain.linearRampToValueAtTime(0, now+total);
var prog=({
calm:[[220,277,330],[196,247,294],[174.6,220,261.6],[196,247,294]],
upbeat:[[261.6,329.6,392],[293.7,349.2,440],[329.6,392,493.9],[293.7,349.2,440]],
tense:[[110,146.8],[110,155.6],[103.8,138.6],[110,146.8]]
})[mode] || [[220,277,330]];
var barLen=(mode==='upbeat')?1.0:2.0, bars=Math.ceil(total/barLen), b, k;
for(b=0;b<bars;b++){
var t=now+b*barLen; if(t>=now+total) break;
var chord=prog[b%prog.length];
for(k=0;k<chord.length;k++){
var o=ctx.createOscillator(), g=ctx.createGain();
o.type=(mode==='calm')?'sine':(mode==='tense'?'sawtooth':'triangle');
o.frequency.value=chord[k];
g.gain.setValueAtTime(0,t);
g.gain.linearRampToValueAtTime(0.22,t+0.12);
g.gain.exponentialRampToValueAtTime(0.001,t+barLen*0.95);
o.connect(g); g.connect(master); o.start(t); o.stop(t+barLen);
}
if(mode==='upbeat'){
var ko=ctx.createOscillator(), kg=ctx.createGain();
ko.frequency.setValueAtTime(120,t); ko.frequency.exponentialRampToValueAtTime(45,t+0.12);
kg.gain.setValueAtTime(0.5,t); kg.gain.exponentialRampToValueAtTime(0.001,t+0.2);
ko.connect(kg); kg.connect(master); ko.start(t); ko.stop(t+0.22);
}
}
}
function _reelAttachAudio(stream, total){
if(!_reelAudio || _reelAudio.mode==='none') return false;
var ac=_reelEnsureAC(); if(!ac) return false;
try{ ac.resume(); }catch(e){}
var dest=ac.createMediaStreamDestination();
if(_reelAudio.mode==='file' && _reelAudio.buffer){
var src=ac.createBufferSource(); src.buffer=_reelAudio.buffer;
if(_reelAudio.buffer.duration < total) src.loop=true;
var g=ac.createGain(), now=ac.currentTime; g.gain.value=0.55;
g.gain.setValueAtTime(0.55, now+Math.max(0.1,total-1));
g.gain.linearRampToValueAtTime(0, now+total);
src.connect(g); g.connect(dest);
try{ src.start(); src.stop(now+total+0.15); }catch(e){}
} else {
_reelMusic(ac, dest, _reelAudio.mode, total);
}
var at=dest.stream.getAudioTracks()[0];
if(at){ try{ stream.addTrack(at); return true; }catch(e){} }
return false;
}
function exportReel(){
if(typeof MediaRecorder==='undefined'){ alert('이 브라우저는 영상 저장을 지원하지 않아요.\n크롬 최신 버전에서 다시 시도해줘.'); return; }
reelEnsureScenes(function(scenes){ _reelDoExport(scenes); });
}
function _reelDoExport(scenes){
var total=_reel.total||15;
var per=Math.max(2.2, total/scenes.length);
var W=720, H=1280;
var ov=document.getElementById('reel-export-bg');
if(!ov){ ov=document.createElement('div'); ov.id='reel-export-bg'; document.body.appendChild(ov); }
ov.style.cssText='position:fixed;inset:0;z-index:710;background:rgba(0,0,0,.95);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px';
ov.style.display='flex';
while(ov.firstChild) ov.removeChild(ov.firstChild);
var box=document.createElement('div');
box.style.cssText='width:min(340px,94vw);background:linear-gradient(160deg,#eef0f7,#f4f6fb);border:1px solid rgba(255,0,80,.3);border-radius:20px;padding:18px;display:flex;flex-direction:column;gap:12px;align-items:center;max-height:94vh;overflow-y:auto';
ov.appendChild(box);
var ttl=document.createElement('div'); ttl.textContent='🎬 영상 만드는 중...'; ttl.style.cssText='color:#16181f;font-size:15px;font-weight:800'; box.appendChild(ttl);
var sub=document.createElement('div'); sub.textContent='이미지 준비 중...'; sub.style.cssText='color:#252a39;font-size:12px;text-align:center'; box.appendChild(sub);
var canvas=document.createElement('canvas'); canvas.width=W; canvas.height=H;
canvas.style.cssText='width:150px;height:267px;border-radius:12px;background:#000;border:1px solid rgba(0,0,0,.28)';
box.appendChild(canvas);
var ctx=canvas.getContext('2d');
var track=document.createElement('div'); track.style.cssText='width:100%;height:6px;border-radius:6px;background:rgba(0,0,0,.3);overflow:hidden';
var fill=document.createElement('div'); fill.style.cssText='height:100%;width:0%;background:linear-gradient(90deg,#ff0050,#ff5e5e)'; track.appendChild(fill); box.appendChild(track);
var cancelBtn=document.createElement('button'); cancelBtn.textContent='취소'; cancelBtn.style.cssText='margin-top:2px;padding:8px 18px;border-radius:20px;border:1px solid rgba(0,0,0,.26);background:transparent;color:#252a39;font-size:13px;cursor:pointer;font-family:inherit'; box.appendChild(cancelBtn);
var cancelled=false, rec=null, chunks=[], mime=_reelPickMime();
cancelBtn.onclick=function(){ cancelled=true; try{ if(rec && rec.state!=='inactive') rec.stop(); }catch(e){} ov.style.display='none'; };
var imgs=new Array(scenes.length), loaded=0;
scenes.forEach(function(sc, i){
_reelLoadCORS(_reelImgUrl(sc.img, i*137+555, 'flux'), function(im){
imgs[i]=im; loaded++;
if(!cancelled) sub.textContent='이미지 준비 '+loaded+'/'+scenes.length;
if(loaded===scenes.length && !cancelled) startRec();
});
});
function drawScene(idx, tp){
ctx.clearRect(0,0,W,H);
var im=imgs[idx];
if(im){
var sc=1.05+0.16*tp;
var ir=im.width/im.height, cr=W/H, dw, dh;
if(ir>cr){ dh=H*sc; dw=dh*ir; } else { dw=W*sc; dh=dw/ir; }
var dx=(W-dw)/2 - (dw-W)*0.10*tp, dy=(H-dh)/2 - (dh-H)*0.10*tp;
ctx.drawImage(im, dx, dy, dw, dh);
} else {
var pal=[['#3a1c71','#d76d77'],['#0f2027','#2c5364'],['#42275a','#734b6d'],['#1a2980','#26d0ce'],['#603813','#b29f94'],['#16222a','#3a6073']][idx%6];
var g=ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,pal[0]); g.addColorStop(1,pal[1]);
ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
}
var bg=ctx.createLinearGradient(0,H*0.5,0,H); bg.addColorStop(0,'rgba(0,0,0,0)'); bg.addColorStop(1,'rgba(0,0,0,.88)');
ctx.fillStyle=bg; ctx.fillRect(0,H*0.5,W,H*0.5);
ctx.textAlign='center'; ctx.textBaseline='alphabetic';
ctx.font='800 50px sans-serif'; ctx.lineJoin='round';
ctx.lineWidth=9; ctx.strokeStyle='rgba(0,0,0,.85)'; ctx.fillStyle='#fff';
_reelWrapDraw(ctx, scenes[idx].cap||'', W/2, H-160, W-100, 64, 4);
var n=scenes.length, gap=8, pad=20, segW=(W-pad*2-(n-1)*gap)/n;
for(var s=0;s<n;s++){
var x=pad+s*(segW+gap);
ctx.fillStyle='rgba(0,0,0,.3)'; ctx.fillRect(x,26,segW,6);
var f=(s<idx)?1:(s===idx?tp:0);
ctx.fillStyle='#fff'; ctx.fillRect(x,26,segW*f,6);
}
ctx.font='700 24px sans-serif'; ctx.textAlign='right';
ctx.lineWidth=4; ctx.strokeStyle='rgba(0,0,0,.6)'; ctx.fillStyle='rgba(0,0,0,.6)';
ctx.strokeText('PodoAI', W-22, 76); ctx.fillText('PodoAI', W-22, 76);
}
function startRec(){
sub.textContent='녹화 중... ('+Math.round(total)+'초)';
var stream;
try{ stream=canvas.captureStream(30); }
catch(e){ alert('영상 녹화를 시작할 수 없어요: '+((e&&e.message)||e)); ov.style.display='none'; return; }
try{ _reelAttachAudio(stream, total); }catch(e){}
try{ rec=new MediaRecorder(stream, mime?{mimeType:mime, videoBitsPerSecond:5000000}:undefined); }
catch(e2){ try{ rec=new MediaRecorder(stream); }catch(e3){ alert('영상 녹화 미지원: '+((e3&&e3.message)||e3)); ov.style.display='none'; return; } }
chunks=[];
rec.ondataavailable=function(ev){ if(ev.data && ev.data.size) chunks.push(ev.data); };
rec.onstop=function(){ if(!cancelled) finishExport(); };
rec.start();
var t0=performance.now();
(function frame(){
if(cancelled) return;
var el=(performance.now()-t0)/1000;
fill.style.width=Math.min(100, el/total*100)+'%';
var idx=Math.min(scenes.length-1, Math.floor(el/per));
var tp=Math.min(1, (el-idx*per)/per);
drawScene(idx, tp);
if(el>=total){ try{ rec.stop(); }catch(e){} return; }
requestAnimationFrame(frame);
})();
}
function finishExport(){
var ext=(mime.indexOf('mp4')>=0)?'mp4':'webm';
var blob=new Blob(chunks, {type:mime||'video/webm'});
var url=URL.createObjectURL(blob);
while(box.firstChild) box.removeChild(box.firstChild);
var d=document.createElement('div'); d.textContent='✅ 영상 완성!'; d.style.cssText='color:#16181f;font-size:16px;font-weight:800'; box.appendChild(d);
var vid=document.createElement('video'); vid.src=url; vid.controls=true; vid.setAttribute('playsinline',''); vid.loop=true;
vid.style.cssText='width:170px;height:302px;border-radius:12px;background:#000'; box.appendChild(vid);
var hint=document.createElement('div'); hint.textContent='영상을 길게 눌러 저장하거나, 아래 버튼으로 다운로드'; hint.style.cssText='color:#252a39;font-size:11px;text-align:center;line-height:1.5'; box.appendChild(hint);
var dl=document.createElement('a'); dl.href=url; dl.download='podoai_reel_'+Date.now()+'.'+ext; dl.textContent='⬇ 영상 저장 (.'+ext+')';
dl.style.cssText='width:100%;text-align:center;padding:13px;border-radius:14px;background:linear-gradient(135deg,#ff0050,#ff4d4d);color:#fff;font-size:15px;font-weight:800;text-decoration:none;box-sizing:border-box'; box.appendChild(dl);
var yt=document.createElement('a'); yt.href='https://www.youtube.com/upload'; yt.target='_blank'; yt.rel='noopener noreferrer'; yt.textContent='▶ YouTube에 업로드'; yt.style.cssText='width:100%;text-align:center;padding:11px;border-radius:12px;border:1px solid rgba(0,0,0,.22);color:#252a39;font-size:13px;font-weight:700;text-decoration:none;box-sizing:border-box'; box.appendChild(yt);
var _amsg=(_reelAudio.mode==='none')?'음악 없음':(_reelAudio.mode==='file'?'🎵 내 음악 포함 — 저작권 본인 책임':'🎵 내장 BGM 포함(저작권 안전)');
var note=document.createElement('div'); note.textContent='형식: .'+ext+(ext==='webm'?' (YouTube 지원·일부 앱은 변환 필요)':'')+' · '+_amsg+' · 보이스오버는 미리보기 전용'; note.style.cssText='color:#1f2430;font-size:10px;text-align:center;line-height:1.5'; box.appendChild(note);
var cl=document.createElement('button'); cl.textContent='닫기'; cl.style.cssText='margin-top:2px;padding:8px 18px;border-radius:20px;border:none;background:rgba(0,0,0,.26);color:#252a39;font-size:13px;cursor:pointer;font-family:inherit'; cl.onclick=function(){ ov.style.display='none'; }; box.appendChild(cl);
}
}
function genShorts(){
var topic = document.getElementById('shorts-topic').value.trim();
if(!topic){ alert('쇼츠 주제를 입력해줘!'); return; }
if(!hasAIKey()){ var nk=document.getElementById('shorts-nokey'); if(nk){ nk.style.display='block'; freeAiNotice(nk); var n2=document.createElement('div'); n2.style.cssText='color:#1f2430;font-size:11px;margin-top:10px;line-height:1.6'; n2.textContent='💎 더 강력하게(고품질)는 본인 유료 키 — 요금은 본인 부담이에요.'; nk.appendChild(n2); } return; }
var btn = document.querySelector('.shorts-genbtn');
btn.textContent = '⏳ AI가 생성 중...';
btn.disabled = true;
var result = document.getElementById('shorts-result');
result.style.display = 'none';
var _snk=document.getElementById('shorts-nokey'); if(_snk) _snk.style.display='none';
var prompt = '유튜브 쇼츠 콘텐츠를 만들어줘.\n'
+ '주제: ' + topic + '\n'
+ '영상 길이: ' + shortsLen + '\n'
+ '스타일: ' + shortsStyle + '\n\n'
+ '반드시 아래 형식으로 정확히 출력해줘:\n\n'
+ '[제목]\n'
+ '1. (제목1)\n2. (제목2)\n3. (제목3)\n4. (제목4)\n5. (제목5)\n\n'
+ '[스크립트]\n'
+ shortsLen + ' 분량의 실제 말할 대본 (후킹→본문→마무리 구성)\n\n'
+ '[해시태그]\n'
+ '#태그1 #태그2 #태그3 (10개 이상)\n\n'
+ '[촬영팁]\n'
+ '이 영상을 잘 찍기 위한 구체적인 팁 3가지';
var _sgDone=false;
var _sgWatch=setTimeout(function(){
if(_sgDone) return; _sgDone=true;
btn.textContent='⚡ AI 릴 만들기'; btn.disabled=false;
var nk=document.getElementById('shorts-nokey');
if(nk){ nk.style.display='block'; while(nk.firstChild) nk.removeChild(nk.firstChild);
var d=document.createElement('div'); d.style.cssText='color:#141720;font-size:13px;line-height:1.7';
d.textContent='⏱️ 응답이 너무 오래 걸려서 멈췄어. 인터넷 연결을 확인하거나, 마이 탭에서 무료 Gemini 키로 바꿔서 다시 시도해줘.';
nk.appendChild(d);
}
}, 45000);
callAI({
system:'유튜브 쇼츠 전문 크리에이터. 한국어로 바이럴되는 쇼츠 콘텐츠를 만들어줘.',
messages:[{role:'user', content:prompt}],
maxTokens:1500
}, function(text){
if(_sgDone) return; _sgDone=true; clearTimeout(_sgWatch);
parseAndShowShorts(text);
btn.textContent = '⚡ AI 릴 만들기';
btn.disabled = false;
}, function(e){
if(_sgDone) return; _sgDone=true; clearTimeout(_sgWatch);
alert('오류: ' + ((e&&e.message)||e));
btn.textContent = '⚡ AI 릴 만들기';
btn.disabled = false;
});
}
function parseAndShowShorts(text){
var titleMatch = text.match(/\[제목\]([\s\S]*?)(?=\[스크립트\])/);
var scriptMatch = text.match(/\[스크립트\]([\s\S]*?)(?=\[해시태그\])/);
var tagMatch = text.match(/\[해시태그\]([\s\S]*?)(?=\[촬영팁\])/);
var tipMatch = text.match(/\[촬영팁\]([\s\S]*?)$/);
var titleEl = document.getElementById('sr-titles');
if(titleMatch){
var lines = titleMatch[1].trim().split('\n').filter(function(l){ return l.trim(); });
titleEl.innerHTML = lines.map(function(l){
return '<div style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,.22);font-size:13px;color:#141720;cursor:pointer" onclick="copyLine(this)">' + l.trim() + '</div>';
}).join('');
} else { titleEl.textContent = text.substring(0, 200); }
document.getElementById('sr-script').textContent = scriptMatch ? scriptMatch[1].trim() : '';
var tagEl = document.getElementById('sr-tags');
if(tagMatch){
var tags = tagMatch[1].trim().split(/\s+/).filter(function(t){ return t.startsWith('#'); });
tagEl.innerHTML = tags.map(function(t){
return '<span style="display:inline-block;margin:3px;padding:5px 10px;border-radius:20px;background:rgba(255,0,80,.1);border:1px solid rgba(255,0,80,.2);color:#e23b67;font-size:11px">' + t + '</span>';
}).join('');
tagEl.setAttribute('data-plain', tags.join(' '));
}
document.getElementById('sr-tips').textContent = tipMatch ? tipMatch[1].trim() : '';
document.getElementById('shorts-result').style.display = 'flex';
document.getElementById('shorts-result').style.flexDirection = 'column';
document.getElementById('shorts-result').style.gap = '10px';
setTimeout(function(){
document.getElementById('shorts-result').scrollIntoView({behavior:'smooth', block:'start'});
}, 100);
}
function copyText(id){
var el = document.getElementById(id);
var text = el.getAttribute('data-plain') || el.textContent;
if(navigator.clipboard){ navigator.clipboard.writeText(text).then(function(){ showCopyToast(); }); }
else { var ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showCopyToast(); }
}
function copyLine(el){
var text = el.textContent;
if(navigator.clipboard){ navigator.clipboard.writeText(text).then(function(){ showCopyToast(); }); }
}
function showCopyToast(){ showToast('✅ 복사됐어!', 'rgba(255,0,80,.9)'); }
var clockTimer = null;
function makeWeatherWidget(){
var w = document.createElement('div');
w.id = 'weather-widget';
w.innerHTML =
    '<div>'
+ '<div class="ww-time" id="ww-time">--:--</div>'
+ '<div class="ww-date" id="ww-date">--</div>'
+ '</div>'
+ '<div class="ww-divider"></div>'
+ '<div class="ww-weather" onclick="openUrl(\'https://www.weather.go.kr/w/index.do\',\'home\')" style="cursor:pointer">'
+ '<div class="ww-icon" id="ww-icon">🌤</div>'
+ '<div>'
+ '<div class="ww-temp" id="ww-temp">--°</div>'
+ '<div class="ww-desc" id="ww-desc">날씨 로딩 중...</div>'
+ '<div class="ww-location" id="ww-loc">위치 확인 중</div>'
+ '</div>'
+ '</div>'
+ '<div class="ww-right">'
+ '<div class="ww-humidity" id="ww-hum">습도 --%</div>'
+ '<div class="ww-feels" id="ww-feels">체감 --°</div>'
+ '</div>';
return w;
}
function updateClock(){
if(clockTimer) clearInterval(clockTimer);
function tick(){
var el = document.getElementById('ww-time');
var de = document.getElementById('ww-date');
if(!el) return;
var now = new Date();
var h = now.getHours().toString().padStart(2,'0');
var mn = now.getMinutes().toString().padStart(2,'0');
el.textContent = h + ':' + mn;
var days = ['일','월','화','수','목','금','토'];
de.textContent = (now.getMonth()+1)+'월 '+now.getDate()+'일 ('+days[now.getDay()]+')';
}
tick();
clockTimer = setInterval(tick, 10000);
}
var WEATHER_ICONS = {
0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',
51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',
71:'🌨',73:'🌨',75:'❄️',80:'🌧',81:'🌧',82:'⛈',
95:'⛈',96:'⛈',99:'⛈'
};
var WEATHER_DESC = {
0:'맑음',1:'대체로 맑음',2:'구름 조금',3:'흐림',
45:'안개',48:'안개',51:'이슬비',53:'이슬비',55:'이슬비',
61:'비',63:'비',65:'강한 비',71:'눈',73:'눈',75:'강한 눈',
80:'소나기',81:'소나기',82:'강한 소나기',95:'뇌우',96:'뇌우',99:'강한 뇌우'
};
function fetchWeather(){
if(!navigator.geolocation){
setWeatherFallback('위치 미지원');
return;
}
navigator.geolocation.getCurrentPosition(function(pos){
var lat = pos.coords.latitude.toFixed(4);
var lon = pos.coords.longitude.toFixed(4);
var url = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon
+'&current=temperature_2m,relative_humidity_2m,apparent_temperature,weathercode'
+'&timezone=auto';
fetch(url).then(function(r){return r.json();}).then(function(d){
var cur = d.current;
var code = cur.weathercode;
var temp = Math.round(cur.temperature_2m);
var feels = Math.round(cur.apparent_temperature);
var hum = cur.relative_humidity_2m;
var el_icon = document.getElementById('ww-icon');
var el_temp = document.getElementById('ww-temp');
var el_desc = document.getElementById('ww-desc');
var el_hum  = document.getElementById('ww-hum');
var el_feels= document.getElementById('ww-feels');
var el_loc  = document.getElementById('ww-loc');
if(el_icon) el_icon.textContent = WEATHER_ICONS[code]||'🌤';
if(el_temp) el_temp.textContent = temp+'°';
if(el_desc) el_desc.textContent = WEATHER_DESC[code]||'--';
if(el_hum)  el_hum.textContent  = '습도 '+hum+'%';
if(el_feels)el_feels.textContent= '체감 '+feels+'°';
if(el_loc) el_loc.textContent = d.timezone ? d.timezone.split('/').pop().replace('_',' ') : lat+','+lon;
}).catch(function(){ setWeatherFallback('날씨 불러오기 실패'); });
}, function(){
setWeatherFallback('위치 권한 필요');
}, {timeout:8000});
}
function setWeatherFallback(msg){
var el = document.getElementById('ww-desc');
var el2 = document.getElementById('ww-loc');
if(el) el.textContent = msg;
if(el2) el2.textContent = '';
}
var HIST_KEY = 'podoai_chat_hist';
function getChatHistories(){
return lsG(HIST_KEY, []);
}
function saveCurrentChat(){
if(!hist || hist.length === 0){
alert('저장할 대화가 없어요!'); return;
}
var histories = getChatHistories();
var title = '';
for(var i=0;i<hist.length;i++){
if(hist[i].role==='user'){title=hist[i].content.slice(0,30);break;}
}
if(!title) title = '대화 '+new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'});
var entry = {
id: Date.now(),
title: title,
date: new Date().toLocaleDateString('ko-KR',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}),
messages: JSON.parse(JSON.stringify(hist))
};
histories.unshift(entry);
if(histories.length > 20) histories = histories.slice(0,20);
lsS(HIST_KEY, histories);
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#00e5ff,#7b61ff);color:#fff;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:700;z-index:999;pointer-events:none';
t.textContent='✅ 대화가 저장됐어!';
document.body.appendChild(t); setTimeout(function(){t.remove();},2000);
renderHistList();
}
function loadChat(id){
var histories = getChatHistories();
var entry = null;
for(var i=0;i<histories.length;i++){
if(histories[i].id===id){entry=histories[i];break;}
}
if(!entry) return;
hist = JSON.parse(JSON.stringify(entry.messages));
var cm = document.getElementById('chatmain');
cm.innerHTML='';
for(var i=0;i<hist.length;i++){
addMsg(hist[i].role==='user'?'me':'ai', hist[i].content);
}
closeHistPanel();
var chatTab=document.querySelector('.t-chat');
if(chatTab) switchTab('chat',chatTab);
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);border:1px solid rgba(0,0,0,.28);color:#141720;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:600;z-index:999;pointer-events:none';
t.textContent='📂 대화를 불러왔어!';
document.body.appendChild(t); setTimeout(function(){t.remove();},2000);
}
function deleteChat(id, e){
e.stopPropagation();
if(!confirm('이 대화를 삭제할까요?')) return;
var histories = getChatHistories().filter(function(h){return h.id!==id;});
lsS(HIST_KEY, histories);
renderHistList();
}
function renderHistList(){
var list = document.getElementById('hist-list');
var empty = document.getElementById('hist-empty');
if(!list) return;
var histories = getChatHistories();
if(histories.length===0){
if(empty) empty.style.display='block';
var items=list.querySelectorAll('.hist-item');
items.forEach(function(i){i.remove();});
return;
}
if(empty) empty.style.display='none';
list.innerHTML='<div id="hist-empty" style="display:none"></div>';
for(var i=0;i<histories.length;i++){
(function(entry){
var item=document.createElement('div');
item.className='hist-item';
item.onclick=function(){loadChat(entry.id);};
item.innerHTML='<div class="hist-title">💬 '+entry.title+'</div>'
+'<div class="hist-date">'+entry.date+'</div>'
+'<button class="hist-del" onclick="deleteChat('+entry.id+',event)">삭제</button>';
list.appendChild(item);
})(histories[i]);
}
}
function openHistPanel(){
renderHistList();
document.getElementById('histbg').classList.add('open');
history.pushState({p:true},'','');
}
function closeHistPanel(){
document.getElementById('histbg').classList.remove('open');
history.pushState({p:true},'','');
}
function newChat(){
if(hist.length>0){
if(!confirm('현재 대화를 저장하지 않고 새 대화를 시작할까요?')) return;
}
clearChat();
closeHistPanel();
}
var LANG_KEY = 'podoai_lang';
var LANG_NAMES = {auto:'자동감지',ko:'한국어',en:'English',ja:'日本語',zh:'中文',es:'Español',fr:'Français',de:'Deutsch'};
var UI_TEXT = {
ko:{home:'홈',shorts:'쇼츠',voice:'브리핑',image:'이미지',write:'글쓰기',chat:'채팅',my:'마이',ask:'AI에게 무엇이든 물어봐요...',online:'🟢 온라인'},
en:{home:'Home',shorts:'Shorts',voice:'Briefing',image:'Image',write:'Write',chat:'Chat',my:'My',ask:'Ask AI anything...',online:'🟢 Online'},
ja:{home:'ホーム',shorts:'ショーツ',voice:'ブリーフィング',image:'画像',write:'ライター',chat:'チャット',my:'マイ',ask:'AIに何でも聞いて...',online:'🟢 オンライン'},
zh:{home:'主页',shorts:'短视频',voice:'简报',image:'图像',write:'写作',chat:'聊天',my:'我的',ask:'问AI任何问题...',online:'🟢 在线'},
es:{home:'Inicio',shorts:'Shorts',voice:'Resumen',image:'Imagen',write:'Escribir',chat:'Chat',my:'Yo',ask:'Pregunta a la IA...',online:'🟢 En línea'},
fr:{home:'Accueil',shorts:'Shorts',voice:'Briefing',image:'Image',write:'Écrire',chat:'Chat',my:'Moi',ask:"Demandez à l'IA...",online:'🟢 En ligne'},
de:{home:'Startseite',shorts:'Shorts',voice:'Briefing',image:'Bild',write:'Schreiben',chat:'Chat',my:'Mein',ask:'Frage die KI...',online:'🟢 Online'}
};
function detectLang(){
var saved = lsG(LANG_KEY, 'auto');
if(saved !== 'auto') return saved;
var nav = (navigator.language || navigator.userLanguage || 'ko').split('-')[0].toLowerCase();
return UI_TEXT[nav] ? nav : 'ko';
}
function applyLang(){
var lang = detectLang();
var t = UI_TEXT[lang] || UI_TEXT['ko'];
var tabs = {'.t-home .tab-lbl':t.home,'.t-shorts .tab-lbl':t.shorts,'.t-voice .tab-lbl':t.voice,'.t-chat .tab-lbl':t.chat,'.t-my .tab-lbl':t.my};
for(var sel in tabs){ var el=document.querySelector(sel); if(el) el.textContent=tabs[sel]; }
var hi=document.getElementById('homeinp'); if(hi) hi.placeholder=t.ask;
var ci=document.getElementById('inp'); if(ci) ci.placeholder=t.ask;
var cs=document.getElementById('chatheader-status'); if(cs) cs.textContent=t.online;
var saved = lsG(LANG_KEY,'auto');
var chips = document.querySelectorAll('.lang-chip');
for(var i=0;i<chips.length;i++) chips[i].classList.remove('on');
var box = document.getElementById('lang-chips');
if(box){
var btns = box.querySelectorAll('.lang-chip');
for(var i=0;i<btns.length;i++){
if((btns[i].getAttribute('onclick')||'').indexOf("'"+saved+"'")>=0){ btns[i].classList.add('on'); break; }
}
}
var st = document.getElementById('lang-status');
if(st){ var d=detectLang(); st.textContent='현재: '+(saved==='auto'?'자동감지 ('+LANG_NAMES[d]+')':LANG_NAMES[saved]||saved); }
try{ renderCountryUI(); }catch(e){}
}
var I18N_NODES=[];
var I18N_PH=[];
var I18N_TIMER=null, I18N_OBS=null;
var I18N_QUEUE=[], I18N_QSET={}, I18N_WORKING=false, I18N_TRIES={};
function i18nCur(){ var s=lsG(LANG_KEY,'auto'); var l=(s==='auto')?detectLang():s; return l||'ko'; }
function i18nLangName(l){ return ({en:'English',ja:'Japanese',zh:'Simplified Chinese',es:'Spanish',fr:'French',de:'German',ko:'Korean'})[l]||l; }
function i18nCache(lang){ return lsG('podoai_i18n_'+lang, {}); }
function i18nCacheSave(lang, map){ lsS('podoai_i18n_'+lang, map); }
function i18nVisible(el){ try{ return el && el.getClientRects && el.getClientRects().length>0; }catch(e){ return true; } }
function i18nScan(root){
if(!root) return false;
var SKIP='[data-no-i18n],#chatpanel,.tab-item,#lang-status,[id*="result"],[id*="-out"],[id*="-ai"],[id*="overview"],[id$="-rows"],#sr-titles,#sr-script';
try{
var walker=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode:function(n){
var p=n.parentNode; if(!p) return 2;
var tag=p.nodeName; if(tag==='SCRIPT'||tag==='STYLE'||tag==='TEXTAREA'||tag==='OPTION') return 2;
if(n.__i18n) return 2;
var v=n.nodeValue; if(!v || !/[가-힣]/.test(v)) return 2;
if(p.closest && p.closest(SKIP)) return 2;
if(!i18nVisible(p)) return 2;
return 1;
}});
var n; while(n=walker.nextNode()){ n.__i18n=1; I18N_NODES.push({n:n, ko:n.nodeValue}); }
}catch(e){}
try{
var qs=root.querySelectorAll? root.querySelectorAll('[placeholder]'):[];
for(var i=0;i<qs.length;i++){ var el=qs[i]; if(el.__i18nph) continue; if(el.closest && el.closest(SKIP)) continue; if(!i18nVisible(el)) continue; var ph=el.getAttribute('placeholder')||''; if(/[가-힣]/.test(ph)){ el.__i18nph=1; el.setAttribute('data-i18n-ph-ko',ph); I18N_PH.push(el); } }
}catch(e){}
return true;
}
function i18nApplyCache(){
var lang=i18nCur(); if(lang==='ko') return;
var c=i18nCache(lang);
I18N_NODES.forEach(function(o){ if(!o.n.isConnected) return; var k=o.ko.trim(); var tr=c[k]; o.n.nodeValue = tr ? o.ko.replace(k, tr) : o.ko; });
I18N_PH.forEach(function(el){ if(!el.isConnected) return; var k=(el.getAttribute('data-i18n-ph-ko')||'').trim(); var tr=c[k]; var ko=el.getAttribute('data-i18n-ph-ko'); if(tr) el.setAttribute('placeholder', tr); else if(ko!=null) el.setAttribute('placeholder', ko); });
}
function i18nEnqueue(list){
for(var i=0;i<list.length;i++){ var k=list[i]; if(!k) continue; if((I18N_TRIES[k]||0)>=4) continue; if(!I18N_QSET[k]){ I18N_QSET[k]=1; I18N_QUEUE.push(k); } }
if(!I18N_WORKING) i18nWork();
}
function i18nLangCode(l){ return ({zh:'zh-CN'})[l] || l; }
function i18nWork(){
if(I18N_WORKING) return;
if(!I18N_QUEUE.length) return;
var lang=i18nCur();
if(lang==='ko'){ I18N_QUEUE=[]; I18N_QSET={}; return; }
I18N_WORKING=true;
i18nWorkStep();
}
function i18nWorkStep(){
if(!I18N_QUEUE.length){ I18N_WORKING=false; return; }
var lang=i18nCur();
if(lang==='ko'){ I18N_QUEUE=[]; I18N_QSET={}; I18N_WORKING=false; return; }
var batch=[], chars=0;
while(I18N_QUEUE.length && batch.length<40 && chars<1400){
var k=I18N_QUEUE.shift(); delete I18N_QSET[k];
I18N_TRIES[k]=(I18N_TRIES[k]||0)+1;
batch.push(k); chars+=(k.length+1);
}
i18nTranslateBatch(batch, lang, function(map){
try{
var c=i18nCache(lang), got=0;
for(var k in map){ if(map[k]!=null && map[k]!==''){ c[k]=map[k]; got++; } }
if(got) i18nCacheSave(lang,c);
i18nApplyCache();
}catch(e){}
setTimeout(i18nWorkStep, 80);
});
}
function i18nTranslateBatch(batch, lang, done){
if(!batch || !batch.length){ done({}); return; }
i18nTrGoogle(batch, lang, function(map){ done(map); }, function(){
i18nTrMyMemory(batch, lang, function(map){
var miss=batch.filter(function(k){ return map[k]==null; });
if(miss.length && typeof hasAIKey==='function' && hasAIKey()){
i18nTrAI(miss, lang, function(m2){ for(var k in m2) map[k]=m2[k]; done(map); });
} else { done(map); }
});
});
}
function i18nTrGoogle(batch, lang, ok, fail){
try{
var joined=batch.join('\n');
var url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl='+i18nLangCode(lang)+'&dt=t&q='+encodeURIComponent(joined);
var to=setTimeout(function(){ to=null; fail(); }, 8000);
fetch(url).then(function(r){ if(!r.ok) throw 0; return r.json(); }).then(function(d){
if(to===null) return; clearTimeout(to);
var seg=d&&d[0]; if(!seg||!seg.length){ fail(); return; }
var full=''; for(var i=0;i<seg.length;i++){ full+=(seg[i][0]||''); }
var lines=full.split('\n');
if(lines.length!==batch.length){ fail(); return; }
var map={}; for(var j=0;j<batch.length;j++){ map[batch[j]]=(lines[j]||'').trim(); }
ok(map);
}).catch(function(){ if(to===null) return; clearTimeout(to); fail(); });
}catch(e){ fail(); }
}
function i18nTrMyMemory(batch, lang, done){
var lp='ko|'+i18nLangCode(lang);
var map={}, idx=0, active=0, max=5, finished=false;
function check(){ if(idx>=batch.length && active===0 && !finished){ finished=true; done(map); } }
function next(){
while(active<max && idx<batch.length){
(function(k){
active++;
var url='https://api.mymemory.translated.net/get?q='+encodeURIComponent(k)+'&langpair='+encodeURIComponent(lp);
var to=setTimeout(function(){ to=null; active--; next(); check(); }, 8000);
fetch(url).then(function(r){ return r.json(); }).then(function(d){
if(to===null) return; clearTimeout(to);
var t=d&&d.responseData&&d.responseData.translatedText;
if(t && !/MYMEMORY WARNING|INVALID|NO QUERY/i.test(t)) map[k]=t;
active--; next(); check();
}).catch(function(){ if(to===null) return; clearTimeout(to); active--; next(); check(); });
})(batch[idx]); idx++;
}
check();
}
if(!batch.length){ done(map); return; }
next();
}
function i18nTrAI(batch, lang, done){
if(typeof hasAIKey==='function' && !hasAIKey()){ done({}); return; }
var sys='You are a UI localization engine. Translate each Korean string in the given JSON array into '+i18nLangName(lang)+'. Keep brand/app/proper names unchanged (PodoAI, YouTube, KakaoTalk, Naver, TMAP, Gemini, Claude, Puter, Instagram, Toss). Keep emojis, numbers and symbols. Natural short UI wording. Return ONLY a JSON object mapping each original Korean string to its translation. No markdown.';
callAI({ system:sys, messages:[{role:'user',content:JSON.stringify(batch)}], maxTokens:3000, noLang:true },
function(txt){ var map={}; try{ var st=String(txt).replace(/```json|```/g,'').trim(); var mm=st.match(/\{[\s\S]*\}/); if(mm) st=mm[0]; map=JSON.parse(st)||{}; }catch(e){} done(map); },
function(){ done({}); });
}
function i18nRender(){
I18N_NODES=I18N_NODES.filter(function(o){ return o.n && o.n.isConnected; });
I18N_PH=I18N_PH.filter(function(el){ return el && el.isConnected; });
var lang=i18nCur();
if(lang==='ko'){
I18N_NODES.forEach(function(o){ o.n.nodeValue=o.ko; });
I18N_PH.forEach(function(el){ var ko=el.getAttribute('data-i18n-ph-ko'); if(ko!=null) el.setAttribute('placeholder',ko); });
return;
}
i18nApplyCache();
var cache=i18nCache(lang), need=[];
I18N_NODES.forEach(function(o){ var k=o.ko.trim(); if(k && cache[k]==null) need.push(k); });
I18N_PH.forEach(function(el){ var k=(el.getAttribute('data-i18n-ph-ko')||'').trim(); if(k && cache[k]==null) need.push(k); });
if(need.length) i18nEnqueue(need);
}
function i18nPrewarm(){
try{
var lang=i18nCur(); if(lang==='ko') return;
var SKIP='[data-no-i18n],#chatpanel,.tab-item,#lang-status,[id*=\"result\"],[id*=\"-out\"],[id*=\"-ai\"],[id*=\"overview\"],[id$=\"-rows\"],#sr-titles,#sr-script';
var cache=i18nCache(lang), need=[], seen={};
var walker=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode:function(n){
var pp=n.parentNode; if(!pp) return 2;
var tag=pp.nodeName; if(tag==='SCRIPT'||tag==='STYLE'||tag==='TEXTAREA'||tag==='OPTION') return 2;
var v=n.nodeValue; if(!v || !/[가-힣]/.test(v)) return 2;
if(pp.closest && pp.closest(SKIP)) return 2;
return 1;
}});
var n; while(n=walker.nextNode()){ var k=n.nodeValue.trim(); if(k && cache[k]==null && !seen[k]){ seen[k]=1; need.push(k); } }
var qs=document.querySelectorAll('[placeholder]');
for(var i=0;i<qs.length;i++){ var el=qs[i]; if(el.closest && el.closest(SKIP)) continue; var ph=el.getAttribute('placeholder')||''; if(/[가-힣]/.test(ph)){ var k2=ph.trim(); if(k2 && cache[k2]==null && !seen[k2]){ seen[k2]=1; need.push(k2); } } }
if(need.length) i18nEnqueue(need);
}catch(e){}
}
function i18nTick(){ if(I18N_TIMER) clearTimeout(I18N_TIMER); I18N_TIMER=setTimeout(function(){ try{ i18nScan(document.body); i18nRender(); }catch(e){} }, 120); }
function i18nStart(){
try{ i18nScan(document.body); i18nRender(); }catch(e){}
try{ if(i18nCur()!=='ko') setTimeout(i18nPrewarm, 150); }catch(e){}
if(I18N_OBS || typeof MutationObserver==='undefined') return;
try{
I18N_OBS=new MutationObserver(function(muts){
for(var i=0;i<muts.length;i++){ var mu=muts[i]; if((mu.type==='childList' && mu.addedNodes && mu.addedNodes.length) || mu.type==='attributes'){ i18nTick(); return; } }
});
I18N_OBS.observe(document.body, { subtree:true, childList:true, attributes:true, attributeFilter:['style'] });
}catch(e){}
try{
var _st=null;
document.addEventListener('scroll', function(){ if(i18nCur()==='ko') return; if(_st) clearTimeout(_st); _st=setTimeout(i18nTick, 250); }, true);
}catch(e){}
}
function setLang(code){
lsS(LANG_KEY, code);
applyLang();
if(typeof refreshLauncher==='function'){ try{ refreshLauncher(); }catch(e){} }
if(typeof i18nStart==='function'){ try{ i18nStart(); }catch(e){} }
if(typeof i18nRender==='function'){ try{ i18nRender(); }catch(e){} }
if(typeof i18nPrewarm==='function'){ try{ setTimeout(i18nPrewarm, 120); }catch(e){} }
showToast('🌍 '+(LANG_NAMES[code]||code)+'로 변경됐어!','linear-gradient(135deg,#00e5ff,#22c55e)');
}
function init(){
var savedApps=lsG(MY_APPS_KEY,[]);
for(var i=0;i<savedApps.length;i++){
var a=savedApps[i];
if(!SM[a.id]){
var restored={id:a.id,n:a.n,c:a.c,cat:a.cat,nt:'',h:a.h,_isCustom:true,
s:(function(h){return function(q){return h+(h.indexOf('?')>=0?'&':'?')+'q='+encodeURIComponent(q);};})(a.h),
lk:(function(h){return [{e:'🔗',t:'열기',u:function(q){return h;}}];})(a.h)};
SV.push(restored);SM[a.id]=restored;ICONS[a.id]=makeIconSVG(a.c,a.n);
}
}
updateMyAppCountUI();
updateCardCountUI();
applyCustomOrder();
applyLang();
showHome();
initCatSwipe();
if(typeof i18nStart==='function'){ try{ i18nStart(); }catch(e){} }
}
var CAT_PAGES = ['전체','검색·연락','쇼핑','영상','앱전용','음악','교통·금융','메시지'];
var swipeIdx = 0;
var swX = 0, swY = 0;
function initCatSwipe(){
var el = document.getElementById('app');
el.addEventListener('touchstart', function(e){
window._podoIconDrag=false;
swX = e.touches[0].clientX;
swY = e.touches[0].clientY;
}, {passive:true});
el.addEventListener('touchend', function(e){
if(window._podoIconDrag){ window._podoIconDrag=false; return; }
var ht = document.querySelector('.t-home');
if(!ht || !ht.classList.contains('active')) return;
var sb = document.getElementById('sbg');
if(sb && sb.classList.contains('open')) return;
var dx = e.changedTouches[0].clientX - swX;
var dy = e.changedTouches[0].clientY - swY;
if(Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 2) return;
var ni = swipeIdx + (dx < 0 ? 1 : -1);
ni = Math.max(0, Math.min(ni, CAT_PAGES.length - 1));
if(ni === swipeIdx) return;
swipeIdx = ni;
actCat = CAT_PAGES[ni];
var m = M();
var old = m.querySelector('.lcard');
var nl = makeLauncher();
if(old) m.removeChild(old);
m.appendChild(nl);
m.scrollTop = 0;
setTimeout(function(){
var onTab=document.querySelector('.ctab.on');
if(onTab) onTab.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
},50);
}, {passive:true});
}
function updateCatIndicator(){}
var homeinp=document.getElementById('homeinp');
var homesbtn=document.getElementById('homesbtn');
homeinp.addEventListener('input',function(){homesbtn.classList.toggle('on',!!this.value.trim());});
homeinp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();doHomeSend();}});
function doHomeSend(){
var text=homeinp.value.trim();
if(!text||loading) return;
homeinp.value=''; homesbtn.classList.remove('on');
var chatTab=document.querySelector('.t-chat');
if(chatTab) switchTab('chat', chatTab);
addMsg('me', text);
if(!hasAIKey()){addMsg('ai',getNoKeyMsg()); return;}
var hit=null;
var keys=Object.keys(KW);
for(var i=0;i<keys.length;i++){
var id=keys[i]; var kws=KW[id];
for(var j=0;j<kws.length;j++){if(text.indexOf(kws[j])>=0){hit=SM[id];break;}}
if(hit) break;
}
if(hit){
if(hit.direct){
var nums=text.match(/[0-9]{2,}/g);
var num=nums?nums[0]:'';
if(hit.id==='phone'){
window.location.href='tel:'+num;
addMsg('ai',num?'📞 '+num+' 로 전화 연결할게!':'📞 전화 앱을 열었어!');
} else if(hit.id==='sms'){
var body=text.replace(/문자|메시지|보내줘|보내/g,'').trim();
window.location.href='sms:'+(num||'')+'?body='+encodeURIComponent(body);
addMsg('ai',num?'💬 '+num+' 로 문자 보낼게!':'💬 문자 앱을 열었어!');
}
} else {
openSheet(hit); addMsg('ai',hit.n+' 열었어! 검색하거나 바로가기를 눌러봐 👆');
}
return;
}
loading=true; addDots();
callAI({
system:(window.PODO_PERSONA||'PodoAI 어시스턴트. 친구처럼 짧게 반말. 이모지 1개.'),
messages:hist.concat([{role:'user',content:text}]),
maxTokens:500
}, function(reply){
hist.push({role:'user',content:text},{role:'assistant',content:reply});
if(hist.length>20) hist=hist.slice(-20);
rmDots(); addMsg('ai',reply||'응!'); loading=false;
}, function(e){rmDots(); addMsg('ai','오류 😅\n'+e.message); loading=false;});
}
function doHomeMic(){
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){alert('Chrome/Edge를 사용해 주세요.'); return;}
if(micOn){if(srObj)srObj.stop(); return;}
navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){
st.getTracks().forEach(function(t){t.stop();});
var sr=new SR(); sr.lang='ko-KR'; sr.interimResults=false;
var mb=document.getElementById('homemicbtn');
sr.onstart=function(){micOn=true; if(mb){mb.classList.add('rec');mb.textContent='🔴';}};
sr.onresult=function(e){var t=e.results[0][0].transcript; homeinp.value=t; homeinp.dispatchEvent(new Event('input')); homeinp.focus();};
sr.onerror=function(){micOn=false; if(mb){mb.classList.remove('rec');mb.textContent='🎤';}};
sr.onend=function(){micOn=false; if(mb){mb.classList.remove('rec');mb.textContent='🎤';}};
sr.start(); srObj=sr;
}).catch(function(){alert('마이크 권한을 허용해 주세요.');});
}
var inp=document.getElementById('inp');
var sbtn=document.getElementById('sbtn');
inp.addEventListener('input',function(){sbtn.classList.toggle('on',!!this.value.trim());});
inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();doSend();}});
function doSend(){
var text=inp.value.trim();
if(!text||loading) return;
inp.value=''; sbtn.classList.remove('on');
var chatTab=document.querySelector('.t-chat');
if(chatTab&&!chatTab.classList.contains('active')){
switchTab('chat',chatTab);
}
addMsg('me',text);
if(!hasAIKey()){addMsg('ai',getNoKeyMsg()); return;}
var hit=null;
var keys=Object.keys(KW);
for(var i=0;i<keys.length;i++){
var id=keys[i]; var kws=KW[id];
for(var j=0;j<kws.length;j++){
if(text.indexOf(kws[j])>=0){hit=SM[id]; break;}
}
if(hit) break;
}
if(hit){
if(hit.direct){
var nums=text.match(/[0-9]{2,}/g);
var num=nums?nums[0]:'';
if(hit.id==='phone'){
window.location.href='tel:'+num;
addMsg('ai',num?'📞 '+num+' 로 전화 연결할게!':'📞 전화 앱을 열었어!');
} else if(hit.id==='sms'){
var body=text.replace(/문자|메시지|보내줘|보내/g,'').trim();
window.location.href='sms:'+(num||'')+'?body='+encodeURIComponent(body);
addMsg('ai',num?'💬 '+num+' 로 문자 보낼게!':'💬 문자 앱을 열었어!');
}
} else {
openSheet(hit); addMsg('ai',hit.n+' 열었어! 검색하거나 바로가기를 눌러봐 👆');
}
return;
}
loading=true; addDots();
callAI({
system:(window.PODO_PERSONA||'PodoAI 어시스턴트. 친구처럼 짧게 반말. 이모지 1개.'),
messages:hist.concat([{role:'user',content:text}]),
maxTokens:500
}, function(reply){
hist.push({role:'user',content:text},{role:'assistant',content:reply});
if(hist.length>20) hist=hist.slice(-20);
rmDots(); addMsg('ai',reply||'응!');
loading=false;
}, function(e){
rmDots(); addMsg('ai','오류 😅\n'+e.message);
loading=false;
});
}
function selWp(el,type){
wpType=type;
var btns=document.querySelectorAll('.wp-type');
for(var i=0;i<btns.length;i++) btns[i].classList.remove('on');
el.classList.add('on');
}
function aiWrite(){
var txt=document.getElementById('wptxt').value.trim();
if(!txt){alert('주제나 내용을 입력해줘!'); return;}
if(!hasAIKey()){ noKeyInto('wpresult','wpresulttxt'); return; }
var res=document.getElementById('wpresult');
var restxt=document.getElementById('wpresulttxt');
res.style.display='block'; restxt.textContent='✍️ 작성 중...';
callAI({
system:wpType+' 글쓰기 전문가. 요청 내용으로 자연스럽고 매력적인 '+wpType+' 글을 써줘.',
messages:[{role:'user',content:txt}],
maxTokens:800
}, function(text){ restxt.textContent=text; },
function(e){ restxt.textContent='오류: '+e.message; });
}
function clearKey(){
if(!confirm('Claude API 키를 삭제할까요?')) return;
apiKey=''; lsS('podoai_k',''); updateMyStatus(); alert('삭제했어!');
}
function doMic(){
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){alert('Chrome/Edge를 사용해 주세요.'); return;}
if(micOn){if(srObj)srObj.stop(); return;}
navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){
st.getTracks().forEach(function(t){t.stop();});
var sr=new SR(); sr.lang='ko-KR'; sr.interimResults=false;
var mb=document.getElementById('chatmicbtn');
sr.onstart=function(){micOn=true; if(mb){mb.classList.add('rec'); mb.textContent='🔴';}};
sr.onresult=function(e){
var t=e.results[0][0].transcript;
inp.value=t; inp.dispatchEvent(new Event('input')); inp.focus();
};
sr.onerror=function(){micOn=false; if(mb){mb.classList.remove('rec'); mb.textContent='🎤';}};
sr.onend=function(){micOn=false; if(mb){mb.classList.remove('rec'); mb.textContent='🎤';}};
sr.start(); srObj=sr;
}).catch(function(){alert('마이크 권한을 허용해 주세요.');});
}
var AFF = {
enabled: false,
proxyUrl: (function(){ try{ return lsG('podoai_proxy',''); }catch(e){ return ''; } })(),
map: {
coupang:    { method:'proxy' },
gmarket:    { method:'cps',  base:'' },
elevenst:   { method:'cps',  base:'' },
musinsa:    { method:'cps',  base:'' },
oliveyoung: { method:'cps',  base:'' },
nshop:      { method:'none' },
baemin:     { method:'none' },
coupangeats:{ method:'none' }
}
};
function affActive(){ return !!AFF.enabled; }
function affDisclosureText(svcId){
if(svcId==='coupang') return '이 화면의 링크는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.';
return '이 화면의 일부 링크는 제휴 마케팅 링크이며, 구매 시 운영자가 일정액의 수수료를 받을 수 있습니다.';
}
function affWrap(url, svcId){
if(!AFF.enabled || !url || !svcId) return url;
var c = AFF.map[svcId];
if(!c || c.method==='none') return url;
if(c.method==='param' && c.params) return url + (url.indexOf('?')<0?'?':'&') + c.params;
if(c.method==='cps' && c.base)     return c.base + encodeURIComponent(url);
return url;
}
function go(url, svcId){
if(!url) return;
var c = AFF.enabled ? AFF.map[svcId] : null;
if(c && c.method==='proxy' && AFF.proxyUrl){
fetch(AFF.proxyUrl, {method:'POST', headers:{'content-type':'text/plain;charset=utf-8'},
body: JSON.stringify({type:'coupang_deeplink', url:url})})
.then(function(r){ return r.json(); })
.then(function(d){ _openHref(d && d.shortenUrl ? d.shortenUrl : url); })
.catch(function(){ _openHref(url); });
return;
}
_openHref(affWrap(url, svcId));
}
function _openHref(url){
if(!url) return;
if(window.Android && typeof window.Android.openExternal==='function'){ try{ window.Android.openExternal(url); return; }catch(e){} }
try{ window.location.assign(url); }
catch(e){ window.location.href=url; }
}
function openUrl(url, svcId){ if(!url) return; go(url, svcId); }
function launchExternalApp(svc){
var pkg = svc.pkg || '';
var web = svc.h || (typeof svc.s==='function' ? svc.s('') : '');
if(window.Android && typeof window.Android.launchApp==='function'){
try{ window.Android.launchApp(pkg, web||''); return; }catch(e){}
}
if(web) go(web, svc.id);
}
function openSheet(svc){
curSvc=svc;
var sic=document.getElementById('sic2');
sic.innerHTML=''; sic.style.background=svc.c; sic.style.boxShadow='0 4px 16px '+svc.c+'88';
if(ICONS[svc.id]){
var img=document.createElement('img'); img.src=svgToUri(ICONS[svc.id]);
img.style.cssText='width:38px;height:38px;object-fit:contain;border-radius:6px;'; sic.appendChild(img);
} else {
sic.style.color='#fff'; sic.style.fontWeight='700'; sic.style.fontSize='14px';
sic.textContent=svc.n.slice(0,2);
}
document.getElementById('snm').textContent=svc.n;
document.getElementById('sct').textContent=svc.cat;
document.getElementById('sq').placeholder=svc.n+'에서 검색…';
document.getElementById('sq').value='';
document.getElementById('sgo').classList.remove('on');
document.getElementById('snote2').textContent=svc.nt||'';
var cont=document.getElementById('slinks'); cont.innerHTML='';
var linkList=[{e:'🏠',t:svc.n+' 홈',ds:'메인 페이지',u:svc.h}];
for(var i=0;i<svc.lk.length;i++) linkList.push({e:svc.lk[i].e,t:svc.lk[i].t,ds:'',u:svc.lk[i].u('')});
for(var i=0;i<linkList.length;i++){
(function(lk){
var a=document.createElement('div'); a.className='sl'; a.style.cursor='pointer';
a.innerHTML='<div class="sl-ic" style="background:'+svc.c+'22">'+lk.e+'</div>'
+'<div><div class="sl-tt">'+lk.t+'</div>'+(lk.ds?'<div class="sl-ds">'+lk.ds+'</div>':'')+'</div>'
+'<div class="sl-ar">&#8250;</div>';
a.onclick=function(){ openUrl(lk.u, svc.id); };
cont.appendChild(a);
})(linkList[i]);
}
if(affActive() && AFF.map[svc.id] && AFF.map[svc.id].method!=='none'){
var _disc=document.createElement('div');
_disc.textContent=affDisclosureText(svc.id);
_disc.style.cssText='font-size:10px;color:rgba(0,0,0,.32);text-align:center;margin-top:10px;line-height:1.5';
cont.appendChild(_disc);
}
document.getElementById('sbg').classList.add('open');
history.pushState({podoai:true},'','');
}
function closeSheet(){document.getElementById('sbg').classList.remove('open'); history.pushState({podoai:true},'','');}
function closeUp(){document.getElementById('upbg').classList.remove('open'); history.pushState({podoai:true},'','');}
function sqCh(){
var q=document.getElementById('sq').value.trim();
document.getElementById('sgo').classList.toggle('on',!!q);
if(curSvc&&q){
var links=document.querySelectorAll('#slinks .sl');
for(var i=0;i<curSvc.lk.length;i++){
if(links[i+1]) links[i+1].href=curSvc.lk[i].u(q);
}
}
}
function sqGo(){
var q=document.getElementById('sq').value.trim();
if(!q||!curSvc) return;
openUrl(curSvc.s(q), curSvc.id); closeSheet();
}
function openUp(){
upStep=apiKey?'input':'intro';
renderUp();
document.getElementById('upbg').classList.add('open');
history.pushState({podoai:true},'','');
}
var PAY_IMG1="pay1.jpg";
var PAY_IMG2="pay2.jpg";
function renderUp(){
var inner=document.getElementById('upin');
if(upStep==='intro'){
inner.innerHTML='<div style="text-align:center;padding:22px 0 18px">'
+'<div style="font-size:50px;margin-bottom:10px">🍇</div>'
+'<div style="font-size:20px;font-weight:700;color:#141720;margin-bottom:5px">PodoAI</div>'
+'<div style="font-size:11px;color:#1f2430;margin-bottom:20px">내 폰이 서버 · 완전한 개인정보 보호</div>'
+'</div>'
+'<button class="upbp" onclick="upStep=\'input\';renderUp()">🍇 API 키가 있어요 — 시작</button>'
+'<button class="upbs" onclick="upStep=\'guide\';renderUp()">🔑 API 키 없어요 — 발급받기</button>'
+'<div style="text-align:center;margin-top:10px;font-size:10px;color:rgba(0,0,0,.22)">키는 이 기기에만 저장</div>';
} else if(upStep==='guide'){
inner.innerHTML='<div style="display:flex;align-items:center;padding:14px 0 10px">'
+'<button style="background:rgba(0,0,0,.24);border:none;width:32px;height:32px;border-radius:9px;color:#1f2430;font-size:15px;cursor:pointer;margin-right:8px" onclick="upStep=\'intro\';renderUp()">&#8592;</button>'
+'<div style="font-size:14px;font-weight:700;color:#141720">API 키 발급 가이드</div></div>'
+'<div class="upcard" style="border-color:rgba(0,229,255,.18)">'
+'<div class="upbadge" style="background:rgba(0,229,255,.14);color:#08819f">1단계</div>'
+'<div class="upt">Anthropic 계정 만들기</div>'
+'<a class="upa" href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" style="color:#08819f;border-color:#08819f44;background:rgba(0,229,255,.14)">🌐 콘솔 열기</a></div>'
+'<div class="upcard" style="border-color:rgba(123,97,255,.18)">'
+'<div class="upbadge" style="background:rgba(123,97,255,.14);color:#7b61ff">2단계</div>'
+'<div class="upt">API 키 만들기 — sk-ant-... 복사</div>'
+'<a class="upa" href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style="color:#7b61ff;border-color:#7b61ff44;background:rgba(123,97,255,.14)">🔑 API Keys 페이지</a></div>'
+'<div class="upcard" style="border-color:rgba(34,197,94,.18)">'
+'<div class="upbadge" style="background:rgba(34,197,94,.14);color:#22c55e">3단계</div>'
+'<div class="upt">결제 수단 등록 + 크레딧 구매</div>'
+'<a class="upa" href="https://console.anthropic.com/settings/billing" target="_blank" rel="noopener noreferrer" style="color:#22c55e;border-color:#22c55e44;background:rgba(34,197,94,.14)">💳 Billing 페이지</a></div>'
+'<div class="upcard" style="border-color:rgba(234,88,12,.3);background:rgba(234,88,12,.05)">'
+'<div class="upbadge" style="background:rgba(234,88,12,.16);color:#c2410c">⭐ 결제 안 될 때</div>'
+'<div class="upt" style="color:#c2410c">결제가 자꾸 실패하면 — 핵심 해결법</div>'
+'<div style="font-size:11.5px;color:#252a39;line-height:1.85;margin-top:4px">'
+'· 결제 시 <b>"배송 주소와 청구 주소가 동일합니다" 체크 해제</b><br>'
+'· <b style="color:#c2410c">⭐ 조직 이름(Organization) 필드 기본값을 지우고 직접 다시 입력 ← 이게 핵심!</b><br>'
+'· 충전은 입문자 <b>$5</b> 추천 · 해외결제 되는 카드 사용<br>'
+'· 도시·주소·우편번호 입력 후 구매 → 카드사 인증 → 완료!'
+'</div>'
+'<img src="'+PAY_IMG1+'" style="width:100%;border-radius:10px;margin-top:10px;border:1px solid rgba(0,0,0,.08)">'
+'<img src="'+PAY_IMG2+'" style="width:100%;border-radius:10px;margin-top:8px;border:1px solid rgba(0,0,0,.08)">'
+'</div>'
+'<button class="upbp" onclick="upStep=\'input\';renderUp()">✅ 키 발급 완료 — 입력하기</button>';
} else {
inner.innerHTML='<div style="text-align:center;padding:14px 0 10px">'
+'<div style="font-size:34px;margin-bottom:6px">🔑</div>'
+'<div style="font-size:17px;font-weight:700;color:#141720">Claude API 키</div>'
+'<div style="font-size:11.5px;color:#1f2430;margin-top:3px">최고 품질 · 웹검색·최신정보 지원 · 유료(충전형)</div></div>'
+'<div style="background:rgba(123,97,255,.08);border:1px solid rgba(123,97,255,.2);border-radius:14px;padding:13px;margin-bottom:12px">'
+'<div style="font-size:12px;font-weight:800;color:#6645dd;margin-bottom:7px">🟣 Claude로 할 수 있는 것</div>'
+'<div style="font-size:11.5px;color:#252a39;line-height:1.9">✅ 채팅·글쓰기·쇼츠·검색 모두 사용<br>✅ 자연어 이해·답변 품질 최상<br>✅ 충전형 유료 (입문자 <b>$5</b> 추천)</div></div>'
+'<div style="background:rgba(0,0,0,.03);border-radius:14px;padding:13px;margin-bottom:12px">'
+'<div style="font-size:12px;font-weight:800;color:rgba(0,0,0,.78);margin-bottom:7px">👉 키 발급 방법</div>'
+'<div style="font-size:11.5px;color:#252a39;line-height:1.9">1. console.anthropic.com 접속<br>2. Google 계정 또는 이메일로 가입<br>3. Settings → API Keys → Create Key<br>4. $5 충전(결제 등록) 후 키 복사 → 아래 붙여넣기</div>'
+'<a class="upa" href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style="display:block;margin-top:10px;color:#6645dd;border-color:#6645dd44;background:rgba(123,97,255,.12);text-align:center">🔗 console.anthropic.com 열기</a>'
+'<button class="upbs" style="margin-top:8px;width:100%" onclick="upStep=\'guide\';renderUp()">💳 결제가 안 될 때 (해결 가이드·이미지) 보기</button></div>'
+'<div class="kw"><input id="ki" class="ki" type="password" placeholder="sk-ant-api03-..." autocomplete="off">'
+'<button class="eye" onclick="var k=document.getElementById(\'ki\');k.type=k.type===\'password\'?\'text\':\'password\'">👁️</button></div>'
+'<div id="kerr" class="errmsg"></div>'
+'<button id="vb" class="upbp" onclick="verifyKey()">🍇 PodoAI 시작하기</button>';
}
}
function verifyKey(){
var ki=document.getElementById('ki'); if(!ki) return;
var k=ki.value.trim();
if(!k){showKE('API 키를 붙여넣어 줘'); return;}
if(k.indexOf('sk-ant-')<0){showKE('sk-ant- 로 시작하는 키를 넣어줘'); return;}
var vb=document.getElementById('vb');
vb.innerHTML='<span style="display:inline-block;width:14px;height:14px;border-radius:50%;border:2px solid rgba(0,0,0,.3);border-top-color:#16181f;animation:spin .75s linear infinite;vertical-align:middle;margin-right:6px"></span>확인 중…';
vb.disabled=true; hideKE();
fetch('https://api.anthropic.com/v1/messages',{
method:'POST',
headers:{'Content-Type':'application/json','x-api-key':k,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:5,messages:[{role:'user',content:'hi'}]})
}).then(function(r){return r.json();}).then(function(d){
if(d.error) throw new Error(d.error.message);
apiKey=k; lsS('podoai_k',k); closeUp();
var sc=document.getElementById('startcard'); if(sc) sc.remove();
addMsg('ai','API 키 등록 완료! 채팅 탭에서 AI랑 대화해봐 🎉');
updateMyStatus();
}).catch(function(e){
showKE('확인 실패: '+e.message);
vb.textContent='🍇 PodoAI 시작하기'; vb.disabled=false;
});
}
function showKE(m){var e=document.getElementById('kerr');if(e){e.textContent='⚠️ '+m;e.style.display='block';}}
function hideKE(){var e=document.getElementById('kerr');if(e)e.style.display='none';}
history.pushState({podoai:true},'','');
window.addEventListener('popstate',function(){
var nbg=document.getElementById('ainews-bg'), abg=document.getElementById('awork-bg'), vbg=document.getElementById('vmaker-bg');
if(nbg){ nbg.remove(); history.pushState({podoai:true},'',''); return; }
if(abg){ abg.remove(); history.pushState({podoai:true},'',''); return; }
if(vbg){ vbg.remove(); history.pushState({podoai:true},'',''); return; }
var sbg=document.getElementById('sbg'), upbg=document.getElementById('upbg');
var histbg=document.getElementById('histbg'), geminibg=document.getElementById('geminibg');
var lsbg=document.getElementById('lsbg'), gallerybg=document.getElementById('gallerybg');
var shortssavedbg=document.getElementById('shortssavedbg');
var wplistbg=document.getElementById('wplistbg'), custombg=document.getElementById('custombg');
if(sbg&&sbg.classList.contains('open')){sbg.classList.remove('open');history.pushState({podoai:true},'','');return;}
if(upbg&&upbg.classList.contains('open')){upbg.classList.remove('open');history.pushState({podoai:true},'','');return;}
if(histbg&&histbg.classList.contains('open')){histbg.classList.remove('open');history.pushState({podoai:true},'','');return;}
if(geminibg&&geminibg.style.display==='flex'){geminibg.style.display='none';history.pushState({podoai:true},'','');return;}
if(lsbg&&lsbg.style.display==='flex'){lsbg.style.display='none';history.pushState({podoai:true},'','');return;}
if(gallerybg&&gallerybg.style.display==='flex'){gallerybg.style.display='none';history.pushState({podoai:true},'','');return;}
if(shortssavedbg&&shortssavedbg.style.display==='flex'){shortssavedbg.style.display='none';history.pushState({podoai:true},'','');return;}
if(wplistbg&&wplistbg.style.display==='flex'){wplistbg.style.display='none';history.pushState({podoai:true},'','');return;}
if(custombg&&custombg.style.display==='flex'){custombg.style.display='none';history.pushState({podoai:true},'','');return;}
var spbg=document.getElementById('shorts-preview-bg');
var wsb=document.getElementById('websearch-bg');
if(wsb&&wsb.style.display==='flex'){ closeWebSearchKey(); history.pushState({podoai:true},'',''); return; }
var nvb=document.getElementById('navi-bg');
if(nvb&&nvb.style.display==='flex'){ closeNavi(); history.pushState({podoai:true},'',''); return; }
var usb=document.getElementById('uniscreen-bg');
if(usb&&usb.style.display==='flex'){ closeUniScreen(); history.pushState({podoai:true},'',''); return; }
var vbg=document.getElementById('vans-bg');
if(vbg&&vbg.style.display==='flex'){ vansClose(); history.pushState({podoai:true},'',''); return; }
var rxbg=document.getElementById('reel-export-bg');
if(rxbg&&rxbg.style.display==='flex'){ rxbg.style.display='none'; history.pushState({podoai:true},'',''); return; }
if(spbg&&spbg.style.display==='flex'){ _reelStop(); history.pushState({podoai:true},'',''); return; }
var ids2=['url-guide-sheet','carddetail-bg','cardscan-bg','cardlist-bg','voiceact-bg','navi-bg','briefing-bg','research-bg','workflow-bg','senior-bg','study-bg','travel-bg','fridge-bg','name-bg','fortune-bg','quiz-bg','obj-bg','ocr-bg','label-bg','biz-bg','ledger-bg','addappbg','myapplistbg','gworkspace-bg','navinbg','alimtalkbg','smsbg','mapbg','gcalbg','kcalbg','nshopbg','upbitbg','kweatherbg','gmailbg'];
for(var pi=0;pi<ids2.length;pi++){var pel=document.getElementById(ids2[pi]);if(pel&&pel.style.display==='flex'){pel.style.display='none';history.pushState({podoai:true},'','');return;}}
var homeTab=document.querySelector('.t-home'); if(homeTab) switchTab('home',homeTab);
history.pushState({podoai:true},'','');
});
function _vansReassert(){
if(!window._vansActive) return;
var vbg=document.getElementById('vans-bg'); if(vbg) vbg.style.display='flex';
}
window.addEventListener('pageshow', function(e){ if(e && e.persisted) _vansReassert(); });
document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible') _vansReassert(); });
init();
