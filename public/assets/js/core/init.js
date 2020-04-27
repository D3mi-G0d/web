firebase.auth().onAuthStateChanged(function(user)
{
	if(user)
	{
		let welcome = document.getElementById('welcome');
		if(welcome)
		welcome.innerText = welcome.innerText.slice(0,-1) + ', ' + user.displayName + '!';
		let primaryAct = document.getElementById('primary-action');
		if(primaryAct)
		{
			primaryAct.href = '/problem-statement.html';
			primaryAct.innerText = 'View Problems';
		}
		let participant = document.getElementById('participant');
		if(participant)
		participant.innerText = user.displayName + ', please select the block you want to sumbit answer for.';
	}
});
