import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Project, selectProjects, selectProjectsProductsCount } from '~app/entity';
import { DialogName } from '~app/shared/dialog';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';


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

	constructor(private store: Store<any>) {
	}

	ngOnInit() {
		this.projects$ = this.store.select(selectProjects);
		this.productsCount$ = this.store.select(selectProjectsProductsCount);
	}

	select(id, value) {
		this.selected[id] = value;
	}

	unselect(id) {
		delete this.selected[id];
	}

}

addDlg();
