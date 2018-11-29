import { TokenState } from '~core/auth/interfaces/token-state.interface';


export interface GuestTokenState extends TokenState {
	realm?: {
		host: string;
		httpsPort: number;
		path: string;
	};
}
