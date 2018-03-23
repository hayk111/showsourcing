import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'status-selector-badge-app',
	templateUrl: './status-selector-badge.component.html',
	styleUrls: ['./status-selector-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusSelectorBadgeComponent implements OnInit {
	@Input() status;
	@Input() choices: Array<string> = [];
	@Output() update = new EventEmitter<string>();
	panelVisible = false;

	constructor() {}

	ngOnInit() {}

	displayPanel() {
		if (this.choices.length > 0) this.panelVisible = true;
	}

	closePanel() {
		this.panelVisible = false;
	}

	selectStatus(id: string) {
		this.update.emit(id);
		this.closePanel();
	}
}
