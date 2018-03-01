
export enum FilterPanelActionType {
	OPEN = '[FilterPanel] open',
	CLOSE = '[FilterPanel] close'
}

export class FilterPanelAction {

	static open() {
		return {
			type: FilterPanelActionType.OPEN,
		};
	}

	static close() {
		return {
			type: FilterPanelActionType.CLOSE
		};
	}
}
