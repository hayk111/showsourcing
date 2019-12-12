import { ChangeDetectionStrategy, Component, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'controller-list-quick-actions-app',
	templateUrl: './controller-list-quick-actions.component.html',
	styleUrls: ['./controller-list-quick-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerListQuickActionsComponent {
	@Input() export = new EventEmitter();
}
