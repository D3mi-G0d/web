
const messaging = firebase.messaging();
const db = firebase.database();
window.nreflflag = 1;
window.addEventListener('DOMContentLoaded', e => {
	db.ref('/leaderboard').once('value').then(snapshot => {
		updateBoard(snapshot.val());
	}).catch(e => {
		console.log(e);
	});
});


messaging.getToken().then(token => {
	console.log(token);
	var leaderboardSub = firebase.functions().httpsCallable('subscribe');
	if(localStorage.getItem("leader_sub") == null || localStorage.getItem("leader_sub") === "0")
	{
		leaderboardSub({token: token}).then(function(result) {
		if(result.data.data.status === "successful") {localStorage.setItem("leader_sub","1");}
		console.log(result.data.data.status);
		}).catch(e => {
			console.log(e);
		});
	}
}).catch(e => {
	console.log(e);
	// Notification aceess denied!
	// show any custom warning
	// if you want button click refresh, implement here
	});

messaging.onTokenRefresh(() => {
	messaging.getToken().then((refreshedToken) => {
	  console.log('Token refreshed.');
	var leaderboardSub = firebase.functions().httpsCallable('subscribe');
	if(!localStorage.getItem("leader_sub") || localStorage.getItem("leader_sub") === "0")
	{
		leaderboardSub({token: refreshedToken}).then(function(result) {
		if(result.data.data.status === "successful") {localStorage.setItem("leader_sub","1");}
		console.log(result.data.data.status);
		}).catch(e => {
			console.log(e);
		});
	}
	  // ...
	}).catch((err) => {
	  console.log('Unable to retrieve refreshed token ', err);
	});
  });


messaging.onMessage((payload) => {
	console.log('onMessage : ',payload);
	updateBoard(JSON.parse(payload.data.leads));
});


function updateBoard(leaderboard)
{
	let names = leaderboard.name;
	let scores = leaderboard.score;
	console.log("Highest : ",names[0],scores[0]);
	for(let i = 0;i < names.length;i++)
	{
		document.getElementById("name"+i.toString()).innerText = names[i];
		document.getElementById("point"+i.toString()).innerText = scores[i];
	}
}


document.getElementById("refresh_board").onclick = (e) => {
	// start loading animation
	if(window.nreflflag)
	{
		db.ref('/leaderboard').once('value').then(snapshot => {
			window.nreflflag = 0;
			// stop loading animation
			setTimeout(() => {
				window.nreflflag = 1;
			},2000*60);
			updateBoard(snapshot.val());
		}).catch(e => {
			console.log(e);
		});
	}
	else
	{
		setTimeout(() => {
			// loading animation
		},3000);
	}
};

