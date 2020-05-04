try
{
	firebase.analytics();
}
catch
{
	console.log("Analytics are disabled....");
}

firebase.auth().onAuthStateChanged(function(user)
{
	if(user)
	{
		if(window.location.pathname == '/registration')
		window.location.href = '/rules';
		let acnav = document.getElementById('acnav');
		if(acnav)
		acnav.outerHTML = `<ul class="icons" id="acnav"><li>` + user.displayName + `</li>
		<li><a href="#header" class="icon solid solo fa-sign-out-alt" onClick="signOut();"><span class="label">Sign Out</span></a></li></ul>`;
		let primaryAct = document.getElementById('primary-action');
		if(primaryAct)
		{
			primaryAct.href = '/rules';
			primaryAct.innerText = 'Rules & Regulations';
		}
		let participant = document.getElementById('participant');
		if(participant)
		participant.innerText = user.displayName + ', please select the block you want to sumbit answer for.';
		if(!user.emailVerified)
		{
			window.location.href = '/verify';
		}
		else if(user.emailVerified && window.location.pathname == '/verify') window.location.href = '/rules';
	}
	else
	{
		let primaryAct = document.getElementById('primary-action');
		if(primaryAct)
		{
			primaryAct.href = '/registration';
			primaryAct.innerText = 'Register Now!';
		}
	}
});

function signOut()
{
	firebase.auth().signOut().then(function() {
		let acnav = document.getElementById('acnav');
		acnav.outerHTML = `
		<ul class="icons" id="acnav" onClick="window.open('/accounts.html', 'Sign In', 'width=600,height=600');">
			<li><b>Sign In</b></li>
			<li><a href="#header" class="icon solid solo fa-sign-in-alt"><span class="label">Sign In</span></a></li>
		</ul>
		`;
	}).catch(function(error) {
	// An error happened.
	});
	  
}

if(window.location.pathname == '/problem-statements')
{
	setInterval(() => {
		if(!firebase.auth().currentUser) window.location.href = '/rules';
	}, 5000);
}
