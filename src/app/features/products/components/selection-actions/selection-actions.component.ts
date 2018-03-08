import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'selection-actions',
	templateUrl: './selection-actions.component.html',
	styleUrls: ['./selection-actions.component.scss'],
})
export class SelectionActionsComponent implements OnInit {
	@Input() selection: Map<string, boolean>;
	@Output() openAddToProjectDialog = new EventEmitter();
	@Output() openExportDialog = new EventEmitter();
	@Output() openRequestFeedbackDialog = new EventEmitter();

	constructor() {}

	ngOnInit() {}
}
