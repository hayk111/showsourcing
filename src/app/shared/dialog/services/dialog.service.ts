import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { DialogRef } from '../interfaces/dialog-ref.interface';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _open$ = new Subject<{ component: any, props: any, closeOnOutsideClick: boolean }>();
	open$ = this._open$.asObservable();

	private _close$ = new Subject<any>();
	close$ = this._close$.asObservable();

	private _data$ = new Subject<any>();
	private _cancel$ = new Subject<void>();

	/** opens a dialog, returns an object that contains observables as data$, close$ and cancel$ */
	open(component: new (...args: any[]) => any, props?: Object, closeOnOutsideClick = true): DialogRef {
		this._open$.next({ component, props, closeOnOutsideClick });
		return {
			component,
			data$: this._data$.asObservable().pipe(takeUntil(this._close$)),
			close$: this.close$.pipe(first()),
			cancel$: this._cancel$.asObservable().pipe(takeUntil(this._close$))
		};
	}

	/** Close the dialog. */
	close(reOpenDlg?: { component: new (...args: any[]) => any, type: string }) { // component to reopen
		this._close$.next(reOpenDlg);

		return {
			reOpenDlg,
			data$: this._data$.asObservable().pipe(takeUntil(this._close$)),
		};
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
