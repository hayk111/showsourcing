import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ERM } from '~core/models';
import { TodoCounts } from '~features/dashboard/services/dashboard.service';

export const tabConfig = [
	{ subtitle: 'Assigned to you', title: ERM.PRODUCT.plural, type: ERM.PRODUCT.singular },
	{ subtitle: 'Assigned to you', title: ERM.TASK.plural, type: ERM.TASK.singular },
	{ subtitle: 'Assigned to you', title: ERM.SUPPLIER.plural, type: ERM.SUPPLIER.singular },
	{ subtitle: 'Assigned to you', title: ERM.SAMPLE.plural, type: ERM.SAMPLE.singular }
];

@Component({
	selector: 'todo-nav-app',
	templateUrl: './todo-nav.component.html',
	styleUrls: ['./todo-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex' }
})
export class TodoNavComponent {
	@Input() counts: TodoCounts = {};
	@Input() selectedTab = 'product';
	@Output() tabSelected = new EventEmitter<string>();
	tabConfig = tabConfig;
}
