var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#login-container', {
	signInSuccessUrl: '/problem-statement.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: true
		},
	],
	// Other config options...
});

document.querySelector("[data-provider-id=password]").style.backgroundColor = '#000000'
