import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseComponent } from '~shared/base-component/base-component';
import { Subject } from 'rxjs';

// utility class to unsub from observable
export abstract class AutoUnsub extends BaseComponent implements OnDestroy {

	_destroy$ = new Subject<void>();

	constructor() {
    super();
  }

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
