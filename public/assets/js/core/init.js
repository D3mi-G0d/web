firebase.auth().onAuthStateChanged(function(user)
{
	if(user)
	{
		if(window.location.pathname == '/registration.html')
		window.location.href = '/rules.html';
		let acnav = document.getElementById('acnav');
		if(acnav)
		acnav.innerHTML = `<li>` + user.displayName + `</li>
		<li><a href="#" class="icon solid solo fa-sign-out-alt" onClick="signOut();"><span class="label">Sign Out</span></a></li>`
		let primaryAct = document.getElementById('primary-action');
		if(primaryAct)
		{
			primaryAct.href = '/rules.html';
			primaryAct.innerText = 'Rules & Regulations';
		}
		let participant = document.getElementById('participant');
		if(participant)
		participant.innerText = user.displayName + ', please select the block you want to sumbit answer for.';
	}
	else
	{
		let primaryAct = document.getElementById('primary-action');
		if(primaryAct)
		{
			primaryAct.href = '/registration.html';
			primaryAct.innerText = 'Register Now!';
		}
	}
});

function signOut()
{
	firebase.auth().signOut().then(function() {
		let acnav = document.getElementById('acnav');
		acnav.innerHTML = `<li><a href="#" class="icon solid solo fa-sign-in-alt" onClick="window.open('/accounts.html', 'Sign In', 'width=600,height=600');"><span class="label">Sign In</span></a></li>`;
	}).catch(function(error) {
	// An error happened.
	});
	  
}

var user = firebase.auth().currentUser;

if(!user)
{
	let _path = window.location.pathname;
	if(_path=='/problem-statements.html') window.location.href = '/registration.html';
}
