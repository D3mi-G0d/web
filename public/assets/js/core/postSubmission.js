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
				<div class="demo-droppable"><!--drag n drop-->
					Drag and Drop <br> Your <b> .zip </b> File Here!
				</div>
			<br>
			<div class="output"></div>
			<label>Or Select Your <b> .zip </b>File for Upload: </label>  
			<input type="file" accept=".zip, .7z, .rar, .tar.gz" id="fileinput" onchange="ps();"/> <!--upload file [select file]-->
			<br>
			`);
			// window.location.href = '/postsubmission'
		}
		else
		{
			// window.location.href = '/postsubmission'
			// redirect
		}
	}
});

function ps()
{
	// start load animation
	let blob = document.getElementById("fileinput").files[0];
	let storageRef = firebase.storage().ref();
	let fileRef = storageRef.child('sources/'+firebase.auth().currentUser.uid);
	fileRef.put(blob).then(snapshot => {
		console.log("Upload Success!");
		// close loading animation and redirect
	}).catch(e => { console.log(e); 
	});
}


