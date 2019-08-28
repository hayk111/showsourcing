import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Task, ERM } from '~models';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'tasks-list-view-app',
	templateUrl: './tasks-list-view.component.html',
	styleUrls: [
		'./tasks-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListViewComponent extends ListViewComponent<Task> {

	erm = ERM;

	@Output() archive = new EventEmitter<Task>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor() {
		super();
	}

}
