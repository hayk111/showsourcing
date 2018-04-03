import { DialogName } from '../models/dialog-names.enum';

export enum ActionType {
	OPEN = '[Dialog] open',
	CLOSE = '[Dialog] close',
}

export class DialogActions {

	static open(name: DialogName, props?: any) {
		return {
			type: ActionType.OPEN,
			payload: { name, props }
		};
	}

	static close(name: string | DialogName) {
		return {
			type: ActionType.CLOSE,
			payload: name
		};
	}

}
