import { MatSnackBarConfig } from '@angular/material';



export enum ActionType {
	ADD = '[SnackBar] Add'
}



export class SnackBarAction {
	static add(message: string, action = 'Ok', config: MatSnackBarConfig = { duration: 4000 }) {
		return {
			type: ActionType.ADD,
			payload: { message, action, config }
		};
	}
}

