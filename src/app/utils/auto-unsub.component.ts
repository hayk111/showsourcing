import { Component, OnInit, OnDestroy } from '@angular/core';

import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { Subject } from 'rxjs';

// utility class to unsub from observable
export abstract class AutoUnsub extends TrackingComponent implements OnDestroy {

	_destroy$ = new Subject<void>();

	constructor() {
    super();
  }

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
