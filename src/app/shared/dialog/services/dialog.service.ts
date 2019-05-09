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
	private openedStack: { component: any, props: any }[] = [];

	constructor() {
		// on close event we have to check if the dialog stack
		// still have some components so we can open them
		this.toClose$.subscribe(_ => {
			const length = this.openedStack.length;
			if (this.openedStack.length > 0) {
				const next = this.openedStack[length - 1];
				this._toOpen$.next({ component: next.component, props: next.props });
			}
		});
	}

	private openNext() {
		const length = this.openedStack.length;
		if (length > 0) {
			const next = this.openedStack[length - 1];
			this.open(next.component, next.props);
		}
	}


	/** opens a dialog, returns an observable of data that emits when it closes (not when it cancels) */
	open(component: new (...args: any[]) => any, props?: Object): Observable<any> {
		this._toOpen$.next({ component, props });
		this.openedStack.push({ component, props });
		return this.toClose$.pipe(
			// we want to know when said dialog is closing
			filter(event => event.component === component),
			first()
		);
	}

	close(event: CloseEvent = { type: CloseEventType.CANCEL }) {
		this._toClose$.next({ ...event, component: this.openedStack.pop() });
	}
}
