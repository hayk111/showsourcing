import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { EntityRepresentation } from '~app/entity';

@Component({
	selector: 'selection-bar-app',
	templateUrl: './selection-bar.component.html',
	styleUrls: ['./selection-bar.component.scss'],
	// commented because selection isn't currently immutable but it should be
	// changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class SelectionBarComponent implements OnInit {
	@Input() repr: EntityRepresentation;
	@Input() selection: Array<string>;
	@Output() close = new EventEmitter();
	@Output() delete = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	deleteAction() {
		this.delete.emit(this.selection);
	}
}
