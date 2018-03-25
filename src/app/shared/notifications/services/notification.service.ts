import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from '../model/notification.interface';
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
