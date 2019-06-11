

export enum CloseEventType {
	CANCEL,
	OK
}

export interface CloseEvent {
	type: CloseEventType;
	data?: any;
	component?: any;
}

