
export interface TokenState {
	token: string;
	token_data: {
		app_id: string;
		expires: number;
		identity: string
		isEmailConfirmed: boolean;
		is_admin: boolean
		salt: string;
	};
}

