

export interface AccessTokenState {
	pending?: boolean;
	token: string;
	token_data: {
		identity: string;
		is_admin: boolean;
		expires: number;
	};
	// guest can have a temporary access token to do some stuff
	// but they can't enter the normal app
	guest?: boolean;
}
