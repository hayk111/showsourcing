import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

// utility class to unsub from observable
export abstract class AutoUnsub implements OnDestroy {

	_destroy$ = new Subject<void>();

	constructor() { }

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
