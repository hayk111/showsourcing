import { AccessTokenState } from '~features/auth';


export interface AuthState {
	pending: boolean;
	authenticated?: boolean;
	tokenState?: AccessTokenState;
	userId?: string;
	token?: string;
}
