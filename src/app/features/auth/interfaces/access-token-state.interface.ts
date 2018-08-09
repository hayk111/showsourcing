

export interface AccessTokenState {
	token?: string;
	token_data?: {
		identity: string;
		is_admin: boolean;
		expires: number;
	};
	invalidated?: boolean;
}
