import { User } from './user.model';

export class Audit {
	createdBy?: User;
	creationDate?: any;

	constructor() {
		this.creationDate = Date.now();
	}
}
