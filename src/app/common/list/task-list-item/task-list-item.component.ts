import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '~core/models';

@Component({
	selector: 'task-list-item-app',
	templateUrl: './task-list-item.component.html',
	styleUrls: ['./task-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListItemComponent {
	@Input() task: Task;
}
