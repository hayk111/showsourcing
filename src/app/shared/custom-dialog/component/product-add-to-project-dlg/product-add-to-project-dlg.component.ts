import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFeatureService } from '~features/products/services';
import { Project, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { ProjectService, ProductService } from '~global-services';
import { ProductDialogService } from '~shared/custom-dialog/services/product-dialog.service';



@Component({
	selector: 'product-add-to-project-dlapp',
	templateUrl: './product-add-to-project-dlg.component.html',
	styleUrls: ['./product-add-to-project-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddToProjectDlgComponent implements OnInit {
	projects$: Observable<Project[]>;
	selected = {};
	@Input() selectedProducts: Product[];


	constructor(
		private dlgSrv: DialogService,
		private productDlgSrv: ProductDialogService) { }

	ngOnInit() {
		this.projects$ = this.productDlgSrv.selectProjects();
	}

	select(id, value) {
		this.selected[id] = value;
	}

	unselect(id) {
		delete this.selected[id];
	}

	submit() {
		// we add each project one by one to the store
		const selectedProjects = <Project[]>Object.values(this.selected);
		this.productDlgSrv.addProjectsToProducts(selectedProjects, this.selectedProducts)
			.subscribe(projects => {
				this.dlgSrv.close();
			});
	}

}
