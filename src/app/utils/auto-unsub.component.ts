import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

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
