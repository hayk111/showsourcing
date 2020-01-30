import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Task } from '~core/orm/models';

import { AbstractListItemComponent } from '../abstract-list-item.component';
import { StatusUtils } from '~utils';

@Component({
	selector: 'task-list-item-app',
	templateUrl: './task-list-item.component.html',
	styleUrls: ['./task-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListItemComponent extends AbstractListItemComponent<Task> {
	@Input() task: Task;

	statusUtils = StatusUtils;

	constructor(public translate: TranslateService) { super(); }
}
