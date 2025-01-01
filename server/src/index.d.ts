import type { StudentPayload } from './app/types/interfaces';

declare global {
	namespace Express {
		interface Request {
			user?: StudentPayload;
		}
	}
}
