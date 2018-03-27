import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'product-status-badge-app',
	templateUrl: './product-status-badge.component.html',
	styleUrls: ['./product-status-badge.component.scss'],
})
export class ProductStatusBadgeComponent implements OnInit {
	@Input() status;
	@Input() choices: Array<string> = [];
	@Output() update = new EventEmitter<string>();
	panelVisible = false;

	constructor(private store: Store<any>) { }

	ngOnInit() { }

	displayPanel() {
		this.panelVisible = true;
	}

	closePanel() {
		this.panelVisible = false;
	}

	selectStatus(id: string) {
		this.update.emit(id);
		this.closePanel();
	}
}
