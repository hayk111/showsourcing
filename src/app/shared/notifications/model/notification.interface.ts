export class Notification {
	id?: number;
	type?: NotificationType;
	timeout?: number;
	title?: string;
	message?: string;
	uriMessage?: string;
	uri?: Array<string>;
}

export enum NotificationType {
	ERROR = 'error',
	SUCCESS = 'success',
	WARNING = 'warning',
	DELETED = 'deleted',
	DANGER = 'danger',
}
