let getStatement = async function(level) {
	let token = localStorage.getItem("qid-token");
	let statement;
	if(token != firebase.auth().currentUser.uid)
	{
		localStorage.removeItem(level);
		localStorage.setItem("qid-token",firebase.auth().currentUser.uid);
	}
	if(token)
	{
		statement = localStorage.getItem(level);
	}
	if(!statement)
	{
		serverResp = await fetch('http://localhost:5001/csbs-snu/us-central1/statement?level='+level);
		statement = await serverResp.json();
		statement.submission = {
			input: "storage_bucket_url/" + firebase.auth().currentUser.uid,
		};
		localStorage.setItem(level,statement);
	}
	return statement;
}

firebase.auth().onAuthStateChanged(function(user)
{
	if(user)
	{
		getStatement('http://www.shebang.co.in/question.html?id').then((statement) => { //is this how its supposed to be? parameter part...
			
			document.getElementById("lev").innerHTML = statement.level;
			document.getElementById("state").innerHTML = statement.statement;
			document.getElementById("input").innerHTML = statement.sample.input;
			document.getElementById("output").innerHTML = statement.sample.output;

			var end = new Date("May 12, 2020 21:30:00").getTime();
        	var wait = setInterval(function() {
            	var now = new Date().getTime();
            	var mrem = (end - now) / 60000;
				var mrem = Math.abs(Math.round(mrem));
				var scorerem = mrem * statement.scorepm;
            	document.getElementById("mrem").innerHTML = scorerem + " points remaning";
            	if (mrem < 0) {
                	clearInterval(wait);
                	document.getElementById("mrem").innerHTML = "EXPIRED";
            	}
        	}, 60 * 1000);

			console.log(statement);

		}).catch( e => {
			// handle error here
			// e has the error code
		});
	}
	else
	{
		// user is unauthorised
	}
});

