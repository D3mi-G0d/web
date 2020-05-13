const functions = require('firebase-functions');
// const cors = require('cors')({origin: true});

exports.statement = functions.https.onCall((data, context) => {
	const startTime = new Date("2020-05-12 19:00+05:30").getTime();
	const now = Date.now();
	if(context.auth && startTime < now)	// testing access
	{
		var statement = ``;
		var score = 0;
		var sample = {};
		if(data.level === 'tetris')
		{
			statement = `
			This is a statement for level tetris
			This is multiline.............
			`;
			score = 1;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(data.level === 'minecraft')
		{
			statement = `
			This is a statement for level minecraft
			This is multiline.............
			`;
			score = 1;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(data.level === 'hl')
		{
			statement = `
			This is a statement for level Half Life
			This is multiline.............
			`;
			score = 2;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(data.level === 'nfs')
		{
			statement = `
			This is a statement for level Need For Speed
			This is multiline.............
			`;
			score = 2;
			sample.input = "this is a sample imput";
			sample.output = "this is a sample output";
		}
		else if(data.level === 'dmc')
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
		else
		{
			return {data: "Unauthorised"};
		}
		var result = {
			level: data.level,
			statement: statement,
			scorepm: score,
			sample: sample
		};
		return {data: result};
	}
	else return {data: "Unauthorised"};
});


