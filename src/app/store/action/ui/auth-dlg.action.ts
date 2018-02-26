import { AuthView } from '../../model/ui/auth-dlg.model';


export enum ActionType {
	SET_VIEW = '[Auth-dlg] setting view',
	SET_ERROR = '[Auth-dlg] setting error',
	SET_PENDING = '[Auth-dlg] setting pending',
	SET_READY = '[Auth-dlg] setting ready'
}

export class AuthDlgActions {
	static setView(view: AuthView) {
		return {
			type: ActionType.SET_VIEW,
			payload: { view }
		};
	}

	static setError(error: any, view: AuthView) {
		return {
			type: ActionType.SET_ERROR,
			payload: { error, view}
		};
	}

	static setPending(view: AuthView) {
		return {
			type: ActionType.SET_PENDING,
			payload: { view }
		};
	}

	static setReady(view: AuthView) {
		return {
			type: ActionType.SET_READY,
			payload: { view }
		};
	}
}

