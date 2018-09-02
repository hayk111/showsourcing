

export interface RefreshTokenPostBody {
	app_id: string;
	provider: string;
	data: string;
	user_info: {
		register: boolean;
		password: string;
	};
}
