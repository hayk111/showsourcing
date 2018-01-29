import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Entity, EntityRepresentation } from '../../utils/entities.utils';

export enum ActionType {
	SET_ENTITY = '[FilterEntityPanel] setting entity',
	LOAD_CHOICES = '[FilterEntityPanel] loading choices',
	SET_CHOICES = '[FilterEntityPanel] setting choices',
	RESET = '[FilterEntityPanel] resetting',
	SEARCH = '[FilterEntityPanel] search'
}

export class FilterEntityPanelActions {
	static setEntity(entityRepr: EntityRepresentation) {
		return {
			type: ActionType.SET_ENTITY,
			payload: entityRepr
		};
	}

	static reset() {
		return {
			type: ActionType.RESET
		};
	}

	static search(str: string) {
		return {
			type: ActionType.SEARCH,
			payload: str
		};
	}

	static setChoices(items: Array<any>) {
		return {
			type: ActionType.SET_CHOICES,
			payload: items
		};
	}

	static loadChoices(entityRepr: EntityRepresentation) {
		return {
			type: ActionType.LOAD_CHOICES,
			payload: entityRepr
		};
	}

}
