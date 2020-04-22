import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';
import { TrackingComponent } from '~utils/tracking-component';

// utility class to unsub from observable
@Directive({})
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
