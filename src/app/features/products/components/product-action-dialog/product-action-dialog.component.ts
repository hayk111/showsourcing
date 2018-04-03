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
	@Input() dialogName: DialogName;
	@Input() header: string;
	@Input() title: string;
	@Input() buttonLabel: string;
	@Input() entities: Array<Entity>;
	@Input() productsCount: any;
	@Input() dialogType: 'add' | 'feedback' | 'export';
	@Output() closed = new EventEmitter();
	@Output() buttonClicked = new EventEmitter();

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
