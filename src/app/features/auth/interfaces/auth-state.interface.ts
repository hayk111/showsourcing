import { TokenState } from '~features/auth/interfaces/token-state.interface';



export enum AuthStatus {
	PENDING = 'Pending',
	AUTHENTICATED = 'Authenticated',
	NOT_AUTHENTICATED = 'Not Authenticated',
}

