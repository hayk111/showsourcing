import { EntityRepresentation } from '../model/filter.model';

export enum ActionType {
	OPEN = '[FilterPanel] open',
	CLOSE = '[FilterSelectionPanel] close'
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
