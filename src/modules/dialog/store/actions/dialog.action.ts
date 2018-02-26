import { DialogName } from '../../models/dialog-names.enum';

export enum ActionType {
	REGISTER = '[Dialog] register',
	UNREGISTER = '[Dialog] unregister',
	OPEN = '[Dialog] open',
	CLOSE = '[Dialog] close',
	SET_METADATA = '[Dialog] set metadata'
}

export class DialogActions {

	static register(name: string | DialogName) {
		return { type: ActionType.REGISTER, payload: name };
	}

	static open(name: string | DialogName) {
		return {
			type: ActionType.OPEN,
			payload: name
		};
	}

	static close(name: string | DialogName) {
		return {
			type: ActionType.CLOSE,
			payload: name
		};
	}

	static setMetadata(name: string | DialogName, metadata: any) {
		return {
			type: ActionType.SET_METADATA,
			payload: { name, metadata }
		};
	}
}
