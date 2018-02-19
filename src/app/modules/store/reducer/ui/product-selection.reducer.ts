import { addEntities, removeEntity, entityInitialState } from "../../utils/entities.utils";
import { ActionType } from "../../action/ui/product-selection.action";



export function productSelectionReducer(state = entityInitialState, action) {
	// we'll use entity.utils here for easy access
	switch (action.type) {
		case ActionType.ADD:
			return addEntities(state, [ action.payload ]);
		case ActionType.REMOVE:
			return removeEntity(state, action.payload);
		default:
			return state;
	}
}