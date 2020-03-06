

export interface RefreshTokenPostBody {
	app_id: string;
	provider: 'jwt';
	data: string;
}
