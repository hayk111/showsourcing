import { Injectable, NgModuleRef } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _toOpen$ = new Subject<{ component: any, moduleRef: NgModuleRef<any>, props: any }>();
	toOpen$ = this._toOpen$.asObservable();
	private _toClose$ = new Subject<any>();
	toClose$ = this._toClose$.asObservable();

	open(component: new (...args: any[]) => any, props?: Object) {
		this.openFromModule(component, null, props);
	}

	openFromModule(component: new (...args: any[]) => any, moduleRef?: NgModuleRef<any>, props?: Object) {
		this._toOpen$.next({ component, props, moduleRef });
	}

	close() {
		this._toClose$.next();
	}
}
