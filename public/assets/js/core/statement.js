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
		getStatement("tetris").then((statement) => {
			// you got the result. 
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

