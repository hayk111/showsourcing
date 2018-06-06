import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { first, map, switchMap } from 'rxjs/operators';
import { Project } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';
import { ProjectService } from '~features/products/services/project.service';


const addDlg = () => addDialog(ProductAddToProjectDlgComponent, DialogName.ADD_TO_PROJECT);

@Component({
	selector: 'product-add-to-project-dlapp',
	templateUrl: './product-add-to-project-dlg.component.html',
	styleUrls: ['./product-add-to-project-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddToProjectDlgComponent implements OnInit {
	projects$: Observable<Array<Project>>;
	productsCount$: Observable<any>;
	dlgName = DialogName.ADD_TO_PROJECT;
	selected = {};
	selectedProducts: string[];
	get products() {
		return this.selectedProducts;
	}

	constructor(private dlgSrv: DialogService, private projectSrv: ProjectService) {
	}

	ngOnInit() {
		this.projects$ = this.projectSrv.selectProjects();
		this.productsCount$ = of(this.selectedProducts.length);
	}

	select(id, value) {
		console.log('>> select - id = ', id);
		this.selected[id] = value;
		console.log('>> this.selected[id] = ', this.selected);
	}

	unselect(id) {
		console.log('>> unselect');
		delete this.selected[id];
	}

	submit() {
		// we add each project one by one to the store
		this.projects$.pipe(
			first(),
			map(projects => projects.filter(project => !!this.selected[project.id])),
			switchMap(projects => {
				return this.projectSrv.addProductsToProjects(projects, this.selectedProducts);
			})
		).subscribe(projects => {
			this.dlgSrv.close(this.dlgName);
		});

	}


}

addDlg();
