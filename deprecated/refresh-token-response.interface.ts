import { TokenState } from '~core/auth/interfaces/token-state.interface';

export interface RefreshTokenResponse {
	refresh_token: TokenState;
}

