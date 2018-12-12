

export enum CloseEventType {
	CANCEL,
	OK
}

export interface CloseEvent {
	type: CloseEventType | string;
	data?: any;
}

