export class Notification {
	id?: number;
	type?: NotificationType;
	timeout?: number;
	title?: string;
	message?: string;
}

export enum NotificationType {
	ERROR = 'error',
	SUCCESS = 'success',
	WARNING = 'warning',
	DELETED = 'deleted',
	DANGER = 'danger'
}
