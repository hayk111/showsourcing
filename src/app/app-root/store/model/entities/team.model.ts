import { User } from '~user/models/user.model';

export interface Team {
	id: string;
	creationDate: number;
	entityCounter: number;
	modificationCounterName: number;
	name: string;
	ownerUserId: string;
	members: Array<User>;
}
