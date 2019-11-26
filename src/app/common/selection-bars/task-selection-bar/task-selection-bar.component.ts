import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';

@Component({
	selector: 'task-selection-bar-app',
	templateUrl: './task-selection-bar.component.html',
	styleUrls: ['./task-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSelectionBarComponent implements OnInit {

	@Input() isShown = false;
	@Input() selection: Map<string, boolean>;
	@Input() count: number;
	@Input() allSelectedFavorite: boolean;
	@Output() close = new EventEmitter<null>();
	@Output() deleteSelected = new EventEmitter<null>();
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() statusUpdated = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

}
