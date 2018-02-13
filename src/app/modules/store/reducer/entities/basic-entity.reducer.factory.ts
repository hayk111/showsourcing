import { entityInitialState, addEntities, copyById, removeEntity } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';


export function basicReducerFactory(actionType: any) {
	return function (state = entityInitialState, action: TypedAction<any>) {
		let id;
		if (action.payload)
			id = action.payload.id;

		switch (action.type) {

			case actionType.ADD:
				return addEntities(state, action.payload);

			case actionType.PATCH:
				const propName = action.payload.propName;
				const value = action.payload.value;
				return copyById(state, id, { [propName]: value } );

			case actionType.DELETE:
				return removeEntity(state, id);

			case actionType.SET_PENDING:
				return { ...state, pending: true };

			default:
				return state;
		}
	};
}
