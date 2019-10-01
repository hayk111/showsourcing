import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '~models';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { SupplierFeatureService } from '~features/supplier/services';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'supplier-files-app',
	templateUrl: './supplier-files.component.html',
	styleUrls: ['./supplier-files.component.scss'],
})
export class SupplierFilesComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;

	constructor(
		protected route: ActivatedRoute,
		protected featureSrv: SupplierFeatureService,
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(supplier => this.supplier = supplier);
	}

}