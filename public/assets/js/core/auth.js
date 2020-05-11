//   // Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyCguAZ2izaYNQfufJRP-h6wUdI0KRi1GHA",
	authDomain: "shebang.co.in",
	databaseURL: "https://csbs-snu.firebaseio.com",
	projectId: "csbs-snu",
	storageBucket: "csbs-snu.appspot.com",
	messagingSenderId: "148722603945",
	appId: "1:148722603945:web:a4abed64cf0471449f56b8",
	measurementId: "G-8YC1R0P75C"
};
firebase.initializeApp(firebaseConfig);
function loginUI()
{
	setInterval(() => {
		if(firebase.auth().currentUser) window.close();
	}, 750);
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	ui.start('#login-container', {
		signInSuccessUrl: '/rules',
		callbacks: {
			'signInSuccessWithAuthResult': function(authResult, redirectUrl) {
			if (window.opener) {
					if(!authResult.user.emailVerified)
					{
						if(authResult.additionalUserInfo.isNewUser)
						{
							document.getElementById("login-container").innerText = "Sending Email Verification Link...";
							authResult.user.sendEmailVerification().then(function(){
								console.log("sent");
								window.close();
							}).catch(function(error){
								document.getElementById("login-container").innerText = "Oops! Can't Verify Email!";
								console.log(e);
							})
						}
					}
					else
						window.close();
					// The widget has been opened in a popup, so close the window
					// and return false to not redirect the opener.
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


function verifyMail()
{
	let user = firebase.auth().currentUser;
	console.log(user)
	if(user)
	{
		if(user.emailVerified)
		{
			window.location.href = '/rules';
		}
		else
		{
			let verifybttn = document.getElementById("email-v-bttn");
			// document.getElementById("ev-confirmation").innerText = "Sending Email...";
			verifybttn.addEventListener("click",
				function()
				{
					document.getElementById("email-v-bttn").innerText = "Sending Email...";
					document.getElementById("email-v-bttn").removeEventListener("click");
					user.sendEmailVerification().then(function() {
						document.getElementById("ev-confirmation").innerText = "Email Sent Again. Please check your inbox & Verify";
						document.getElementById("email-v-bttn").innerText = "Mail Sent!";
					}).catch(function(error) {
						document.getElementById("ev-confirmation").innerText = "Oops! Can't send mail :(";
					});
				}
			);
		}
	}
}

firebase.auth().onAuthStateChanged(function(user)
{
	if(window.location.pathname == '/verify') verifyMail();
});

if(window.location.pathname == '/accounts') loginUI();

if(window.location.pathname == '/verify')
{
	setInterval(() => {
		if(!firebase.auth().currentUser) window.location.href = '/rules';
	}, 5000);
}

