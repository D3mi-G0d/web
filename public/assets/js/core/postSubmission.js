// firebase.functions().useFunctionsEmulator('http://localhost:5001');	// remove before deploy
firebase.auth().onAuthStateChanged(function(user){
	document.getElementById("final-sub").onclick = async () => {
		const psRef = firebase.functions().httpsCallable('postSubmit');
		const psResp = await psRef();
		const category = psResp.data.data;
		console.log(category);
		console.log(psResp.data);
		if(category == "top")
		{
			document.getElementById("modal-head").innerText = "Upload Source Codes";
			document.getElementById("modal-txt").innerText = "Congrats! You are one of our top participants! Please upload your source codes as a zip file";
			document.getElementById("modal-txt").insertAdjacentHTML('afterend',`
			<br>
			<label>Select Your <b> .zip </b>File for Upload: </label>  
			<input type="file" accept=".zip, .7z, .rar, .tar.gz" id="fileinput"/> <!--upload file [select file]-->
			<br>
			<div class="output"></div>
			<br>
			<input type="submit" value="submit" id="src-sub" onclick="ps();">
			`);
			window.location.href = '/submissions'
		}
		else
		{
			window.location.href = '/submissions'
			// redirect
		}
	}
});

function ps()
{
	showLoad();
	// start load animation
	let blob = document.getElementById("fileinput").files[0];
	let storageRef = firebase.storage().ref();
	let fileRef = storageRef.child('sources/'+firebase.auth().currentUser.uid+'/source');
	fileRef.put(blob).then(snapshot => {
		document.getElementById("mod-close").click();
		console.log("Upload Success!");
		showPage();
		// close loading animation and redirect
	}).catch(e => { console.log(e); 
		showPage();
	});
}
firebase.auth().onAuthStateChanged(user => {
	let db = firebase.firestore();
	db.collection("participants").doc(firebase.auth().currentUser.uid)
	.get().then(function(doc) {
		console.log("Current data: ", doc.data());
		localStorage.setItem("myscore",JSON.stringify(doc.data()));
		updateScore();
	});
});

