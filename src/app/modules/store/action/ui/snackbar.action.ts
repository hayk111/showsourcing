


export enum ActionType {
	ADD = '[SnackBar] Add'
}



export class SnackBarAction {
	static add(config = { duration: 4000 }) {
		return {
			type: ActionType.ADD,
			payload: config
		};
	}
}

