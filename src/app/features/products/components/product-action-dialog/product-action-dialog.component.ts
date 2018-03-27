import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Entity } from '~entity';
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
	constructor() { }

	ngOnInit() { }

	selectEntity(id: string, entity) {
		this.selectedEntities[id] = entity;
	}

	unselectEntity(id: string, entity) {
		delete this.selectedEntities[id];
	}

	selectExport(value: 'excel' | 'pdf') {
		this.selectedExport = value;
	}

	close() {
		this.selectedEntities = {};
		this.closed.emit();
	}
}
