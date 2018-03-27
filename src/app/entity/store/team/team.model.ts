import { User } from '../user';

export interface Team {
	id: string;
	creationDate: number;
	entityCounter: number;
	modificationCounterName: number;
	name: string;
	ownerUserId: string;
	members: Array<User>;
}
