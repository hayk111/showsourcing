import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFeatureService } from '~features/products/services';
import { Project } from '~models';
import { DialogService } from '~shared/dialog';



@Component({
	selector: 'product-add-to-project-dlapp',
	templateUrl: './product-add-to-project-dlg.component.html',
	styleUrls: ['./product-add-to-project-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddToProjectDlgComponent implements OnInit {
	projects$: Observable<Project[]>;
	selected = {};
	@Input() selectedProducts: string[];

	get products() {
		return this.selectedProducts;
	}

	constructor(private dlgSrv: DialogService, private featureSrv: ProductFeatureService) { }

	ngOnInit() {
		this.projects$ = this.featureSrv.selectProjects();
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
		this.featureSrv.addProductsToProjects(selectedProjects, this.selectedProducts)
			.subscribe(projects => {
				this.dlgSrv.close(ProductAddToProjectDlgComponent);
			});
	}

}
