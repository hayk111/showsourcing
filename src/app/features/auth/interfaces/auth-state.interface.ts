import { TokenState } from '~features/auth/interfaces/token-state.interface';


export interface AuthState {
	authenticated?: boolean;
	tokenState?: TokenState;
	userId?: string;
	token?: string;
}
