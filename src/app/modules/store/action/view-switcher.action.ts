

export enum ActionType {
	SWITCH_VIEW_TYPE = '[ViewSwitcher] switching view',
}

export class ViewSwitcherAction {

	static switchView(view: string) {
		return {
			type: ActionType.SWITCH_VIEW_TYPE,
			payload: view
		}
	}
}