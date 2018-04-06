import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Project, fromProject, productActions } from '~app/entity';
import { DialogName, DialogActions } from '~app/shared/dialog';
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
	// used to give props from the dialog container
	props = { selectedProducts: [] };
	get products() {
		return this.props.selectedProducts;
	}

	constructor(private store: Store<any>) {
	}

	ngOnInit() {
		this.projects$ = this.store.select(fromProject.selectArray);
		this.productsCount$ = this.store.select(fromProject.selectProductCount);
	}

	select(id, value) {
		this.selected[id] = value;
	}

	unselect(id) {
		delete this.selected[id];
	}

	submit() {
		// we add each project one by one to the store
		Object.values(this.selected).forEach((project: Project) => {
			this.products.forEach((id: string) => this.store.dispatch(productActions.addProject(project, id)));
		});
		this.store.dispatch(DialogActions.close(this.dlgName));
	}


}

addDlg();
