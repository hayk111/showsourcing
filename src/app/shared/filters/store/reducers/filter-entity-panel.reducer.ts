import { TypedAction } from '~store/utils/typed-action.interface';
import { FEPActionType as ActionType } from '../actions';


const initialState = {
	entityRepr: undefined,
	relevant: [],
	search: ''
};

export function filterEntityPanelReducer(state = initialState, action: TypedAction<any>) {
	switch (action.type) {

		case ActionType.RESET:
			return initialState;

		case ActionType.SEARCH:
			return { ...state, search: action.payload };

		case ActionType.SET_ENTITY:
			return { entityRepr: action.payload, search: '' };

		case ActionType.SET_CHOICES:
			return { ...state, choices: action.payload };

		default: return state;
	}
}
