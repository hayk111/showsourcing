import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './authentication.reducer';
import * as fromLoginPage from './login-page.reducer';
import * as fromRegisterPage from './register-page.reducer';
import * as fromResetPwPage from './reset-pw.reducer';

export * from './authentication.action';

export interface AuthState {
	status: fromAuth.State;
	loginPage: fromLoginPage.State;
	registerPage: fromRegisterPage.State;
	resetPwPage: fromResetPwPage.State;
}

export const reducers: ActionReducerMap<AuthState> = {
	status: fromAuth.reducer,
	loginPage: fromLoginPage.reducer,
	registerPage: fromRegisterPage.reducer,
	resetPwPage: fromResetPwPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatus = createSelector(
	selectAuthState,
	(state: AuthState) => state.status
);

// login page
export const selectLoginPage = createSelector(
	selectAuthState,
	(state: AuthState) => state.loginPage
);
export const selectLoginPageError = createSelector(
	selectLoginPage,
	fromLoginPage.selectError
);
export const selectLoginPagePending = createSelector(
	selectLoginPage,
	fromLoginPage.selectPending
);

// register page
export const selectRegisterPage = createSelector(
	selectAuthState,
	(state: AuthState) => state.registerPage
);
export const selectRegisterPageError = createSelector(
	selectRegisterPage,
	fromRegisterPage.selectError
);
export const selectRegisterPagePending = createSelector(
	selectRegisterPage,
	fromRegisterPage.selectPending
);

// reset pw page
export const selectResetPwPage = createSelector(
	selectAuthState,
	(state: AuthState) => state.resetPwPage
);
export const selectResetPwPageError = createSelector(
	selectResetPwPage,
	fromResetPwPage.selectError
);
export const selectResetPwPagePending = createSelector(
	selectResetPwPage,
	fromResetPwPage.selectPending
);
