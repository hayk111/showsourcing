import { AccessTokenState } from '~features/auth';


export interface AuthState {
	authenticated?: boolean;
	tokenState?: AccessTokenState;
	userId?: string;
	token?: string;
}
