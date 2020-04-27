var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#login-container', {
	signInSuccessUrl: '/problem-statement.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Other config options...
  });
  