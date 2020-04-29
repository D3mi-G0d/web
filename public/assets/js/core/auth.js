if(window.location.pathname == '/accounts.html')
{
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	ui.start('#login-container', {
		signInSuccessUrl: '/rules.html',
		callbacks: {
			'signInSuccessWithAuthResult': function(user, credential, redirectUrl) {
			if (window.opener) {
					// The widget has been opened in a popup, so close the window
					// and return false to not redirect the opener.
					window.close();
					return false;
				} 
				else {
				// The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
				return true;
				}
			}
		},
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		// Other config options...
	});
}

let loginbttn = document.getElementById("loginbttn");
if(loginbttn)
{
	loginbttn.addEventListener("click", function(){
		window.open('/accounts.html', 'Sign In', 'width=600,height=600');
	});
}
