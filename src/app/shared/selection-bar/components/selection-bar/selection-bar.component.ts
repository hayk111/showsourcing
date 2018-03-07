import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityRepresentation } from '~entity';

@Component({
	selector: 'selection-bar-app',
	templateUrl: './selection-bar.component.html',
	styleUrls: ['./selection-bar.component.scss'],
})
export class SelectionBarComponent implements OnInit {
	@Input() repr: EntityRepresentation;
	@Input() selection: Map<string, boolean>;
	@Output() close = new EventEmitter();
	@Output() delete = new EventEmitter();
	constructor() {}

	ngOnInit() {}

	deleteAction() {
		this.delete.emit(this.selection);
	}
}
