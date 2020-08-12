import { Subscription } from 'rxjs';
import { OnDestroy, Directive } from '@angular/core';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class TrackingComponent implements OnDestroy {
	protected _subscription = new Subscription();
	public ngOnDestroy() {
		this._subscription.unsubscribe();
	}

	public trackByFn(index, item) {
		return index;
	}

	public trackById = (index, item) => {
		console.log('trackBy:', item);
		return item.id;
	}
}
