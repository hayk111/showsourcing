import { TypedAction } from '~utils';
import { ActionType } from './dialog.action';

const initialState = {
	name: null,
	props: {}
};

export function dialogReducer(state = initialState, action: TypedAction<any>) {
	switch (action.type) {

		case ActionType.OPEN:
			const name = action.payload.name;
			const props = action.payload.props;
			return { name, props };
		case ActionType.CLOSE:
			return initialState;
		default:
			return state;
	}
}
