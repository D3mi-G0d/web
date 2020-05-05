'use strict';

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'statement') {
	exports.statement = require('./statement').statement;
}
