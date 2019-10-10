import { Observable } from 'rxjs';

export class Notification {
	id?: number;
	type?: NotificationType;
	timeout?: number;
	title?: string;
	message?: string;
	actionMessage?: string;
	action?: Observable<any>;
}

export enum NotificationType {
	ERROR = 'error',
	SUCCESS = 'success',
	WARNING = 'warning',
	DELETED = 'deleted',
	DANGER = 'danger',
}
