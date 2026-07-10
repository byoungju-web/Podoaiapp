/* PodoAI v4.82 - part 1/3 */
var E = function(s){ return encodeURIComponent(s||''); };
var SV = [
{id:'naver',    n:'네이버',      c:'#03C75A', cat:'검색',  nt:'',
h:'https://www.naver.com',
s:function(q){return 'https://search.naver.com/search.naver?query='+E(q);},
lk:[{e:'📰',t:'뉴스',u:function(q){return 'https://search.naver.com/search.naver?where=news&query='+E(q);}},
{e:'✏️',t:'블로그',u:function(q){return 'https://search.naver.com/search.naver?where=blog&query='+E(q);}},
{e:'🛍',t:'쇼핑',u:function(q){return 'https://search.shopping.naver.com/search/all?query='+E(q);}}]},
{id:'naver_news', n:'네이버뉴스', c:'#03C75A', cat:'검색', nt:'',
h:'https://news.naver.com',
s:function(q){return 'https://search.naver.com/search.naver?where=news&query='+E(q);},
lk:[{e:'📰',t:'뉴스홈',u:function(q){return 'https://news.naver.com';}},
{e:'🔥',t:'헤드라인',u:function(q){return 'https://news.naver.com/main/main.naver';}},
{e:'🏢',t:'경제',u:function(q){return 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101';}},
{e:'🖥',t:'IT/과학',u:function(q){return 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=105';}},
{e:'⚽',t:'스포츠',u:function(q){return 'https://sports.news.naver.com';}}]},
{id:'google',   n:'구글',        c:'#4285F4', cat:'검색',  nt:'',
h:'https://www.google.com',
s:function(q){return 'https://www.google.com/search?q='+E(q);},
lk:[{e:'🖼',t:'이미지검색',u:function(q){return 'https://www.google.com/search?tbm=isch&q='+E(q);}},
{e:'📰',t:'뉴스',u:function(q){return 'https://news.google.com/search?q='+E(q);}},
{e:'🗺',t:'지도',u:function(q){return 'https://www.google.com/maps/search/'+E(q);}}]},
{id:'youtube',  n:'유튜브',      c:'#FF0000', cat:'검색',  nt:'',
h:'https://www.youtube.com',
s:function(q){return 'https://www.youtube.com/results?search_query='+E(q);},
lk:[{e:'🎥',t:'영상검색',u:function(q){return 'https://www.youtube.com/results?search_query='+E(q);}},
{e:'⚡',t:'쇼츠',u:function(q){return 'https://www.youtube.com/shorts';}},
{e:'📺',t:'구독피드',u:function(q){return 'https://www.youtube.com/feed/subscriptions';}}]},
{id:'kakaomap', n:'카카오맵', c:'#F9A825', cat:'검색', nt:'',
h:'https://map.kakao.com',
s:function(q){return 'https://map.kakao.com/?q='+E(q);},
lk:[{e:'📍',t:'장소검색',u:function(q){return 'https://map.kakao.com/?q='+E(q);}},
{e:'🍽',t:'맛집검색',u:function(q){return 'https://map.kakao.com/?q='+E(q)+'맛집';}},
{e:'🗺',t:'지도홈',u:function(q){return 'https://map.kakao.com';}}],
_action:'open_kakaomap'},
{id:'coupang',  n:'쿠팡',        c:'#E8002D', cat:'쇼핑',  nt:'결제는 쿠팡 앱에서만',
h:'https://www.coupang.com',
s:function(q){return 'https://www.coupang.com/np/search?q='+E(q);},
lk:[{e:'🔍',t:'상품검색',u:function(q){return 'https://www.coupang.com/np/search?q='+E(q);}},
{e:'🚀',t:'로켓배송',u:function(q){return 'https://www.coupang.com/np/categories?categoryId=1';}},
{e:'🏷',t:'오늘의딜',u:function(q){return 'https://www.coupang.com/np/deals';}}]},
{id:'baemin',   n:'배달의민족',  c:'#2AC1BC', cat:'쇼핑',  nt:'주문은 배민 앱에서만',
h:'https://www.baemin.com',
s:function(q){return 'https://www.baemin.com/search?query='+E(q);},
lk:[{e:'🔍',t:'음식검색',u:function(q){return 'https://www.baemin.com/search?query='+E(q);}},
{e:'🏠',t:'배민홈',u:function(q){return 'https://www.baemin.com';}},
{e:'1️⃣',t:'1인분',u:function(q){return 'https://www.baemin.com/solo';}}]},
{id:'daangn',   n:'당근마켓',    c:'#FF6F0F', cat:'쇼핑',  nt:'',
h:'https://www.daangn.com',
s:function(q){return 'https://www.daangn.com/search/'+E(q);},
lk:[{e:'🔍',t:'중고검색',u:function(q){return 'https://www.daangn.com/search/'+E(q);}},
{e:'🏘',t:'동네매물',u:function(q){return 'https://www.daangn.com';}},
{e:'💬',t:'동네생활',u:function(q){return 'https://www.daangn.com/community';}}]},
{id:'netflix',  n:'넷플릭스',    c:'#E50914', cat:'영상',  nt:'',
h:'https://www.netflix.com',
s:function(q){return 'https://www.netflix.com/search?q='+E(q);},
lk:[{e:'🔍',t:'콘텐츠검색',u:function(q){return 'https://www.netflix.com/search?q='+E(q);}},
{e:'🔥',t:'지금뜨는',u:function(q){return 'https://www.netflix.com/browse/trending';}},
{e:'❤️',t:'찜목록',u:function(q){return 'https://www.netflix.com/browse/my-list';}}]},
{id:'wavve',    n:'웨이브',      c:'#005FFF', cat:'영상',  nt:'',
h:'https://www.wavve.com',
s:function(q){return 'https://www.wavve.com/search?keyword='+E(q);},
lk:[{e:'🔍',t:'콘텐츠검색',u:function(q){return 'https://www.wavve.com/search?keyword='+E(q);}},
{e:'📡',t:'실시간TV',u:function(q){return 'https://www.wavve.com/player/live';}},
{e:'🎞',t:'영화',u:function(q){return 'https://www.wavve.com/movie';}}]},
{id:'kakaopage',n:'카카오페이지',c:'#F5A623', cat:'영상',  nt:'',
h:'https://page.kakao.com',
s:function(q){return 'https://page.kakao.com/search?keyword='+E(q);},
lk:[{e:'🔍',t:'웹툰·소설',u:function(q){return 'https://page.kakao.com/search?keyword='+E(q);}},
{e:'🏆',t:'인기TOP',u:function(q){return 'https://page.kakao.com/home';}},
{e:'🆓',t:'무료작품',u:function(q){return 'https://page.kakao.com/free';}}]},
{id:'melon',    n:'멜론',        c:'#00C73C', cat:'음악',  nt:'',
h:'https://www.melon.com',
s:function(q){return 'https://www.melon.com/search/total/index.htm?q='+E(q);},
lk:[{e:'🔍',t:'음악검색',u:function(q){return 'https://www.melon.com/search/total/index.htm?q='+E(q);}},
{e:'📊',t:'TOP100',u:function(q){return 'https://www.melon.com/chart/index.htm';}},
{e:'🆕',t:'최신음악',u:function(q){return 'https://www.melon.com/new/song/index.htm';}}]},
{id:'toss',     n:'토스',        c:'#0064FF', cat:'교통·금융',  nt:'금융거래는 토스 앱에서만',
h:'https://toss.im',
s:function(q){return 'https://toss.im';},
lk:[{e:'🌐',t:'토스웹',u:function(q){return 'https://toss.im';}},
{e:'📈',t:'토스증권',u:function(q){return 'https://securities.toss.im';}},
{e:'🏦',t:'토스뱅크',u:function(q){return 'https://www.tossbank.com';}}]},
{id:'kakaotalk',n:'카카오톡',    c:'#F9E000', cat:'메시지',nt:'메시지 접근 없음',
h:'https://www.kakaocorp.com',
s:function(q){return 'https://open.kakao.com/o/search/'+E(q);},
lk:[{e:'💬',t:'오픈채팅',u:function(q){return 'https://open.kakao.com/o/search/'+E(q);}},
{e:'📣',t:'카카오채널',u:function(q){return 'https://pf.kakao.com/_search?q='+E(q);}},
{e:'🏠',t:'카카오홈',u:function(q){return 'https://www.kakaocorp.com';}}]},
{id:'chatgpt', n:'ChatGPT',   c:'#10a37f', cat:'검색', nt:'',
h:'https://chatgpt.com',
s:function(q){return 'https://chatgpt.com/?q='+E(q);},
lk:[{e:'💬',t:'대화하기',u:function(q){return 'https://chatgpt.com';}},
{e:'🔍',t:'검색',u:function(q){return 'https://chatgpt.com/?q='+E(q);}}]},
{id:'google_translate', n:'번역',  c:'#4285F4', cat:'검색', nt:'',
h:'https://translate.google.com',
s:function(q){return 'https://translate.google.com/?text='+E(q)+'&sl=auto&tl=ko';},
lk:[{e:'🇰🇷',t:'→한국어',u:function(q){return 'https://translate.google.com/?text='+E(q)+'&sl=auto&tl=ko';}},
{e:'🇺🇸',t:'→영어',u:function(q){return 'https://translate.google.com/?text='+E(q)+'&sl=auto&tl=en';}},
{e:'🇯🇵',t:'→일본어',u:function(q){return 'https://translate.google.com/?text='+E(q)+'&sl=auto&tl=ja';}}]},
{id:'daum', n:'다음', c:'#FF5A00', cat:'검색', nt:'',
h:'https://www.daum.net',
s:function(q){return 'https://search.daum.net/search?w=tot&q='+E(q);},
lk:[{e:'📰',t:'뉴스',u:function(q){return 'https://search.daum.net/search?w=news&q='+E(q);}},{e:'🖼',t:'이미지',u:function(q){return 'https://search.daum.net/search?w=img&q='+E(q);}}]},
{id:'gmail', n:'Gmail', c:'#EA4335', cat:'연락', nt:'',
h:'https://mail.google.com',
s:function(q){return 'https://mail.google.com/mail/u/0/#search/'+E(q);},
lk:[{e:'📧',t:'받은편지함',u:function(q){return 'https://mail.google.com/mail/u/0/#inbox';}},{e:'✏️',t:'메일쓰기',u:function(q){return 'https://mail.google.com/mail/u/0/#compose';}}]},
{id:'gmarket', n:'G마켓', c:'#CC0000', cat:'쇼핑', nt:'',
h:'https://www.gmarket.co.kr',
s:function(q){return 'https://browse.gmarket.co.kr/search?keyword='+E(q);},
lk:[{e:'🔥',t:'베스트',u:function(q){return 'https://www.gmarket.co.kr/n/best';}},{e:'🎁',t:'이벤트',u:function(q){return 'https://www.gmarket.co.kr/n/super-sale';}}]},
{id:'elevenst', n:'11번가', c:'#FF0000', cat:'쇼핑', nt:'',
h:'https://www.11st.co.kr',
s:function(q){return 'https://search.11st.co.kr/Search.tmall?kwd='+E(q);},
lk:[{e:'🔥',t:'오늘의딜',u:function(q){return 'https://www.11st.co.kr/browsing/TodayDeal.tmall';}},{e:'🎁',t:'이벤트',u:function(q){return 'https://www.11st.co.kr/browsing/EventBanner.tmall';}}]},
{id:'musinsa', n:'무신사', c:'#111111', cat:'쇼핑', nt:'',
h:'https://www.musinsa.com',
s:function(q){return 'https://www.musinsa.com/search/musinsa/integration?q='+E(q);},
lk:[{e:'🔥',t:'랭킹',u:function(q){return 'https://www.musinsa.com/ranking/best';}},{e:'🆕',t:'신상품',u:function(q){return 'https://www.musinsa.com/new/men';}}]},
{id:'oliveyoung', n:'올리브영', c:'#6AAB3B', cat:'쇼핑', nt:'',
h:'https://www.oliveyoung.co.kr',
s:function(q){return 'https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query='+E(q);},
lk:[{e:'🔥',t:'베스트',u:function(q){return 'https://www.oliveyoung.co.kr/store/main/getBestList.do';}},{e:'🆕',t:'신상',u:function(q){return 'https://www.oliveyoung.co.kr/store/main/getNewList.do';}}]},
{id:'yogiyo', n:'요기요', c:'#FA0050', cat:'쇼핑', nt:'',
h:'https://www.yogiyo.co.kr',
s:function(q){return 'https://www.yogiyo.co.kr/search/?search='+E(q);},
lk:[{e:'🍕',t:'치킨/피자',u:function(q){return 'https://www.yogiyo.co.kr/';}}]},
{id:'coupangeats', n:'쿠팡이츠', c:'#C00000', cat:'쇼핑', nt:'',
h:'https://www.coupangeats.com',
s:function(q){return 'https://www.coupangeats.com';},
lk:[{e:'🍔',t:'주문하기',u:function(q){return 'https://www.coupangeats.com';}}]},
{id:'tving', n:'티빙', c:'#FF153C', cat:'영상', nt:'',
h:'https://www.tving.com',
s:function(q){return 'https://www.tving.com/search?searchText='+E(q);},
lk:[{e:'🔥',t:'인기',u:function(q){return 'https://www.tving.com/ranking';}},{e:'🆕',t:'신작',u:function(q){return 'https://www.tving.com/new/tvprogram';}}]},
{id:'watcha', n:'왓챠', c:'#FF0558', cat:'영상', nt:'',
h:'https://watcha.com',
s:function(q){return 'https://watcha.com/search?query='+E(q);},
lk:[{e:'🔥',t:'인기',u:function(q){return 'https://watcha.com/recommendations';}},{e:'🎬',t:'영화',u:function(q){return 'https://watcha.com/browse/movies';}}]},
{id:'disneyplus', n:'디즈니+', c:'#113CCF', cat:'영상', nt:'',
h:'https://www.disneyplus.com',
s:function(q){return 'https://www.disneyplus.com/search?q='+E(q);},
lk:[{e:'🏰',t:'홈',u:function(q){return 'https://www.disneyplus.com';}}]},
{id:'naverwebtoon', n:'네이버웹툰', c:'#00DC64', cat:'영상', nt:'',
h:'https://comic.naver.com',
s:function(q){return 'https://search.naver.com/search.naver?where=webtoon&query='+E(q);},
lk:[{e:'🔥',t:'인기',u:function(q){return 'https://comic.naver.com/webtoon/weekday';}},{e:'🆕',t:'신작',u:function(q){return 'https://comic.naver.com/webtoon/new';}}]},
{id:'lezhin', n:'레진', c:'#1A1A1A', cat:'영상', nt:'',
h:'https://www.lezhin.com',
s:function(q){return 'https://www.lezhin.com/ko/search?q='+E(q);},
lk:[{e:'🔥',t:'인기작',u:function(q){return 'https://www.lezhin.com/ko/ranking';}}]},
{id:'ytmusic', n:'유튜브뮤직', c:'#FF0000', cat:'음악', nt:'',
h:'https://music.youtube.com',
s:function(q){return 'https://music.youtube.com/search?q='+E(q);},
lk:[{e:'🔥',t:'인기차트',u:function(q){return 'https://music.youtube.com/charts';}}]},
{id:'genie', n:'지니', c:'#1C3F94', cat:'음악', nt:'',
h:'https://www.genie.co.kr',
s:function(q){return 'https://www.genie.co.kr/search/searchMain?query='+E(q);},
lk:[{e:'🔥',t:'차트',u:function(q){return 'https://www.genie.co.kr/chart/top200';}}]},
{id:'navermap', n:'네이버지도', c:'#03C75A', cat:'교통·금융', nt:'',
h:'https://map.naver.com',
s:function(q){return 'https://map.naver.com/p/search/'+E(q);},
lk:[{e:'🗺',t:'지도',u:function(q){return 'https://map.naver.com';}},{e:'🚌',t:'대중교통',u:function(q){return 'https://map.naver.com/p/transit';}}],
_action:'open_navermap'},
{id:'instagram', n:'인스타', c:'#E1306C', cat:'메시지', nt:'',
h:'https://www.instagram.com',
s:function(q){return 'https://www.instagram.com/explore/search/keyword/?q='+E(q);},
lk:[{e:'🏠',t:'홈피드',u:function(q){return 'https://www.instagram.com';}},{e:'🔍',t:'탐색',u:function(q){return 'https://www.instagram.com/explore/';}}]},
{id:'twitter', n:'X(트위터)', c:'#1DA1F2', cat:'메시지', nt:'',
h:'https://x.com',
s:function(q){return 'https://x.com/search?q='+E(q);},
lk:[{e:'🏠',t:'홈',u:function(q){return 'https://x.com';}},{e:'🔍',t:'검색',u:function(q){return 'https://x.com/search?q='+E(q);}}]},
{id:'facebook', n:'페이스북', c:'#1877F2', cat:'메시지', nt:'',
h:'https://www.facebook.com',
s:function(q){return 'https://www.facebook.com/search/top/?q='+E(q);},
lk:[{e:'🏠',t:'뉴스피드',u:function(q){return 'https://www.facebook.com';}},{e:'🔍',t:'검색',u:function(q){return 'https://www.facebook.com/search/top/?q='+E(q);}}]},
{id:'spotify',  n:'스포티파이',  c:'#1DB954', cat:'음악',  nt:'',
h:'https://open.spotify.com',
s:function(q){return 'https://open.spotify.com/search/'+E(q);},
lk:[{e:'🔍',t:'음악검색',u:function(q){return 'https://open.spotify.com/search/'+E(q);}},
{e:'⭐',t:'오늘추천',u:function(q){return 'https://open.spotify.com';}},
{e:'🎙',t:'팟캐스트',u:function(q){return 'https://open.spotify.com/search/podcast';}}]},
{id:'kweather', n:'기상청날씨', c:'#0074D9', cat:'검색', nt:'',
h:'https://www.weather.go.kr',
s:function(q){return 'https://www.weather.go.kr/w/index.do';},
lk:[{e:'🌤',t:'오늘날씨',u:function(q){return 'https://www.weather.go.kr/w/index.do';}}],
_action:'open_kweather'},
{id:'nshop', n:'네이버쇼핑', c:'#03C75A', cat:'쇼핑', nt:'',
h:'https://search.shopping.naver.com',
s:function(q){return 'https://search.shopping.naver.com/search/all?query='+E(q);},
lk:[{e:'🔍',t:'상품검색',u:function(q){return 'https://search.shopping.naver.com/search/all?query='+E(q);}},
{e:'💰',t:'최저가순',u:function(q){return 'https://search.shopping.naver.com/search/all?query='+E(q)+'&sort=price_asc';}}],
_action:'open_nshop'}
,
{id:'phone',    n:'전화',        c:'#22c55e', cat:'연락',  nt:'음성 "○○한테 전화"는 말로열기에서',
h:'tel:',
s:function(q){return 'tel:'+q.replace(/[^0-9+]/g,'');},
lk:[{e:'📞',t:'전화걸기',u:function(q){return 'tel:'+(q||'');}},
{e:'🆘',t:'긴급전화',u:function(q){return 'tel:112';}},
{e:'🚑',t:'구급대',u:function(q){return 'tel:119';}}],
direct:true},
{id:'sms',      n:'문자',        c:'#3b82f6', cat:'연락',  nt:'',
h:'sms:',
s:function(q){return 'sms:?body='+E(q);},
lk:[{e:'✉️',t:'문자보내기',u:function(q){return 'sms:?body='+E(q||'');}},
{e:'📋',t:'문자함열기',u:function(q){return 'sms:';}}],
direct:true},
{id:'kakao_alimtalk', n:'카카오알림', c:'#FFCD00', cat:'메시지', nt:'',
h:'https://business.kakao.com/info/alimtalk',
s:function(q){return 'https://business.kakao.com/info/alimtalk';},
lk:[{e:'💬',t:'알림톡',u:function(q){return 'https://business.kakao.com/info/alimtalk';}}],
_action:'kakao_alimtalk'},
{id:'naver_sms', n:'네이버SMS', c:'#03C75A', cat:'연락', nt:'',
h:'https://sens.ncloud.com',
s:function(q){return 'https://sens.ncloud.com';},
lk:[{e:'📱',t:'SMS발송',u:function(q){return 'https://sens.ncloud.com';}}],
_action:'naver_sms'},
{id:'tmap', n:'티맵', c:'#E8003C', cat:'앱전용', nt:'앱 열기', h:'https://www.tmap.co.kr',
s:function(q){return 'https://www.tmap.co.kr';},
lk:[{e:'📍',t:'티맵 열기',u:function(q){return 'https://www.tmap.co.kr';}}],
_action:'open_app', pkg:'com.skt.tmap.ku'},
{id:'kakaot', n:'카카오T', c:'#FFCD00', cat:'앱전용', nt:'앱 열기', h:'https://kakaot.kakao.com',
s:function(q){return 'https://kakaot.kakao.com';},
lk:[{e:'🚕',t:'카카오T 열기',u:function(q){return 'https://kakaot.kakao.com';}}],
_action:'open_app', pkg:'com.kakao.taxi'},
{id:'line', n:'라인', c:'#06C755', cat:'앱전용', nt:'앱 열기', h:'https://line.me/ko/',
s:function(q){return 'https://line.me/ko/';},
lk:[{e:'💬',t:'라인 열기',u:function(q){return 'https://line.me/ko/';}}],
_action:'open_app', pkg:'jp.naver.line.android'},
{id:'telegram', n:'텔레그램', c:'#2AABEE', cat:'앱전용', nt:'앱 열기', h:'https://web.telegram.org',
s:function(q){return 'https://web.telegram.org';},
lk:[{e:'💬',t:'텔레그램 열기',u:function(q){return 'https://web.telegram.org';}}],
_action:'open_app', pkg:'org.telegram.messenger'},
{id:'zoom', n:'줌', c:'#2D8CFF', cat:'앱전용', nt:'앱 열기', h:'https://zoom.us/join',
s:function(q){return 'https://zoom.us/join';},
lk:[{e:'📹',t:'줌 열기',u:function(q){return 'https://zoom.us/join';}}],
_action:'open_app', pkg:'us.zoom.videomeetings'},
{id:'kb', n:'KB국민', c:'#FFBC00', cat:'앱전용', nt:'앱 열기', h:'https://www.kbstar.com',
s:function(q){return 'https://www.kbstar.com';},
lk:[{e:'🏦',t:'KB스타뱅킹',u:function(q){return 'https://www.kbstar.com';}}],
_action:'open_app', pkg:'com.kbstar.kbbank'},
{id:'shinhan', n:'신한뱅킹', c:'#0046FF', cat:'앱전용', nt:'앱 열기', h:'https://www.shinhan.com',
s:function(q){return 'https://www.shinhan.com';},
lk:[{e:'🏦',t:'신한SOL',u:function(q){return 'https://www.shinhan.com';}}],
_action:'open_app', pkg:'com.shinhan.sbanking'},
{id:'hana', n:'하나은행', c:'#009EB2', cat:'앱전용', nt:'앱 열기', h:'https://www.hanabank.com',
s:function(q){return 'https://www.hanabank.com';},
lk:[{e:'🏦',t:'하나원큐',u:function(q){return 'https://www.hanabank.com';}}],
_action:'open_app', pkg:'com.kebhana.hanapush'},
{id:'kakaopay', n:'카카오페이', c:'#FFCD00', cat:'앱전용', nt:'앱 열기', h:'https://www.kakaopay.com',
s:function(q){return 'https://www.kakaopay.com';},
lk:[{e:'💳',t:'카카오페이',u:function(q){return 'https://www.kakaopay.com';}}],
_action:'open_app', pkg:'com.kakaopay.app'},
{id:'naverpay', n:'네이버페이', c:'#03C75A', cat:'앱전용', nt:'앱 열기', h:'https://pay.naver.com',
s:function(q){return 'https://pay.naver.com';},
lk:[{e:'💳',t:'네이버페이',u:function(q){return 'https://pay.naver.com';}}],
_action:'open_app', pkg:'com.naver.npay'},
{id:'kis', n:'한국투자', c:'#C00027', cat:'앱전용', nt:'앱 열기', h:'https://www.truefriend.com',
s:function(q){return 'https://www.truefriend.com';},
lk:[{e:'📈',t:'한국투자',u:function(q){return 'https://www.truefriend.com';}}],
_action:'open_app', pkg:'com.truefriend.mtrobo'},
{id:'upbit', n:'업비트', c:'#002FFF', cat:'앱전용', nt:'앱 열기', h:'https://upbit.com',
s:function(q){return 'https://upbit.com/home';},
lk:[{e:'📊',t:'업비트',u:function(q){return 'https://upbit.com/home';}}],
_action:'open_app', pkg:'com.dunamu.exchange'}
];;
var ICONS = {
  'notion': svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><rect width="58" height="58" rx="18" fill="#fff"/><rect x="14" y="13" width="30" height="32" rx="3" fill="#fff" stroke="#0a0a0a" stroke-width="2.5"/><path d="M21 39 V21 l13 17 V21" fill="none" stroke="#0a0a0a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  'naver': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Cpath%20d%3D%22M14%2042V16h7.3l11.4%2017.2V16H36v26h-7.3L17.3%2024.8V42H14z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'google': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M42%2029.5c0-.8-.1-1.6-.2-2.4H29v4.5h7.3c-.3%201.6-1.3%203-2.8%203.9v3.2h4.5C40.5%2036.4%2042%2033.2%2042%2029.5z%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M29%2043c3.6%200%206.7-1.2%208.9-3.2l-4.5-3.2c-1.2.8-2.7%201.3-4.4%201.3-3.4%200-6.3-2.3-7.3-5.3h-4.6v3.3C19.3%2040.5%2023.8%2043%2029%2043z%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M21.7%2032.6c-.3-.8-.4-1.6-.4-2.6s.1-1.8.4-2.6v-3.3h-4.6C16.4%2026%2016%2027.9%2016%2030s.4%204%201.1%205.9l4.6-3.3z%22%20fill%3D%22%23FBBC05%22%2F%3E%3Cpath%20d%3D%22M29%2021.7c1.9%200%203.6.6%204.9%201.9l3.7-3.7C35.6%2017.8%2032.6%2016.5%2029%2016.5c-5.2%200-9.7%202.5-11.9%206.2l4.6%203.3c1-3.1%203.9-4.3%207.3-4.3z%22%20fill%3D%22%23EA4335%22%2F%3E%3C%2Fsvg%3E',
  'phone': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2322c55e%22%2F%3E%3Cpath%20d%3D%22M38.5%2035.5c-1.2-1.2-3.2-1.2-4.4%200l-1.8%201.8c-.3.3-.7.3-1%200l-10.6-10.6c-.3-.3-.3-.7%200-1l1.8-1.8c1.2-1.2%201.2-3.2%200-4.4l-3-3c-1.2-1.2-3.2-1.2-4.4%200l-1.5%201.5c-2.5%202.5-2.5%206.6%200%209.1l14%2014c2.5%202.5%206.6%202.5%209.1%200l1.5-1.5c1.2-1.2%201.2-3.2%200-4.4l-0.7-.7z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'sms': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%233b82f6%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2213%22%20width%3D%2238%22%20height%3D%2226%22%20rx%3D%226%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M18%2039l4-8h14l4%208-11%206-11-6z%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2218%22%20y%3D%2222%22%20width%3D%2222%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%233b82f6%22%2F%3E%3Crect%20x%3D%2218%22%20y%3D%2228%22%20width%3D%2216%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%233b82f6%22%2F%3E%3C%2Fsvg%3E',
  'youtube': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF0000%22%2F%3E%3Crect%20x%3D%228%22%20y%3D%2217%22%20width%3D%2242%22%20height%3D%2224%22%20rx%3D%225%22%20fill%3D%22white%22%20fill-opacity%3D%22.95%22%2F%3E%3Cpolygon%20points%3D%2224%2C22%2024%2C34%2036%2C28%22%20fill%3D%22%23FF0000%22%2F%3E%3C%2Fsvg%3E',
  'kakaomap': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23F9A825%22%2F%3E%3Cellipse%20cx%3D%2229%22%20cy%3D%2224%22%20rx%3D%2210%22%20ry%3D%2210%22%20fill%3D%22white%22%2F%3E%3Cellipse%20cx%3D%2229%22%20cy%3D%2224%22%20rx%3D%225%22%20ry%3D%225%22%20fill%3D%22%23F9A825%22%2F%3E%3Cpath%20d%3D%22M29%2034L22%2044Q29%2049%2036%2044Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'coupang': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23E8002D%22%2F%3E%3Cpath%20d%3D%22M29%2010C23%2010%2017%2015%2017%2022L17%2036L21%2041L29%2038L37%2041L41%2036L41%2022C41%2015%2035%2010%2029%2010Z%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2225%22%20y%3D%2238%22%20width%3D%228%22%20height%3D%229%22%20rx%3D%223%22%20fill%3D%22white%22%20fill-opacity%3D%22.7%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2222%22%20r%3D%224%22%20fill%3D%22%23E8002D%22%2F%3E%3C%2Fsvg%3E',
  'baemin': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%232AC1BC%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%2234%22%20width%3D%2232%22%20height%3D%227%22%20rx%3D%223.5%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M15%2034Q29%2018%2043%2034Z%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2226%22%20y%3D%2213%22%20width%3D%226%22%20height%3D%228%22%20rx%3D%223%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'daangn': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF6F0F%22%2F%3E%3Cpath%20d%3D%22M29%2044C21%2044%2014%2037%2014%2028C14%2020%2021%2013%2029%2013C37%2013%2044%2020%2044%2028C44%2037%2037%2044%2029%2044Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M29%2013C29%2013%2024%208%2018%2010C20%2013%2026%2013%2029%2013Z%22%20fill%3D%22%234CAF50%22%2F%3E%3Cpath%20d%3D%22M29%2013C29%2013%2033%207%2038%208.5C36%2012%2031%2013%2029%2013Z%22%20fill%3D%22%234CAF50%22%2F%3E%3Cellipse%20cx%3D%2224%22%20cy%3D%2227%22%20rx%3D%223%22%20ry%3D%224%22%20fill%3D%22%23FF6F0F%22%20opacity%3D%22.4%22%2F%3E%3Cellipse%20cx%3D%2234%22%20cy%3D%2227%22%20rx%3D%223%22%20ry%3D%224%22%20fill%3D%22%23FF6F0F%22%20opacity%3D%22.4%22%2F%3E%3C%2Fsvg%3E',
  'netflix': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23141414%22%2F%3E%3Cpath%20d%3D%22M18%2012L18%2046L24%2046Q25%2039%2026%2032L32%2046L40%2046L40%2012L34%2012Q33%2019%2032%2025L26%2012Z%22%20fill%3D%22%23E50914%22%2F%3E%3C%2Fsvg%3E',
  'wavve': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23005FFF%22%2F%3E%3Cpath%20d%3D%22M6%2021Q10%2031%2014%2021Q18%2011%2022%2021Q26%2031%2030%2021Q34%2011%2038%2021L42%2021L42%2029Q38%2039%2034%2029Q30%2019%2026%2029Q22%2039%2018%2029Q14%2019%2010%2029Q6%2039%206%2029Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'kakaopage': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23F5A623%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%2222%22%20height%3D%2230%22%20rx%3D%223%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2216%22%20y%3D%2218%22%20width%3D%2214%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%23F5A623%22%2F%3E%3Crect%20x%3D%2216%22%20y%3D%2224%22%20width%3D%2214%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%23F5A623%22%2F%3E%3Crect%20x%3D%2216%22%20y%3D%2230%22%20width%3D%2210%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%23F5A623%22%2F%3E%3Crect%20x%3D%2229%22%20y%3D%2222%22%20width%3D%2217%22%20height%3D%2214%22%20rx%3D%224%22%20fill%3D%22white%22%20fill-opacity%3D%22.9%22%2F%3E%3Cpath%20d%3D%22M32%2036L29%2041L37%2036Z%22%20fill%3D%22white%22%20fill-opacity%3D%22.9%22%2F%3E%3Ccircle%20cx%3D%2234%22%20cy%3D%2229%22%20r%3D%221.5%22%20fill%3D%22%23F5A623%22%2F%3E%3Ccircle%20cx%3D%2238%22%20cy%3D%2229%22%20r%3D%221.5%22%20fill%3D%22%23F5A623%22%2F%3E%3Ccircle%20cx%3D%2242%22%20cy%3D%2229%22%20r%3D%221.5%22%20fill%3D%22%23F5A623%22%2F%3E%3C%2Fsvg%3E',
  'melon': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2300C73C%22%2F%3E%3Cellipse%20cx%3D%2229%22%20cy%3D%2232%22%20rx%3D%2216%22%20ry%3D%2213%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M20%2026Q29%2034%2038%2026%22%20stroke%3D%22%2300C73C%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20opacity%3D%22.6%22%2F%3E%3Cpath%20d%3D%22M17%2032Q29%2040%2041%2032%22%20stroke%3D%22%2300C73C%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20opacity%3D%22.6%22%2F%3E%3Cpath%20d%3D%22M29%2019C29%2019%2026%2013%2030%2010C31%2014%2030%2018%2029%2019Z%22%20fill%3D%22%234CAF50%22%2F%3E%3C%2Fsvg%3E',
  'spotify': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%231DB954%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2229%22%20r%3D%2217%22%20fill%3D%22black%22%20fill-opacity%3D%22.12%22%2F%3E%3Cpath%20d%3D%22M15%2022Q29%2017%2043%2022%22%20stroke%3D%22white%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M17%2029Q29%2025%2041%2029%22%20stroke%3D%22white%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M20%2036Q29%2033%2038%2036%22%20stroke%3D%22white%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E',
  'podcast': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%239B59B6%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2211%22%20width%3D%2214%22%20height%3D%2221%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M14%2029Q14%2041%2029%2041Q44%2041%2044%2029%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Crect%20x%3D%2226%22%20y%3D%2241%22%20width%3D%226%22%20height%3D%227%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2221%22%20y%3D%2247%22%20width%3D%2216%22%20height%3D%223.5%22%20rx%3D%221.75%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'daum': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF5A00%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2238%22%20text-anchor%3D%22middle%22%20font-size%3D%2226%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3ED%3C%2Ftext%3E%3C%2Fsvg%3E',
  'naver_mail': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EMail%3C%2Ftext%3E%3C%2Fsvg%3E',
  'gmail': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23EA4335%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EGmail%3C%2Ftext%3E%3C%2Fsvg%3E',
  'line': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2306C755%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3ELINE%3C%2Ftext%3E%3C%2Fsvg%3E',
  'telegram': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%232AABEE%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3ETG%3C%2Ftext%3E%3C%2Fsvg%3E',
  'instagram': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23E1306C%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EIG%3C%2Ftext%3E%3C%2Fsvg%3E',
  'twitter': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%231DA1F2%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EX%3C%2Ftext%3E%3C%2Fsvg%3E',
  'gmarket': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23CC0000%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EG%EB%A7%88%EC%BC%93%3C%2Ftext%3E%3C%2Fsvg%3E',
  'elevenst': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF0000%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E11%EB%B2%88%EA%B0%80%3C%2Ftext%3E%3C%2Fsvg%3E',
  'musinsa': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23111111%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EB%AC%B4%EC%8B%A0%EC%82%AC%3C%2Ftext%3E%3C%2Fsvg%3E',
  'oliveyoung': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%236AAB3B%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%98%AC%EC%98%81%3C%2Ftext%3E%3C%2Fsvg%3E',
  'yogiyo': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FA0050%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%9A%94%EA%B8%B0%EC%9A%94%3C%2Ftext%3E%3C%2Fsvg%3E',
  'coupangeats': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23C00%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%BF%A0%ED%8C%A1%0A%EC%9D%B4%EC%B8%A0%3C%2Ftext%3E%3C%2Fsvg%3E',
  'tving': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF153C%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3ETVING%3C%2Ftext%3E%3C%2Fsvg%3E',
  'watcha': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF0558%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%99%93%EC%B1%A0%3C%2Ftext%3E%3C%2Fsvg%3E',
  'disneyplus': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23113CCF%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3ED%2B%3C%2Ftext%3E%3C%2Fsvg%3E',
  'naverwebtoon': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2300DC64%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%9B%B9%ED%88%B0%3C%2Ftext%3E%3C%2Fsvg%3E',
  'lezhin': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%231A1A1A%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EB%A0%88%EC%A7%84%3C%2Ftext%3E%3C%2Fsvg%3E',
  'ytmusic': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF0000%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EYT%0A%EB%AE%A4%EC%A7%81%3C%2Ftext%3E%3C%2Fsvg%3E',
  'genie': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%231C3F94%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%A7%80%EB%8B%88%3C%2Ftext%3E%3C%2Fsvg%3E',
  'flo': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF5C00%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EFLO%3C%2Ftext%3E%3C%2Fsvg%3E',
  'kakaot': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FFCD00%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2238%22%20text-anchor%3D%22middle%22%20font-size%3D%2226%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3ET%3C%2Ftext%3E%3C%2Fsvg%3E',
  'navermap': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%A7%80%EB%8F%84%3C%2Ftext%3E%3C%2Fsvg%3E',
  'kakaopay': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FFCD00%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EPay%3C%2Ftext%3E%3C%2Fsvg%3E',
  'naverpay': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EPay%3C%2Ftext%3E%3C%2Fsvg%3E',
  'shinhan': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%230046FF%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%EC%8B%A0%ED%95%9C%3C%2Ftext%3E%3C%2Fsvg%3E',
  'kb': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FFBC00%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EKB%3C%2Ftext%3E%3C%2Fsvg%3E',
  'hana': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23009EB2%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3E%ED%95%98%EB%82%98%3C%2Ftext%3E%3C%2Fsvg%3E',
  'facebook': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%231877F2%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2238%22%20text-anchor%3D%22middle%22%20font-size%3D%2226%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3Ef%3C%2Ftext%3E%3C%2Fsvg%3E',
  'zoom': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%232D8CFF%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%3EZoom%3C%2Ftext%3E%3C%2Fsvg%3E',
  'google_assistant': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%234285F4%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2220%22%20r%3D%228%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M14%2044c0-8.3%206.7-15%2015-15s15%206.7%2015%2015%22%20fill%3D%22white%22%20fill-opacity%3D%220.9%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2234%22%20width%3D%2214%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%234285F4%22%2F%3E%3C%2Fsvg%3E',
  'clova': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Cellipse%20cx%3D%2229%22%20cy%3D%2226%22%20rx%3D%2210%22%20ry%3D%2211%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M19%2037c0%205.5%204.5%2010%2010%2010s10-4.5%2010-10%22%20fill%3D%22white%22%20fill-opacity%3D%220.85%22%2F%3E%3Ccircle%20cx%3D%2225%22%20cy%3D%2224%22%20r%3D%222%22%20fill%3D%22%2303C75A%22%2F%3E%3Ccircle%20cx%3D%2233%22%20cy%3D%2224%22%20r%3D%222%22%20fill%3D%22%2303C75A%22%2F%3E%3Cpath%20d%3D%22M25%2030%20Q29%2033%2033%2030%22%20stroke%3D%22%2303C75A%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E',
  'chatgpt': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2310a37f%22%2F%3E%3Cpath%20d%3D%22M29%2012c-9.4%200-17%207.6-17%2017%200%203.2.9%206.2%202.4%208.8L12%2046l8.5-2.3C22.9%2045%2025.8%2046%2029%2046c9.4%200%2017-7.6%2017-17S38.4%2012%2029%2012z%22%20fill%3D%22white%22%20fill-opacity%3D%220.95%22%2F%3E%3Cpath%20d%3D%22M22%2027h14M22%2032h10%22%20stroke%3D%22%2310a37f%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E',
  'google_translate': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%234285F4%22%2F%3E%3Ctext%20x%3D%229%22%20y%3D%2230%22%20font-size%3D%2217%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3E%EA%B0%80%3C%2Ftext%3E%3Ctext%20x%3D%2227%22%20y%3D%2226%22%20font-size%3D%2212%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3EA%3C%2Ftext%3E%3Cpath%20d%3D%22M10%2034%20Q20%2040%2030%2034%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M32%2020%20L48%2020%20M40%2014%20L40%2026%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M34%2026%20Q40%2036%2046%2026%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E',
  'tmap': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23E8003C%22%2F%3E%3Cpath%20d%3D%22M29%2010C21%2010%2014%2017%2014%2025C14%2036%2029%2048%2029%2048C29%2048%2044%2036%2044%2025C44%2017%2037%2010%2029%2010Z%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2225%22%20r%3D%227%22%20fill%3D%22%23E8003C%22%2F%3E%3C%2Fsvg%3E',
  'toss': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%230064FF%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2225%22%20width%3D%2237%22%20height%3D%228%22%20rx%3D%224%22%20fill%3D%22white%22%2F%3E%3Cpolygon%20points%3D%2237%2C17%2048%2C29%2037%2C41%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2218%22%20cy%3D%2229%22%20r%3D%225%22%20fill%3D%22%230064FF%22%2F%3E%3Ccircle%20cx%3D%2218%22%20cy%3D%2229%22%20r%3D%222.5%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'kakaotalk': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23F9E000%22%2F%3E%3Cellipse%20cx%3D%2229%22%20cy%3D%2226%22%20rx%3D%2219%22%20ry%3D%2215%22%20fill%3D%22%233A1D1D%22%2F%3E%3Ccircle%20cx%3D%2221%22%20cy%3D%2226%22%20r%3D%222.5%22%20fill%3D%22%23F9E000%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2226%22%20r%3D%222.5%22%20fill%3D%22%23F9E000%22%2F%3E%3Ccircle%20cx%3D%2237%22%20cy%3D%2226%22%20r%3D%222.5%22%20fill%3D%22%23F9E000%22%2F%3E%3Cpath%20d%3D%22M20%2041L15%2047L29%2041Z%22%20fill%3D%22%233A1D1D%22%2F%3E%3C%2Fsvg%3E',
  'kakao_alimtalk': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FFCD00%22%2F%3E%3Cpath%20d%3D%22M29%2014c-9.4%200-17%206.3-17%2014.1%200%205%203%209.4%207.5%2012l-1.9%207%208.7-5.7c.9.1%201.8.2%202.7.2%209.4%200%2017-6.3%2017-14.1S38.4%2014%2029%2014z%22%20fill%3D%22%233C1E1E%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2233%22%20text-anchor%3D%22middle%22%20font-size%3D%229%22%20font-weight%3D%22bold%22%20fill%3D%22%23FFCD00%22%20font-family%3D%22Arial%22%3E%EC%95%8C%EB%A6%BC%ED%86%A1%3C%2Ftext%3E%3C%2Fsvg%3E',
  'naver_sms': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%2216%22%20width%3D%2232%22%20height%3D%2222%22%20rx%3D%224%22%20fill%3D%22white%22%20fill-opacity%3D%220.95%22%2F%3E%3Cpath%20d%3D%22M13%2020l16%2010%2016-10%22%20stroke%3D%22%2303C75A%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2250%22%20text-anchor%3D%22middle%22%20font-size%3D%229%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3ESMS%3C%2Ftext%3E%3C%2Fsvg%3E',
  'navermap_more': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2224%22%20r%3D%229%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M29%2033%20L22%2046%20L29%2042%20L36%2046%20Z%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2224%22%20r%3D%224%22%20fill%3D%22%2303C75A%22%2F%3E%3C%2Fsvg%3E',
  'kakaomap_more': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23F9A825%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2224%22%20r%3D%229%22%20fill%3D%22%233C1E1E%22%2F%3E%3Cpath%20d%3D%22M29%2033%20L22%2046%20L29%2042%20L36%2046%20Z%22%20fill%3D%22%233C1E1E%22%2F%3E%3Ccircle%20cx%3D%2229%22%20cy%3D%2224%22%20r%3D%224%22%20fill%3D%22%23F9A825%22%2F%3E%3C%2Fsvg%3E',
  'gcal': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2214%22%20width%3D%2238%22%20height%3D%2230%22%20rx%3D%224%22%20fill%3D%22white%22%20stroke%3D%22%23E0E0E0%22%20stroke-width%3D%221.5%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2214%22%20width%3D%2238%22%20height%3D%2211%22%20rx%3D%224%22%20fill%3D%22%234285F4%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2221%22%20width%3D%2238%22%20height%3D%224%22%20fill%3D%22%234285F4%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2212%22%20r%3D%223%22%20fill%3D%22%234285F4%22%2F%3E%3Ccircle%20cx%3D%2239%22%20cy%3D%2212%22%20r%3D%223%22%20fill%3D%22%234285F4%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2238%22%20text-anchor%3D%22middle%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20fill%3D%22%234285F4%22%20font-family%3D%22Arial%22%3ECAL%3C%2Ftext%3E%3C%2Fsvg%3E',
  'kcal': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FFCD00%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2214%22%20width%3D%2238%22%20height%3D%2230%22%20rx%3D%224%22%20fill%3D%22%23FFCD00%22%20stroke%3D%22%23E6B800%22%20stroke-width%3D%221.5%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2214%22%20width%3D%2238%22%20height%3D%2211%22%20rx%3D%224%22%20fill%3D%22%233C1E1E%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2221%22%20width%3D%2238%22%20height%3D%224%22%20fill%3D%22%233C1E1E%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2212%22%20r%3D%223%22%20fill%3D%22%233C1E1E%22%2F%3E%3Ccircle%20cx%3D%2239%22%20cy%3D%2212%22%20r%3D%223%22%20fill%3D%22%233C1E1E%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2238%22%20text-anchor%3D%22middle%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20fill%3D%22%233C1E1E%22%20font-family%3D%22Arial%22%3ECAL%3C%2Ftext%3E%3C%2Fsvg%3E',
  'kis': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23C00027%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2226%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3E%ED%95%9C%EA%B5%AD%3C%2Ftext%3E%3Ctext%20x%3D%2229%22%20y%3D%2241%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3E%ED%88%AC%EC%9E%90%EC%A6%9D%EA%B6%8C%3C%2Ftext%3E%3C%2Fsvg%3E',
  'ytdata': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23FF0000%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2217%22%20width%3D%2238%22%20height%3D%2224%22%20rx%3D%225%22%20fill%3D%22white%22%20fill-opacity%3D%220.95%22%2F%3E%3Cpolygon%20points%3D%2222%2C22%2022%2C36%2038%2C29%22%20fill%3D%22%23FF0000%22%2F%3E%3C%2Fsvg%3E',
  'spotify_more': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%231DB954%22%2F%3E%3Cpath%20d%3D%22M18%2024c5-2%2011-2%2017%201%22%20stroke%3D%22white%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M19%2029c4.5-1.5%209.5-1.5%2014.5%201%22%20stroke%3D%22white%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M20%2034c3.5-1%207.5-1%2011%200.8%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E',
  'gmail_more': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23EA4335%22%2F%3E%3Crect%20x%3D%229%22%20y%3D%2217%22%20width%3D%2240%22%20height%3D%2226%22%20rx%3D%224%22%20fill%3D%22white%22%20fill-opacity%3D%220.95%22%2F%3E%3Cpath%20d%3D%22M9%2021l20%2013%2020-13%22%20stroke%3D%22%23EA4335%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E',
  'kweather': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%230074D9%22%2F%3E%3Ccircle%20cx%3D%2226%22%20cy%3D%2224%22%20r%3D%228%22%20fill%3D%22%23FFD700%22%2F%3E%3Cpath%20d%3D%22M10%2034c2-4%206-7%2011-7%203%200%206%201%208%203%201-1%203-2%205-2%204%200%207%203%207%207%22%20fill%3D%22white%22%20fill-opacity%3D%220.95%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2240%22%20width%3D%225%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%220.6%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%2243%22%20width%3D%225%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%220.6%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2240%22%20width%3D%225%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%220.6%22%2F%3E%3Crect%20x%3D%2236%22%20y%3D%2243%22%20width%3D%225%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E',
  'nshop': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Crect%20x%3D%2211%22%20y%3D%2213%22%20width%3D%2236%22%20height%3D%227%22%20rx%3D%223.5%22%20fill%3D%22white%22%20fill-opacity%3D%220.95%22%2F%3E%3Crect%20x%3D%2211%22%20y%3D%2224%22%20width%3D%2226%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22white%22%20fill-opacity%3D%220.75%22%2F%3E%3Crect%20x%3D%2211%22%20y%3D%2234%22%20width%3D%2220%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22white%22%20fill-opacity%3D%220.55%22%2F%3E%3Ccircle%20cx%3D%2244%22%20cy%3D%2237%22%20r%3D%228%22%20fill%3D%22%23FFD700%22%2F%3E%3Ctext%20x%3D%2244%22%20y%3D%2241%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20fill%3D%22%231A6B1A%22%20font-family%3D%22Arial%22%3EW%3C%2Ftext%3E%3C%2Fsvg%3E',
  'upbit': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%23002FFF%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2222%22%20text-anchor%3D%22middle%22%20font-size%3D%229%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20fill-opacity%3D%220.85%22%20font-family%3D%22Arial%22%3EUPBIT%3C%2Ftext%3E%3Ctext%20x%3D%2229%22%20y%3D%2241%22%20text-anchor%3D%22middle%22%20font-size%3D%2220%22%20font-weight%3D%22800%22%20fill%3D%22%23FFD700%22%20font-family%3D%22Arial%2Csans-serif%22%3EB%3C%2Ftext%3E%3C%2Fsvg%3E',
  'gdocs': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%231A73E8%22%2F%3E%0A%3Crect%20x%3D%2213%22%20y%3D%229%22%20width%3D%2222%22%20height%3D%2229%22%20rx%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3Cpolygon%20points%3D%2235%2C9%2035%2C17%2043%2C17%22%20fill%3D%22%23A8C7FA%22%2F%3E%0A%3Crect%20x%3D%2213%22%20y%3D%229%22%20width%3D%2222%22%20height%3D%2229%22%20rx%3D%222%22%20fill%3D%22none%22%2F%3E%0A%3Crect%20x%3D%2243%22%20y%3D%229%22%20width%3D%220%22%20height%3D%220%22%2F%3E%0A%3Cpath%20d%3D%22M35%209%20L43%2017%20L43%2038%20Q43%2040%2041%2040%20L15%2040%20Q13%2040%2013%2038%20L13%209%20Z%22%20fill%3D%22none%22%2F%3E%0A%3Crect%20x%3D%2217%22%20y%3D%2221%22%20width%3D%2214%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22%231A73E8%22%20fill-opacity%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%2217%22%20y%3D%2225%22%20width%3D%2214%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22%231A73E8%22%20fill-opacity%3D%220.4%22%2F%3E%0A%3Crect%20x%3D%2217%22%20y%3D%2229%22%20width%3D%2210%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22%231A73E8%22%20fill-opacity%3D%220.3%22%2F%3E%0A%3Crect%20x%3D%229%22%20y%3D%2242%22%20width%3D%2240%22%20height%3D%227%22%20rx%3D%223%22%20fill%3D%22%231558B0%22%2F%3E%0A%3Ctext%20x%3D%2229%22%20y%3D%2248%22%20text-anchor%3D%22middle%22%20font-size%3D%225%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3EDocs%3C%2Ftext%3E%0A%3C%2Fsvg%3E',
  'gsheets': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%230F9D58%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%229%22%20width%3D%2226%22%20height%3D%2230%22%20rx%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3Cpolygon%20points%3D%2237%2C9%2037%2C17%2045%2C17%22%20fill%3D%22%2381C995%22%2F%3E%0A%3Cpath%20d%3D%22M37%209%20L45%2017%20L45%2039%20Q45%2041%2043%2041%20L13%2041%20Q11%2041%2011%2039%20L11%209%20Z%22%20fill%3D%22none%22%2F%3E%0A%3Cline%20x1%3D%2211%22%20y1%3D%2218%22%20x2%3D%2237%22%20y2%3D%2218%22%20stroke%3D%22%230F9D58%22%20stroke-opacity%3D%220.3%22%20stroke-width%3D%221%22%2F%3E%0A%3Cline%20x1%3D%2211%22%20y1%3D%2225%22%20x2%3D%2237%22%20y2%3D%2225%22%20stroke%3D%22%230F9D58%22%20stroke-opacity%3D%220.3%22%20stroke-width%3D%221%22%2F%3E%0A%3Cline%20x1%3D%2211%22%20y1%3D%2232%22%20x2%3D%2237%22%20y2%3D%2232%22%20stroke%3D%22%230F9D58%22%20stroke-opacity%3D%220.3%22%20stroke-width%3D%221%22%2F%3E%0A%3Cline%20x1%3D%2222%22%20y1%3D%229%22%20x2%3D%2222%22%20y2%3D%2239%22%20stroke%3D%22%230F9D58%22%20stroke-opacity%3D%220.3%22%20stroke-width%3D%221%22%2F%3E%0A%3Crect%20x%3D%229%22%20y%3D%2243%22%20width%3D%2240%22%20height%3D%227%22%20rx%3D%223%22%20fill%3D%22%23137333%22%2F%3E%0A%3Ctext%20x%3D%2229%22%20y%3D%2249%22%20text-anchor%3D%22middle%22%20font-size%3D%225%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3ESheets%3C%2Ftext%3E%0A%3C%2Fsvg%3E',
  'naver_news': 'data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2058%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2258%22%20height%3D%2258%22%20rx%3D%2218%22%20fill%3D%22%2303C75A%22%2F%3E%3Crect%20x%3D%229%22%20y%3D%2213%22%20width%3D%2240%22%20height%3D%2230%22%20rx%3D%224%22%20fill%3D%22white%22%20fill-opacity%3D%220.95%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%2217%22%20width%3D%2217%22%20height%3D%2210%22%20rx%3D%222%22%20fill%3D%22%2303C75A%22%20fill-opacity%3D%220.15%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%2217%22%20width%3D%2217%22%20height%3D%2210%22%20rx%3D%222%22%20fill%3D%22none%22%20stroke%3D%22%2303C75A%22%20stroke-width%3D%220.8%22%20stroke-opacity%3D%220.3%22%2F%3E%3Ctext%20x%3D%2221%22%20y%3D%2225%22%20text-anchor%3D%22middle%22%20font-size%3D%228%22%20fill%3D%22%2303C75A%22%20font-family%3D%22Arial%22%3ENEWS%3C%2Ftext%3E%3Crect%20x%3D%2232%22%20y%3D%2218%22%20width%3D%2213%22%20height%3D%221.5%22%20rx%3D%220.75%22%20fill%3D%22%2303C75A%22%20fill-opacity%3D%220.5%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%2221%22%20width%3D%2210%22%20height%3D%221.5%22%20rx%3D%220.75%22%20fill%3D%22%2303C75A%22%20fill-opacity%3D%220.3%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%2224%22%20width%3D%2211%22%20height%3D%221.5%22%20rx%3D%220.75%22%20fill%3D%22%2303C75A%22%20fill-opacity%3D%220.3%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%2230%22%20width%3D%2232%22%20height%3D%221.5%22%20rx%3D%220.75%22%20fill%3D%22%2303C75A%22%20fill-opacity%3D%220.25%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%2233%22%20width%3D%2228%22%20height%3D%221.5%22%20rx%3D%220.75%22%20fill%3D%22%2303C75A%22%20fill-opacity%3D%220.2%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%2236%22%20width%3D%2220%22%20height%3D%221.5%22%20rx%3D%220.75%22%20fill%3D%22%2303C75A%22%20fill-opacity%3D%220.15%22%2F%3E%3Crect%20x%3D%229%22%20y%3D%2245%22%20width%3D%2240%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%2302A44A%22%2F%3E%3Ctext%20x%3D%2229%22%20y%3D%2250%22%20text-anchor%3D%22middle%22%20font-size%3D%224.5%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20font-family%3D%22Arial%22%3E%EB%84%A4%EC%9D%B4%EB%B2%84%EB%89%B4%EC%8A%A4%3C%2Ftext%3E%3C%2Fsvg%3E',
};
var SM = {};
for(var i=0;i<SV.length;i++) SM[SV[i].id]=SV[i];
var CATS = ['검색·연락','쇼핑','영상','앱전용','음악','교통·금융','메시지'];
for(var i=0;i<SV.length;i++){
if(CATS.indexOf(SV[i].cat)<0) CATS.push(SV[i].cat);
}
var KW = {
naver:['네이버'],
google:['구글','google'],
google_assistant:['어시스턴트','구글어시스턴트','assistant'],
clova:['클로바','clova','네이버ai'],
chatgpt:['chatgpt','챗gpt','챗지피티','openai'],
google_translate:['번역','구글번역','translate'],
daum:['다음','daum'],
gmail:['지메일','gmail','구글메일'],
naver_mail:['네이버메일','메일'],
line:['라인','line'],
telegram:['텔레그램','telegram'],
zoom:['줌','zoom','화상회의'],
gmarket:['지마켓','gmarket','g마켓'],
elevenst:['11번가','십일번가'],
musinsa:['무신사','패션'],
oliveyoung:['올리브영','올영','드럭스토어'],
yogiyo:['요기요'],
coupangeats:['쿠팡이츠','이츠'],
tving:['티빙'],
watcha:['왓챠'],
disneyplus:['디즈니','disney','디즈니플러스'],
naverwebtoon:['네이버웹툰','웹툰'],
lezhin:['레진','레진코믹스'],
ytmusic:['유튜브뮤직','ytmusic'],
genie:['지니','지니뮤직'],
flo:['플로','flo'],
kakaot:['카카오t','카카오티','택시'],
navermap:['네이버지도','지도'],
kakaopay:['카카오페이','kakao pay'],
naverpay:['네이버페이','naver pay'],
shinhan:['신한','신한은행','신한뱅킹'],
kb:['kb','kb국민','국민은행','국민뱅킹'],
hana:['하나','하나은행','하나뱅킹'],
instagram:['인스타','인스타그램','instagram'],
twitter:['트위터','twitter','x'],
facebook:['페이스북','facebook'],
phone:['전화','폰','전화걸기'],
sms:['문자','메시지','문자메시지'], youtube:['유튜브','유투브','유트브','튜브','유튜부'], kakaomap:['카카오맵','지도'],
coupang:['쿠팡'], baemin:['배달의민족','배민','배달'], daangn:['당근마켓','당근'],
netflix:['넷플릭스','넷플'], wavve:['웨이브'], kakaopage:['카카오페이지','웹툰'],
melon:['멜론'], spotify:['스포티파이'], podcast:['팟캐스트','팟빵'],
tmap:['티맵','길찾기'], toss:['토스'], kakaotalk:['카카오톡','카톡']
};
function lsG(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
function lsS(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var apiKey = lsG('podoai_k','');
var geminiKey = lsG('podoai_gk','');
var aiModel = lsG('podoai_model','claude');
var PUTER_MODEL = lsG('podoai_puter_model','gpt-5.4-nano');
var hist = [];
var loading = false;
var curSvc = null;
var micOn = false;
var srObj = null;
var upStep = 'intro';
var wpType = '블로그';
var actCat = '전체';
function _aiLangSuffix(){
var l=(typeof i18nCur==='function')?i18nCur():'ko';
if(!l || l==='ko') return '';
var name=(typeof i18nLangName==='function')?i18nLangName(l):l;
return '\n\n# OUTPUT LANGUAGE (CRITICAL)\nRespond ONLY in '+name+'. Ignore any earlier instruction to answer in Korean. Every part of your reply must be written in '+name+'. Keep brand/product/proper names and numbers unchanged. Do NOT include the Korean original or extra translations.';
}
function callAI(opts, onSuccess, onError){
opts = opts || {};
if(!opts.noLang){ var _s=_aiLangSuffix(); if(_s) opts.system=(opts.system||'')+_s; }
routeUserAI(opts, onSuccess, onError);
}
function routeUserAI(opts, onSuccess, onError){
if(aiModel === 'puter'){
callPuter(opts, onSuccess, onError);
} else if(aiModel === 'gemini' && geminiKey){
callGemini(opts, onSuccess, onError);
} else if(apiKey){
callClaude(opts, onSuccess, onError);
} else {
onError(new Error('NO_KEY'));
}
}
function isPremium(){ return false; }
function callAgent(task, onSuccess, onError, opts){
opts = opts || {};
callAI({ system:(opts.system||''), messages:[{role:'user',content:task}], maxTokens:1200 },
function(text){ onSuccess((text||'').trim(), {}); },
onError);
}
function callPuter(opts, onSuccess, onError){
if(typeof puter === 'undefined' || !puter.ai || !puter.ai.chat){
onError(new Error('Puter를 불러오지 못했어 😅\n인터넷 연결을 확인하거나\n마이 탭에서 Gemini(무료 키)로 바꿔봐'));
return;
}
var msgs = (opts.messages || []).slice();
if(opts.system){ msgs.unshift({ role:'system', content: opts.system }); }
try{
puter.ai.chat(msgs, { model: (opts.fast ? 'google/gemini-3.5-flash' : PUTER_MODEL), max_tokens: opts.maxTokens || 500 })
.then(function(res){
var text = '';
try{
if(res && res.message && res.message.content){
var c = res.message.content;
if(typeof c === 'string') text = c;
else if(Array.isArray(c)) text = c.map(function(b){return (b && b.text) || '';}).join('');
} else if(res && typeof res.text === 'string'){ text = res.text; }
else if(typeof res === 'string'){ text = res; }
else { text = String(res); }
}catch(e){ text = String(res); }
onSuccess((text || '').trim());
})
.catch(function(e){
onError(new Error('Puter 오류: ' + ((e && e.message) || '사용량 인증이 필요할 수 있어')));
});
}catch(e){
onError(new Error('Puter 호출 실패: ' + (e && e.message)));
}
}
function callClaude(opts, onSuccess, onError){
fetch('https://api.anthropic.com/v1/messages',{
method:'POST',
headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
body:JSON.stringify({
model: opts.fast ? 'claude-haiku-4-5-20251001' : 'claude-sonnet-4-6',
max_tokens: opts.maxTokens || 500,
system: opts.system || '',
messages: opts.messages
})
}).then(function(r){return r.json();}).then(function(d){
if(d.error) throw new Error(d.error.message);
var text = (d.content||[]).map(function(b){return b.text||'';}).join('').trim();
onSuccess(text);
}).catch(onError);
}
function callGemini(opts, onSuccess, onError){
var MODELS = ['gemini-2.0-flash','gemini-1.5-flash-8b','gemini-1.5-flash','gemini-1.5-pro','gemini-pro'];
var contents = [];
var msgs = opts.messages || [];
for(var i=0;i<msgs.length;i++){
contents.push({
role: msgs[i].role === 'assistant' ? 'model' : 'user',
parts:[{text: msgs[i].content}]
});
}
if(opts.system && contents.length > 0 && contents[0].role === 'user'){
contents[0].parts[0].text = opts.system + '\n\n' + contents[0].parts[0].text;
}
function tryModel(idx){
if(idx >= MODELS.length){
if(apiKey){
callClaude(opts, onSuccess, onError);
} else {
onError(new Error('Gemini 무료 할당량 초과 😅\n\n해결방법:\n1. aistudio.google.com에서\n   새 프로젝트로 키 재발급\n2. 또는 Claude API 키 등록\n   (마이 탭 → Claude API 키)'));
}
return;
}
var model = MODELS[idx];
fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent?key='+geminiKey,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
contents:contents,
generationConfig:{maxOutputTokens:opts.maxTokens||500}
})
}).then(function(r){return r.json();}).then(function(d){
if(d.error){
var msg = d.error.message||'';
if(msg.indexOf('quota')>-1||msg.indexOf('not found')>-1||msg.indexOf('not supported')>-1||msg.indexOf('limit')>-1){
tryModel(idx+1);
} else {
onError(new Error(d.error.message));
}
return;
}
var text='';
try{text=d.candidates[0].content.parts[0].text||'';}catch(e){}
onSuccess(text.trim());
}).catch(function(){tryModel(idx+1);});
}
tryModel(0);
}
function getNoKeyMsg(){
return '🆓 무료로 바로 쓰려면 마이 탭에서 "키 없이 무료(Puter)"를 켜거나 무료 Gemini 키를 넣어줘.\n💎 더 강력하게(웹검색·고품질)는 본인 유료 키 — 요금은 본인 부담이에요.';
}
function hasAIKey(){
if(aiModel === 'puter') return true;
if(aiModel === 'gemini') return !!geminiKey;
return !!apiKey;
}
function M(){return document.getElementById('main');}
function bot(){setTimeout(function(){var m=M();if(m)m.scrollTop=m.scrollHeight;},60);}
function svgToUri(s){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s.trim());}
function makeIconImg(svc){
var w=document.createElement('div');
w.className='aic';
if(ICONS[svc.id]){
var img=document.createElement('img');
img.src=ICONS[svc.id];
img.alt=svc.n;
img.style.cssText='width:56px;height:56px;display:block;border-radius:16px;flex-shrink:0;';
w.appendChild(img);
} else {
w.style.background=svc.c;
var fb=document.createElement('div');
fb.style.cssText='width:56px;height:56px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#16181f;border-radius:16px;';
fb.textContent=svc.n.slice(0,2);
w.appendChild(fb);
}
return w;
}
var HIDDEN_KEY='podoai_hidden_apps';
var DELETED_KEY='podoai_deleted_apps';
var PODO_LONGPRESS_MS=330;
var CAT_HIDE=[];
function podoHidden(id){ return lsG(HIDDEN_KEY,[]).indexOf(id)>=0; }
function podoDeleted(id){ return lsG(DELETED_KEY,[]).indexOf(id)>=0; }
function findSvc(id){ for(var i=0;i<SV.length;i++){ if(SV[i].id===id) return SV[i]; } for(var j=0;j<PODO_FEATURES.length;j++){ if(PODO_FEATURES[j].id===id) return {id:id,n:PODO_FEATURES[j].n,c:'#a855f7'}; } return null; }
function podoHideApp(id){ var h=lsG(HIDDEN_KEY,[]); if(h.indexOf(id)<0){ h.push(id); lsS(HIDDEN_KEY,h); } }
function podoRestoreApp(id){ lsS(HIDDEN_KEY, lsG(HIDDEN_KEY,[]).filter(function(x){return x!==id;})); refreshLauncher(); }
function podoRestoreAll(){ lsS(HIDDEN_KEY,[]); refreshLauncher(); showToast('🔄 숨긴 앱을 모두 복원했어','linear-gradient(135deg,#22c55e,#16a34a)'); }
function podoDeleteBuiltin(id){ var dl=lsG(DELETED_KEY,[]); if(dl.indexOf(id)<0){ dl.push(id); lsS(DELETED_KEY,dl); } lsS(HIDDEN_KEY, lsG(HIDDEN_KEY,[]).filter(function(x){return x!==id;})); refreshLauncher(); }
function podoDeleteHiddenAll(){ var h=lsG(HIDDEN_KEY,[]), dl=lsG(DELETED_KEY,[]); for(var i=0;i<h.length;i++){ if(dl.indexOf(h[i])<0) dl.push(h[i]); } lsS(DELETED_KEY,dl); lsS(HIDDEN_KEY,[]); refreshLauncher(); showToast('🗑 숨긴 앱을 영구 삭제했어','linear-gradient(135deg,#ef4444,#dc2626)'); }
function deleteCustomApp(id){
for(var i=SV.length-1;i>=0;i--){ if(SV[i].id===id){ SV.splice(i,1); break; } }
try{ if(typeof SM!=='undefined' && SM) delete SM[id]; }catch(e){}
lsS(MY_APPS_KEY, getMyApps().filter(function(a){ return a.id!==id; }));
refreshLauncher();
}
function refreshLauncher(){ var card=document.querySelector('.lcard'); if(card) card.replaceWith(makeLauncher()); updateHiddenCountUI(); }
function updateHiddenCountUI(){
var sub=document.getElementById('hidden-app-count-sub');
if(sub){ var n=lsG(HIDDEN_KEY,[]).length; sub.textContent = n>0 ? (n+'개 숨김 · 복원/삭제') : '숨긴 앱 복원/삭제'; }
}
function openHiddenManager(){
var hidden=lsG(HIDDEN_KEY,[]);
if(!hidden.length){ showToast('숨긴 앱이 없어','rgba(0,0,0,.85)'); return; }
var ov=document.createElement('div');
ov.style.cssText='position:fixed;inset:0;z-index:320;background:rgba(0,0,0,.72);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center';
ov.onclick=function(e){ if(e.target===ov) ov.remove(); };
var box=document.createElement('div');
box.style.cssText='width:min(390px,100vw);background:linear-gradient(160deg,#eef1f8,#ffffff);border-radius:24px 24px 0 0;border:1px solid rgba(0,0,0,.3);padding:18px 16px 30px;max-height:72vh;display:flex;flex-direction:column';
var hd=document.createElement('div'); hd.style.cssText='display:flex;align-items:center;margin-bottom:14px';
var ti=document.createElement('div'); ti.innerHTML='&#128584; 숨긴 앱 관리'; ti.style.cssText='font-size:16px;font-weight:700;color:#141720'; hd.appendChild(ti);
var cl=document.createElement('button'); cl.innerHTML='&#10005;'; cl.style.cssText='margin-left:auto;background:rgba(0,0,0,.24);border:none;width:30px;height:30px;border-radius:9px;color:#1f2430;cursor:pointer;font-family:inherit'; cl.onclick=function(){ ov.remove(); }; hd.appendChild(cl);
box.appendChild(hd);
var bulk=document.createElement('div'); bulk.style.cssText='display:flex;gap:8px;margin-bottom:12px';
var allR=document.createElement('button'); allR.innerHTML='&#128260; 모두 복원'; allR.style.cssText='flex:1;padding:10px;border-radius:11px;border:none;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit'; allR.onclick=function(){ podoRestoreAll(); ov.remove(); };
var allD=document.createElement('button'); allD.innerHTML='&#128465; 모두 영구삭제'; allD.style.cssText='flex:1;padding:10px;border-radius:11px;border:1px solid rgba(239,68,68,.3);background:rgba(239,68,68,.1);color:#ef4444;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit'; allD.onclick=function(){ podoDeleteHiddenAll(); ov.remove(); };
bulk.appendChild(allR); bulk.appendChild(allD); box.appendChild(bulk);
var list=document.createElement('div'); list.style.cssText='flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:6px';
hidden.forEach(function(id){
var svc=findSvc(id); var nm=svc?svc.n:id;
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:10px;padding:8px 9px;border-radius:11px;background:rgba(0,0,0,.16);border:1px solid rgba(0,0,0,.22)';
var ico=document.createElement('div'); ico.style.cssText='width:30px;height:30px;border-radius:9px;overflow:hidden;flex-shrink:0;background:'+((svc&&svc.c)||'#333');
if(ICONS[id]){ var im=document.createElement('img'); im.src=ICONS[id]; im.style.cssText='width:30px;height:30px'; ico.appendChild(im); }
row.appendChild(ico);
var t=document.createElement('div'); t.textContent=nm; t.style.cssText='flex:1;font-size:13px;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; row.appendChild(t);
var rb=document.createElement('button'); rb.textContent='복원'; rb.style.cssText='background:rgba(34,197,94,.14);border:none;border-radius:8px;padding:6px 11px;color:#22c55e;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit';
rb.onclick=(function(x){ return function(){ podoRestoreApp(x); ov.remove(); if(lsG(HIDDEN_KEY,[]).length) openHiddenManager(); }; })(id);
var db=document.createElement('button'); db.innerHTML='&#128465;'; db.style.cssText='background:rgba(239,68,68,.12);border:none;border-radius:8px;padding:6px 10px;color:#ef4444;font-size:12px;cursor:pointer;font-family:inherit';
db.onclick=(function(x){ return function(){ podoDeleteBuiltin(x); ov.remove(); if(lsG(HIDDEN_KEY,[]).length) openHiddenManager(); }; })(id);
row.appendChild(rb); row.appendChild(db);
list.appendChild(row);
});
box.appendChild(list);
ov.appendChild(box); document.body.appendChild(ov);
}
function showAppMenu(svc, anchorEl){
if(!svc) return;
var ov=document.createElement('div');
ov.style.cssText='position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.45);backdrop-filter:blur(2px)';
ov.onclick=function(e){ if(e.target===ov) ov.remove(); };
var box=document.createElement('div');
box.style.cssText='position:absolute;width:200px;max-width:72vw;background:linear-gradient(160deg,#161b30,#0f1325);border:1px solid rgba(0,0,0,.3);border-radius:16px;padding:13px 12px;text-align:center;box-shadow:0 16px 44px rgba(0,0,0,.6);animation:fadeUp .14s ease';
var icWrap=document.createElement('div');
icWrap.style.cssText='width:42px;height:42px;margin:0 auto 8px;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#16181f;background:'+(svc.c||'#222');
if(ICONS[svc.id]){ var im=document.createElement('img'); im.src=ICONS[svc.id]; im.style.cssText='width:42px;height:42px;border-radius:12px'; icWrap.appendChild(im); }
else { icWrap.textContent=svc.n.slice(0,2); }
box.appendChild(icWrap);
var nm=document.createElement('div'); nm.textContent=svc.n; nm.style.cssText='font-size:14px;font-weight:700;color:#141720;margin-bottom:10px'; box.appendChild(nm);
if(svc._isCustom){
var del=document.createElement('button'); del.innerHTML='🗑 삭제';
del.style.cssText='width:100%;padding:9px;border-radius:11px;border:none;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:6px';
del.onclick=function(){ deleteCustomApp(svc.id); ov.remove(); showToast('🗑 "'+svc.n+'" 삭제됨','linear-gradient(135deg,#ef4444,#dc2626)'); };
box.appendChild(del);
} else {
var hide=document.createElement('button'); hide.innerHTML='🙈 숨기기';
hide.style.cssText='width:100%;padding:9px;border-radius:11px;border:none;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:6px';
hide.onclick=function(){ podoHideApp(svc.id); ov.remove(); refreshLauncher(); showToast('🙈 "'+svc.n+'" 숨김 · 마이 탭 → 숨긴 앱에서 복원','linear-gradient(135deg,#22c55e,#16a34a)'); };
box.appendChild(hide);
}
var cancel=document.createElement('button'); cancel.textContent='취소';
cancel.style.cssText='width:100%;padding:8px;border-radius:11px;border:1px solid rgba(0,0,0,.28);background:rgba(0,0,0,.2);color:#252a39;font-size:12px;cursor:pointer;font-family:inherit';
cancel.onclick=function(){ ov.remove(); };
box.appendChild(cancel);
ov.appendChild(box); document.body.appendChild(ov);
var bw=box.offsetWidth, bh=box.offsetHeight, vw=window.innerWidth, vh=window.innerHeight, left, top;
if(anchorEl && anchorEl.getBoundingClientRect){
var r=anchorEl.getBoundingClientRect();
left=Math.max(8, Math.min(r.left + r.width/2 - bw/2, vw-bw-8));
if(r.top + r.height/2 < vh/2){ top=r.bottom + 10; }
else { top=r.top - bh - 10; }
top=Math.max(8, Math.min(top, vh-bh-8));
} else { left=(vw-bw)/2; top=(vh-bh)/2; }
box.style.left=left+'px'; box.style.top=top+'px';
}
var FIC_COMPANION = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a855f7"/><stop offset="1" stop-color="#6d28d9"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fc)"/><circle cx="29" cy="11" r="2.6" fill="#fff"/><rect x="28" y="12" width="2" height="6" fill="#fff"/><rect x="14" y="18" width="30" height="25" rx="11" fill="#fff"/><circle cx="23.5" cy="29" r="3.2" fill="#7c3aed"/><circle cx="34.5" cy="29" r="3.2" fill="#7c3aed"/><path d="M23 35 Q29 40 35 35" stroke="#7c3aed" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="18.5" cy="34" r="2" fill="#f0abfc"/><circle cx="39.5" cy="34" r="2" fill="#f0abfc"/></svg>');
var FIC_IMAGE = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#f97316"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fi)"/><rect x="13" y="16" width="32" height="26" rx="5" fill="#fff"/><circle cx="22" cy="25" r="3.5" fill="#f59e0b"/><path d="M15 40 L25 29 L32 36 L37 31 L43 40 Z" fill="#f59e0b"/></svg>');
var FIC_WRITE = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b5cf6"/><stop offset="1" stop-color="#6d28d9"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fw)"/><rect x="15" y="13" width="20" height="32" rx="3" fill="#fff"/><rect x="19" y="20" width="12" height="2.4" rx="1.2" fill="#8b5cf6"/><rect x="19" y="26" width="12" height="2.4" rx="1.2" fill="#8b5cf6"/><rect x="19" y="32" width="8" height="2.4" rx="1.2" fill="#8b5cf6"/><path d="M38 16 l5 5 -13 13 -6 1 1 -6 z" fill="#fbbf24" stroke="#6d28d9" stroke-width="1.2" stroke-linejoin="round"/></svg>');
var FIC_SHORTS = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff0050"/><stop offset="1" stop-color="#ff5e5e"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fs)"/><rect x="20" y="12" width="18" height="34" rx="6" fill="#fff"/><polygon points="26,23 26,35 36,29" fill="#ff0050"/></svg>');
var FIC_PODODA = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="pd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b35e0"/><stop offset="1" stop-color="#b06bf0"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#pd)"/><path d="M29 13c0 4 .3 6-1 8" stroke="#7fe39a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M30 15c3-2 6-1.5 8 .3" stroke="#7fe39a" stroke-width="3" fill="none" stroke-linecap="round"/><g fill="#fff"><circle cx="23" cy="29" r="5"/><circle cx="35" cy="29" r="5"/><circle cx="29" cy="37" r="5"/><circle cx="20" cy="38" r="4.3"/><circle cx="38" cy="38" r="4.3"/><circle cx="29" cy="46" r="4.3"/></g></svg>');
var FIC_CARD = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fcd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset="1" stop-color="#7b61ff"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fcd)"/><rect x="12" y="18" width="34" height="22" rx="4" fill="#fff"/><circle cx="21" cy="27" r="4" fill="#7b61ff"/><path d="M15 36 q6 -6 12 0" fill="#7b61ff"/><rect x="30" y="24" width="12" height="2.6" rx="1.3" fill="#00b8d4"/><rect x="30" y="29.5" width="12" height="2.6" rx="1.3" fill="#cfd2e0"/><rect x="30" y="35" width="8" height="2.6" rx="1.3" fill="#cfd2e0"/></svg>');
var FIC_STUDY = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fst" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22c55e"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fst)"/><polygon points="29,15 48,23 29,31 10,23" fill="#fff"/><path d="M18 27 v6 q11 7 22 0 v-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="48" y1="23" x2="48" y2="34" stroke="#fff" stroke-width="2"/><circle cx="48" cy="36" r="2.6" fill="#fde047"/></svg>');
var FIC_ENGLISH = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#2563eb"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fen)"/><rect x="9" y="13" width="27" height="18" rx="7" fill="#fff"/><path d="M15 31 l0 6 l8 -6 Z" fill="#fff"/><circle cx="17" cy="22" r="2" fill="#2563eb"/><circle cx="23" cy="22" r="2" fill="#2563eb"/><circle cx="29" cy="22" r="2" fill="#2563eb"/><rect x="27" y="28" width="22" height="16" rx="6" fill="#bfdbfe"/><path d="M43 44 l0 5 l-7 -5 Z" fill="#bfdbfe"/><circle cx="34" cy="36" r="1.8" fill="#2563eb"/><circle cx="39" cy="36" r="1.8" fill="#2563eb"/><circle cx="44" cy="36" r="1.8" fill="#2563eb"/></svg>');
var FIC_TRAVEL = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="ftr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#ftr)"/><path d="M45 15 L12 27 L24 31 L28 43 L32 33 L45 15 Z" fill="#fff"/><path d="M24 31 L45 15 L32 33 Z" fill="#c7d2fe"/></svg>');
var FIC_FRIDGE = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="ffr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10b981"/><stop offset="1" stop-color="#059669"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#ffr)"/><rect x="18" y="11" width="22" height="36" rx="5" fill="#fff"/><rect x="18" y="24" width="22" height="2.4" fill="#059669"/><rect x="22" y="15" width="2.6" height="6" rx="1.3" fill="#059669"/><rect x="22" y="29" width="2.6" height="10" rx="1.3" fill="#059669"/></svg>');
var FIC_NAME = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fnm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f472b6"/><stop offset="1" stop-color="#db2777"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fnm)"/><rect x="13" y="18" width="32" height="22" rx="5" fill="#fff"/><rect x="18" y="25" width="22" height="2.6" rx="1.3" fill="#db2777"/><rect x="18" y="31" width="14" height="2.6" rx="1.3" fill="#f9a8d4"/><path d="M45 11 l1.5 3.4 l3.4 1.5 l-3.4 1.5 l-1.5 3.4 l-1.5 -3.4 l-3.4 -1.5 l3.4 -1.5 Z" fill="#fde047"/></svg>');
var FIC_FORTUNE = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="ffo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b5cf6"/><stop offset="1" stop-color="#6d28d9"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#ffo)"/><circle cx="29" cy="27" r="13" fill="#fff" fill-opacity="0.95"/><path d="M18 41 h22 l-3 5 h-16 Z" fill="#fff"/><path d="M23 22 a7 7 0 0 1 7 -3" stroke="#a855f7" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M42 12 l1.2 2.8 l2.8 1.2 l-2.8 1.2 l-1.2 2.8 l-1.2 -2.8 l-2.8 -1.2 l2.8 -1.2 Z" fill="#fde047"/></svg>');
var FIC_QUIZ = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fqz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#d97706"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fqz)"/><rect x="14" y="12" width="30" height="34" rx="4" fill="#fff"/><circle cx="23" cy="24" r="5" fill="none" stroke="#22c55e" stroke-width="2.4"/><path d="M31 30 l8 8 M39 30 l-8 8" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round"/><rect x="19" y="39" width="20" height="2.6" rx="1.3" fill="#d1d5db"/></svg>');
var FIC_OBJECT = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fob" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06b6d4"/><stop offset="1" stop-color="#0891b2"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fob)"/><circle cx="26" cy="26" r="12" fill="rgba(0,0,0,.22)" stroke="#fff" stroke-width="3.5"/><line x1="35" y1="35" x2="45" y2="45" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M44 12 l1.2 2.8 l2.8 1.2 l-2.8 1.2 l-1.2 2.8 l-1.2 -2.8 l-2.8 -1.2 l2.8 -1.2 Z" fill="#fde047"/></svg>');
var FIC_OCR = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="foc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#64748b"/><stop offset="1" stop-color="#475569"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#foc)"/><rect x="16" y="12" width="26" height="34" rx="4" fill="#fff"/><rect x="21" y="19" width="16" height="2.6" rx="1.3" fill="#94a3b8"/><rect x="21" y="25" width="16" height="2.6" rx="1.3" fill="#94a3b8"/><rect x="21" y="31" width="11" height="2.6" rx="1.3" fill="#94a3b8"/><rect x="13" y="36" width="32" height="2.8" rx="1.4" fill="#22d3ee"/></svg>');
var FIC_BIZ = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fbz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14b8a6"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fbz)"/><rect x="15" y="24" width="28" height="19" rx="2" fill="#fff"/><path d="M13 24 l3 -8 h26 l3 8 Z" fill="#fff"/><rect x="13" y="22" width="32" height="2.6" fill="#0f766e"/><rect x="18" y="30" width="6" height="5" rx="1" fill="#99f6e4"/><rect x="34" y="30" width="6" height="5" rx="1" fill="#99f6e4"/><rect x="26" y="32" width="6" height="11" rx="1" fill="#14b8a6"/></svg>');
var FIC_LEDGER = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="flg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22c55e"/><stop offset="1" stop-color="#15803d"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#flg)"/><rect x="13" y="18" width="32" height="24" rx="5" fill="#fff"/><rect x="13" y="24" width="32" height="3" fill="#86efac"/><rect x="30" y="30" width="17" height="9" rx="3" fill="#bbf7d0"/><circle cx="38" cy="34.5" r="2.6" fill="#15803d"/></svg>');
var FIC_LABEL = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="flb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fb7185"/><stop offset="1" stop-color="#e11d48"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#flb)"/><path d="M24 13 h10 v5 l3 4 v18 a3 3 0 0 1 -3 3 h-10 a3 3 0 0 1 -3 -3 v-18 l3 -4 Z" fill="#fff"/><rect x="22" y="28" width="14" height="10" fill="#fb7185"/><rect x="24" y="30.5" width="10" height="1.6" rx="0.8" fill="#fff"/><rect x="24" y="33.5" width="7" height="1.6" rx="0.8" fill="#fff"/></svg>');
var FIC_SENIOR = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fse" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#ea580c"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fse)"/><rect x="11" y="15" width="26" height="20" rx="8" fill="#fff"/><path d="M17 33 l0 7 l8 -6 Z" fill="#fff"/><circle cx="19" cy="25" r="2.4" fill="#ea580c"/><circle cx="24" cy="25" r="2.4" fill="#ea580c"/><circle cx="29" cy="25" r="2.4" fill="#ea580c"/><path d="M42 23 a6 6 0 0 1 0 12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M46 19 a11 11 0 0 1 0 20" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>');
var FIC_VOICE = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fvc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#0891b2"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fvc)"/><rect x="24" y="13" width="10" height="20" rx="5" fill="#fff"/><path d="M20 28 a9 9 0 0 0 18 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="29" y1="37" x2="29" y2="43" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="24" y1="43" x2="34" y2="43" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>');
var FIC_AGENT = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#7b61ff"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fag)"/><circle cx="25" cy="25" r="10" fill="none" stroke="#fff" stroke-width="4"/><line x1="33" y1="33" x2="44" y2="44" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M41 12 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6 z" fill="#fff"/></svg>');
var FIC_WORK = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fwk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14b8a6"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fwk)"/><rect x="14" y="22" width="30" height="22" rx="4" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M23 22 v-3 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 v3" fill="none" stroke="#fff" stroke-width="3.5"/><line x1="14" y1="31" x2="44" y2="31" stroke="#fff" stroke-width="3.5"/></svg>');
var FIC_BRIEF = svgToUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><linearGradient id="fbr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><rect width="58" height="58" rx="18" fill="url(#fbr)"/><circle cx="29" cy="29" r="9" fill="#fff"/><g stroke="#fff" stroke-width="3" stroke-linecap="round"><line x1="29" y1="9" x2="29" y2="15"/><line x1="29" y1="43" x2="29" y2="49"/><line x1="9" y1="29" x2="15" y2="29"/><line x1="43" y1="29" x2="49" y2="29"/><line x1="15" y1="15" x2="19" y2="19"/><line x1="39" y1="39" x2="43" y2="43"/><line x1="43" y1="15" x2="39" y2="19"/><line x1="19" y1="39" x2="15" y2="43"/></g></svg>');
var PODO_FEATURES = [
{ id:'briefing',  n:'브리핑',      icon:FIC_BRIEF, act:openBriefing },
{ id:'companion', n:'AI 컴패니언', icon:FIC_COMPANION, act:openCompanion },
{ id:'senior',    n:'시니어',      icon:FIC_SENIOR, act:openSenior },
{ id:'voiceact',  n:'말로 열기',   icon:FIC_VOICE,  act:openVoiceAct },
{ id:'research',  n:'AI 리서치',   icon:FIC_AGENT,  act:openResearch },
{ id:'workflow',  n:'AI 자동화',     icon:FIC_WORK,   act:openWorkflow },
{ id:'study',     n:'AI 학습',     icon:FIC_STUDY,  act:openStudy },
{ id:'cardscan',  n:'AI 명함',     icon:FIC_CARD,   act:openCardScanner },
{ id:'biz',       n:'사장님비서',  icon:FIC_BIZ,   act:openBiz },
{ id:'ledger',    n:'AI가계부',    icon:FIC_LEDGER, act:openLedger },
{ id:'english',   n:'영어회화',    icon:FIC_ENGLISH, act:openEnglishPractice },
{ id:'travel',    n:'여행플래너',  icon:FIC_TRAVEL, act:openTravel },
{ id:'fridge',    n:'냉장고요리',  icon:FIC_FRIDGE, act:openFridge },
{ id:'naming',    n:'작명',        icon:FIC_NAME,  act:openNaming },
{ id:'fortune',   n:'운세',        icon:FIC_FORTUNE, act:openFortune },
{ id:'quiz',      n:'퀴즈생성',    icon:FIC_QUIZ,  act:openQuiz },
{ id:'object',    n:'사물인식',    icon:FIC_OBJECT, act:openObject },
{ id:'ocr',       n:'글자인식',    icon:FIC_OCR,   act:openOcr },
{ id:'label',     n:'성분스캐너',  icon:FIC_LABEL, act:openLabel },
{ id:'image',     n:'이미지 생성', icon:FIC_IMAGE,  tab:'image' },
{ id:'write',     n:'AI 글쓰기',   icon:FIC_WRITE,  tab:'write' },
{ id:'reel',      n:'AI 릴',       icon:FIC_SHORTS, tab:'shorts' },
{ id:'pododa',    n:'포도다',      icon:FIC_PODODA, act:openPododa }
];
function openPododa(){ try{ window._vansActive=false; }catch(e){} try{ location.assign('pododa.html'); }catch(e){ location.href='pododa.html'; } }
function openPododaReg(kind){ try{ window._vansActive=false; }catch(e){} var u='pododa.html'+(kind?('?reg='+encodeURIComponent(kind)):''); try{ location.assign(u); }catch(e){ location.href=u; } }
function makeFeatureBtn(f){
ICONS[f.id]=f.icon;
var b=document.createElement('button'); b.className='abtn';
b.dataset.id=f.id;
b._svc={id:f.id, n:f.n, c:'#a855f7'};
b.setAttribute('draggable','true');
b.onclick=function(){
if(window._podoMenuTs && Date.now()-window._podoMenuTs<600) return;
if(typeof f.act==='function'){ f.act(); }
else if(f.tab){ switchTab(f.tab, document.querySelector('.t-'+f.tab)); }
};
var ic=document.createElement('div'); ic.className='aic';
var img=document.createElement('img'); img.src=f.icon; img.alt=f.n;
img.style.cssText='width:52px;height:52px;display:block;border-radius:15px;flex-shrink:0;';
ic.appendChild(img); b.appendChild(ic);
var lb=document.createElement('div'); lb.className='alb'; lb.textContent=f.n; b.appendChild(lb);
return b;
}
var COMPANION_NAME='포도';
var COMPANION_PROMPT="너는 '포도', 사용자의 다정한 AI 친구야. 따뜻하고 공감하며 친구처럼 반말로 자연스럽게 대화해. 짧고 편안하게, 이모지는 가끔 1개만. 사용자의 기분을 살피고 진심으로 들어주고 응원해줘. 훈계하거나 길게 설명하지 말고 친구처럼 반응해.";
function setChatHeaderName(name,status){
var n=document.getElementById('chatheader-name'); if(n) n.textContent=name;
var s=document.getElementById('chatheader-status'); if(s) s.textContent=status;
var av=document.getElementById('chatheader-av'); if(av) av.textContent=(name===COMPANION_NAME?'🍇':'AI');
}
var ENGLISH_PROMPT="You are 'Leo', a friendly and patient English conversation partner for a Korean learner. Have a natural, encouraging English conversation. Use simple clear English (beginner-intermediate). Keep each reply short (2-3 sentences) and end with a question to keep the conversation going. If the user makes a notable mistake, add ONE short gentle correction in Korean at the very end like: (\uD83D\uDCA1 자연스러운 표현: ...). Never lecture.";
function openEnglishPractice(){
window.PODO_PERSONA=ENGLISH_PROMPT;
window.PODO_TTS_LANG='en';
window.PODO_TTS=true;
if(typeof ttsSupported==='function' && ttsSupported()) window.speechSynthesis.cancel();
switchTab('chat', document.querySelector('.t-chat'));
clearChat();
setChatHeaderName('Leo','💬 영어회화 연습');
if(typeof updateTTSBtn==='function') updateTTSBtn();
addMsg('ai',"Hi! I'm Leo 😊 Let's practice English together. How's your day going?");
}
var travelDays='2박3일', travelStyles=[];
function openTravel(){
travelStyles=[];
var dst=document.getElementById('travel-dest'); if(dst) dst.value='';
var rw=document.getElementById('travel-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('travel-err'); if(er) er.style.display='none';
var sc=document.querySelectorAll('#travel-style .study-chip'); for(var i=0;i<sc.length;i++) sc[i].classList.remove('on');
document.getElementById('travel-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeTravel(){ document.getElementById('travel-bg').style.display='none'; history.pushState({p:true},'',''); }
function selTravelDays(el,v){ travelDays=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function toggleTravelStyle(el,v){ var i=travelStyles.indexOf(v); if(i>=0){ travelStyles.splice(i,1); el.classList.remove('on'); } else { travelStyles.push(v); el.classList.add('on'); } }
function travelErr(m){ var e=document.getElementById('travel-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyTravel(){ var t=document.getElementById('travel-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#0ea5e9,#6366f1)'); }); }
function runTravel(){
var dest=(document.getElementById('travel-dest').value||'').trim();
if(!dest){ travelErr('여행 목적지를 입력해줘 (예: 제주도, 도쿄)'); return; }
if(!hasAIKey()){ noKeyInto('travel-result-wrap','travel-result'); return; }
var btn=document.getElementById('travel-go'); var old=btn.textContent; btn.textContent='⏳ 일정 짜는 중...'; btn.disabled=true;
var er=document.getElementById('travel-err'); if(er) er.style.display='none';
var styles=travelStyles.length?travelStyles.join(', '):'두루두루';
var sys='너는 전문 여행 플래너야. 사용자의 목적지·기간·취향에 맞춰 한국어로 현실적이고 동선이 효율적인 day별 여행 일정을 짜줘. 각 날짜마다 오전/점심/오후/저녁으로 나눠 추천 장소와 맛집, 간단한 이동 팁을 적어줘. 마지막에 짧은 꿀팁 2~3개. 너무 길지 않게 핵심만 간결하게.';
var prompt='목적지: '+dest+'\n기간: '+travelDays+'\n여행 스타일: '+styles+'\n위 조건으로 여행 일정을 짜줘.';
callAI({ system:sys, messages:[{role:'user',content:prompt}], maxTokens:1500 },
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('travel-result').textContent=txt||'(응답이 비어 있어요)'; document.getElementById('travel-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; travelErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var fridgeType='아무거나';
function openFridge(){
fridgeType='아무거나';
var ing=document.getElementById('fridge-ing'); if(ing) ing.value='';
var rw=document.getElementById('fridge-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('fridge-err'); if(er) er.style.display='none';
var ch=document.querySelectorAll('#fridge-type .study-chip'); for(var i=0;i<ch.length;i++) ch[i].classList.toggle('on', ch[i].getAttribute('data-v')===fridgeType);
document.getElementById('fridge-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeFridge(){ document.getElementById('fridge-bg').style.display='none'; history.pushState({p:true},'',''); }
function selFridgeType(el,v){ fridgeType=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function fridgeErr(m){ var e=document.getElementById('fridge-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyFridge(){ var t=document.getElementById('fridge-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#10b981,#059669)'); }); }
function runFridge(){
var ing=(document.getElementById('fridge-ing').value||'').trim();
if(!ing){ fridgeErr('가진 재료를 적어줘 (예: 계란, 양파, 김치)'); return; }
if(!hasAIKey()){ noKeyInto('fridge-result-wrap','fridge-result'); return; }
var btn=document.getElementById('fridge-go'); var old=btn.textContent; btn.textContent='⏳ 추천 중...'; btn.disabled=true;
var er=document.getElementById('fridge-err'); if(er) er.style.display='none';
var sys='너는 친절한 요리 도우미야. 사용자가 가진 재료로 만들 수 있는 요리를 2~3개 추천해줘. 각 요리마다 제목, 추가로 필요한 흔한 재료(있으면), 간단한 조리 순서를 한국어로 알려줘. 집에 흔한 재료 위주로 현실적으로, 너무 길지 않게.';
var prompt='가진 재료: '+ing+'\n원하는 종류: '+fridgeType+'\n이 재료로 만들 수 있는 요리를 추천해줘.';
callAI({ system:sys, messages:[{role:'user',content:prompt}], maxTokens:1300 },
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('fridge-result').textContent=txt||'(응답이 비어 있어요)'; document.getElementById('fridge-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; fridgeErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var nameTarget='가게/브랜드', nameStyles=[];
function openNaming(){
nameTarget='가게/브랜드'; nameStyles=[];
var kw=document.getElementById('name-kw'); if(kw) kw.value='';
var rw=document.getElementById('name-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('name-err'); if(er) er.style.display='none';
var tc=document.querySelectorAll('#name-target .study-chip'); for(var i=0;i<tc.length;i++) tc[i].classList.toggle('on', tc[i].getAttribute('data-v')===nameTarget);
var sc=document.querySelectorAll('#name-style .study-chip'); for(var j=0;j<sc.length;j++) sc[j].classList.remove('on');
document.getElementById('name-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeNaming(){ document.getElementById('name-bg').style.display='none'; history.pushState({p:true},'',''); }
function selNameTarget(el,v){ nameTarget=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function toggleNameStyle(el,v){ var i=nameStyles.indexOf(v); if(i>=0){ nameStyles.splice(i,1); el.classList.remove('on'); } else { nameStyles.push(v); el.classList.add('on'); } }
function nameErr(m){ var e=document.getElementById('name-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyName(){ var t=document.getElementById('name-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#f472b6,#db2777)'); }); }
function runNaming(){
var kw=(document.getElementById('name-kw').value||'').trim();
if(!kw){ nameErr('원하는 분위기나 키워드를 적어줘 (예: 따뜻한 감성 카페)'); return; }
if(!hasAIKey()){ noKeyInto('name-result-wrap','name-result'); return; }
var btn=document.getElementById('name-go'); var old=btn.textContent; btn.textContent='⏳ 짓는 중...'; btn.disabled=true;
var er=document.getElementById('name-err'); if(er) er.style.display='none';
var styles=nameStyles.length?nameStyles.join(', '):'자유';
var sys='너는 작명 전문가야. 사용자의 대상·키워드·스타일에 맞춰 이름 후보를 6~8개 추천해줘. 각 이름마다 짧은 의미나 느낌을 한 줄로 곁들여. 발음하기 쉽고 기억에 남는 이름 위주로, 한국어로.';
var prompt='대상: '+nameTarget+'\n키워드/분위기: '+kw+'\n스타일: '+styles+'\n어울리는 이름을 추천해줘.';
callAI({ system:sys, messages:[{role:'user',content:prompt}], maxTokens:1100 },
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('name-result').textContent=txt||'(응답이 비어 있어요)'; document.getElementById('name-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; nameErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var fortuneMode='사주';
var FORTUNE_PH={ '사주':'생년월일과 태어난 시간 (예: 1990년 3월 5일 오전 8시경, 남)', '타로':'고민이나 궁금한 점 (예: 올해 이직운이 좋을까?)', '꿈해몽':'꾼 꿈을 적어줘 (예: 맑은 강에서 큰 물고기를 잡았어)' };
function openFortune(){
fortuneMode='사주';
var q=document.getElementById('fortune-q'); if(q){ q.value=''; q.placeholder=FORTUNE_PH['사주']; }
var rw=document.getElementById('fortune-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('fortune-err'); if(er) er.style.display='none';
var ch=document.querySelectorAll('#fortune-mode .study-chip'); for(var i=0;i<ch.length;i++) ch[i].classList.toggle('on', ch[i].getAttribute('data-v')===fortuneMode);
document.getElementById('fortune-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeFortune(){ document.getElementById('fortune-bg').style.display='none'; history.pushState({p:true},'',''); }
function selFortune(el,v){ fortuneMode=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); var q=document.getElementById('fortune-q'); if(q) q.placeholder=FORTUNE_PH[v]||''; }
function fortuneErr(m){ var e=document.getElementById('fortune-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyFortune(){ var t=document.getElementById('fortune-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#8b5cf6,#6d28d9)'); }); }
function runFortune(){
var q=(document.getElementById('fortune-q').value||'').trim();
if(!q){ fortuneErr('내용을 입력해줘'); return; }
if(!hasAIKey()){ noKeyInto('fortune-result-wrap','fortune-result'); return; }
var btn=document.getElementById('fortune-go'); var old=btn.textContent; btn.textContent='⏳ 보는 중...'; btn.disabled=true;
var er=document.getElementById('fortune-err'); if(er) er.style.display='none';
var sys;
if(fortuneMode==='사주') sys='너는 따뜻한 사주·명리 상담가야. 생년월일(과 시간)을 바탕으로 타고난 기질과 올해 흐름, 도움이 될 조언을 한국어로 풀어줘. 재미로 보는 것임을 가볍게 전제하고, 불안을 조성하거나 단정적으로 예언하지 말고 긍정적이고 응원하는 톤으로.';
else if(fortuneMode==='타로') sys='너는 친절한 타로 리더야. 사용자의 고민에 대해 카드 3장(과거/현재/미래 또는 상황/조언/결과)을 뽑아 각 카드 이름과 의미, 종합 메시지를 한국어로 풀어줘. 재미와 위로 중심으로, 긍정적이고 따뜻하게.';
else sys='너는 꿈해몽 해석가야. 사용자가 꾼 꿈의 상징적 의미와 심리적 통찰을 한국어로 따뜻하게 풀어줘. 미신적 단정보다 재미와 긍정적 통찰 중심으로.';
callAI({ system:sys, messages:[{role:'user',content:q}], maxTokens:1200 },
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('fortune-result').textContent=txt||'(응답이 비어 있어요)'; document.getElementById('fortune-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; fortuneErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var quizCount='5', quizType='객관식', quizLevel='보통';
function syncChips(sel,v){ var c=document.querySelectorAll(sel+' .study-chip'); for(var i=0;i<c.length;i++) c[i].classList.toggle('on', c[i].getAttribute('data-v')===v); }
function openQuiz(){
quizCount='5'; quizType='객관식'; quizLevel='보통';
var t=document.getElementById('quiz-topic'); if(t) t.value='';
var rw=document.getElementById('quiz-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('quiz-err'); if(er) er.style.display='none';
syncChips('#quiz-count',quizCount); syncChips('#quiz-type',quizType); syncChips('#quiz-level',quizLevel);
document.getElementById('quiz-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeQuiz(){ document.getElementById('quiz-bg').style.display='none'; history.pushState({p:true},'',''); }
function selQuiz(grp,el,v){ if(grp==='count')quizCount=v; else if(grp==='type')quizType=v; else quizLevel=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function quizErr(m){ var e=document.getElementById('quiz-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyQuiz(){ var t=document.getElementById('quiz-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#f59e0b,#d97706)'); }); }
function runQuiz(){
var topic=(document.getElementById('quiz-topic').value||'').trim();
if(!topic){ quizErr('퀴즈 주제나 내용을 입력해줘 (예: 한국사 조선시대)'); return; }
if(!hasAIKey()){ noKeyInto('quiz-result-wrap','quiz-result'); return; }
var btn=document.getElementById('quiz-go'); var old=btn.textContent; btn.textContent='⏳ 만드는 중...'; btn.disabled=true;
var er=document.getElementById('quiz-err'); if(er) er.style.display='none';
var sys='너는 퀴즈 출제자야. 주어진 주제/내용으로 '+quizType+' 문제 '+quizCount+'개를 '+quizLevel+' 난이도로 한국어로 만들어줘. 각 문제에 번호를 붙이고, 객관식이면 보기 4개를 제시해. 모든 문제를 먼저 보여준 뒤 마지막에 [정답]과 짧은 해설을 모아서 적어줘.';
callAI({ system:sys, messages:[{role:'user',content:'주제/내용: '+topic}], maxTokens:1600 },
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('quiz-result').textContent=txt||'(응답이 비어 있어요)'; document.getElementById('quiz-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; quizErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var objImgB64=null, objImgMime='';
function openObject(){
objImgB64=null; objImgMime='';
var pw=document.getElementById('obj-preview-wrap'); if(pw) pw.style.display='none';
var ua=document.getElementById('obj-upload'); if(ua) ua.style.display='block';
var rw=document.getElementById('obj-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('obj-err'); if(er) er.style.display='none';
var q=document.getElementById('obj-q'); if(q) q.value='';
var fi=document.getElementById('obj-file'); if(fi) fi.value='';
document.getElementById('obj-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeObject(){ document.getElementById('obj-bg').style.display='none'; history.pushState({p:true},'',''); }
function onObjImage(e){ var f=e.target.files[0]; if(!f) return; var r=new FileReader(); r.onload=function(ev){ objImgB64=ev.target.result.split(',')[1]; objImgMime=f.type||'image/jpeg'; document.getElementById('obj-preview').src=ev.target.result; document.getElementById('obj-preview-wrap').style.display='block'; document.getElementById('obj-upload').style.display='none'; }; r.readAsDataURL(f); }
function clearObjImage(){ objImgB64=null; objImgMime=''; document.getElementById('obj-preview-wrap').style.display='none'; document.getElementById('obj-upload').style.display='block'; var fi=document.getElementById('obj-file'); if(fi) fi.value=''; }
function objErr(m){ var e=document.getElementById('obj-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyObj(){ var t=document.getElementById('obj-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#06b6d4,#0891b2)'); }); }
function runObject(){
if(!objImgB64){ objErr('사물/상품 사진을 올려줘'); return; }
if(!hasVisionKey()){ visionGuideInto('obj-result-wrap','obj-result'); return; }
var q=(document.getElementById('obj-q').value||'').trim();
var btn=document.getElementById('obj-go'); var old=btn.textContent; btn.textContent='⏳ 분석 중...'; btn.disabled=true;
var er=document.getElementById('obj-err'); if(er) er.style.display='none';
var sys='너는 사물·상품 분석가야. 사진 속 사물이나 상품이 무엇인지 한국어로 알려주고 핵심 특징·용도·간단한 팁을 설명해줘. 상품이면 종류와 대략적 용도, 고를 때 팁을. 확실하지 않으면 추정임을 밝혀.';
var prompt=(q?('[질문] '+q+'\n\n'):'')+'이 사진 속 사물/상품을 분석해줘.';
studyVision(sys+'\n\n'+prompt, objImgB64, objImgMime,
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('obj-result').textContent=txt||'(응답이 비어 있어요)'; document.getElementById('obj-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; objErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var ocrImgB64=null, ocrImgMime='', ocrMode='원문 그대로';
function openOcr(){
ocrImgB64=null; ocrImgMime=''; ocrMode='원문 그대로';
var pw=document.getElementById('ocr-preview-wrap'); if(pw) pw.style.display='none';
var ua=document.getElementById('ocr-upload'); if(ua) ua.style.display='block';
var rw=document.getElementById('ocr-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('ocr-err'); if(er) er.style.display='none';
var fi=document.getElementById('ocr-file'); if(fi) fi.value='';
syncChips('#ocr-mode', ocrMode);
document.getElementById('ocr-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeOcr(){ document.getElementById('ocr-bg').style.display='none'; history.pushState({p:true},'',''); }
function onOcrImage(e){ var f=e.target.files[0]; if(!f) return; var r=new FileReader(); r.onload=function(ev){ ocrImgB64=ev.target.result.split(',')[1]; ocrImgMime=f.type||'image/jpeg'; document.getElementById('ocr-preview').src=ev.target.result; document.getElementById('ocr-preview-wrap').style.display='block'; document.getElementById('ocr-upload').style.display='none'; }; r.readAsDataURL(f); }
function clearOcrImage(){ ocrImgB64=null; ocrImgMime=''; document.getElementById('ocr-preview-wrap').style.display='none'; document.getElementById('ocr-upload').style.display='block'; var fi=document.getElementById('ocr-file'); if(fi) fi.value=''; }
function selOcr(el,v){ ocrMode=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function ocrErr(m){ var e=document.getElementById('ocr-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyOcr(){ var t=document.getElementById('ocr-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#64748b,#475569)'); }); }
function runOcr(){
if(!ocrImgB64){ ocrErr('손글씨/문서 사진을 올려줘'); return; }
if(!hasVisionKey()){ visionGuideInto('ocr-result-wrap','ocr-result'); return; }
var btn=document.getElementById('ocr-go'); var old=btn.textContent; btn.textContent='⏳ 추출 중...'; btn.disabled=true;
var er=document.getElementById('ocr-err'); if(er) er.style.display='none';
var inst = (ocrMode==='깔끔하게 정리') ? ' 추출한 뒤 읽기 좋게 문단과 맞춤법을 다듬어줘.' : (ocrMode==='요약' ? ' 추출한 내용을 핵심만 요약해줘.' : ' 원문 그대로 정확히 옮겨줘. 임의로 내용을 바꾸지 마.');
var sys='너는 OCR 텍스트 추출 도우미야. 이미지 속 손글씨나 문서의 글자를 정확히 읽어 텍스트로 변환해줘. 원문 언어를 유지하고 줄바꿈·목록도 최대한 살려줘.'+inst;
studyVision(sys, ocrImgB64, ocrImgMime,
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('ocr-result').textContent=txt||'(읽을 글자를 못 찾았어요)'; document.getElementById('ocr-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; ocrErr((e&&e.message)||'오류가 발생했어요'); }
, true);
}
var bizTask='리뷰 답변', bizTone='정중하게';
var BIZ_PH={ '리뷰 답변':'고객 리뷰를 붙여넣어줘 (예: 음식은 맛있는데 대기가 길었어요)', '홍보 문구':'홍보할 내용 (예: 신메뉴 흑임자 라떼 출시, 주말 20% 할인)', '안내 문자':'전할 내용 (예: 이번 주 수요일 임시 휴무)', '견적·문의':'고객 문의 (예: 단체 10명 예약 가능한가요?)', '가게 소개글':'가게 정보 (예: 5년 된 동네 베이커리, 천연발효빵 전문)' };
function openBiz(){
bizTask='리뷰 답변'; bizTone='정중하게';
var t=document.getElementById('biz-input'); if(t){ t.value=''; t.placeholder=BIZ_PH['리뷰 답변']; }
var rw=document.getElementById('biz-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('biz-err'); if(er) er.style.display='none';
syncChips('#biz-task', bizTask); syncChips('#biz-tone', bizTone);
document.getElementById('biz-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeBiz(){ document.getElementById('biz-bg').style.display='none'; history.pushState({p:true},'',''); }
function selBizTask(el,v){ bizTask=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); var t=document.getElementById('biz-input'); if(t) t.placeholder=BIZ_PH[v]||''; }
function selBizTone(el,v){ bizTone=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function bizErr(m){ var e=document.getElementById('biz-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyBiz(){ var t=document.getElementById('biz-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#22d3ee,#7b61ff)'); }); }
function bizSystem(){
var tone = (bizTone==='친근하게') ? '친근하고 따뜻한' : (bizTone==='간결하게' ? '간결하고 핵심만 담은' : '정중하고 프로페셔널한');
if(bizTask==='리뷰 답변') return '너는 가게 사장님의 리뷰 답변 도우미야. 고객 리뷰에 대해 '+tone+' 답글을 한국어로 써줘. 감사 인사와 구체적 언급을 넣고, 불만 리뷰면 진심 어린 사과와 개선 약속을 담아. 바로 복사해 쓸 수 있게, 너무 길지 않게.';
if(bizTask==='홍보 문구') return '너는 가게 홍보 카피라이터야. 주어진 내용을 '+tone+' SNS/매장 홍보 문구로 한국어로 만들어줘. 짧은 버전 2~3개를 제시하고 어울리는 해시태그도 몇 개 곁들여.';
if(bizTask==='안내 문자') return '너는 가게 고객 안내문 작성 도우미야. 전할 내용을 '+tone+' 단체 안내 문자로 한국어로 만들어줘. 짧고 명확하게, 바로 발송 가능하게.';
if(bizTask==='견적·문의') return '너는 가게 사장님의 고객 문의 응대 도우미야. 고객 문의에 '+tone+' 답변을 한국어로 써줘. 명확하고 신뢰감 있게, 필요하면 추가로 확인할 점도 물어봐.';
return '너는 가게 소개글 작성 도우미야. 주어진 가게 정보로 '+tone+' 소개/프로필 문구를 한국어로 만들어줘. 매력 포인트가 드러나게 한두 가지 버전으로.';
}
function runBiz(){
var input=(document.getElementById('biz-input').value||'').trim();
if(!input){ bizErr('내용을 입력해줘'); return; }
if(!hasAIKey()){ bizErr(getNoKeyMsg().replace(/\n/g,' ')); return; }
var btn=document.getElementById('biz-go'); var old=btn.textContent; btn.textContent='⏳ 작성 중...'; btn.disabled=true;
var er=document.getElementById('biz-err'); if(er) er.style.display='none';
callAI({ system:bizSystem(), messages:[{role:'user',content:input}], maxTokens:1300 },
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('biz-result').textContent=txt||'(응답이 비어 있어요)'; document.getElementById('biz-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; bizErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var LEDGER_KEY='podoai_ledger';
var ledgerCat='식비';
var LEDGER_CATS=['식비','카페','교통','쇼핑','생활','의료','기타'];
function getLedger(){ return lsG(LEDGER_KEY,[]); }
function saveLedgerArr(arr){ lsS(LEDGER_KEY, arr); }
function todayStr(){ var d=new Date(), m=d.getMonth()+1, dd=d.getDate(); return d.getFullYear()+'-'+(m<10?'0'+m:m)+'-'+(dd<10?'0'+dd:dd); }
function wons(n){ return (n||0).toLocaleString('ko-KR')+'원'; }
function curYM(){ var n=new Date(); return n.getFullYear()+'-'+((n.getMonth()+1<10?'0':'')+(n.getMonth()+1)); }
function openLedger(){
ledgerCat='식비';
var a=document.getElementById('ledger-amount'); if(a) a.value='';
var m=document.getElementById('ledger-memo'); if(m) m.value='';
var d=document.getElementById('ledger-date'); if(d) d.value=todayStr();
syncChips('#ledger-cat', ledgerCat);
var er=document.getElementById('ledger-err'); if(er) er.style.display='none';
var ai=document.getElementById('ledger-ai-wrap'); if(ai) ai.style.display='none';
renderLedger();
document.getElementById('ledger-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeLedger(){ document.getElementById('ledger-bg').style.display='none'; history.pushState({p:true},'',''); }
function selLedgerCat(el,v){ ledgerCat=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function ledgerErr(m){ var e=document.getElementById('ledger-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function addLedger(){
var amt=parseInt((document.getElementById('ledger-amount').value||'').replace(/[^0-9]/g,''),10);
if(!amt||amt<=0){ ledgerErr('금액을 숫자로 입력해줘'); return; }
var memo=(document.getElementById('ledger-memo').value||'').trim();
var date=(document.getElementById('ledger-date').value||'').trim()||todayStr();
var arr=getLedger(); arr.unshift({ amount:amt, cat:ledgerCat, memo:memo, date:date, ts:Date.now() }); saveLedgerArr(arr);
document.getElementById('ledger-amount').value=''; document.getElementById('ledger-memo').value='';
var er=document.getElementById('ledger-err'); if(er) er.style.display='none';
showToast('💰 '+wons(amt)+' 기록됨','linear-gradient(135deg,#22c55e,#15803d)');
renderLedger();
}
function delLedger(idx){ var arr=getLedger(); arr.splice(idx,1); saveLedgerArr(arr); renderLedger(); }
function renderLedger(){
var arr=getLedger(), ym=curYM(), total=0, byCat={};
var monthEntries=arr.filter(function(e){ return (e.date||'').indexOf(ym)===0; });
monthEntries.forEach(function(e){ total+=e.amount; byCat[e.cat]=(byCat[e.cat]||0)+e.amount; });
var tEl=document.getElementById('ledger-total'); if(tEl) tEl.textContent=wons(total);
var bd=document.getElementById('ledger-breakdown');
if(bd){
bd.innerHTML='';
var cats=Object.keys(byCat).sort(function(a,b){ return byCat[b]-byCat[a]; });
if(!cats.length){ var em=document.createElement('div'); em.textContent='이번 달 기록이 없어요'; em.style.cssText='font-size:12px;color:#1f2430;padding:4px 0'; bd.appendChild(em); }
cats.forEach(function(c){
var pct=total?Math.round(byCat[c]/total*100):0;
var row=document.createElement('div'); row.style.cssText='margin-bottom:7px';
var top=document.createElement('div'); top.style.cssText='display:flex;justify-content:space-between;font-size:12px;color:#1f2430;margin-bottom:3px';
var lab=document.createElement('span'); lab.textContent=c; var val=document.createElement('span'); val.textContent=wons(byCat[c])+' ('+pct+'%)';
top.appendChild(lab); top.appendChild(val); row.appendChild(top);
var bar=document.createElement('div'); bar.style.cssText='height:6px;background:rgba(0,0,0,.26);border-radius:4px;overflow:hidden';
var fill=document.createElement('div'); fill.style.cssText='height:100%;width:'+pct+'%;background:linear-gradient(90deg,#22c55e,#15803d);border-radius:4px'; bar.appendChild(fill);
row.appendChild(bar); bd.appendChild(row);
});
}
var list=document.getElementById('ledger-list');
if(list){
list.innerHTML='';
if(!arr.length){ var e2=document.createElement('div'); e2.textContent='지출을 추가해보세요'; e2.style.cssText='font-size:12px;color:#1f2430;text-align:center;padding:14px'; list.appendChild(e2); }
arr.slice(0,40).forEach(function(e,idx){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(0,0,0,.2)';
var info=document.createElement('div'); info.style.cssText='flex:1;min-width:0';
var l1=document.createElement('div'); l1.style.cssText='font-size:13px;color:#141720;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; l1.textContent=e.cat+(e.memo?(' · '+e.memo):'');
var l2=document.createElement('div'); l2.style.cssText='font-size:10px;color:#1f2430'; l2.textContent=e.date;
info.appendChild(l1); info.appendChild(l2);
var amt=document.createElement('div'); amt.style.cssText='font-size:14px;font-weight:700;color:#22c55e;white-space:nowrap'; amt.textContent=wons(e.amount);
var del=document.createElement('button'); del.innerHTML='&#10005;'; del.style.cssText='background:none;border:none;color:#1f2430;font-size:13px;cursor:pointer;padding:4px';
del.onclick=(function(i){ return function(){ delLedger(i); }; })(idx);
row.appendChild(info); row.appendChild(amt); row.appendChild(del); list.appendChild(row);
});
}
}
function ledgerReceipt(e){
var f=e.target.files[0]; if(!f) return;
if(!hasAIKey()){ ledgerErr(getNoKeyMsg().replace(/\n/g,' ')); e.target.value=''; return; }
var r=new FileReader();
r.onload=function(ev){
var b64=ev.target.result.split(',')[1], mime=f.type||'image/jpeg';
var btn=document.getElementById('ledger-receipt-btn'); var old=btn?btn.textContent:''; if(btn){ btn.textContent='⏳ 인식 중...'; btn.disabled=true; }
var prompt='이 영수증 사진에서 총 결제금액(숫자만, 콤마 없이), 상호명, 지출 분류를 추출해줘. 분류는 다음 중 하나: 식비, 카페, 교통, 쇼핑, 생활, 의료, 기타. 설명 없이 반드시 이 형식으로만 답해: 금액|상호|분류';
studyVision(prompt, b64, mime, function(txt){
if(btn){ btn.textContent=old; btn.disabled=false; }
var parts=String(txt).trim().split('|');
var amt=(parts[0]||'').replace(/[^0-9]/g,''), store=(parts[1]||'').trim(), cat=(parts[2]||'').trim();
if(amt) document.getElementById('ledger-amount').value=amt;
if(store) document.getElementById('ledger-memo').value=store;
if(LEDGER_CATS.indexOf(cat)>=0){ ledgerCat=cat; syncChips('#ledger-cat', cat); }
showToast('📷 인식 완료 · 확인 후 추가','linear-gradient(135deg,#22c55e,#15803d)');
}, function(err){ if(btn){ btn.textContent=old; btn.disabled=false; } ledgerErr((err&&err.message)||'영수증 인식 실패'); });
};
r.readAsDataURL(f); e.target.value='';
}
function ledgerAnalyze(){
var arr=getLedger();
if(!hasAIKey()){ ledgerErr(getNoKeyMsg().replace(/\n/g,' ')); return; }
var ym=curYM(), monthEntries=arr.filter(function(e){ return (e.date||'').indexOf(ym)===0; });
if(!monthEntries.length){ ledgerErr('이번 달 기록이 없어요'); return; }
var byCat={}, total=0; monthEntries.forEach(function(e){ byCat[e.cat]=(byCat[e.cat]||0)+e.amount; total+=e.amount; });
var summary='이번 달 총 지출: '+total+'원\n카테고리별: '+Object.keys(byCat).map(function(c){return c+' '+byCat[c]+'원';}).join(', ');
var btn=document.getElementById('ledger-ai-btn'); var old=btn.textContent; btn.textContent='⏳ 분석 중...'; btn.disabled=true;
var er=document.getElementById('ledger-err'); if(er) er.style.display='none';
var sys='너는 친절한 가계부 분석가야. 이번 달 지출 요약을 보고 한국어로 (1) 지출 패턴 한두 줄 요약, (2) 가장 큰 비중과 눈에 띄는 점, (3) 부담 없이 실천할 절약 팁 2~3개를 따뜻하게 알려줘. 잔소리하지 말고 격려하는 톤으로 짧게.';
callAI({ system:sys, messages:[{role:'user',content:summary}], maxTokens:900 },
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('ledger-ai').textContent=txt||'(분석 결과 없음)'; document.getElementById('ledger-ai-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; ledgerErr((e&&e.message)||'분석 실패'); }
);
}
var labelType='식품', labelConcerns=[], labelImgB64=null, labelImgMime='';
function openLabel(){
labelType='식품'; labelConcerns=[]; labelImgB64=null; labelImgMime='';
var pw=document.getElementById('label-preview-wrap'); if(pw) pw.style.display='none';
var ua=document.getElementById('label-upload'); if(ua) ua.style.display='block';
var rw=document.getElementById('label-result-wrap'); if(rw) rw.style.display='none';
var er=document.getElementById('label-err'); if(er) er.style.display='none';
var fi=document.getElementById('label-file'); if(fi) fi.value='';
syncChips('#label-type', labelType);
var cc=document.querySelectorAll('#label-concern .study-chip'); for(var i=0;i<cc.length;i++) cc[i].classList.remove('on');
document.getElementById('label-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeLabel(){ document.getElementById('label-bg').style.display='none'; history.pushState({p:true},'',''); }
function onLabelImage(e){ var f=e.target.files[0]; if(!f) return; var r=new FileReader(); r.onload=function(ev){ labelImgB64=ev.target.result.split(',')[1]; labelImgMime=f.type||'image/jpeg'; document.getElementById('label-preview').src=ev.target.result; document.getElementById('label-preview-wrap').style.display='block'; document.getElementById('label-upload').style.display='none'; }; r.readAsDataURL(f); }
function clearLabelImage(){ labelImgB64=null; labelImgMime=''; document.getElementById('label-preview-wrap').style.display='none'; document.getElementById('label-upload').style.display='block'; var fi=document.getElementById('label-file'); if(fi) fi.value=''; }
function selLabelType(el,v){ labelType=v; var p=el.parentNode.querySelectorAll('.study-chip'); for(var i=0;i<p.length;i++)p[i].classList.remove('on'); el.classList.add('on'); }
function toggleLabelConcern(el,v){ var i=labelConcerns.indexOf(v); if(i>=0){ labelConcerns.splice(i,1); el.classList.remove('on'); } else { labelConcerns.push(v); el.classList.add('on'); } }
function labelErr(m){ var e=document.getElementById('label-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function copyLabel(){ var t=document.getElementById('label-result').textContent; if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ showToast('📋 복사됐어','linear-gradient(135deg,#fb7185,#e11d48)'); }); }
function labelSystem(){
var base;
if(labelType==='화장품') base='너는 화장품 성분 분석가야. 사진 속 화장품 전성분을 읽고 한국어로 주요 성분의 역할, 자극·알레르기 유발 가능 성분이나 논란 성분 여부, 비건/동물성 성분 여부를 알기 쉽게 설명해줘. 단정적 안전성 판단은 피하고 피부 타입에 따라 다를 수 있음을 알려줘.';
else if(labelType==='영양제') base='너는 영양제 라벨 분석가야. 사진 속 영양제 라벨을 읽고 한국어로 주성분과 역할, 함량 표기, 주의사항(과다섭취·약물 상호작용 가능성)을 설명해줘. 복용·의학적 판단은 의사·약사 상담을 권해줘.';
else base='너는 식품 라벨 분석가야. 사진 속 식품 성분표를 읽고 한국어로 주요 성분을 쉽게 설명하고, 알레르기 유발 가능 성분과 첨가물(보존료·색소·감미료 등)의 의미, 해당되면 비건/채식 여부를 알려줘.';
if(labelConcerns.length) base += ' 특히 다음을 중점적으로 봐줘: '+labelConcerns.join(', ')+'.';
base += ' 마지막에 한 줄 안내를 덧붙여: "정확한 알레르기·의학적 판단은 제품 표기와 전문가 확인이 필요해요." 단정적으로 안전하다고 말하지 마.';
return base;
}
function runLabel(){
if(!labelImgB64){ labelErr('라벨/성분표 사진을 올려줘'); return; }
if(!hasVisionKey()){ visionGuideInto('label-result-wrap','label-result'); return; }
var btn=document.getElementById('label-go'); var old=btn.textContent; btn.textContent='⏳ 분석 중...'; btn.disabled=true;
var er=document.getElementById('label-err'); if(er) er.style.display='none';
studyVision(labelSystem()+'\n\n이 라벨/성분표를 분석해줘.', labelImgB64, labelImgMime,
function(txt){ btn.textContent=old; btn.disabled=false; document.getElementById('label-result').textContent=txt||'(성분을 못 읽었어요)'; document.getElementById('label-result-wrap').style.display='block'; },
function(e){ btn.textContent=old; btn.disabled=false; labelErr((e&&e.message)||'오류가 발생했어요'); }
);
}
var seniorLastAnswer='';
window._stt={listening:false, target:'senior-q', mic:'senior-mic', idle:'&#127908; 음성으로 말하기'};
window._sttAutoRun=null;
var _webSR=null;
function sttHasNative(){ return !!(window.Android && typeof window.Android.startListening==='function'); }
function sttResetMic(){ var mb=document.getElementById(window._stt.mic); if(mb){ mb.innerHTML=window._stt.idle; } window._stt.listening=false; }
window.onSttResult=function(text){ var el=document.getElementById(window._stt.target); if(el && text){ el.value=text; } };
window.onSttError=function(msg){ window._sttAutoRun=null; sttResetMic(); if(msg){ showToast(msg,'rgba(0,0,0,.85)'); } };
var STT_MAX_MS=20000;
var STT_AUTORUN_MS=150;
var STT_SILENCE_MS=1000;
var CHAIN_MAX_MS=20000;
var _sttMaxTimer=null, _sttSilenceTimer=null, _sttAborted=false;
function _sttClearTimers(){ if(_sttMaxTimer){clearTimeout(_sttMaxTimer);_sttMaxTimer=null;} if(_sttSilenceTimer){clearInterval(_sttSilenceTimer);_sttSilenceTimer=null;} }
window.onSttEnd=function(){ _sttClearTimers(); sttResetMic(); var el=document.getElementById(window._stt.target); if(window._sttAutoRun && el && el.value && el.value.trim()){ var fn=window._sttAutoRun; window._sttAutoRun=null; setTimeout(fn,STT_AUTORUN_MS); } };
function sttStart(targetId, micId, idleHtml, listeningHtml, autoRunFn){
if(window._stt.listening){ sttStop(); return; }
_sttClearTimers(); _sttAborted=false;
window._sttAutoRun=autoRunFn||null;
window._stt.target=targetId; window._stt.mic=micId; window._stt.idle=idleHtml;
var mb=document.getElementById(micId);
if(sttHasNative()){
try{
window.Android.startListening(); window._stt.listening=true; if(mb) mb.innerHTML=listeningHtml;
_sttMaxTimer=setTimeout(function(){ try{ if(window.Android && window.Android.stopListening) window.Android.stopListening(); }catch(e){} }, STT_MAX_MS);
}
catch(e){ sttResetMic(); showToast('음성 입력을 시작할 수 없어요.','rgba(0,0,0,.85)'); }
return;
}
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){ showToast('이 기기는 음성 입력을 지원하지 않아요. 글로 적어 주세요.','rgba(0,0,0,.85)'); return; }
var sr; try{ sr=new SR(); }catch(e){ sttResetMic(); showToast('음성 입력을 시작할 수 없어요.','rgba(0,0,0,.85)'); return; }
_webSR=sr;
sr.lang='ko-KR'; sr.continuous=false; sr.interimResults=true; sr.maxAlternatives=1;
if(mb) mb.innerHTML=listeningHtml; window._stt.listening=true;
var elT=document.getElementById(targetId);
var _last=Date.now(), _spoke=false, _done=false;
sr.onresult=function(ev){
var r=ev.results[ev.results.length-1];
var txt=((r && r[0] && r[0].transcript) || '').replace(/\s+/g,' ').trim();
if(txt){ _spoke=true; _last=Date.now(); if(elT) elT.value=txt; }
};
sr.onerror=function(ev){ if(ev && (ev.error==='not-allowed'||ev.error==='service-not-allowed')){ _sttAborted=true; try{sr.stop();}catch(e){} } };
sr.onend=function(){
_sttClearTimers(); _webSR=null; sttResetMic();
var val=elT?(elT.value||'').replace(/\s+/g,' ').trim():'';
if(!_sttAborted && window._sttAutoRun && val){ var fn=window._sttAutoRun; window._sttAutoRun=null; setTimeout(fn,STT_AUTORUN_MS); }
else { window._sttAutoRun=null; }
};
_sttSilenceTimer=setInterval(function(){
if(_done) return;
if(_spoke && (Date.now()-_last)>=STT_SILENCE_MS){ _done=true; try{ sr.stop(); }catch(e){} }
}, 150);
_sttMaxTimer=setTimeout(function(){ _done=true; try{ sr.stop(); }catch(e){} }, CHAIN_MAX_MS);
try{ sr.start(); }catch(e){ _sttClearTimers(); sttResetMic(); showToast('음성 입력을 시작할 수 없어요.','rgba(0,0,0,.85)'); }
}
function sttStop(){
_sttClearTimers(); _sttAborted=true;
try{ if(window.Android && window.Android.stopListening) window.Android.stopListening(); }catch(e){}
if(_webSR){ try{_webSR.stop();}catch(e){} _webSR=null; }
window._sttAutoRun=null;
sttResetMic();
}
function speakKo(text){
if(!text) return;
var clean=String(text).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu,'').replace(/[#*_`>~]/g,'').replace(/\s+/g,' ').trim();
if(!clean) return;
if(window.Android && typeof window.Android.speak==='function'){ try{ window.Android.speak(clean); return; }catch(e){} }
if(!ttsSupported()) return;
try{
window.speechSynthesis.cancel();
var u=new SpeechSynthesisUtterance(clean);
u.lang='ko-KR'; u.rate=0.9; u.pitch=1.0;
var vs=window.speechSynthesis.getVoices()||[];
for(var i=0;i<vs.length;i++){ if(vs[i].lang && vs[i].lang.toLowerCase().indexOf('ko')===0){ u.voice=vs[i]; break; } }
window.speechSynthesis.speak(u);
}catch(e){}
}
function openSenior(){
var q=document.getElementById('senior-q'); if(q) q.value='';
var aw=document.getElementById('senior-answer-wrap'); if(aw) aw.style.display='none';
var er=document.getElementById('senior-err'); if(er) er.style.display='none';
seniorLastAnswer='';
document.getElementById('senior-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeSenior(){ try{ window.speechSynthesis.cancel(); }catch(e){} try{ if(window.Android && window.Android.stopSpeak) window.Android.stopSpeak(); }catch(e){} sttStop(); document.getElementById('senior-bg').style.display='none'; history.pushState({p:true},'',''); }
function seniorErr(m){ var e=document.getElementById('senior-err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function seniorMic(){ sttStart('senior-q','senior-mic','&#127908; 음성으로 말하기','&#9210; 듣는 중... (탭하면 멈춤)'); }
function speakSeniorAgain(){ if(seniorLastAnswer) speakKo(seniorLastAnswer); }
function runSenior(){
var q=(document.getElementById('senior-q').value||'').trim();
if(!q){ seniorErr('궁금한 것을 말씀하시거나 적어 주세요.'); return; }
if(!hasAIKey()){ seniorErr(getNoKeyMsg().replace(/\n/g,' ')); return; }
var btn=document.getElementById('senior-go'); var old=btn.innerHTML; btn.innerHTML='&#9203; 답하는 중...'; btn.disabled=true;
var er=document.getElementById('senior-err'); if(er) er.style.display='none';
var sys='너는 어르신을 돕는 친절한 도우미야. 아주 쉽고 짧은 한국어 존댓말로, 천천히 또박또박 설명하듯 답해 주세요. 어려운 용어나 영어는 풀어서 쉽게, 한 번에 너무 많이 말하지 말고 핵심만 3~4문장으로. 따뜻하고 공손하게, 어려운 약어나 기호는 쓰지 마.';
callAI({ system:sys, messages:[{role:'user',content:q}], maxTokens:700 },
function(txt){ btn.innerHTML=old; btn.disabled=false; var a=txt||'잘 못 알아들었어요. 다시 한 번 말씀해 주세요.'; seniorLastAnswer=a; document.getElementById('senior-answer').textContent=a; document.getElementById('senior-answer-wrap').style.display='block'; speakKo(a); },
function(e){ btn.innerHTML=old; btn.disabled=false; seniorErr((e&&e.message)||'잠시 문제가 생겼어요. 다시 해 주세요.'); }
);
}
var ROUTES=[
{ id:'google',   label:'구글 검색',   hint:'일반 정보 검색',            url:'https://www.google.com/search?q={q}' },
{ id:'navsearch',label:'네이버 검색', hint:'그 외(기본)',               url:'https://search.naver.com/search.naver?query={q}' },
{ id:'daum',     label:'다음 검색',   hint:'다음 검색',                 url:'https://search.daum.net/search?q={q}' },
{ id:'navnews',  label:'네이버 뉴스', hint:'뉴스',                      url:'https://search.naver.com/search.naver?where=news&query={q}' },
{ id:'wiki',     label:'위키백과',    hint:'위키백과 정보/인물/용어',    url:'https://ko.wikipedia.org/w/index.php?search={q}' },
{ id:'chatgpt',  label:'ChatGPT',     hint:'ChatGPT에게 질문',          url:'https://chatgpt.com/?q={q}' },
{ id:'weather',  label:'날씨',        hint:'날씨 (지역명)',             url:'https://search.naver.com/search.naver?query={q}%20%EB%82%A0%EC%94%A8' },
{ id:'navi',     label:'내비 길안내', hint:'길안내/내비/가는길/길찾기/운전/어떻게 가/데려다 (목적지)', url:'https://www.google.com/maps/dir/?api=1&destination={q}&travelmode=driving' },
{ id:'papago',   label:'파파고 번역', hint:'파파고 번역',               url:'https://papago.naver.com/?sk=ko&tk=en&st={q}' },
{ id:'gtrans',   label:'구글 번역',   hint:'구글 번역',                 url:'https://translate.google.com/?sl=auto&tl=ko&text={q}' },
{ id:'youtube',  label:'유튜브',      hint:'영상 보기/틀기/검색',        url:'https://www.youtube.com/results?search_query={q}' },
{ id:'netflix',  label:'넷플릭스',    hint:'넷플릭스 영화/드라마',       url:'https://www.netflix.com/search?q={q}' },
{ id:'tving',    label:'티빙',        hint:'티빙 작품',                 url:'https://www.tving.com/search/all?keyword={q}' },
{ id:'wavve',    label:'웨이브',      hint:'웨이브 작품',               url:'https://www.wavve.com/search?searchWord={q}' },
{ id:'watcha',   label:'왓챠',        hint:'왓챠 작품',                 url:'https://watcha.com/search?query={q}' },
{ id:'disneyplus',label:'디즈니+',    hint:'디즈니플러스 작품',          url:'https://www.disneyplus.com/search?q={q}' },
{ id:'ytmusic',  label:'유튜브뮤직',  hint:'음악/노래 틀기',             url:'https://music.youtube.com/search?q={q}' },
{ id:'melon',    label:'멜론',        hint:'멜론 음악',                 url:'https://www.melon.com/search/total/index.htm?q={q}' },
{ id:'spotify',  label:'스포티파이',  hint:'스포티파이 음악',            url:'https://open.spotify.com/search/{q}' },
{ id:'genie',    label:'지니뮤직',    hint:'지니뮤직 음악',             url:'https://www.genie.co.kr/search/searchMain?query={q}' },
{ id:'navwebtoon',label:'네이버웹툰', hint:'네이버웹툰 작품',            url:'https://comic.naver.com/search?keyword={q}' },
{ id:'kakaopage',label:'카카오페이지',hint:'카카오페이지 웹툰/웹소설',   url:'https://page.kakao.com/search?keyword={q}' },
{ id:'lezhin',   label:'레진',        hint:'레진 웹툰',                 url:'https://www.lezhin.com/ko/search?q={q}' },
{ id:'navshop',  label:'네이버쇼핑',  hint:'네이버쇼핑 상품',            url:'https://search.shopping.naver.com/search/all?query={q}' },
{ id:'coupang',  label:'쿠팡',        hint:'쿠팡 상품/배송',             url:'https://www.coupang.com/np/search/products?q={q}' },
{ id:'st11',     label:'11번가',      hint:'11번가 상품',               url:'https://search.11st.co.kr/Search.tmall?kwd={q}' },
{ id:'gmarket',  label:'G마켓',       hint:'G마켓 상품',                url:'https://browse.gmarket.co.kr/search?keyword={q}' },
{ id:'musinsa',  label:'무신사',      hint:'무신사 패션/의류',           url:'https://www.musinsa.com/search/musinsa/integration?q={q}' },
{ id:'oliveyoung',label:'올리브영',   hint:'올리브영 화장품',            url:'https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query={q}' },
{ id:'daangn',   label:'당근마켓',    hint:'당근마켓 중고거래',          url:'https://www.daangn.com/search/{q}' },
{ id:'navmap',   label:'네이버지도',  hint:'네이버지도 장소/주변/맛집',  url:'https://map.naver.com/p/search/{q}' },
{ id:'kakaomap', label:'카카오맵',    hint:'카카오맵 장소/길찾기',       url:'https://map.kakao.com/?q={q}' },
{ id:'gmap',     label:'구글지도',    hint:'구글지도 장소',             url:'https://www.google.com/maps/search/{q}' },
{ id:'x',        label:'X(트위터)',   hint:'X(트위터) 글 검색',          url:'https://x.com/search?q={q}' },
{ id:'facebook', label:'페이스북',    hint:'페이스북 검색',             url:'https://www.facebook.com/search/top?q={q}' },
{ id:'gmail',    label:'Gmail',       hint:'Gmail 메일 검색',           url:'https://mail.google.com/mail/u/0/#search/{q}' },
{ id:'kakaotalk',label:'카카오톡',   hint:'카카오톡 앱 열기',  url:'https://play.google.com/store/apps/details?id=com.kakao.talk',     deep:'intent://#Intent;scheme=kakaotalk;package=com.kakao.talk;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.kakao.talk;end' },
{ id:'toss',     label:'토스',       hint:'토스 앱 열기(송금·금융)',  url:'https://play.google.com/store/apps/details?id=viva.republica.toss', deep:'intent://#Intent;scheme=supertoss;package=viva.republica.toss;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dviva.republica.toss;end' },
{ id:'baemin',   label:'배달의민족', hint:'배달의민족 앱 열기(배달 주문)', url:'https://play.google.com/store/apps/details?id=com.sampleapp',       deep:'intent://#Intent;scheme=baemin;package=com.sampleapp;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.sampleapp;end' },
{ id:'insta',    label:'인스타그램', hint:'인스타그램 앱 열기',  url:'https://www.instagram.com/',                                        deep:'intent://#Intent;scheme=instagram;package=com.instagram.android;S.browser_fallback_url=https%3A%2F%2Fwww.instagram.com%2F;end' },
{ id:'yogiyo',   label:'요기요',     hint:'요기요 배달(홈 열기)',     url:'https://www.yogiyo.co.kr/mobile/' },
{ id:'coupangeats',label:'쿠팡이츠', hint:'쿠팡이츠 배달(홈 열기)',   url:'https://www.coupangeats.com/' },
{ id:'phone',    label:'전화',       hint:'전화 걸기 (q=상대 이름/번호, 예: 엄마한테 전화)', native:'call' },
{ id:'sms',      label:'문자',       hint:'문자 보내기 (q=상대 이름/번호)', native:'sms' }
];
var voiceActUrl='', voiceActDeep='', voiceActText='', voiceActNative='', voiceActQuery='', voiceActRouteId='';
function _ptNorm(s){ return String(s||'').toLowerCase().replace(/[\s\.\,\!\?~·\-_'"()\[\]#방]/g,''); }
function _ptBigrams(s){ s=_ptNorm(s); var o={}; if(s.length<2){ if(s) o[s]=1; return o; } for(var i=0;i<s.length-1;i++){ o[s.substr(i,2)]=1; } return o; }
function _ptDice(a,b){ var A=_ptBigrams(a),B=_ptBigrams(b),ka=Object.keys(A),kb=Object.keys(B); if(!ka.length||!kb.length) return 0; var n=0; for(var i=0;i<ka.length;i++){ if(B[ka[i]]) n++; } return 2*n/(ka.length+kb.length); }
function podotalkRooms(){ try{ var a=JSON.parse(localStorage.getItem('pododa_talk_rooms')||'[]'); return Array.isArray(a)?a:[]; }catch(e){ return []; } }
var PT_KW=/포도톡|포톡|포도\s*톡|podotalk|potalk|포토크|톡방|채팅방|오픈\s*채팅|일반\s*채팅|대화방|단톡|채팅\s*방|톡\s*열/i;
function podotalkIntent(t){
t=String(t||''); var rooms=podotalkRooms(); if(!rooms.length) return null;
var hasKw=PT_KW.test(t);
var head=t.split(/메시지\s*[:：]|라고|보내|전송|입력해|톡\s*해/)[0];
var mRoom=head.match(/([가-힣A-Za-z0-9][가-힣A-Za-z0-9&\s]*?)\s*방(?:에|으로|에서|을|를|\s|$)/);
var cand = mRoom ? mRoom[1] : head;
cand = cand.replace(/포도톡|포톡|podotalk|potalk|포토크|오픈\s*채팅|일반\s*채팅|채팅방|대화방|단톡방?|톡방|열어|들어가|입장|접속|이동|바로가기|바로|해\s*줘?|줘|좀/gi,' ').replace(/\s+/g,' ').trim();
if(!cand) cand=head.replace(/\s+/g,' ').trim();
var nq=_ptNorm(cand);
if(!hasKw && nq.length<2) return null;
var best=null,score=0;
for(var i=0;i<rooms.length;i++){
var nm=_ptNorm(rooms[i].name); if(!nm) continue;
var s=Math.max(_ptDice(cand, rooms[i].name), _ptDice(head, rooms[i].name));
if(nq && (nm.indexOf(nq)>=0 || nq.indexOf(nm)>=0)) s=Math.max(s,0.95);
if(s>score){ score=s; best=rooms[i]; }
}
if(!best) return null;
var thr = hasKw ? 0.28 : 0.5;
return score>=thr ? best : null;
}
function goPodotalk(room, msg, ctx){ if(!room||!room.id) return; try{ window._vansActive=false; }catch(e){}
var autosend=!!(ctx && ctx.inQueue && msg);
var cont=!!(ctx && ctx.hasNext);
try{ if(msg){ localStorage.setItem('pododa_talk_prefill', JSON.stringify({id:room.id, text:String(msg), autosend:autosend, cont:cont})); } }catch(e){}
var u='pododa.html#/talk/room/'+room.id; try{ location.assign(u); }catch(e){ location.href=u; } }
function podotalkMsg(t){
t=String(t||'');
var m=t.match(/메시지\s*[:：]\s*(.+)$/); if(m) return m[1].trim();
m=t.match(/["'“”](.+?)["'“”]/); if(m) return m[1].trim();
m=t.match(/(?:방에|에게|한테|에)\s+([\s\S]+?)\s*(?:라고|이라고)?\s*(?:말해|말하|얘기|이야기|전해|전달|알려|보내|전송|톡\s*해|톡해|메시지)/);
if(m && m[1]){
var s=m[1].trim();
s=s.replace(/\s+(?:라고|이라고|하고|다고|고)$/,'');
s=s.replace(/([가-힣])고$/,'$1');
if(s) return s;
}
return '';
}
function goPodotalkOpen(){ try{ window._vansActive=false; }catch(e){} var u='pododa.html#/talk/open'; try{ location.assign(u); }catch(e){ location.href=u; } }
function podotalkEnsureRoom(name){
var rooms=[]; try{ rooms=JSON.parse(localStorage.getItem('pododa_talk_rooms')||'[]'); }catch(e){ rooms=[]; }
if(!Array.isArray(rooms)) rooms=[];
var t=String(name||'나').trim(), key=t.replace(/\s/g,'');
for(var i=0;i<rooms.length;i++){ var rn=String(rooms[i].name||'').trim(); if(rn===t || rn.replace(/\s/g,'')===key){ return rooms[i].id; } }
var id='self_'+Date.now();
rooms.push({ id:id, type:'dm', name:t, emoji:'📰', sub:'1:1 · 내 메모', noti:true, ts:Date.now() });
try{ localStorage.setItem('pododa_talk_rooms', JSON.stringify(rooms)); }catch(e){}
return id;
}
function podotalkPushMsg(roomId, text, fromName){
var k='pododa_talk_msg_'+roomId, arr=[];
try{ arr=JSON.parse(localStorage.getItem(k)||'[]'); }catch(e){ arr=[]; }
if(!Array.isArray(arr)) arr=[];
arr.push({ who:'them', name:(fromName||'📰 브리핑'), avatar:'📰', text:String(text||''), ts:Date.now() });
try{ localStorage.setItem(k, JSON.stringify(arr)); }catch(e){}
}
function briefsAll(){
var arr=null; try{ arr=JSON.parse(localStorage.getItem('podoai_briefs')||'null'); }catch(e){}
if(Array.isArray(arr)) return arr;
var mig=[]; try{ var old=JSON.parse(localStorage.getItem('podoai_econbrief')||'null'); if(old&&typeof old==='object'){ mig.push({ id:'econ', name:'📈 아침 경제 브리핑', prompt:'한국 경제(코스피·코스닥·원/달러 환율)와 미국 증시(S&P500·나스닥·다우)의 오늘 핵심을 간단히 요약', room:old.room||'나', hh:(old.hh|0)||6, mm:(old.mm|0)||30, on:!!old.on, last:old.last||'' }); } }catch(e){}
if(!mig.length){ mig=[{ id:'econ', name:'📈 아침 경제 브리핑', prompt:'한국 경제(코스피·코스닥·원/달러 환율)와 미국 증시(S&P500·나스닥·다우)의 오늘 핵심을 간단히 요약', room:'나', hh:6, mm:30, on:false, last:'' }]; }
saveBriefs(mig); return mig;
}
function saveBriefs(arr){ try{ localStorage.setItem('podoai_briefs', JSON.stringify(arr||[])); }catch(e){} try{ syncBriefAlarms(); }catch(e){} }
function briefGet(id){ var a=briefsAll(); for(var i=0;i<a.length;i++){ if(a[i].id===id) return a[i]; } return null; }
function briefFetch(topicPrompt, onDone, onErr){
if(typeof apiKey==='undefined' || !apiKey){ onErr(new Error('브리핑 생성은 Claude API 키가 필요해요 (마이 탭 → Claude API 키)')); return; }
var today=new Date(); var ds=today.getFullYear()+'년 '+(today.getMonth()+1)+'월 '+today.getDate()+'일';
var sys='너는 한국어 브리핑 에디터야. 아래 [요청] 주제를 web_search로 오늘('+ds+') 최신 정보를 확인해서 한눈에 보이게 정리해.\n'+
    '형식(그대로 · 마크다운 별표 금지 · 각 항목 사이에는 반드시 빈 줄 한 개):\n'+
    '📌 '+ds+' · <주제 제목>\n\n'+
    '▪ <핵심 소식 1 — 한 줄, 15~45자>\n\n'+
    '▪ <핵심 소식 2>\n\n'+
    '▪ <핵심 소식 3>\n\n'+
    '▪ <핵심 소식 4>\n\n'+
    '💡 <한 줄 코멘트/전망>\n'+
    '규칙: 각 ▪ 항목은 반드시 한 줄로 짧게(길게 늘어놓지 말 것). 항목 사이에는 빈 줄 한 개. 핵심만 3~6개. 최신 실제 정보만, 추측·과장·허위 금지, 확인 안 되면 "확인중". 숫자·고유명사 정확히. 전체 700자 이내. 한국어.';
fetch('https://api.anthropic.com/v1/messages',{
method:'POST',
headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
body:JSON.stringify({
model:'claude-sonnet-4-6', max_tokens:1600, system:sys,
messages:[{role:'user', content:'[요청] '+topicPrompt+'\n\n오늘 최신 정보를 web_search로 확인해서 위 형식대로 브리핑을 만들어줘.'}],
tools:[{type:'web_search_20250305', name:'web_search', max_uses:5}]
})
}).then(function(r){return r.json();}).then(function(d){
if(d.error) throw new Error(d.error.message||'API 오류');
var text=(d.content||[]).map(function(b){ return (b && b.type==='text')?(b.text||''):''; }).join('').trim();
if(!text) throw new Error('브리핑 내용을 못 만들었어요');
onDone(text);
}).catch(onErr);
}
function briefRun(id, manual){
var b=briefGet(id); if(!b) return;
if(manual){ try{ toast('📝 "'+b.name+'" 생성 중… (웹검색, 20초쯤)'); }catch(e){} }
var btn=document.getElementById('briefnow-'+id); if(btn){ btn.disabled=true; btn.textContent='⏳ 생성 중…'; }
briefFetch(b.prompt, function(text){
text=(text||'').replace(/\r/g,'').replace(/[ \t]+\n/g,'\n')
.replace(/\n\s*(▪|•|●|·)\s*/g,'\n\n▪ ')
.replace(/\n\s*(💡)/g,'\n\n💡 ')
.replace(/\n{3,}/g,'\n\n').trim();
var rid=podotalkEnsureRoom(b.room||'나');
podotalkPushMsg(rid, text, b.name||'📰 브리핑');
if(btn){ btn.disabled=false; btn.textContent='▶ 지금 받기'; }
if(manual){ try{ toast('✅ 포도톡 "'+(b.room||'나')+'" 방에 보냈어요'); }catch(e){} }
try{ if(window.Android && window.Android.notify) window.Android.notify(b.name||'브리핑', '포도톡 '+(b.room||'나')+' 방에 도착'); }catch(e){}
}, function(err){
if(btn){ btn.disabled=false; btn.textContent='▶ 지금 받기'; }
if(manual){ try{ toast('실패: '+((err&&err.message)||'')); }catch(e){} }
});
}
function briefsCheck(){
var a=briefsAll(), now=new Date();
var today=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
var mins=now.getHours()*60+now.getMinutes(), changed=false;
for(var i=0;i<a.length;i++){ var b=a[i];
if(!b.on || b.last===today) continue;
if(mins < ((b.hh|0)*60+(b.mm|0))) continue;
b.last=today; changed=true; briefRun(b.id, false);
}
if(changed) saveBriefs(a);
}
function briefToggle(id, on){ var a=briefsAll(); for(var i=0;i<a.length;i++){ if(a[i].id===id){ a[i].on=!!on; if(on) a[i].last=''; } } saveBriefs(a); renderBriefsCard(); if(on) setTimeout(briefsCheck,400); }
function briefDelete(id){ if(!confirm('이 브리핑을 삭제할까요?')) return; var a=briefsAll().filter(function(b){ return b.id!==id; }); saveBriefs(a); renderBriefsCard(); }
function renderBriefsCard(hostEl){
var host=hostEl||document.getElementById('econbrief-card'); if(!host) return;
var a=briefsAll(), rows='';
a.forEach(function(b){
var tt=('0'+(b.hh|0)).slice(-2)+':'+('0'+(b.mm|0)).slice(-2);
var pv=(b.prompt||''); if(pv.length>52) pv=pv.slice(0,52)+'…';
rows+='<div style="background:#fff;border:1px solid #e5e9f2;border-radius:13px;padding:10px 11px;margin-top:8px">'
+'<div style="display:flex;align-items:center;gap:6px">'
+'<span style="font-size:13.5px;font-weight:800;color:#1f2937;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+_agentEsc(b.name||'브리핑')+'</span>'
+'<label style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:800;color:'+(b.on?'#2563eb':'#9aa3b2')+';cursor:pointer"><input type="checkbox" '+(b.on?'checked':'')+' onchange="briefToggle(\''+b.id+'\',this.checked)" style="width:16px;height:16px;accent-color:#2563eb">'+(b.on?'ON':'OFF')+'</label>'
+'</div>'
+'<div style="font-size:11px;color:#6b7688;margin:3px 0 8px;line-height:1.45">매일 '+tt+' → 포도톡 "'+_agentEsc(b.room||'나')+'" 방<br>'+_agentEsc(pv)+'</div>'
+'<div style="display:flex;gap:6px">'
+'<button id="briefnow-'+b.id+'" onclick="briefRun(\''+b.id+'\',true)" style="flex:2;padding:9px 4px;border-radius:9px;border:none;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit">▶ 지금 받기</button>'
+'<button onclick="briefOpenForm(\''+b.id+'\')" style="flex:1;padding:9px 4px;border-radius:9px;border:1.5px solid #cbd5e1;background:#fff;color:#475569;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit">✏️ 수정</button>'
+'<button onclick="briefDelete(\''+b.id+'\')" style="padding:9px 10px;border-radius:9px;border:1.5px solid #fecaca;background:#fff;color:#dc2626;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit">🗑</button>'
+'</div></div>';
});
host.innerHTML=
    '<div style="background:linear-gradient(135deg,#eef6ff,#e6f0ff);border:1.5px solid rgba(37,99,235,.28);border-radius:18px;padding:13px 14px;box-shadow:0 4px 18px rgba(37,99,235,.12)">'
+'<div style="display:flex;align-items:center;gap:6px"><span style="font-size:16px;font-weight:900;color:#1d4ed8">📰 예약 브리핑</span>'
+'<span style="margin-left:auto;font-size:10.5px;color:#7b8aa5">매일 원하는 소식 자동 요약</span></div>'
+'<div style="font-size:11px;color:#5b6b86;margin:3px 0 2px">정치·경제·사회·문화·스포츠 등 원하는 주제를 적어두면, 매일 그 시각에 최신 소식을 요약해 포도톡으로 보내드려요.</div>'
+rows
+'<button onclick="briefOpenForm(\'\')" style="width:100%;margin-top:9px;padding:11px;border-radius:12px;border:2px dashed #93c5fd;background:rgba(255,255,255,.6);color:#1d4ed8;font-size:13.5px;font-weight:800;cursor:pointer;font-family:inherit">➕ 새 브리핑 만들기</button>'
+'<div style="font-size:10px;color:#94a3b8;margin-top:7px;line-height:1.5">💡 앱이 켜져 있을 때 지정 시각에 발송(꺼져 있었으면 그날 첫 실행 시 1회). 완전 백그라운드는 APK 알림 필요.</div>'
+'</div>';
}
function briefFill(name, prompt){ var n=document.getElementById('bf-name'), p=document.getElementById('bf-prompt'); if(n && !n.value.trim()) n.value=name; if(p) p.value=prompt; }
function briefOpenForm(id){
var b=id?briefGet(id):null;
var ex=document.getElementById('brief-form-ov'); if(ex) ex.remove();
var ov=document.createElement('div'); ov.id='brief-form-ov';
ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px';
var tt=b?(('0'+(b.hh|0)).slice(-2)+':'+('0'+(b.mm|0)).slice(-2)):'07:00';
ov.innerHTML='<div style="background:#fff;border-radius:18px;padding:16px;width:100%;max-width:360px;box-shadow:0 12px 40px rgba(0,0,0,.3);max-height:88vh;overflow:auto">'
+'<div style="font-size:16px;font-weight:900;color:#1d4ed8;margin-bottom:12px">'+(b?'✏️ 브리핑 수정':'➕ 새 브리핑 만들기')+'</div>'
+'<div style="font-size:11.5px;font-weight:800;color:#475569;margin-bottom:4px">이름</div>'
+'<input id="bf-name" value="'+_agentEsc(b?b.name:'')+'" placeholder="예: 정치 이슈 요약" style="width:100%;box-sizing:border-box;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:14px;font-family:inherit;margin-bottom:10px">'
+'<div style="font-size:11.5px;font-weight:800;color:#475569;margin-bottom:4px">받고 싶은 내용(주제)</div>'
+'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">'
+'<button type="button" onclick="briefFill(\'정치 이슈\',\'대한민국 정치 상황과 주요 이슈·사건·논쟁 소식을 간단히 요약\')" style="padding:6px 11px;border-radius:20px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">🏛️ 정치</button>'
+'<button type="button" onclick="briefFill(\'경제 브리핑\',\'한국 경제(코스피·코스닥·원/달러 환율)와 미국 증시의 오늘 핵심을 간단히 요약\')" style="padding:6px 11px;border-radius:20px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">📈 경제</button>'
+'<button type="button" onclick="briefFill(\'사회 이슈\',\'오늘 대한민국 주요 사회 이슈·사건·사고 소식을 간단히 요약\')" style="padding:6px 11px;border-radius:20px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">👥 사회</button>'
+'<button type="button" onclick="briefFill(\'문화·연예\',\'오늘 문화·연예·방송 주요 소식을 간단히 요약\')" style="padding:6px 11px;border-radius:20px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">🎬 문화</button>'
+'<button type="button" onclick="briefFill(\'스포츠 소식\',\'오늘 국내외 주요 스포츠 경기 결과와 이슈를 간단히 요약\')" style="padding:6px 11px;border-radius:20px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">⚽ 스포츠</button>'
+'<button type="button" onclick="briefFill(\'오늘 날씨\',\'오늘 내 지역 날씨·기온·미세먼지와 옷차림 팁을 간단히\')" style="padding:6px 11px;border-radius:20px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">🌤️ 날씨</button>'
+'<button type="button" onclick="briefFill(\'IT·테크\',\'오늘 국내외 IT·테크·AI 주요 뉴스를 간단히 요약\')" style="padding:6px 11px;border-radius:20px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">💻 IT</button>'
+'</div>'
+'<textarea id="bf-prompt" rows="3" placeholder="위 버튼을 누르거나 직접 적어주세요 (예: 대한민국 정치 상황과 주요 이슈·사건 소식을 간단히 요약)" style="width:100%;box-sizing:border-box;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:14px;font-family:inherit;margin-bottom:10px;resize:vertical">'+_agentEsc(b?b.prompt:'')+'</textarea>'
+'<div style="display:flex;gap:8px;margin-bottom:12px">'
+'<div style="flex:2"><div style="font-size:11.5px;font-weight:800;color:#475569;margin-bottom:4px">포도톡 방 이름</div>'
+'<input id="bf-room" value="'+_agentEsc(b?b.room:'나')+'" placeholder="나" style="width:100%;box-sizing:border-box;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:14px;font-family:inherit"></div>'
+'<div style="flex:1"><div style="font-size:11.5px;font-weight:800;color:#475569;margin-bottom:4px">시각</div>'
+'<input id="bf-time" value="'+tt+'" placeholder="07:00" style="width:100%;box-sizing:border-box;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:14px;font-family:inherit;text-align:center"></div>'
+'</div>'
+'<div style="display:flex;gap:8px">'
+'<button onclick="var o=document.getElementById(\'brief-form-ov\');if(o)o.remove()" style="flex:1;padding:12px;border-radius:11px;border:1.5px solid #cbd5e1;background:#fff;color:#475569;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit">취소</button>'
+'<button onclick="briefSaveForm(\''+(id||'')+'\')" style="flex:2;padding:12px;border-radius:11px;border:none;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit">저장</button>'
+'</div></div>';
document.body.appendChild(ov);
ov.addEventListener('click', function(e){ if(e.target===ov) ov.remove(); });
}
function briefSaveForm(id){
var g=function(x){ var el=document.getElementById(x); return el?(el.value||''):''; };
var name=g('bf-name').trim(), prompt=g('bf-prompt').trim(), room=(g('bf-room').trim()||'나'), tv=(g('bf-time').trim()||'07:00');
if(!name){ try{toast('이름을 적어주세요');}catch(e){} return; }
if(!prompt){ try{toast('받고 싶은 내용을 적어주세요');}catch(e){} return; }
var m=tv.match(/(\d{1,2})\s*[:시]?\s*(\d{1,2})?/);
var hh=m?Math.min(23,Math.max(0,parseInt(m[1],10)||7)):7, mm=m?Math.min(59,Math.max(0,parseInt(m[2]||'0',10)||0)):0;
var a=briefsAll();
if(id){ for(var i=0;i<a.length;i++){ if(a[i].id===id){ a[i].name=name; a[i].prompt=prompt; a[i].room=room; a[i].hh=hh; a[i].mm=mm; a[i].last=''; } } }
else { a.push({ id:'b'+Date.now(), name:name, prompt:prompt, room:room, hh:hh, mm:mm, on:true, last:'' }); }
saveBriefs(a);
var ov=document.getElementById('brief-form-ov'); if(ov) ov.remove();
renderBriefsCard();
try{ toast('저장됐어요 ✅'); }catch(e){}
}
function syncBriefAlarms(){
try{
if(window.Android && window.Android.setBriefAlarms){
var list=briefsAll().filter(function(b){ return b.on; }).map(function(b){ return { id:b.id, hh:(b.hh|0), mm:(b.mm|0), name:(b.name||'브리핑'), room:(b.room||'나') }; });
window.Android.setBriefAlarms(JSON.stringify(list));
}
}catch(e){}
}
window.runBriefById = function(id){ try{ briefRun(id, false); return true; }catch(e){ return false; } };
window.runDueBriefs = function(){ try{ briefsCheck(); return true; }catch(e){ return false; } };
try{ window.addEventListener('load', function(){
try{ var rb=new URLSearchParams(location.search).get('runbrief'); if(rb){ setTimeout(function(){ try{ briefRun(rb, false); }catch(e){} }, 900); } }catch(e){}
try{ setTimeout(function(){ try{ syncBriefAlarms(); }catch(e){} }, 1500); }catch(e){}
}); }catch(e){}
function routineIntent(t){
t=String(t||''); var arr=(typeof agentRoutines==='function')?agentRoutines():[]; if(!arr.length) return null;
var hasKw=/루틴/.test(t);
var cand=t.replace(/루틴|실행|열어|틀어|시작|불러(와|오기)?|해\s*줘?|줘|좀|바로/g,' ').replace(/\s+/g,' ').trim();
if(!cand) cand=t;
var nq=_ptNorm(cand);
if(!hasKw && nq.length<3) return null;
var best=null, score=0;
for(var i=0;i<arr.length;i++){
var nm=_ptNorm(arr[i].name); if(!nm) continue;
var s=_ptDice(cand, arr[i].name);
if(nq && (nm.indexOf(nq)>=0 || nq.indexOf(nm)>=0)) s=Math.max(s,0.92);
if(s>score){ score=s; best=arr[i]; }
}
if(!best) return null;
var thr = hasKw ? 0.30 : 0.6;
return score>=thr ? best : null;
}
function routeById(id){ for(var i=0;i<ROUTES.length;i++){ if(ROUTES[i].id===id) return ROUTES[i]; } return null; }
function applyRoute(r, q){ var enc=encodeURIComponent(q||''); return { label:r.label, url:(r.url||'').replace('{q}',enc), deep:(r.deep||'').replace('{q}',enc), isApp:!!r.deep, native:r.native||'' }; }
var VOICE_PREFIX='voiceact';
function vEl(suffix){ return document.getElementById(VOICE_PREFIX+'-'+suffix); }
function openVoiceAct(){
VOICE_PREFIX='voiceact';
var q=vEl('q'); if(q) q.value='';
var rw=vEl('result-wrap'); if(rw) rw.style.display='none';
var er=vEl('err'); if(er) er.style.display='none';
voiceActUrl=''; voiceActText=''; voiceActNative='';
document.getElementById('voiceact-bg').style.display='flex';
history.pushState({p:true},'','');
}
function closeVoiceAct(){ sttStop(); document.getElementById('voiceact-bg').style.display='none'; history.pushState({p:true},'',''); }
function voiceActMic(){ var px=VOICE_PREFIX; sttStart(VOICE_PREFIX+'-q', VOICE_PREFIX+'-mic','&#127908; 말하기','&#9210; 듣는 중...'); window._sttAutoRun=function(){ VOICE_PREFIX=px; if(px==='uni'){ try{uniRun();}catch(e){} } else if(px==='talk'){ try{talkRun();}catch(e){} } else { try{runVoiceIntent();}catch(e){} } }; }
function voiceActErr(m){ var e=vEl('err'); if(e){ e.textContent='⚠️ '+m; e.style.display='block'; } }
function parseRoute(txt){
try{
var s=String(txt).replace(/```json|```/g,'').trim();
var m=s.match(/\{[\s\S]*\}/); if(m) s=m[0];
var o=JSON.parse(s);
return { id:(o.id||'navsearch'), q:(o.q||'') };
}catch(e){ return null; }
}
function runVoiceIntent(){
var px=VOICE_PREFIX;
var t=(vEl('q').value||'').trim();
if(!t){ voiceActErr('무엇을 할지 말하거나 적어줘'); return; }
voiceActText=t;
if(typeof routineIntent==="function"){ var _rtV=routineIntent(t); if(_rtV){ loadAgentRoutine(_rtV.id); return; } }
if(typeof podotalkIntent==="function"){ var _pv=podotalkIntent(t); if(_pv){ goPodotalk(_pv, podotalkMsg(t)); return; } }
if(typeof vansIsMusic==="function" && vansIsMusic(t)){ var _mvq=(typeof musicTopic==="function")?musicTopic(t):t; try{ closeVoiceAct(); }catch(e){} openUrl('https://www.youtube.com/results?search_query='+encodeURIComponent(_mvq),'vans'); return; }
var rw=vEl('result-wrap'); if(rw) rw.style.display='none';
if(!hasAIKey()){
var rr=ruleRoute(t);
var r0 = rr ? (routeById(rr.id)||routeById('navsearch')) : routeById('navsearch');
var q0 = (rr && rr.q) ? rr.q : t;
var a0=applyRoute(r0, q0);
voiceActUrl=a0.url||''; voiceActDeep=a0.deep||''; voiceActNative=a0.native||''; voiceActRouteId=r0.id; VOICE_PREFIX=px;
if(a0.native){ showVoiceResult(a0.label, q0, false, a0.native==='call'?' 걸기':' 보내기'); }
else { showVoiceResult(a0.label, a0.isApp?'':q0, a0.isApp); if(r0.id==='navi'){ var ob=document.getElementById(px+'-open'); if(ob) ob.innerHTML='&#129517; 내비 시작'; openNavi(q0, a0.url); } }
return;
}
var btn=vEl('go'); var old=btn.innerHTML; btn.innerHTML='&#9203;'; btn.disabled=true;
var er=vEl('err'); if(er) er.style.display='none';
var routeList='';
for(var ri=0;ri<ROUTES.length;ri++){ routeList += '- '+ROUTES[ri].id+': '+(ROUTES[ri].hint||ROUTES[ri].label)+'\n'; }
var sys='너는 한국어 명령을 보고 어느 서비스로 보낼지 정하는 라우터야. 아래에서 가장 알맞은 id 하나와 핵심 검색어 q를 골라.\n'
+ routeList
+'앱 열기(kakaotalk/toss/baemin/insta/yogiyo/coupangeats)는 검색어가 없으면 q는 빈 문자열. 설명/마크다운 없이 JSON 한 줄만: {"id":"...","q":"..."}';
callAI({ system:sys, messages:[{role:'user',content:t}], maxTokens:120, noLang:true },
function(txt){
VOICE_PREFIX=px;
btn.innerHTML=old; btn.disabled=false;
var p=parseRoute(txt) || { id:'navsearch', q:t };
var r=routeById(p.id)||routeById('navsearch');
var q=p.q || (r.deep||r.native?'':t);
var a=applyRoute(r, q);
voiceActQuery=q;
if(a.native){
voiceActNative=a.native; voiceActUrl=''; voiceActDeep=''; voiceActRouteId=r.id;
showVoiceResult(a.label, q, false, a.native==='call'?' 걸기':' 보내기');
} else {
voiceActNative=''; voiceActUrl=a.url; voiceActDeep=a.deep; voiceActRouteId=r.id;
showVoiceResult(a.label, a.isApp?'':q, a.isApp);
if(r.id==='navi'){
var ob=document.getElementById(px+'-open'); if(ob) ob.innerHTML='&#129517; 내비 시작';
openNavi(q, a.url);
}
}
},
function(e){
VOICE_PREFIX=px;
btn.innerHTML=old; btn.disabled=false;
voiceActNative=''; voiceActRouteId='navsearch';
var a=applyRoute(routeById('navsearch'), t); voiceActUrl=a.url; voiceActDeep=''; showVoiceResult(a.label, t, false);
}
);
}
function showVoiceResult(label, q, isApp, verb){
var suffix = (verb!=null) ? verb : (isApp?' 열기':'에서 열기');
var lab=vEl('detect'); if(lab) lab.textContent='▶ '+label+suffix;
var qq=vEl('query'); if(qq){ if(q){ qq.textContent='"'+q+'"'; qq.style.display='block'; } else { qq.textContent=''; qq.style.display='none'; } }
var ov=vEl('overview'); if(ov){ ov.style.display='none'; ov.innerHTML=''; }
var ob=vEl('open'); if(ob) ob.innerHTML = isApp ? '앱 열기' : '열기';
var rw=vEl('result-wrap'); if(rw) rw.style.display='block';
}
function doVoiceOpen(){
if(voiceActNative){
var name=voiceActQuery||voiceActText||'';
if(voiceActNative==='call'){
if(window.Android && typeof window.Android.callContact==='function'){ try{ window.Android.callContact(name); return; }catch(e){} }
openUrl('tel:'+name.replace(/[^0-9+]/g,''),'voiceact'); return;
}
if(voiceActNative==='sms'){
if(window.Android && typeof window.Android.smsContact==='function'){ try{ window.Android.smsContact(name,''); return; }catch(e){} }
openUrl('sms:','voiceact'); return;
}
}
if(voiceActDeep && window.Android && typeof window.Android.openExternal==='function'){ try{ window.Android.openExternal(voiceActDeep); return; }catch(e){} }
if(voiceActUrl){ openUrl(voiceActUrl,'voiceact'); }
}
function voiceActSearch(){ var t=voiceActText||(vEl('q').value||'').trim(); if(!t) return; var a=applyRoute(routeById('navsearch'),t); openUrl(a.url,'voiceact'); }
function talkMic(){ VOICE_PREFIX='talk'; voiceActMic(); }
function talkRun(){ VOICE_PREFIX='talk'; runVoiceIntent(); }
function talkSearch(){ VOICE_PREFIX='talk'; voiceActSearch(); }
function vansBuild(){
if(!document.getElementById('reel-kb-style')){
var st=document.createElement('style'); st.id='reel-kb-style';
st.textContent='@keyframes reelKB{0%{transform:scale(1.05)}100%{transform:scale(1.2)}}@keyframes reelSpin{to{transform:rotate(360deg)}}';
document.head.appendChild(st);
}
var ov=document.createElement('div'); ov.id='vans-bg';
ov.style.cssText='position:fixed;inset:0;z-index:660;background:#ffffff;display:none;flex-direction:column';
var hd=document.createElement('div');
hd.style.cssText='flex-shrink:0;padding:14px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(0,0,0,.22);background:#ffffff';
var ti=document.createElement('div'); ti.style.cssText='flex:1;font-size:15px;font-weight:800;color:#0a7a96'; ti.textContent='🎤 AI 음성 비서';
var back=document.createElement('button'); back.innerHTML='&#10005;'; back.style.cssText='width:34px;height:34px;border-radius:50%;border:none;background:rgba(0,0,0,.26);color:#141720;font-size:15px;cursor:pointer';
back.onclick=function(){ vansClose(); };
hd.appendChild(ti); hd.appendChild(back); ov.appendChild(hd);
var ir=document.createElement('div');
ir.style.cssText='flex-shrink:0;padding:12px 16px;display:flex;gap:8px;background:#ffffff;border-bottom:1px solid rgba(0,0,0,.22)';
var inp=document.createElement('input'); inp.id='vans-q'; inp.placeholder='무엇이든 말하거나 적어줘';
inp.style.cssText='flex:1;min-width:0;padding:11px 12px;border-radius:12px;border:1px solid rgba(0,0,0,.3);background:#eef0f7;color:#141720;font-size:14px;font-family:inherit;outline:none';
inp.addEventListener('keydown',function(e){ if(e.key==='Enter'){ var v=inp.value.trim(); if(v) voiceAnswer(v); } });
var mic=document.createElement('button'); mic.id='vans-mic'; mic.innerHTML='&#127908;';
mic.style.cssText='width:46px;flex-shrink:0;border-radius:12px;border:1px solid rgba(34,211,238,.4);background:rgba(34,211,238,.1);color:#0a7a96;font-size:18px;cursor:pointer';
mic.onclick=function(){ sttStart('vans-q','vans-mic','&#127908;','&#9210;', function(){ var v=((document.getElementById('vans-q')||{}).value||'').trim(); if(v) voiceAnswer(v); }); };
var run=document.createElement('button'); run.id='vans-run'; run.textContent='실행';
run.style.cssText='padding:0 16px;flex-shrink:0;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#7b61ff);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit';
run.onclick=function(){ var v=inp.value.trim(); if(v) voiceAnswer(v); };
ir.appendChild(inp); ir.appendChild(mic); ir.appendChild(run); ov.appendChild(ir);
var body=document.createElement('div'); body.id='vans-body';
body.style.cssText='flex:1;overflow-y:auto;padding:16px;-webkit-overflow-scrolling:touch';
ov.appendChild(body);
document.body.appendChild(ov);
return ov;
}
function vansOpen(){ var ov=document.getElementById('vans-bg')||vansBuild(); ov.style.display='flex'; }
function vansClose(){ window._vansActive=false; try{ sttStop(); }catch(e){} var ov=document.getElementById('vans-bg'); if(ov) ov.style.display='none'; }
function voiceActAnswer(){
var t=(document.getElementById('voiceact-q')||{}).value||'';
t=t.trim(); if(!t){ voiceActErr('무엇을 할지 말하거나 적어줘'); return; }
voiceAnswer(t);
}
function vansParse(txt){
var s=String(txt==null?'':txt).replace(/```json|```/g,'').trim();
try{ var m=s.match(/\{[\s\S]*\}/); return JSON.parse(m?m[0]:s); }catch(e){}
try{
var a=s.match(/"answer"\s*:\s*"((?:[^"\\]|\\.)*)/);
if(a){ var v=a[1].replace(/\\n/g,'\n').replace(/\\"/g,'"').replace(/\\\\/g,'\\'); v=v.replace(/["}\s]+$/,'').trim(); if(v) return { answer:v }; }
}catch(e2){}
return null;
}
var webProvider = lsG('podoai_wsp','tavily');
var webKey = lsG('podoai_wsk','');
var kakaoRest = lsG('podoai_kakao_rest','');
function hasWebSearch(){ return !!webKey; }
var _nf={}, _nfId=0;
window.__nfCb=function(id,status,body,err){
var cb=_nf[id]; if(!cb) return; delete _nf[id];
if(err){ cb.rej(new Error(err)); return; }
cb.res({ ok:(status>=200&&status<300), status:status,
text:function(){ return Promise.resolve(body); },
json:function(){ return Promise.resolve(JSON.parse(body)); } });
};
function hasNativeHTTP(){ return !!(window.Android && typeof window.Android.httpRequest==='function'); }
function nativeFetch(url, opts){
opts=opts||{};
if(hasNativeHTTP()){
return new Promise(function(res,rej){
var id='nf'+(++_nfId); _nf[id]={res:res,rej:rej};
try{ window.Android.httpRequest(id, opts.method||'GET', url, JSON.stringify(opts.headers||{}), opts.body||''); }
catch(e){ delete _nf[id]; rej(e); }
setTimeout(function(){ if(_nf[id]){ delete _nf[id]; rej(new Error('timeout')); } }, 25000);
});
}
return fetch(url, opts);
}
function webSearch(query, onOk, onErr){
if(!webKey){ if(onErr)onErr(new Error('no key')); return; }
var p=webProvider||'tavily';
try{
if(p==='tavily'){
nativeFetch('https://api.tavily.com/search',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({api_key:webKey,query:query,max_results:5,search_depth:'basic',include_answer:false})})
.then(function(r){return r.json();}).then(function(j){
var rs=((j&&j.results)||[]).map(function(x){return {title:x.title||'',url:x.url||'',snippet:(x.content||'').slice(0,500)};});
onOk(rs);
}).catch(function(e){ if(onErr)onErr(e); });
} else if(p==='exa'){
nativeFetch('https://api.exa.ai/search',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':webKey},
body:JSON.stringify({query:query,numResults:5,contents:{text:{maxCharacters:600}}})})
.then(function(r){return r.json();}).then(function(j){
var rs=((j&&j.results)||[]).map(function(x){return {title:x.title||'',url:x.url||'',snippet:((x.text||x.snippet)||'').slice(0,500)};});
onOk(rs);
}).catch(function(e){ if(onErr)onErr(e); });
} else if(p==='brave'){
nativeFetch('https://api.search.brave.com/res/v1/web/search?count=5&q='+encodeURIComponent(query),
{headers:{'Accept':'application/json','X-Subscription-Token':webKey}})
.then(function(r){return r.json();}).then(function(j){
var w=((j&&j.web&&j.web.results))||[];
var rs=w.map(function(x){return {title:x.title||'',url:x.url||'',snippet:x.description||''};});
onOk(rs);
}).catch(function(e){ if(onErr)onErr(e); });
} else { if(onErr)onErr(new Error('unknown')); }
}catch(e){ if(onErr)onErr(e); }
}
function webKeyStatus(){
var el=document.getElementById('websearch-key-sub'); if(!el) return;
var name={tavily:'Tavily',exa:'Exa',brave:'Brave'}[webProvider]||webProvider;
el.textContent = webKey ? ('✅ '+name+' 등록됨') : '미등록 (선택 · 실시간 웹검색)';
}
function wsBuild(){
var ov=document.createElement('div'); ov.id='websearch-bg';
ov.style.cssText='display:none;position:fixed;inset:0;z-index:680;background:rgba(0,0,0,.55);align-items:flex-end';
ov.onclick=function(e){ if(e.target===ov) closeWebSearchKey(); };
var sh=document.createElement('div');
sh.style.cssText='width:min(390px,100vw);margin:0 auto;background:#ffffff;border-radius:24px 24px 0 0;padding:20px 18px 30px;max-height:90vh;overflow-y:auto;border:1px solid rgba(0,0,0,.2)';
sh.onclick=function(e){ e.stopPropagation(); };
var h=document.createElement('div'); h.style.cssText='display:flex;align-items:center;margin-bottom:6px';
var ht=document.createElement('div'); ht.style.cssText='flex:1;font-size:17px;font-weight:800;color:#141720'; ht.textContent='🌐 실시간 웹검색 키';
var hx=document.createElement('button'); hx.innerHTML='&#10005;'; hx.style.cssText='width:30px;height:30px;border-radius:9px;border:none;background:rgba(0,0,0,.16);color:#141720;font-size:14px;cursor:pointer'; hx.onclick=function(){ closeWebSearchKey(); };
h.appendChild(ht); h.appendChild(hx); sh.appendChild(h);
var sub=document.createElement('div'); sub.style.cssText='font-size:13.5px;color:#1f2430;margin-bottom:14px;line-height:1.6'; sub.textContent='본인 검색 API 키를 넣으면 답변이 실시간 웹 정보 + 출처로 나와요. 키는 이 폰에만 저장돼요.'; sh.appendChild(sub);
var diag=document.createElement('div'); diag.id='ws-diag'; diag.style.cssText='background:#f0f7ff;border:1px solid rgba(0,0,0,.18);border-radius:12px;padding:12px;font-size:13px;color:#1f2430;line-height:1.7;margin-bottom:10px'; sh.appendChild(diag);
var tbtn=document.createElement('button'); tbtn.textContent='🔌 웹검색 연결 테스트'; tbtn.style.cssText='width:100%;padding:12px;border-radius:12px;border:1.5px solid rgba(34,211,238,.5);background:rgba(34,211,238,.1);color:#0a7a96;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;margin-bottom:16px'; tbtn.onclick=function(){ wsTest(); }; sh.appendChild(tbtn);
var lab1=document.createElement('div'); lab1.style.cssText='font-size:13.5px;font-weight:800;color:rgba(0,0,0,.9);margin-bottom:8px'; lab1.textContent='검색 제공사'; sh.appendChild(lab1);
var prov=document.createElement('div'); prov.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px';
var PROVS=[['tavily','Tavily','AI 답변에 추천 · 무료 1,000건/월'],['exa','Exa','의미(신경망) 검색 · 개발자용'],['brave','Brave','독립 인덱스 · 프라이버시']];
function paintProv(){ Array.prototype.forEach.call(prov.children,function(b){ b.className='study-chip'+(b.dataset.p===webProvider?' on':''); }); var d=document.getElementById('ws-provdesc'); if(d){ var f=PROVS.filter(function(x){return x[0]===webProvider;})[0]; d.textContent=f?f[2]:''; } }
PROVS.forEach(function(x){ var b=document.createElement('button'); b.className='study-chip'; b.dataset.p=x[0]; b.textContent=x[1]; b.onclick=function(){ webProvider=x[0]; paintProv(); }; prov.appendChild(b); });
sh.appendChild(prov);
var pd=document.createElement('div'); pd.id='ws-provdesc'; pd.style.cssText='font-size:12.5px;color:#5b6178;margin:-8px 0 16px'; sh.appendChild(pd);
var lab2=document.createElement('div'); lab2.style.cssText='font-size:13.5px;font-weight:800;color:rgba(0,0,0,.9);margin-bottom:8px'; lab2.textContent='API 키'; sh.appendChild(lab2);
var inp=document.createElement('input'); inp.id='ws-key'; inp.type='password'; inp.placeholder='발급받은 키를 붙여넣기';
inp.style.cssText='width:100%;box-sizing:border-box;padding:13px;border-radius:12px;border:1.5px solid rgba(0,0,0,.28);background:#f4f6fb;color:#141720;font-size:14px;font-family:inherit;outline:none;margin-bottom:14px'; sh.appendChild(inp);
var save=document.createElement('button'); save.textContent='저장';
save.style.cssText='width:100%;padding:14px;border-radius:14px;border:none;background:linear-gradient(135deg,#22d3ee,#7b61ff);color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;margin-bottom:8px'; save.onclick=function(){ saveWebSearchKey(); }; sh.appendChild(save);
var del=document.createElement('button'); del.textContent='키 삭제';
del.style.cssText='width:100%;padding:11px;border-radius:12px;border:1px solid rgba(0,0,0,.24);background:none;color:#8a5a00;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:14px'; del.onclick=function(){ webKey=''; lsS('podoai_wsk',''); var i=document.getElementById('ws-key'); if(i)i.value=''; webKeyStatus(); }; sh.appendChild(del);
var howWrap=document.createElement('div'); howWrap.style.cssText='background:#f4f6fb;border-radius:12px;padding:13px;font-size:12.5px;color:#1f2430;line-height:1.75';
howWrap.innerHTML='<b>키 발급(무료):</b><br>• Tavily — app.tavily.com<br>• Exa — exa.ai<br>• Brave — brave.com/search/api<br><br>⚠️ 일부 제공사는 브라우저 직접 호출(CORS)이 막힐 수 있어요. 그럴 땐 앱(WebView) 버전이나 Puter에서 동작해요. Tavily가 가장 무난합니다.';
sh.appendChild(howWrap);
ov.appendChild(sh); document.body.appendChild(ov);
return ov;
}
function wsDiag(){
var d=document.getElementById('ws-diag'); if(!d) return;
var modeTxt=hasNativeHTTP() ? '📱 <b>앱 모드</b> — 브리지 사용 가능 (CORS 우회 OK)' : '🌐 <b>브라우저 모드</b> — 브리지 불가 (실시간 웹검색은 앱에서만 작동)';
var keyTxt=webKey ? '🔑 키: <b style="color:#0a7a96">등록됨</b>' : '🔑 키: <b style="color:#8a5a00">미등록</b> (아래에서 저장)';
d.innerHTML=modeTxt+'<br>'+keyTxt;
}
function wsTest(){
var d=document.getElementById('ws-diag'); if(!d) return;
var i=document.getElementById('ws-key'); var k=(i&&i.value||'').trim(); if(k){ webKey=k; }
if(!webKey){ d.innerHTML='⚠️ 먼저 아래에서 API 키를 입력/저장한 뒤 테스트하세요.'; return; }
d.innerHTML='⏳ 테스트 중...';
webSearch('오늘 서울 날씨', function(rs){
if(rs && rs.length){ d.innerHTML='✅ <b style="color:#0a7a96">웹검색 성공!</b> 출처 '+rs.length+'개<br>예: '+((rs[0].title||rs[0].url)||''); }
else { d.innerHTML='⚠️ 응답은 왔지만 결과가 비었어요. 키·제공사를 확인하세요.'; }
}, function(e){
var why=hasNativeHTTP() ? '키가 틀렸거나 제공사 오류일 수 있어요.' : '브라우저에선 CORS로 막혀요 — 앱(WebView)에서 테스트하세요.';
d.innerHTML='❌ <b style="color:#b42b2b">실패</b>: '+((e&&e.message)||'오류')+'<br>'+why;
});
}
function openWebSearchKey(){
var ov=document.getElementById('websearch-bg')||wsBuild();
ov.style.display='flex';
var i=document.getElementById('ws-key'); if(i) i.value=webKey||'';
Array.prototype.forEach.call(document.querySelectorAll('#websearch-bg .study-chip'),function(b){ b.className='study-chip'+(b.dataset.p===webProvider?' on':''); });
var d=document.getElementById('ws-provdesc'); if(d){ var m={tavily:'AI 답변에 추천 · 무료 1,000건/월',exa:'의미(신경망) 검색 · 개발자용',brave:'독립 인덱스 · 프라이버시'}; d.textContent=m[webProvider]||''; }
try{ wsDiag(); }catch(e){}
history.pushState({p:true},'','');
}
function closeWebSearchKey(){ var ov=document.getElementById('websearch-bg'); if(ov) ov.style.display='none'; }
function saveWebSearchKey(){
var i=document.getElementById('ws-key'); var k=(i&&i.value||'').trim();
webKey=k; lsS('podoai_wsk',k); lsS('podoai_wsp',webProvider);
webKeyStatus(); try{ wsDiag(); }catch(e){} closeWebSearchKey();
try{ toast && toast(k?'실시간 웹검색 켜짐 ✅':'키가 비었어요'); }catch(e){}
}
function vansAddOpen(container, r, q){
if(!r) return;
var a=applyRoute(r, q);
if(!a.url && !a.deep) return;
var b=document.createElement('button');
b.style.cssText='width:100%;margin-bottom:14px;padding:15px;border-radius:14px;border:none;background:linear-gradient(135deg,#22d3ee,#7b61ff);color:#fff;font-size:16.5px;font-weight:800;cursor:pointer;font-family:inherit';
b.textContent='▶ '+r.label+(q?' — "'+q+'"':'')+' 바로 열기';
b.onclick=function(){
if(a.deep && window.Android && typeof window.Android.openExternal==='function'){ try{ window.Android.openExternal(a.deep); return; }catch(e){} }
if(a.url) openUrl(a.url,'vans');
};
container.appendChild(b);
}
function vansIsNavi(q){ return /길\s*안내|내비게이션|내비|네비게이션|네비|길\s*찾기|길찾기|가는\s*길|가는\s*법|어떻게\s*가|찾아\s*가|까지\s*가|데려다|목적지/.test(q||''); }
function deliveryIntent(q){
q=String(q||'');
var order=/시켜|시키|주문|배달\s*시켜|배달시켜|배달\s*주문|시켜\s*줘/.test(q);
var info=/배달비|배달료|배달팁|얼마|몇\s*분|언제\s*오|어디까지|되나|될까|환불|취소|후기|리뷰|영업|문\s*열/.test(q);
if(/배민|배달의민족|요기요|쿠팡이츠/.test(q)){ if(info && !order) return false; if(order || /배달|판|개|인분|그릇|마리|병|잔|줄|세트|먹/.test(q)) return true; return false; }
if(/배달/.test(q) && order && !info) return true;
return false;
}
function deliveryApp(q){ q=String(q||''); if(/배민|배달의민족/.test(q)) return 'baemin'; if(/쿠팡이츠|이츠/.test(q)) return 'coupangeats'; return 'yogiyo'; }
function deliveryAppName(a){ return a==='yogiyo'?'요기요':(a==='coupangeats'?'쿠팡이츠':'배달의민족'); }
function deliveryParse(q){
q=String(q||''); var app=deliveryApp(q);
var store='', menu='';
var parts=q.split('에서');
if(parts.length>=3){ store=parts[1]; menu=parts.slice(2).join('에서'); }
else if(parts.length===2){ store=parts[1]; }
else { menu=q; }
store=String(store).replace(/(배달의민족|배민|요기요|쿠팡이츠)/g,'').replace(/^[\s,]+|[\s,]+$/g,'').trim();
store=store.replace(/(우리집|집으로|회사로).*$/,'').replace(/(\d+\s*(판|개|인분|그릇|마리|병|잔|줄|세트)).*$/,'').replace(/배달\s*시켜.*$|시켜\s*줘.*$|주문\s*해.*$|주문.*$|배달.*$/,'').replace(/[\s,]+$/,'').trim();
menu=String(menu).replace(/(\d+\s*(판|개|인분|그릇|마리|병|잔|줄|세트))/g,'')
.replace(/우리집|집으로|회사로|로\s*배달|으로\s*배달/g,'')
.replace(/배달\s*시켜.*$|시켜\s*줘.*$|시켜.*$|주문\s*해.*$|주문.*$|배달해.*$|배달.*$/g,'')
.replace(/[\s,]+$/,'').trim();
if(!store && menu) store=menu;
return { app:app, store:store, menu:menu, raw:q };
}
function yogiyoStores(){ var a=lsG('podoai_yogiyo_stores',[]); return Array.isArray(a)?a:[]; }
function yogiyoStoreSave(name,id){ name=String(name||'').trim(); id=String(id||''); var m=id.match(/#\/(\d+)/); id=m?m[1]:id.replace(/[^0-9]/g,''); if(!name||!id) return false; var a=yogiyoStores().filter(function(s){return s.name!==name;}); a.push({name:name,id:id}); lsS('podoai_yogiyo_stores',a); return true; }
function yogiyoStoreDel(name){ lsS('podoai_yogiyo_stores', yogiyoStores().filter(function(s){return s.name!==name;})); }
function yogiyoStoreFind(store){ if(!store) return null; var s=String(store).replace(/\s/g,''); var a=yogiyoStores(); for(var i=0;i<a.length;i++){ var n=String(a[i].name).replace(/\s/g,''); if(n && (s.indexOf(n)>=0 || n.indexOf(s)>=0)) return a[i]; } return null; }
function baeminStores(){ var a=lsG('podoai_baemin_stores',[]); return Array.isArray(a)?a:[]; }
function baeminStoreSave(name,url){ name=String(name||'').trim(); var raw=String(url||'').trim(); var m=raw.match(/https?:\/\/[^\s'"]+/i) || raw.match(/(?:[\w.-]*\.)?baemin\.(?:me|com)\/[^\s'"]+/i); var u=m?m[0]:''; if(u && !/^https?:\/\//i.test(u)) u='https://'+u.replace(/^\/+/,''); if(!name || !u || !/baemin/i.test(u)) return false; var a=baeminStores().filter(function(s){return s.name!==name;}); a.push({name:name,url:u}); lsS('podoai_baemin_stores',a); return true; }
function baeminStoreDel(name){ lsS('podoai_baemin_stores', baeminStores().filter(function(s){return s.name!==name;})); }
function baeminStoreFind(store){ if(!store) return null; var s=String(store).replace(/\s/g,''); var a=baeminStores(); for(var i=0;i<a.length;i++){ var n=String(a[i].name).replace(/\s/g,''); if(n && (s.indexOf(n)>=0 || n.indexOf(s)>=0)) return a[i]; } return null; }
function goBaeminFav(url){
window._vansActive=true;
var full=String(url||''); if(!/^https?:\/\//i.test(full)) full='https://'+full.replace(/^\/+/,'');
if(window.Android && (typeof window.Android.openPackage==='function' || typeof window.Android.openExternal==='function')){
var clean=full.replace(/^https?:\/\//i,'');
var intent='intent://'+clean+'#Intent;scheme=https;package=com.sampleapp;S.browser_fallback_url='+encodeURIComponent(full)+';end';
_openApp(intent, null, null); return;
}
openUrl(full, 'baemin');
}
function goDelivery(info, force){
try{ if(info && info.store && navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(info.store); } }catch(e){}
window._vansActive=true;
var app=(info&&info.app)||'yogiyo';
if(app==='yogiyo'){
var fav=yogiyoStoreFind(info&&info.store);
if(fav){ openUrl('https://www.yogiyo.co.kr/mobile/#/'+fav.id,'yogiyo'); return; }
if(!force) return;
_openApp('intent://#Intent;scheme=yogiyo;package=com.fineapp.yogiyo;S.browser_fallback_url=https%3A%2F%2Fwww.yogiyo.co.kr%2Fmobile%2F%23%2F;end', 'com.fineapp.yogiyo', 'https://www.yogiyo.co.kr/mobile/#/'); return;
}
if(app==='coupangeats'){ _openApp('intent://#Intent;scheme=coupangeats;package=com.coupang.mobile.eats;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.coupang.mobile.eats;end', 'com.coupang.mobile.eats'); return; }
var bfav=baeminStoreFind(info&&info.store);
if(bfav){ goBaeminFav(bfav.url); return; }
_openApp('intent://#Intent;scheme=baemin;package=com.sampleapp;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.sampleapp;end', 'com.sampleapp');
}
function goDeliveryKakaoWeb(info){
try{ if(info && info.store && navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(info.store); } }catch(e){}
window._vansActive=true;
openUrl('https://order.kakao.com/','yogiyo');
}
function _openApp(intentUrl, pkg, webUrl){
if(pkg && window.Android && typeof window.Android.openPackage==='function'){ try{ window.Android.openPackage(pkg); return; }catch(e){} }
if(window.Android && typeof window.Android.openExternal==='function'){ try{ window.Android.openExternal(intentUrl); return; }catch(e){} }
if(webUrl){ try{ window.location.assign(webUrl); return; }catch(e){} }
try{ window.location.assign(intentUrl); }catch(e){ window.location.href=intentUrl; }
}
function vansDeliveryBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var appNm=deliveryAppName(info&&info.app);
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#13a8a3;margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(42,193,188,.3)'; t.textContent='🛵 '+appNm+' 배달 주문'; body.appendChild(t);
function rowItem(k,v){ var r=document.createElement('div'); r.style.cssText='display:flex;gap:10px;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.12)'; var a=document.createElement('div'); a.textContent=k; a.style.cssText='width:48px;font-size:13.5px;color:#5b6178;flex-shrink:0'; var b=document.createElement('div'); b.textContent=v||'-'; b.style.cssText='flex:1;font-size:15.5px;font-weight:700;color:#141720'; r.appendChild(a); r.appendChild(b); body.appendChild(r); }
if(info&&info.store) rowItem('가게', info.store);
if(info&&info.menu) rowItem('메뉴', info.menu);
var isY=info&&info.app==='yogiyo';
var isB=info&&info.app==='baemin';
var fav = isY ? yogiyoStoreFind(info&&info.store) : (isB ? baeminStoreFind(info&&info.store) : null);
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:12px 0 14px';
if(isY){
note.textContent = fav
? ('단골 "'+fav.name+'"(가게ID '+fav.id+')로 등록돼 있어, 요기요 가게 페이지로 바로 들어가요. 메뉴 담고 주문만 누르면 끝!')
: ('"'+((info&&info.store)||'이 가게')+'"는 아직 단골 등록 전이라 요기요로 바로 못 들어가요. ① 아래 "요기요 열기"로 가게를 찾고 ② 그 가게 주소(#/숫자)를 아래에 한 번만 저장하면, 다음부턴 말 한마디로 그 가게로 바로 직행해요. (한 번만 등록하면 끝!)');
} else if(isB){
note.textContent = fav
? ('단골 "'+fav.name+'"로 등록돼 있어, 배민 그 가게로 바로 들어가요. 메뉴 담고 주문만 누르면 끝!')
: ('배민 앱이 열리면 가게 화면 우상단 공유(↗) → "링크 복사"(baemin.me/…)한 걸 아래에 한 번만 저장해두면, 다음부턴 "배민 '+((info&&info.store)||'OO')+' 주문" 한마디로 그 가게로 바로 직행해요. 외부 앱에서 뒤로가기를 하면 이 음성비서로 돌아와요.');
} else {
note.textContent='가게명을 복사해뒀어요. '+appNm+' 앱이 열리면 검색창을 길게 눌러 "붙여넣기" → 가게 선택 → 메뉴 담기까지 한 번에 가요. 외부 앱에서 뒤로가기를 하면 이 음성비서 화면으로 돌아와요.';
}
body.appendChild(note);
function bigBtn(label, grad, fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
var mainLabel = fav ? ('🛵 단골 '+fav.name+' 가게로 바로가기')
: isY ? ('🛵 요기요 열기'+(info&&info.store?(' ('+info.store+' 찾기)'):''))
: ('🛵 '+appNm+' 앱 열기');
bigBtn(mainLabel, 'linear-gradient(135deg,#2AC1BC,#179c98)', function(){ goDelivery(info, true); });
if(isY){ bigBtn('🟡 카카오 주문하기(웹·로그인 없이)', 'linear-gradient(135deg,#FFCD00,#e0b400)', function(){ goDeliveryKakaoWeb(info); }); }
if(info&&info.store){ bigBtn('📋 가게명 다시 복사', 'linear-gradient(135deg,#6b7280,#4b5563)', function(){ try{ navigator.clipboard.writeText(info.store); alert('복사됨: '+info.store); }catch(e){ alert('길게 눌러 직접 복사해줘: '+info.store); } }); }
if(isY){ vansYogiyoFavUI(body, info, fullq); }
if(isB){ vansBaeminFavUI(body, info, fullq); }
}
function vansBaeminFavUI(body, info, fullq){
var wrap=document.createElement('div'); wrap.style.cssText='margin-top:14px;padding:12px;border-radius:12px;background:rgba(42,193,188,.10);border:1px solid rgba(42,193,188,.5)';
var h=document.createElement('div'); h.style.cssText='font-size:13.5px;font-weight:800;color:#179c98;margin-bottom:8px'; h.textContent='🔖 배민 단골 가게 (가게로 바로가기)'; wrap.appendChild(h);
var list=document.createElement('div'); list.style.cssText='margin-bottom:8px';
function refresh(){
while(list.firstChild) list.removeChild(list.firstChild);
var arr=baeminStores();
if(!arr.length){ var e=document.createElement('div'); e.style.cssText='font-size:12px;color:#9aa0b4;padding:4px 0'; e.textContent='저장된 단골이 없어요.'; list.appendChild(e); return; }
arr.forEach(function(s){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.08)';
var nm=document.createElement('div'); nm.style.cssText='flex:1;min-width:0;font-size:14px;font-weight:700;color:#141720;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; nm.textContent=s.name; row.appendChild(nm);
var goB=document.createElement('button'); goB.textContent='바로가기'; goB.style.cssText='padding:6px 10px;border:none;border-radius:8px;background:#2AC1BC;color:#fff;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; goB.onclick=function(){ goBaeminFav(s.url); }; row.appendChild(goB);
var delB=document.createElement('button'); delB.textContent='삭제'; delB.style.cssText='padding:6px 9px;border:none;border-radius:8px;background:#e5e7eb;color:#555;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; delB.onclick=function(){ baeminStoreDel(s.name); refresh(); }; row.appendChild(delB);
list.appendChild(row);
});
}
refresh(); wrap.appendChild(list);
var form=document.createElement('div'); form.style.cssText='display:flex;gap:6px;align-items:center';
var nIn=document.createElement('input'); nIn.type='text'; nIn.placeholder='별명(예: 노랑통닭)'; nIn.value=(info&&info.store)||''; nIn.style.cssText='width:110px;flex-shrink:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var uIn=document.createElement('input'); uIn.type='text'; uIn.placeholder='공유링크 붙여넣기'; uIn.style.cssText='flex:1;min-width:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var sB=document.createElement('button'); sB.textContent='저장'; sB.style.cssText='padding:9px 12px;border:none;border-radius:8px;background:#179c98;color:#fff;font-size:13px;font-weight:800;font-family:inherit;cursor:pointer';
sB.onclick=function(){ if(baeminStoreSave(nIn.value, uIn.value)){ uIn.value=''; refresh(); } else { alert('별명과 배민 공유링크(baemin.me/…)를 모두 입력해줘.'); } };
form.appendChild(nIn); form.appendChild(uIn); form.appendChild(sB); wrap.appendChild(form);
var hint=document.createElement('div'); hint.style.cssText='font-size:11px;color:#9aa0b4;margin-top:6px;line-height:1.5'; hint.textContent='배민 앱에서 가게 → 우상단 공유(↗) → "링크 복사" → 여기 그대로 붙여넣기. 가게 이름(한글)이 같이 복사돼도 s.baemin.com 주소만 자동으로 골라내요.'; wrap.appendChild(hint);
body.appendChild(wrap);
}
function vansYogiyoFavUI(body, info, fullq){
var wrap=document.createElement('div'); wrap.style.cssText='margin-top:14px;padding:12px;border-radius:12px;background:rgba(255,205,0,.10);border:1px solid rgba(255,205,0,.5)';
var h=document.createElement('div'); h.style.cssText='font-size:13.5px;font-weight:800;color:#a87b00;margin-bottom:8px'; h.textContent='🔖 요기요 단골 가게 (가게 페이지로 바로가기)'; wrap.appendChild(h);
var list=document.createElement('div'); list.style.cssText='margin-bottom:8px';
function refresh(){
while(list.firstChild) list.removeChild(list.firstChild);
var arr=yogiyoStores();
if(!arr.length){ var e=document.createElement('div'); e.style.cssText='font-size:12px;color:#9aa0b4;padding:4px 0'; e.textContent='저장된 단골이 없어요.'; list.appendChild(e); return; }
arr.forEach(function(s){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.08)';
var nm=document.createElement('div'); nm.style.cssText='flex:1;font-size:14px;font-weight:700;color:#141720'; nm.textContent=s.name+' '; var idc=document.createElement('span'); idc.style.cssText='font-size:11px;color:#9aa0b4;font-weight:600'; idc.textContent='#'+s.id; nm.appendChild(idc); row.appendChild(nm);
var goB=document.createElement('button'); goB.textContent='바로가기'; goB.style.cssText='padding:6px 10px;border:none;border-radius:8px;background:#2AC1BC;color:#fff;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; goB.onclick=function(){ window._vansActive=true; openUrl('https://www.yogiyo.co.kr/mobile/#/'+s.id,'yogiyo'); }; row.appendChild(goB);
var delB=document.createElement('button'); delB.textContent='삭제'; delB.style.cssText='padding:6px 9px;border:none;border-radius:8px;background:#e5e7eb;color:#555;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; delB.onclick=function(){ yogiyoStoreDel(s.name); refresh(); }; row.appendChild(delB);
list.appendChild(row);
});
}
refresh(); wrap.appendChild(list);
var form=document.createElement('div'); form.style.cssText='display:flex;gap:6px;align-items:center';
var nIn=document.createElement('input'); nIn.type='text'; nIn.placeholder='별명(예: 교촌)'; nIn.value=(info&&info.store)||''; nIn.style.cssText='flex:1;min-width:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var iIn=document.createElement('input'); iIn.type='text'; iIn.inputMode='text'; iIn.placeholder='가게ID 또는 주소'; iIn.style.cssText='width:108px;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var sB=document.createElement('button'); sB.textContent='저장'; sB.style.cssText='padding:9px 12px;border:none;border-radius:8px;background:#a87b00;color:#fff;font-size:13px;font-weight:800;font-family:inherit;cursor:pointer';
sB.onclick=function(){ if(yogiyoStoreSave(nIn.value, iIn.value)){ iIn.value=''; refresh(); } else { alert('별명과 가게ID(숫자)를 모두 입력해줘.'); } };
form.appendChild(nIn); form.appendChild(iIn); form.appendChild(sB); wrap.appendChild(form);
var hint=document.createElement('div'); hint.style.cssText='font-size:11px;color:#9aa0b4;margin-top:6px;line-height:1.5'; hint.textContent='요기요에서 가게를 연 뒤, 주소창 전체를 복사해 그대로 붙여넣어도 돼요. (yogiyo.co.kr/mobile/#/숫자 → 숫자만 자동 추출)'; wrap.appendChild(hint);
body.appendChild(wrap);
}
function taxiIntent(q){
q=String(q||'');
if(!/택시/.test(q) && !/카카오\s*t|카카오티/i.test(q)) return false;
var call=/불러|호출|잡아|콜|call|태워|타고\s*가|보내\s*줘|와\s*줘|좀\s*불|불러줘/i.test(q);
var info=/요금|얼마|시세|몇\s*분|후기|리뷰|뭐야|뭔가요|설명|차이|언제\s*오/.test(q);
if(info && !call) return false;
return true;
}
function goTaxi(){
window._vansActive=true;
_openApp('intent://launch#Intent;scheme=kakaot;package=com.kakao.taxi;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.kakao.taxi;end', 'com.kakao.taxi');
}
function vansTaxiBack(fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#13a8a3;margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(42,193,188,.3)'; t.textContent='🚕 카카오T 택시 호출'; body.appendChild(t);
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:10px 0 14px';
note.textContent='카카오T 앱이 열리면 출발지가 GPS로 현재 위치에 자동 설정돼요. 목적지만 입력하고 호출 버튼을 누르면 됩니다. (출발·목적지 자동입력이나 자동 호출은 외부 앱에서 제공되지 않아, 호출 한 단계만 직접 누르면 돼요.) 외부 앱에서 뒤로가기를 하면 이 음성비서 화면으로 돌아와요.'; body.appendChild(note);
function bigBtn(label, grad, fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#222;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
bigBtn('🚕 카카오T 호출 열기 (출발지=현재 위치)', 'linear-gradient(135deg,#FFE14D,#FFCD00)', function(){ goTaxi(); });
}
function contacts(){ var a=lsG('podoai_contacts',[]); return Array.isArray(a)?a:[]; }
function contactSave(name,num){ name=String(name||'').trim(); num=String(num||'').replace(/[^0-9+]/g,''); if(!name||!num) return false; var a=contacts().filter(function(c){return c.name!==name;}); a.push({name:name,num:num}); lsS('podoai_contacts',a); return true; }
function contactDel(name){ lsS('podoai_contacts', contacts().filter(function(c){return c.name!==name;})); }
function contactFind(name){ if(!name) return null; var s=String(name).replace(/\s/g,''); if(!s) return null; var a=contacts(); for(var i=0;i<a.length;i++){ if(String(a[i].name).replace(/\s/g,'')===s) return a[i]; } return null; }
function callIntent(q){
q=String(q||'');
if(!/(전화|통화|콜)/.test(q)) return false;
if(/번호\s*(뭐|알려|찾|등록|저장)|어떻게|방법|활용|기능|안\s*되|못\s*(해|걸)|요금|얼마/.test(q)) return false;
if(/걸|연결|통화|해\s*줘|해줘|줘|콜|call/i.test(q)) return true;
return false;
}
function callParse(q){
q=String(q||'');
var numM=q.match(/(\+?\d[\d\-\s]{6,}\d)/);
var num=numM?numM[1].replace(/[^0-9+]/g,''):'';
var name=q.replace(/(\+?\d[\d\-\s]{6,}\d)/g,' ')
.replace(/(에게로|한테로|에게|한테|께서|께|님|씨)/g,' ')
.replace(/(전화|통화|연결|콜|call)/gi,' ')
.replace(/(걸어\s*줘?|걸러\s*줘?|걸어|해\s*줘?|줘|좀|바로|부탁(해|해줘)?|해)/g,' ')
.replace(/\s+/g,' ').trim();
return { num:num, name:name, raw:q };
}
function _hasGesture(){ try{ return navigator.userActivation ? navigator.userActivation.isActive : true; }catch(e){ return true; } }
function goCall(info, force){
window._vansActive=true;
var name=info&&info.name;
if(!(info&&info.num) && name && window.Android && typeof window.Android.callContact==='function'){ try{ window.Android.callContact(name); return; }catch(e){} }
var num=(info&&info.num)||((contactFind(name)||{}).num)||'';
if(!num) return;
if(force || _hasGesture()){ openUrl('tel:'+num,'call'); }
}
function vansCallBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var c = (info&&info.num) ? {name:(info&&info.name)||info.num, num:info.num} : contactFind(info&&info.name);
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#13a8a3;margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(42,193,188,.3)'; t.textContent='📞 전화 걸기'+((info&&info.name)?(' — '+info.name):''); body.appendChild(t);
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:10px 0 14px';
note.textContent = c
? ('"'+(c.name||info.name)+'" '+c.num+' 로 전화 앱을 열어요. 통화 버튼만 누르면 됩니다. (보안상 자동 발신은 안 되고, 번호가 채워진 채로 열려요.)')
: ('"'+((info&&info.name)||'이 사람')+'"의 번호가 아직 저장 안 됐어요. 아래에 번호를 한 번만 저장하면, 다음부턴 "'+((info&&info.name)||'OO')+'에게 전화" 한마디로 전화 앱이 그 번호로 바로 떠요. (번호를 직접 말해도 바로 걸려요.)');
body.appendChild(note);
function bigBtn(label, grad, fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
function bigLink(label, grad, href){ var a=document.createElement('a'); a.href=href; a.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;text-align:center;text-decoration:none;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; a.textContent=label; a.onclick=function(){ try{ window._vansActive=true; }catch(e){} }; body.appendChild(a); }
if(c){ bigLink('📞 '+(c.name||info.name)+' 전화 걸기 (눌러서 연결)', 'linear-gradient(135deg,#22c55e,#16a34a)', 'tel:'+c.num); }
vansContactUI(body, info);
}
function vansContactUI(body, info){
var wrap=document.createElement('div'); wrap.style.cssText='margin-top:14px;padding:12px;border-radius:12px;background:rgba(34,197,94,.10);border:1px solid rgba(34,197,94,.45)';
var h=document.createElement('div'); h.style.cssText='font-size:13.5px;font-weight:800;color:#16a34a;margin-bottom:8px'; h.textContent='🔖 내 연락처 (이름→번호 저장 후 바로 전화)'; wrap.appendChild(h);
var list=document.createElement('div'); list.style.cssText='margin-bottom:8px';
function refresh(){
while(list.firstChild) list.removeChild(list.firstChild);
var arr=contacts();
if(!arr.length){ var e=document.createElement('div'); e.style.cssText='font-size:12px;color:#9aa0b4;padding:4px 0'; e.textContent='저장된 연락처가 없어요.'; list.appendChild(e); return; }
arr.forEach(function(s){
var row=document.createElement('div'); row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.08)';
var nm=document.createElement('div'); nm.style.cssText='flex:1;min-width:0;font-size:14px;font-weight:700;color:#141720'; nm.textContent=s.name+' '; var nc=document.createElement('span'); nc.style.cssText='font-size:11px;color:#9aa0b4;font-weight:600'; nc.textContent=s.num; nm.appendChild(nc); row.appendChild(nm);
var goB=document.createElement('button'); goB.textContent='전화'; goB.style.cssText='padding:6px 12px;border:none;border-radius:8px;background:#22c55e;color:#fff;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; goB.onclick=function(){ window._vansActive=true; openUrl('tel:'+s.num,'call'); }; row.appendChild(goB);
var delB=document.createElement('button'); delB.textContent='삭제'; delB.style.cssText='padding:6px 9px;border:none;border-radius:8px;background:#e5e7eb;color:#555;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer'; delB.onclick=function(){ contactDel(s.name); refresh(); }; row.appendChild(delB);
list.appendChild(row);
});
}
refresh(); wrap.appendChild(list);
var form=document.createElement('div'); form.style.cssText='display:flex;gap:6px;align-items:center';
var nIn=document.createElement('input'); nIn.type='text'; nIn.placeholder='이름(예: 수)'; nIn.value=(info&&info.name)||''; nIn.style.cssText='width:96px;flex-shrink:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var pIn=document.createElement('input'); pIn.type='tel'; pIn.inputMode='tel'; pIn.placeholder='전화번호'; pIn.value=(info&&info.num)||''; pIn.style.cssText='flex:1;min-width:0;padding:9px;border:1px solid #d8dae2;border-radius:8px;font-size:13px;font-family:inherit';
var sB=document.createElement('button'); sB.textContent='저장'; sB.style.cssText='padding:9px 12px;border:none;border-radius:8px;background:#16a34a;color:#fff;font-size:13px;font-weight:800;font-family:inherit;cursor:pointer';
sB.onclick=function(){ if(contactSave(nIn.value, pIn.value)){ pIn.value=''; refresh(); } else { alert('이름과 전화번호(숫자)를 모두 입력해줘.'); } };
form.appendChild(nIn); form.appendChild(pIn); form.appendChild(sB); wrap.appendChild(form);
var hint=document.createElement('div'); hint.style.cssText='font-size:11px;color:#9aa0b4;margin-top:6px;line-height:1.5'; hint.textContent='번호는 이 기기에만 저장돼요(서버 없음). 한 번 저장하면 "이름에게 전화"로 바로 걸려요.'; wrap.appendChild(hint);
body.appendChild(wrap);
}
function smsIntent(q){
q=String(q||'');
if(!/(문자|메시지|메세지|sms)/i.test(q)) return false;
if(/방법|어떻게|기능|활용|안\s*되|못\s*(해|보)|뭐야|뜻/.test(q)) return false;
if(/보내|전송|발신|써\s*줘|작성|해\s*줘|줘|에게|한테|께/.test(q)) return true;
return false;
}
function smsParse(q){
q=String(q||'');
var numM=q.match(/(\+?\d[\d\-\s]{6,}\d)/); var num=numM?numM[1].replace(/[^0-9+]/g,''):'';
var qq=q.replace(/(\+?\d[\d\-\s]{6,}\d)/g,' ');
var name=''; var m=qq.match(/^\s*(.+?)(?:에게|한테|께서|께)/); if(m) name=m[1].trim();
var body=''; var bm=qq.match(/(?:에게|한테|께서|께)\s*(.*?)\s*(?:문자|메시지|메세지|sms)/i);
if(bm){ body=bm[1].trim(); }
else { body=qq.replace(/^\s*.+?(에게|한테|께서|께)/,'').replace(/(문자|메시지|메세지|sms|전송|발신|보내\s*줘?|보내|써\s*줘?|작성|줘|해\s*줘?|해|좀|부탁(해|해줘)?)/gi,' ').replace(/\s+/g,' ').trim(); }
body=body.replace(/고\s*$/,'').trim();
if(name) name=name.replace(/(문자|메시지|전화)/g,'').trim();
if(!name && num) name=num;
return { name:name, num:num, body:body, raw:q };
}
function goSms(info, force){
window._vansActive=true;
var body=(info&&info.body)||''; var bq=body?('?body='+encodeURIComponent(body)):'';
var name=info&&info.name;
if(!(info&&info.num) && name && window.Android && typeof window.Android.smsContact==='function'){ try{ window.Android.smsContact(name, body); return; }catch(e){} }
var num=(info&&info.num)||((contactFind(name)||{}).num)||'';
if(!num){ if(force) openUrl('sms:'+bq,'sms'); return; }
if(force || _hasGesture()){ openUrl('sms:'+num+bq,'sms'); }
}
function vansSmsBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var c = (info&&info.num) ? {name:(info&&info.name)||info.num, num:info.num} : contactFind(info&&info.name);
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#13a8a3;margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(42,193,188,.3)'; t.textContent='💬 문자 보내기'+((info&&info.name)?(' — '+info.name):''); body.appendChild(t);
if(info&&info.body){ var bp=document.createElement('div'); bp.style.cssText='font-size:14px;color:#141720;font-weight:700;background:rgba(0,0,0,.04);border-radius:10px;padding:10px 12px;margin:4px 0 10px'; bp.textContent='“'+info.body+'”'; body.appendChild(bp); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:4px 0 12px';
note.textContent = c
? ('"'+(c.name||info.name)+'" '+c.num+' 로 문자 작성 화면이 열려요(내용 자동 입력). 전송 버튼만 누르면 됩니다. (보안상 자동 전송은 안 돼요.)')
: ('"'+((info&&info.name)||'이 사람')+'"의 번호가 아직 저장 안 됐어요. 아래에 번호를 한 번만 저장하면, 다음부턴 "'+((info&&info.name)||'OO')+'에게 ~문자" 한마디로 그 번호 문자 화면이 바로 떠요. (번호를 직접 말해도 바로 돼요.)');
body.appendChild(note);
function bigBtn(label, grad, fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
if(c){ var _b=(info&&info.body)||''; var _h='sms:'+c.num+(_b?('?body='+encodeURIComponent(_b)):''); var a=document.createElement('a'); a.href=_h; a.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#fff;text-align:center;text-decoration:none;background:linear-gradient(135deg,#3b82f6,#2563eb);box-shadow:0 4px 12px rgba(0,0,0,.14)'; a.textContent='💬 '+(c.name||info.name)+'에게 문자 (눌러서 작성)'; a.onclick=function(){ try{ window._vansActive=true; }catch(e){} }; body.appendChild(a); }
vansContactUI(body, info);
}
function kakaoIntent(q){
q=String(q||'');
if(!/(카톡|카카오톡|카카오\s*톡)/.test(q)) return false;
if(/방법|어떻게|기능|활용|안\s*되|못\s*(해|보)|뭐야|설치|뜻/.test(q)) return false;
return true;
}
function kakaoParse(q){
q=String(q||'');
var name='', body='';
var cm=q.match(/^\s*(.+?)\s*카(?:카오)?톡\s*[:：]\s*(.+)$/);
if(cm){ name=cm[1].replace(/카카오톡|카톡|카카오/g,'').trim(); body=cm[2].trim(); }
if(!name){ var rm=q.match(/([가-힣A-Za-z0-9][가-힣A-Za-z0-9&·\s]*?)\s*방(?:에|에서|으로|:|：|\s)/); if(rm) name=rm[1].replace(/카카오톡|카톡|카카오/g,'').replace(/\s+/g,' ').trim(); }
if(!body){ var mm=q.match(/메시지\s*[:：]\s*(.+)$/); if(mm) body=mm[1].trim(); }
if(!body){ var bm=q.match(/(?:방에|에게|한테|께)\s*(.+?)\s*(?:라고)?\s*(?:보내|전해|전달|말해|공지|알려|톡)/); if(bm && bm[1].trim()) body=bm[1].trim(); }
if(!body){ body=q.replace(/카카오톡|카톡|카카오|메시지|공지|전송|전해\s*줘?|전달|말해\s*줘?|보내\s*줘?|보내|써\s*줘?|작성|줘|해\s*줘?|좀|으로|로|[:：]/gi,' ').replace(/[가-힣A-Za-z0-9·\s]*?방(?:에|에서|으로)?/,' ').replace(/\s+/g,' ').trim(); }
body=body.replace(/\s+(?:라고|이라고|하고|다고|고)$/,'').replace(/([가-힣])고$/,'$1').trim();
if(!name){ var nm=q.match(/^\s*(.+?)(?:에게|한테|께서|께)/); if(nm) name=nm[1].replace(/카카오톡|카톡|카카오/g,'').trim(); }
return { name:name, room:name, body:body, raw:q };
}
function goKakaoOpen(){ _openApp('intent:#Intent;package=com.kakao.talk;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.kakao.talk;end', 'com.kakao.talk'); }
function goKakao(info){ window._vansActive=true; var body=(info&&info.body)||''; if(body){ try{ navigator.clipboard.writeText(body); }catch(e){} } goKakaoOpen(); }
function vansKakaoBack(info, fullq){
if(typeof vansOpen==='function') vansOpen();
var inp=document.getElementById('vans-q'); if(inp) inp.value=fullq||(info&&info.raw)||'';
var body=document.getElementById('vans-body'); if(!body) return;
while(body.firstChild) body.removeChild(body.firstChild);
var t=document.createElement('div'); t.style.cssText='font-size:17px;font-weight:800;color:#3b2f00;margin:4px 0 8px;padding-bottom:8px;border-bottom:2px solid rgba(249,224,0,.7)'; t.textContent='💬 카카오톡 보내기'+((info&&info.name)?(' — '+info.name):''); body.appendChild(t);
if(info&&info.body){ var bp=document.createElement('div'); bp.style.cssText='font-size:15px;color:#141720;font-weight:700;background:rgba(0,0,0,.04);border-radius:10px;padding:12px 14px;margin:4px 0 12px;white-space:pre-wrap'; bp.textContent=info.body; body.appendChild(bp); }
var note=document.createElement('div'); note.style.cssText='font-size:12.5px;color:#5b6178;line-height:1.6;margin:4px 0 12px';
note.textContent='카카오톡은 앱 정책상 "특정 친구에게 자동 입력·자동 전송"이 안 돼요(스팸 방지). 그래서 메시지를 복사해 두고 카톡을 열어드릴게요. '+((info&&info.name)?('"'+info.name+'"'):'받는 사람')+' 채팅방에서 입력창을 길게 눌러 "붙여넣기"만 하면 됩니다.';
body.appendChild(note);
function aBtn(label, grad, fn){ var b=document.createElement('button'); b.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:800;color:#3b2f00;background:'+grad+';box-shadow:0 4px 12px rgba(0,0,0,.14)'; b.textContent=label; b.onclick=fn; body.appendChild(b); }
if(info&&info.body){ aBtn('📋 메시지 복사 + 카톡 열기', 'linear-gradient(135deg,#FFE14D,#F9E000)', function(){ goKakao(info); }); }
else { aBtn('💬 카카오톡 열기', 'linear-gradient(135deg,#FFE14D,#F9E000)', function(){ goKakaoOpen(); }); }
if(info&&info.body){ var cp=document.createElement('button'); cp.style.cssText='display:block;width:100%;box-sizing:border-box;margin-bottom:10px;padding:13px;border:none;border-radius:12px;cursor:pointer;font-family:inherit;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#6b7280,#4b5563)'; cp.textContent='📋 메시지만 복사'; cp.onclick=function(){ try{ navigator.clipboard.writeText(info.body); cp.textContent='✅ 복사됐어요! 카톡에서 붙여넣기'; }catch(e){ alert('길게 눌러 직접 복사: '+info.body); } }; body.appendChild(cp); }
}
