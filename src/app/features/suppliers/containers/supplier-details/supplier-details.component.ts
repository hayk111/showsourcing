import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsub } from '~app/app-root/utils';
import { takeUntil } from 'rxjs/operators';
import { SupplierActions } from '~app/features/suppliers/store//supplier.action';
import { Store } from '@ngrx/store';

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss'],
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {
	// this is put in container because it will access the store
	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
			const id = params['id'];
			this.store.dispatch(SupplierActions.select(id));
		});
	}
}
