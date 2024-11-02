import type { IMongoDuplicateKeyError } from '../types/interfaces';

export const isMongoDuplicateKeyError = (
	error: unknown,
): error is IMongoDuplicateKeyError => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		(error as { code: number }).code === 11000 &&
		'keyValue' in error
	);
};
