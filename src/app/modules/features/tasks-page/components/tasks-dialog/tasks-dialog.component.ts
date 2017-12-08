import { Component, OnInit } from '@angular/core';
import { DialogName } from '../../../../store/model/dialog.model';
import { Observable } from 'rxjs/Observable';
import { Task } from '../../../../store/model/task.model';
import { Store } from '@ngrx/store';
import { selectDialog } from '../../../../store/selectors/dialog.selector';
import { filter, map, switchMap } from 'rxjs/operators';
import { selectTaskById } from '../../../../store/selectors/tasks.selector';
import { DynamicFormGroup } from '../../../../shared/dynamic-forms/utils/dynamic-controls.class';
import { of } from 'rxjs/observable/of';
import { DynamicFormsService } from '../../../../shared/dynamic-forms/services/dynamic-forms.service';
import { TaskActions } from '../../../../store/action/task.action';

@Component({
	selector: 'tasks-dialog-app',
	templateUrl: './tasks-dialog.component.html',
	styleUrls: ['./tasks-dialog.component.scss']
})
export class TasksDialogComponent implements OnInit {
	dlgName = DialogName.TASK;
	task$: Observable<Task>;
	task: Task;
	groups$: Observable<Array<DynamicFormGroup>>;

	constructor(private store: Store<any>, private dynamicFormsSrv: DynamicFormsService) { }

	ngOnInit() {
		// this.groups$ = of(customFieldsMock)
		// .map(desc => [
		// 		this.dynamicFormsSrv.toDynamicFormGroup(desc.groups[0]),
		// 	]);
	}

	onDlgRegistered() {
		// when we receive dlg metadata, we get the correct product
		this.task$ = this.store.select(selectDialog(DialogName.TASK))
			.pipe(
				filter((dlgInfo: any) =>  dlgInfo.metadata),
				map((dlgInfo: any) => dlgInfo.metadata.id),
				switchMap(id => this.store.select<any>(selectTaskById(id)))
			);
		this.task$.subscribe(task => this.task = task) ;
	}

	onEnter( { name, value} ) {
		this.store.dispatch(TaskActions.patch(this.task.id, name, value));
	}

}

const customFieldsMock = {
	groups: [
		{
			name: 'Group 1',
			'fields': [
				{'name': 'description', 'label': 'Description', 'fieldType': 'standard'},
				{'name': 'taskType', 'label': 'Type', 'fieldType': 'standard'},
				{'name': 'product.name', 'label': 'product', 'fieldType': 'standard'},
				{'name': 'supplierId', 'label': 'supplier', 'fieldType': 'entitySelect', metadata: { entity: 'suppliers'}},
			]
		}
	]
};
