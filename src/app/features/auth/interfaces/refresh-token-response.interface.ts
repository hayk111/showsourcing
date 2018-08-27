import { TokenState } from "~features/auth/interfaces/token-state.interface";

export interface RefreshTokenResponse {
	refresh_token: TokenState;
}

