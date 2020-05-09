'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Internal Functions
exports.leaderboard = require('./leaderboard').leaderboard;
exports.submit = require('./submit').submit;


// Public Functions

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'statement') {
	exports.statement = require('./statement').statement;
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'subscribe') {
	exports.subscribe = require('./subscribe').subscribe;
}

// if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'leaderboard') {
// 	exports.leaderboard = require('./leaderboard').leaderboard;
// }

// if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'submit') {
// 	exports.submit = require('./submit').submit;
// }
