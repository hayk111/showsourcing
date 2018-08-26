import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { Observable } from 'rxjs';
import { Product } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';


@Component({
	selector: 'products-card-view-app',
	templateUrl: './products-card-view.component.html',
	styleUrls: ['./products-card-view.component.scss'],
})
export class ProductsCardViewComponent extends ListViewComponent<Product> implements OnInit {

	constructor(private fb: FormBuilder, private dlgSrv: DialogService, private productFeatureService: ProjectWorkflowFeatureService) {
		super();
	}

	ngOnChanges(changes) {
		console.log('>> changes = ', changes);
	}

	ngOnInit() {
		// this.store.select(selectNewProductDlg).pipe(
		// 	takeUntil(this._destroy$)
    // ).subscribe((state: State) => this.pending = state.pending);
	}


	createProduct() {
		// if (this.form.valid) {
		// 	this.store.dispatch(productActions.create(new Product(this.form.value, this.userSrv.userId)));
		// }
	}

}


