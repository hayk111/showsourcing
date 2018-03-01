
export enum ActionType {
	OPEN = '[FilterPanel] open',
	CLOSE = '[FilterPanel] close'
}

export class FilterPanelAction {

	static open() {
		return {
			type: ActionType.OPEN,
		};
	}

	static close() {
		return {
			type: ActionType.CLOSE
		};
	}
}
