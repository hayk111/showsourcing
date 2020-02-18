import { Entity } from "./_entity.model";

export class User extends Entity<UserConfig>{
	__typename: string = "User"
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	preferredLanguage?: string;
	avatar?: string;
	creationDate?: Date;

	constructor(config: UserConfig) {
		super(config)
	}
}

// ? There is no CreateUserInput in the API file
export interface UserConfig {
	id?: string;
	email?: string;
	fistName?: string;
	lastName?: string;
	phoneNumber?: string;
	preferredLanguage?: string;
	avatar?: string;
}
