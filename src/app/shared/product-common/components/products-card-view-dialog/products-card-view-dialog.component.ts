import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { Observable } from 'rxjs';
import { Product } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';


@Component({
	selector: 'products-card-view-dialog-app',
	templateUrl: './products-card-view-dialog.component.html',
	styleUrls: ['./products-card-view-dialog.component.scss'],
})
export class ProductsCardViewDialogComponent extends ListViewComponent<Product> {

	constructor(private fb: FormBuilder, private dlgSrv: DialogService, private productFeatureService: ProjectWorkflowFeatureService) {
		super();
	}

	isSelected(product) {
		if (this.selection)
			return this.selection.has(product.id);

		throw Error(`Selection Input is undefnied`);
	}

}
