import { Injectable } from '@angular/core';
import { Notification } from '../model/notification.interface';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {
	private static ID = 0;
	private _notifications$ = new Subject<Notification>();
	notifications$ = this._notifications$.asObservable();

	constructor() { }

	add(notification: Notification) {
		// adding unique id so we can remove notif after a timeout
		notification.id = NotificationService.ID++;
		this._notifications$.next(notification);
	}
}
