import { EntityRepresentation } from '~entity';

export enum FEPActionType {
	SET_ENTITY = '[FilterEntityPanel] setting entity',
	LOAD_CHOICES = '[FilterEntityPanel] loading choices',
	SET_CHOICES = '[FilterEntityPanel] setting choices',
	RESET = '[FilterEntityPanel] resetting',
	SEARCH = '[FilterEntityPanel] search'
}

export class FilterEntityPanelActions {
	static setEntity(entityRepr: EntityRepresentation) {
		return {
			type: FEPActionType.SET_ENTITY,
			payload: entityRepr
		};
	}

	static reset() {
		return {
			type: FEPActionType.RESET
		};
	}

	static search(str: string) {
		return {
			type: FEPActionType.SEARCH,
			payload: str
		};
	}

	static setChoices(items: Array<any>) {
		return {
			type: FEPActionType.SET_CHOICES,
			payload: items
		};
	}

	static loadChoices(entityRepr: EntityRepresentation) {
		return {
			type: FEPActionType.LOAD_CHOICES,
			payload: entityRepr
		};
	}

}
