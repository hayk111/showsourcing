import { Observable } from 'rxjs';

export class Toast {
	id?: number;
	type?: ToastType;
	timeout?: number;
	title?: string;
	message?: string;
	actionMessage?: string;
	action?: Observable<any>;
}

export enum ToastType {
	ERROR = 'error',
	SUCCESS = 'success',
	WARNING = 'warning',
	DELETED = 'deleted',
	DANGER = 'danger',
}
