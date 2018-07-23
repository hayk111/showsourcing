import { Component, OnInit, NgModuleRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Contact, Product, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {
	// currently displayed supplier
	supplier$: Observable<Supplier>;
	contacts$: Observable<Contact[]>;
	products$: Observable<Product[]>;
	// tasks$: Observable<Task[]>;

	constructor(
		private route: ActivatedRoute,
		private featureSrv: SupplierFeatureService,
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id)
		);

		this.supplier$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id))
		);

	}
}
