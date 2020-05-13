// trigered on every leaderboard change.
// sends push notification
// private func

const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const serverTime = Date.now();
const startTime = new Date("2020-05-12 19:15+05:30").getTime();	// 12th May 7:15PM 2020 IST
// const endTime = 1589300100;		// 12th May 9:45PM 2020 IST
const endTime = new Date("2020-05-12 21:45+05:30").getTime();			// 10th May 10:30AM FOR TESTING! PLEASE DELETE

const pointTable = {
	tetris: 1,
	minecraft: 1,
	hl: 2,
	nfs: 2,
	dmc: 3
};


exports.submit = functions.storage.object().onFinalize(async (object) => {
	const sMd5 = Buffer.from(object.md5Hash, 'base64').toString('hex');
	const timestamp = object.timeCreated;
	const serverTime = new Date(timestamp).getTime();
	const participants = admin.firestore().collection('participants');
	let name = object.name.split("/");
	if(serverTime < startTime) return null;
	if(name[0] == 'submissions')
	{
		let uid = name[1].trim();
		let level = name[2].split(".")[0].trim();
		if(!uid && !level) return null;
		let userDoc = await participants.doc(uid).get();
		let userData = userDoc.data();
		let pointGain = 0;
		let usersUpdate = {};
		if(userData.output[level] <= 450)	// already submitted. Ignore.
		{
			return null;
		}
		else
		{
			if(userData.output[level] == sMd5)
			{
				pointGain = pointTable[level] * Math.floor((endTime - serverTime) / 60000);
			}
			else{
				pointGain = 0;
			}
		}
		if(pointGain === 0) {
			usersUpdate[`output.${level}`] = 0;
			return participants.doc(uid).update(usersUpdate);
		}
		else {
			usersUpdate[`output.${level}`] = pointGain;
			usersUpdate['score'] = userData.score + pointGain;
			await participants.doc(uid).update(usersUpdate);
			let leaderBoard = await participants.orderBy('score','desc').limit(5).get();
			const len = leaderBoard.size;
			if (leaderBoard.docs[len-1].data().score <= usersUpdate['score'])	// woo hoo. in top 5
			{
				let leaderList = [];
				let scoreList = [];
				let i = 0;
				while((i < len) && leaderBoard.docs[i].data().score)
				{
					leaderList.push(leaderBoard.docs[i].data().username);
					scoreList.push(leaderBoard.docs[i].data().score);
					i++;
				}
				let db = admin.database();
				return db.ref("/leaderboard").set({
					name: leaderList,
					score: scoreList
				});
			}
			else return null;
		}
	}
	else
	{
		return null;
	}
});

