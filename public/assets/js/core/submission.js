window.addEventListener("DOMContentLoaded", event => {
		document.getElementById("submbtn").onclick = function() {
			showLoad("UPLOADING");
			// TODO: Add loading animation
			// OR: show status in the button. Current Status : processing...
			const fileinput = document.getElementById("fileinput").files[0];
			var fileINF = new FileReader();
			fileINF.onload = function() {
				let ansStr = fileINF.result.replace(/\s/g,'');
				console.log(ansStr);
				let blob = new Blob([ansStr], {
					type: 'text/plain'
				});
				// current status : uploading
				let storageRef = firebase.storage().ref();
				let fileRef = storageRef.child('submissions/'+firebase.auth().currentUser.uid+'/'+new URLSearchParams(window.location.search).get('id')+'.txt');
				fileRef.put(blob).then(snapshot => {
					console.log("Upload Success!");
				}).catch(e => { console.log(e); showErr(e); });
				// current status : evaluating
				document.getElementById("loadtxt").innerText = "EVALUATING";
				syncWithDB();
			}
			if(fileinput instanceof Blob)
			{
				fileINF.readAsText(fileinput);
			}
			else
			{
				showPage();
			}
			
		}
});


function syncWithDB() {
	let db = firebase.firestore();
	var sb = db.collection("participants").doc(firebase.auth().currentUser.uid)
    .onSnapshot(function(doc) {
		console.log("Current data: ", doc.data());
		let lvl = new URLSearchParams(window.location.search).get('id');
		let state = doc.data().output[lvl];
		if(state<=450)		// check if it is valid score
		{
			// set status to correct / wrong
			//	result updated
			sb();	// stop polling
			localStorage.setItem("myscore",JSON.stringify(doc.data()));
			let score = state;	// score of this problem
			document.getElementById("cur-scr").innerText = score;
			document.getElementsByClassName("close")[0].click();	// close the modal
			let sbtn = document.getElementById("myBtn");
			sbtn.innerText = "Attempted!";
			sbtn.id = "";
			sbtn.disabled = true;
			sbtn.classList.add("disabled");
			sbtn.classList.remove("fa-upload");
			sbtn.classList.add("fa-check");
			document.getElementById("sub_input").remove();
			clearInterval(window.wait);
			showPage();
		}
    });
}

firebase.auth().onAuthStateChanged((user) => {
	// let db = firebase.firestore();
	// var sb = db.collection("participants").doc(firebase.auth().currentUser.uid)
    // .get().then(function(doc) {
	// 	console.log("Current data: ", doc.data());
		var currStat = localStorage.getItem("myscore");
		if(!currStat) return;
		currStat = JSON.parse(currStat);
		let lvl = new URLSearchParams(window.location.search).get('id');
		let state = currStat.output[lvl];
		if(state)
		{
			if (state <= 450)
			{
				document.getElementById("cur-scr").innerText = state;
				let sbtn = document.getElementById("myBtn");
				sbtn.innerText = "Attempted!";
				sbtn.id = "";
				sbtn.disabled = true;
				sbtn.classList.add("disabled");
				sbtn.classList.remove("fa-upload");
				sbtn.classList.add("fa-check");
				document.getElementById("sub_input").remove();
				clearInterval(window.wait);
			}
		}
	// });
});



