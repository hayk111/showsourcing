import { TokenState } from '~features/auth/interfaces/token-state.interface';

export interface AccessTokenResponse {
	access_token: TokenState;
	user_token?: TokenState;
}

