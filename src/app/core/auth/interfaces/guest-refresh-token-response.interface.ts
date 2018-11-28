

export interface GuestRefreshTokenResponse {
	refresh_token: {
		token: string
	};
	realm: {
		realmServerName: string; // is host
		httpPort: number;
		httpsPort: number;
		realmPath: string; // is path
	};
	requestId: string;
}
