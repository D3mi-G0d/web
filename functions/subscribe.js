const functions = require('firebase-functions');
const admin = require('firebase-admin');


exports.subscribe = functions.https.onCall((data, context) => {
	const token = data.token;
	return admin.messaging().subscribeToTopic(token, "leaderboard")
	.then(function(response) {
		console.log('Successfully subscribed to topic:', response);
		return { data: {
			status: "successful"
		} };
	})
	.catch(function(error) {
		console.log('Error subscribing to topic:', error);
		return { data: {
			status: "failed"
		} };
	});
});
