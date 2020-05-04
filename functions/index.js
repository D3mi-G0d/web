const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

exports.statement = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		var statement = ``;
		var score = 0;
		var sample = {};
		if(request.query.level === 'tetris')
		{
			statement = `
			This is a statement for level tetris
			This is multiline.............
			`;
			score = 1;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(request.query.level === 'minecraft')
		{
			statement = `
			This is a statement for level minecraft
			This is multiline.............
			`;
			score = 1;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(request.query.level === 'hl')
		{
			statement = `
			This is a statement for level Half Life
			This is multiline.............
			`;
			score = 2;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(request.query.level === 'nfs')
		{
			statement = `
			This is a statement for level Need For Speed
			This is multiline.............
			`;
			score = 2;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(request.query.level === 'dmc')
		{
			statement = `
			This is a statement for level Devil May Cry
			This is multiline.............
			But, includes escape chars in response too
			`;
			score = 3;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		var result = {
			level: request.query.level,
			statement: statement,
			scorepm: score,
			sample: sample
		};

		response.send(result);
	});
});
