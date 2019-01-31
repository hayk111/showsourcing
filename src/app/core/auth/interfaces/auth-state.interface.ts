import { User as RealmUser } from 'realm-graphql-client';


export enum AuthStatus {
	AUTHENTICATED = 'Authenticated',
	NOT_AUTHENTICATED = 'Not Authenticated',
	PENDING = 'Pending',
}


export interface AuthState {
	status: AuthStatus;
	userId?: string;
}
