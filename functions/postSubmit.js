// freeze the document of participant
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.postSubmit = functions.https.onCall( async (data, context) => {
	const startTime = 1589291100;
	const now = Date.now();
	if(context.auth && startTime < now)
	{
		const participants = admin.firestore().collection('participants');
		let userDoc = await participants.doc(context.auth.uid).get();
		let userData = userDoc.data();
		let freeze = {};
		Object.keys(userData.output).forEach(function(k){
			if(!(userData.output[k] <= 450))		// if not submitted, score 0
			{
				freeze[`output.${k}`] = 0;
			}
		});
		if(Object.keys(freeze).length != 0)
		{
			participants.doc(context.auth.uid).update(freeze);
		}
		let leaderList = await participants.orderBy('score','desc').limit(10).get();
		for(let i = 0; i < leaderList.size; i++)
		{
			if(leaderList.docs[i].id == context.auth.uid)
			{
				console.log(leaderList.docs[i].id);
				return {data: "top"}
			}
		}
		return {data: "general"};
	}
	return {data: "failed"};
});


