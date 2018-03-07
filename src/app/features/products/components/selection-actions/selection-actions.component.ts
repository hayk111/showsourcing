import { ERM } from '~entity';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { Component, OnInit, Input } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Project } from '~projects/models/project.model';
import { ProjectActions } from '~projects/store/actions/project.actions';
import {
	selectMyTeamProjects,
	selectProjectsProductsCount,
} from '~projects/store/selectors/projects.selector';
import { DialogActions, DialogName } from '~shared/dialog';
import { selectMyTeamMembers } from '~store/selectors/entities/team-members.selector';
import { User } from '~user/models';
import { ProjectsActionTypes } from '~app/features/projects';

@Component({
	selector: 'selection-actions',
	templateUrl: './selection-actions.component.html',
	styleUrls: ['./selection-actions.component.scss'],
})
export class SelectionActionsComponent implements OnInit {
	@Input() selection: Map<string, boolean>;
	public addProductDialog: DialogName = DialogName.ADDTOPROJECT;
	public exportDialog: DialogName = DialogName.EXPORT;
	public requestFeedbackDialog: DialogName = DialogName.REQUESTFEEDBACK;

	projects$: Observable<Array<Project>>;
	productsCount: any;
	teamMembers$: Observable<Array<User>>;

	selectedExport: 'excel' | 'pdf' = 'excel';
	selectedProjects = {};

	constructor(private store: Store<any>, private actionSubject: ActionsSubject) {}

	ngOnInit() {
		this.projects$ = this.store.select(selectMyTeamProjects);
		this.store
			.select(selectProjectsProductsCount)
			.subscribe(count => (this.productsCount = count));
		this.teamMembers$ = this.store.select(selectMyTeamMembers);
		this.store.dispatch(ProjectActions.loadProductCount(ERM.projects));
	}

	public openAddToProjectDialog() {
		this.store.dispatch(DialogActions.open(this.addProductDialog));
	}
	public closeAddToProjectDialog($event) {
		this.selectedProjects = {};
	}
	public addToProjects() {
		const products: Array<String> = new Array();
		this.selection.forEach((value, key) => {
			if (value) products.push(key);
		});
		this.store.dispatch(
			ProjectActions.addProducts(Object.keys(this.selectedProjects), products)
		);
		this.actionSubject.subscribe(action => {
			if (action.type === ProjectsActionTypes.ADD_PRODUCTS_SUCCESS) {
				this.store.dispatch(DialogActions.close(this.addProductDialog));
			}
		});
	}

	public openExportDialog() {
		this.store.dispatch(DialogActions.open(this.exportDialog));
	}
	public closeExportDialog($event) {}
	public openRequestFeedbackDialog() {
		this.store.dispatch(DialogActions.open(this.requestFeedbackDialog));
	}
	public closeRequestFeedbackDialog($event) {}

	public selectExport(value: 'excel' | 'pdf') {
		this.selectedExport = value;
	}

	public toggleSelectProject(id: string) {
		if (!this.selectedProjects[id]) {
			this.selectedProjects[id] = true;
		} else {
			delete this.selectedProjects[id];
		}
	}
}
