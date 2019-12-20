import { Component, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

@Component({
	selector: 'task-selection-bar-app',
	templateUrl: './task-selection-bar.component.html',
	styleUrls: ['./task-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSelectionBarComponent extends EntitySelectionBarComponent {

	@Input() allSelectedFavorite: boolean;
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() statusUpdated = new EventEmitter<any>();

	constructor() {
		super();
	}
}
