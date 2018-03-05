import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Project } from '~projects/models/project.model';
import { selectMyProjects } from '~projects/store/selectors/projects.selector';
import { DialogActions, DialogName } from '~shared/dialog';
import { selectMyTeamMembers } from '~store/selectors/entities/team-members.selector';
import { User } from '~user/models';

@Component({
	selector: 'selection-actions',
	templateUrl: './selection-actions.component.html',
	styleUrls: ['./selection-actions.component.scss'],
})
export class SelectionActionsComponent implements OnInit {
	public addProductDialog: DialogName = DialogName.ADDTOPROJECT;
	public exportDialog: DialogName = DialogName.EXPORT;
	public requestFeatureDialog: DialogName = DialogName.REQUESTFEEDBACK;

	projects$: Observable<Array<Project>>;
	teamMembers$: Observable<Array<User>>;

	selectedExport: 'excel' | 'pdf' = 'excel';

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.projects$ = this.store.select(selectMyProjects);
		this.teamMembers$ = this.store.select(selectMyTeamMembers);
		// .switchMap(projects => Observable.of(Object.values(projects)));
	}

	public addToProject() {
		this.store.dispatch(DialogActions.open(this.addProductDialog));
	}
	public export() {
		this.store.dispatch(DialogActions.open(this.exportDialog));
	}
	public requestFeedback() {
		this.store.dispatch(DialogActions.open(this.requestFeatureDialog));
	}

	public selectExport(value: 'excel' | 'pdf') {
		this.selectedExport = value;
	}
}
