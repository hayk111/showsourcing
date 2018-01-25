import { EntityRepresentation } from '../utils/entities.utils';


export enum ActionType {
	OPEN_TARGET = '[FilterSelectionPanel] open for target entityRepr',
	CLOSE = '[FilterSelectionPanel] close'
}

export class FilterSelectionPanelAction {

	static open(entityRepr: EntityRepresentation) {
		return {
			type: ActionType.OPEN_TARGET,
			payload: entityRepr
		};
	}

	static close() {
		return {
			type: ActionType.CLOSE
		};
	}
}
