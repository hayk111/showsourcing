import { AccessTokenState } from '~features/auth/interfaces/access-token-state.interface';


export interface GuestAccessTokenState extends AccessTokenState {
	realm?: {
		host: string;
		httpsPort: number;
		path: string;
	}
}