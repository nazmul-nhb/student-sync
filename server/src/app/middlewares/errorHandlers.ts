import chalk from 'chalk';
import { STATUS_CODES } from '../constants';
import processErrors from '../errors/processErrors';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import type { RequestHandler, ErrorRequestHandler } from 'express';
import configs from '../configs';

/** Middleware to Handle "Not Found" Errors.*/
export const handleRouteNotFound: RequestHandler = (req, _res, next) => {
	const error = new ErrorWithStatus(
		'Not Found Error',
		`Requested End-Point “${req.method}: ${req.path}” Not Found!`,
		STATUS_CODES.NOT_FOUND,
		req.path,
	);

	return next(error);
};

/** Middleware to Handle Global Errors. */
export const catchAllErrors: ErrorRequestHandler = (err, _req, res, next) => {
	const { statusCode, name, errorSource, stack } = processErrors(err);

	// * Log error msg in the server console
	console.error(chalk.redBright.bold('🛑 Errors:'));
	errorSource.forEach((err) => {
		console.error(chalk.redBright(`	➡ ${err.message}`));
	});

	// console.error(err);

	// * Delegate to the default Express error handler
	// ? if the headers have already been sent to the client
	if (res.headersSent) {
		return next(err);
	}

	// * Send error response with status code
	if (configs.NODE_ENV === 'development') {
		res.status(statusCode).json({
			success: false,
			message: errorSource.map((err) => err.message).join(' | '),
			status: statusCode,
			error: {
				name,
				details: errorSource.map((source) => ({ name, ...source })),
			},
			stack: stack ? stack : 'Stack Trace Not Available!',
		});
	} else {
		res.status(statusCode).json({
			success: false,
			message: errorSource.map((err) => err.message).join(' | '),
			status: statusCode,
			error: {
				details: errorSource.map((source) => ({ name, ...source })),
			},
		});
	}
};
