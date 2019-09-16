import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page';
import { Sample, ERM } from '~core/models';
import { TranslateService } from '@ngx-translate/core';


// TODO hayk config this
const tableConfig: TableConfig = {
	reference: { title: 'reference', translationKey: 'reference', width: 190, sortProperty: 'name' },
	assignee: { title: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	status: { title: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	creationDate: { title: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
};

@Component({
	selector: 'task-list-view-app',
	templateUrl: './task-list-view.component.html',
	styleUrls: [
		'./task-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListViewComponent extends ListViewComponent<Sample> {
	columns = [ 'reference', 'assignee', 'status', 'creationDate' ]; // TODO hayk add default columns here
	tableConfig = tableConfig;
	erm = ERM;

	constructor(public translate: TranslateService) { super(); }

}
