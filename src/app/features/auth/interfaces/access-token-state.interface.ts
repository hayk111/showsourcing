

export interface AccessTokenState {
	pending: boolean;
	token: string;
	token_data: {
		identity: string;
		is_admin: boolean;
		expires: number;
	};
}
