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
	const promiseChain = clients.matchAll({
		type: 'window',
		includeUncontrolled: true
	  })
	  .then((windowClients) => {
		for (let i = 0; i < windowClients.length; i++) {
		  const windowClient = windowClients[i];
		  windowClient.postMessage(payload);
		}
	  })
	  .then(() => {
		return self.registration.showNotification(notificationTitle,
			notificationOptions);
	  });
	  return promiseChain;
	// return self.registration.showNotification(notificationTitle,
	//   notificationOptions);
  });