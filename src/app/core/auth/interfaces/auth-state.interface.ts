import { TokenState } from '~core/auth/interfaces/token-state.interface';




export enum AuthStatus {
	AUTHENTICATED = 'Authenticated',
	NOT_AUTHENTICATED = 'Not Authenticated',
	PENDING = 'Pending',
}


export interface AuthState {
	status: AuthStatus;
	userId?: string;
}
