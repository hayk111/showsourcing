import { Injectable, NgModuleRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CloseEvent, CloseEventType } from '../interfaces';
import { filter, first, map, delay, takeUntil } from 'rxjs/operators';

	interface DialogRef {
		component: any;
		data$: Observable<any>;
		close$: Observable<void>;
		cancel$: Observable<void>;
	}

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _open$ = new Subject<{ component: any, props: any, closeOnOutsideClick: boolean }>();
	open$ = this._open$.asObservable();

	private _close$ = new Subject<void>();
	close$ = this._close$.asObservable();

	private _data$ = new Subject<any>();
	private _cancel$ = new Subject<void>();

	private openedComponent: any;


	/** opens a dialog, returns an observable of data that emits when it closes (not when it cancels) */
	open(component: new (...args: any[]) => any, props?: Object, closeOnOutsideClick = true): DialogRef {
		this._open$.next({ component, props, closeOnOutsideClick });
		this.openedComponent = component;
		return {
			component,
			data$: this._data$.asObservable().pipe(takeUntil(this._close$)),
			close$: this.close$.pipe(first()),
			cancel$: this._cancel$.asObservable().pipe(takeUntil(this._close$))
		};
		// return this.toClose$.pipe( // ? Do we need this ?
			// we want to know when said dialog is closing
			// filter(event => event.component === component),
			// first(),
			// delay because we want the dialog to be notified after it has been
			// closed by the ctnr
			// delay(100)
		// );
	}

	/** Close the dialog. */
	close() {
		this._close$.next();
	}
	/** Send data from the dialog to the observable returned by the opening dialog */
	data(data: any) {
		this._data$.next(data);
	}
	/** trigger the cancel$ observable returned by the opening dialog and close the dialog. */
	cancel() {
		this._cancel$.next();
		this.close();
	}

}
