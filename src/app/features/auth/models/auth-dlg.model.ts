import { AuthView } from './auth-view.enum';

export interface AuthDlg {
	view: AuthView;
	loginError: any;
	registerError: any;
	forgotPwError: any;
	loginPending: boolean;
	registerPending: boolean;
	forgotPwPending: boolean;
}
