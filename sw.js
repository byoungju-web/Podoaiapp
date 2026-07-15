/* Podoya Service Worker — "서버 = 알람시계" 설계의 폰 쪽 절반
   서버가 보낸 "일어나" 푸시를 받아 알림만 띄운다.
   여기서 Stripe·Gmail을 직접 부르지 않는다:
     · Service Worker에는 localStorage가 없다 → 키를 읽을 수 없다
     · 키를 IndexedDB로 복사하면 공격 표면만 늘어난다
     · 크롬은 푸시를 받으면 어차피 알림을 반드시 띄워야 한다
   실행은 사용자가 알림을 탭한 뒤 앱 안에서 한다.
   → 서버도 SW도 키를 본 적이 없다. */

var APP = './index.html';

self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function(e){
  var d = {};
  try { d = e.data ? e.data.json() : {}; }
  catch (err) { try { d = { body: e.data.text() }; } catch (e2) { d = {}; } }

  var url = d.url || (d.id ? (APP + '?report=' + encodeURIComponent(d.id)) : APP);
  var opts = {
    body: d.body || '탭하면 정리해드려요',
    tag: d.tag || 'podoya',
    renotify: true,
    requireInteraction: !!d.sticky,
    data: { url: url },
    vibrate: [80, 40, 80]
  };
  e.waitUntil(self.registration.showNotification(d.title || '🍇 포도야', opts));
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || APP;
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list){
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        if (c.url.indexOf('index.html') >= 0 || c.url.indexOf('/Podoaiapp/') >= 0) {
          if ('navigate' in c) { try { c.navigate(url); } catch (err) {} }
          if ('focus' in c) return c.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

self.addEventListener('pushsubscriptionchange', function(e){
  e.waitUntil(self.registration.showNotification('🍇 포도야', {
    body: '알림 연결이 갱신됐어요. 앱을 한 번 열어주세요.',
    tag: 'podoya-resub',
    data: { url: APP }
  }));
});
