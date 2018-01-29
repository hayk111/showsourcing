import { uuid } from '../../utils/uuid.utils';
import { ActionType } from '../../action/entities/images.action';
import { AppFile } from '../../model/entities/app-file.model';
import { AppImage } from '../../model/entities/app-image.model';


const initialState = [];

export function imagesReducer(state = initialState, action) {
	let newState;
	let id;
	let index;
	let img: AppImage;

	switch (action.type) {
		case ActionType.SET:
			// when we set we have to keep the pending files,
			// so when we open another product, then switch back to the original one
			// if the pending file is still pending it should display as pending
			newState = state.filter((f: AppFile) => f.pending);
			newState.push(...action.payload);
			return newState;

		case ActionType.ADD_PENDING:
			return state.concat(action.payload);

		case ActionType.SET_READY:
			id = action.payload.id;
			const replacing = action.payload.replacing;
			index = state.findIndex(f => f.id === id);
			newState = [...state];
			newState[index] = replacing;
			return newState;

		case ActionType.REPORT_PROGRESS:
			id = action.payload.id;
			const progress = action.payload.progress;
			index = state.findIndex(f => f.id === id);
			newState = [...state];
			newState[index] = { ...newState[index], progress  };
			return newState;

		case ActionType.ROTATE:
			img = action.payload;
			const rotation = (img.rotation || 0) + 1;
			img = { ...img, rotation, pending: true };
			index = state.findIndex(f => f.id === img.id);
			newState = [...state];
			newState[index] = img;
			return newState;

		case ActionType.SET_IMG:
			img = action.payload;
			id = img.id;
			index = state.findIndex(f => f.id === id);
			newState = [...state];
			newState[index] = img;
			return newState;

		case ActionType.DELETE:
			id = action.payload.id;
			newState = [...state];
			index = state.findIndex(f => f.id === id);
			newState.splice(index, 1);
			return newState;

		default: return state;
	}
}
