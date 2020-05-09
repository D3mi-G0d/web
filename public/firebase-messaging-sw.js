importScripts('/__/firebase/7.14.2/firebase-app.js');
importScripts('/__/firebase/7.14.2/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	const notificationTitle = '#!SHEBANG Leaderboard';
	const notificationOptions = {
	  body: "Heighest Score : "+JSON.parse(payload.data.leads).score[0],
	};
  
	return self.registration.showNotification(notificationTitle,
	  notificationOptions);
  });