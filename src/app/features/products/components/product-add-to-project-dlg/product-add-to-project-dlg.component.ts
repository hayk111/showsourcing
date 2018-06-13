import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
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
	projects$: Observable<Project[]>;
	dlgName = DialogName.ADD_TO_PROJECT;
	selected = {};
	@Input() selectedProducts: string[];

	get products() {
		return this.selectedProducts;
	}

	constructor(private dlgSrv: DialogService, private projectSrv: ProjectService) {
	}

	ngOnInit() {
		this.projects$ = this.projectSrv.selectProjects();
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
		this.projectSrv.addProductsToProjects(selectedProjects, this.selectedProducts).subscribe(projects => {
			this.dlgSrv.close(this.dlgName);
		});
	}

}

addDlg();
