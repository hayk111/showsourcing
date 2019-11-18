import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class TrackingComponent implements OnDestroy {
	protected _subscription = new Subscription();
	public ngOnDestroy() {
		this._subscription.unsubscribe();
	}

	public trackByFn(index, item) {
		return index;
	}

	public trackById = (index, item) => item.id;
}
