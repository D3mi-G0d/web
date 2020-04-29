if(window.location.pathname == '/accounts.html')
{
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	ui.start('#login-container', {
		signInSuccessUrl: '/rules.html',
		callbacks: {
			'signInSuccessWithAuthResult': function(authResult, redirectUrl) {
			if (window.opener) {
					if(!authResult.user.emailVerified)
					{
						if(authResult.additionalUserInfo.isNewUser)
						{
							document.getElementById("login-container").innerText = "Sending Email Verification Link...";
							authResult.user.sendEmailVerification().then(function(){
								window.close();
							}).catch(function(error){
								document.getElementById("login-container").innerText = "Oops! Can't Verify Email!";
							})
						}
					}
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

let loginbttn = document.getElementById("loginbttn");
if(loginbttn)
{
	loginbttn.addEventListener("click", function(){
		window.open('/accounts.html', 'Sign In', 'width=600,height=600');
	});
}

function verifyMail()
{
	let user = firebase.auth().currentUser;
	if(!user) window.location.href = '/registration.html';
	else
	{
		if(user.emailVerified)
		{
			window.location.href = '/rules.html';
		}
		else
		{
			let verifybttn = document.getElementById("email-v-bttn");
			document.getElementById("ev-confirmation").innerText = "Sending Email...";
			verifybttn.addEventListener("click",
				function()
				{
					document.getElementById("email-v-bttn").removeEventListener("click");
					user.sendEmailVerification().then(function() {
						document.getElementById("ev-confirmation").innerText = "Email Sent. Please Verify";
					}).catch(function(error) {
						document.getElementById("ev-confirmation").innerText = "Oops! Can't send mail :(";
					});
				}
			);
		}
	}
}
