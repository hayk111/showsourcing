

export enum ActionType {
	ADD = '[FeedbackDlg] adding',
}

export interface FeedbackParams {
	title: string,
	body?: string,
	styleType: FeedbackStyle,
	timeout?: number | boolean,
	rateLimit?: number
}

export enum FeedbackStyle {
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info',
	WARNING = 'warning',
	NONE = 'none'
}

export class FeedbackDlgActions {
	static add(params: FeedbackParams) {
		return {
			type: ActionType.ADD,
			payload: params
		};
	}
}