const storage = firebase.storage();
// firebase.functions().useFunctionsEmulator('http://localhost:5001');	// remove before deploy
const getStatement = async function(level) {
	let token = localStorage.getItem("qid-token");
	let statement;
	if(token != firebase.auth().currentUser.uid)
	{
		localStorage.removeItem(level);
		localStorage.removeItem("myscore");
		localStorage.setItem("qid-token",firebase.auth().currentUser.uid);
	}
	if(token)
	{
		statement = localStorage.getItem(level);
		if(localStorage.vertime < new Date("May 17, 2020 19:00:00").getTime())
		{
			statement = null;
		}
		
	}
	if(!statement)
	{
		statementRef = firebase.functions().httpsCallable('statement');
		serverResp = await statementRef({level: level});
		statement = serverResp.data.data;
		if(statement === "Unauthorised") throw new Error("Unauthorised");
		statement.submission = {
			input: await storage.refFromURL('gs://csbs-snu.appspot.com/dataset/'+level+'/'+firebase.auth().currentUser.uid+'.txt').getDownloadURL()
		};
		localStorage.setItem(level,JSON.stringify(statement));
		localStorage.setItem("vertime",Date.now());
		return statement;
	}
	return JSON.parse(statement);
}

firebase.auth().onAuthStateChanged(function(user)
{
	if(user)
	{
		console.log("user found");
		showLoad();
		getStatement(new URLSearchParams(window.location.search).get('id')).then((statement) => {
			
			document.getElementById("lev").innerHTML = statement.level;
			document.getElementById("state").innerHTML = statement.statement;
			document.getElementById("input").innerHTML = statement.sample.input;
			document.getElementById("output").innerHTML = statement.sample.output;
			document.getElementById("sub_input").href = statement.submission.input;
			document.getElementById("sub_input").download = statement.level + '.txt';
			console.log("got statement");
			updateScore(statement);
			showPage();
			window.wait = setInterval(function() {
				
				var end = new Date("May 17, 2020 21:45:00").getTime();
				var now = new Date().getTime();
				var mrem = (end - now) / 60000;
				var mrem = Math.abs(Math.round(mrem));
				var scorerem = mrem * statement.scorepm;
				document.getElementById("cur-scr").innerHTML = scorerem + " points remaning";
				if (mrem < 0) {
					clearInterval(window.wait);
					document.getElementById("cur-scr").innerHTML = "EXPIRED";
				}
			}, 60 * 1000);

		}).catch( e => {
			console.log(e);
			showPage();
			showErr(e);
			// handle error here
			// e has the error code
		});
	}
	else
	{
		showErr(new Error("Unauthorized!"));
		
		// user is unauthorised
	}
});

function updateScore(statement)
{
	var end = new Date("May 17, 2020 21:45:00").getTime();
	var now = new Date().getTime();
	var mrem = (end - now) / 60000;
	var mrem = Math.abs(Math.round(mrem));
	var scorerem = mrem * statement.scorepm;
	document.getElementById("cur-scr").innerHTML = scorerem + " points remaning";
	return mrem;
}
