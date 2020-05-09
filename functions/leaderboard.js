const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.leaderboard = functions.database.ref('/leaderboard')
		.onUpdate((change,context) => {
			const leads = change.after.val();
			console.log(leads);
			const payload = {
				data: {
					leads: JSON.stringify(leads)
				}
			};
			console.log(payload);
			return admin.messaging().sendToTopic("leaderboard",payload);
	});

