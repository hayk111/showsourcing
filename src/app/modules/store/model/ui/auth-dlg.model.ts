

export enum AuthView {
	LOGIN,
	REGISTER,
	FORGOT_PASSWORD,
	PASSWORD_RESET,
	ACCOUNT_CREATED
}

export interface AuthDlg {
	view: AuthView;
	loginError: any;
	registerError: any;
	forgotPwError: any;
	loginPending: boolean;
	registerPending: boolean;
	forgotPwPending: boolean;
}
