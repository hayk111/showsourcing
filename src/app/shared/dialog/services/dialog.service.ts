import { Injectable, NgModuleRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CloseEvent, CloseEventType } from '../interfaces';
import { filter, first, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _toOpen$ = new Subject<{ component: any, props: any }>();
	toOpen$ = this._toOpen$.asObservable();
	private _toClose$ = new Subject<CloseEvent>();
	toClose$ = this._toClose$.asObservable();

	/** opens a dialog, returns an observable of data that emits when it closes (not when it cancels) */
	open(component: new (...args: any[]) => any, props?: Object): Observable<any> {
		this._toOpen$.next({ component, props });
		return this.toClose$.pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			first(),
			map((evt: CloseEvent) => evt.data),
		);
	}

	close(event: CloseEvent = { type: CloseEventType.CANCEL }) {
		this._toClose$.next(event);
	}
}
