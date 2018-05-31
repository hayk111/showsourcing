
export interface AccessTokenResponse {
	user_token: {
		token: string;
		token_data: {
			identity: string;
			is_admin: boolean;
			expires: number;
		};
	};
}

