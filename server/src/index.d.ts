import type { DecodedToken } from './app/types/interfaces';

declare global {
	namespace Express {
		interface Request {
			user?: DecodedToken;
		}
	}
}
