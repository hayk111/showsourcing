import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../model/toast.interface';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	private static ID = 0;
	private toast: Array<Toast> = [];
	private _toast$ = new Subject<Array<Toast>>();
	private limit = 5;
	private defaultTimeout = 5000;
	toast$ = this._toast$.asObservable();

	add(toast: Toast) {
		// adding unique id so we can remove notif after a timeout
		toast.id = ToastService.ID++;
		this.toast.push(toast);
		if (this.isLimitExceeded()) {
			this.toast.shift();
		}
		this.emit();
		setTimeout(() => this.removeToast(toast.id), toast.timeout || this.defaultTimeout);
	}

	public removeToast(id: number) {
		this.toast = this.toast.filter(notif => notif.id !== id);
		this.emit();
	}

	private isLimitExceeded() {
		return this.toast.length >= this.limit;
	}

	private emit() {
		this._toast$.next(this.toast);
	}

}
