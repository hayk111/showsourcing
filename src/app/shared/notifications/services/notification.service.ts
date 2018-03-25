import { Injectable } from '@angular/core';
import { Notification } from '../model/notification.interface';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {
	private static ID = 0;
	private notifications: Array<Notification> = [];
	private _notifications$ = new Subject<Array<Notification>>();
	private limit = 5;
	private defaultTimeout = 5000;
	notifications$ = this._notifications$.asObservable();

	constructor() { }

	add(notif: Notification) {
		// adding unique id so we can remove notif after a timeout
		notif.id = NotificationService.ID++;
		this.notifications.push(notif);
		if (this.isLimitExceeded()) {
			this.notifications.shift();
		}
		this.emit();
		setTimeout(() => this.removeNotification(notif.id), notif.timeout || this.defaultTimeout);
	}

	private removeNotification(id: number) {
		this.notifications = this.notifications.filter(notif => notif.id !== id);
		this.emit();
	}

	private isLimitExceeded() {
		return this.notifications.length >= this.limit;
	}

	private emit() {
		this._notifications$.next(this.notifications);
	}

}
