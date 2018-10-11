

export interface RefreshTokenPostBody {
	app_id: string;
	provider: string;
	data: string;
	user_info: {
		register: boolean;
		email?: string;
		password: string;
	};
}
