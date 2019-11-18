import { Injectable, NgModuleRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CloseEvent, CloseEventType } from '../interfaces';
import { filter, first, map, delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _toOpen$ = new Subject<{ component: any, props: any, closeOnOutsideClick: boolean }>();
	toOpen$ = this._toOpen$.asObservable();
	private _toClose$ = new Subject<CloseEvent>();
	toClose$ = this._toClose$.asObservable();
	private openedComponent: any;


	/** opens a dialog, returns an observable of data that emits when it closes (not when it cancels) */
	open(component: new (...args: any[]) => any, props?: Object, closeOnOutsideClick = true): Observable<any> {
		this._toOpen$.next({ component, props, closeOnOutsideClick });
		this.openedComponent = component;
		return this.toClose$.pipe(
			// we want to know when said dialog is closing
			filter(event => event.component === component),
			first(),
			// delay because we want the dialog to be notified after it has been
			// closed by the ctnr
			delay(100)
		);
	}

	close(event: CloseEvent = { type: CloseEventType.CANCEL }) {
		this._toClose$.next({ ...event, component: this.openedComponent });
	}
}
