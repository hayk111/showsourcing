import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Entity } from '~entity/models';
import { DialogName } from '~shared/dialog';

@Component({
	selector: 'product-action-dialog-app',
	templateUrl: './product-action-dialog.component.html',
	styleUrls: ['./product-action-dialog.component.scss'],
})
export class ProductActionDialogComponent implements OnInit {
	@Input() public dialogName: DialogName;
	@Input() public header: string;
	@Input() public title: string;
	@Input() public buttonLabel: string;
	@Input() public entities: Array<Entity>;
	@Input() public productsCount: any;
	@Input() public dialogType: 'add' | 'feedback' | 'export';
	@Output() public closed = new EventEmitter();
	@Output() public buttonClicked = new EventEmitter();

	selectedExport: 'excel' | 'pdf' = 'excel';
	selectedEntities = {};
	constructor() {}

	ngOnInit() {}

	public toggleSelectEntity(id: string, entity) {
		if (!this.selectedEntities[id]) {
			this.selectedEntities[id] = entity;
		} else {
			delete this.selectedEntities[id];
		}
	}

	public selectExport(value: 'excel' | 'pdf') {
		this.selectedExport = value;
	}

	public close() {
		this.selectedEntities = {};
		this.closed.emit();
	}
}
