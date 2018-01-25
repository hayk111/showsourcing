
export enum ActionType {
	OPEN = '[Sidenav] opening',
	CLOSE = '[Sidenav] closing',
	TOGGLE = '[Sidenav] toggling'
}

export class SidenavActions {
	static open() {
		return {
			type: ActionType.OPEN
		};
	}

	static close() {
		return {
			type: ActionType.CLOSE
		};
	}

	static toggle() {
		return {
			type: ActionType.TOGGLE
		};
	}
}
