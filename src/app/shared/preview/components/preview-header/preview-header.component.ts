import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { EntityMetadata } from '~models';

@Component({
	selector: 'preview-header-app',
	templateUrl: './preview-header.component.html',
	styleUrls: ['./preview-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewHeaderComponent implements OnInit {

	/** array of names for icons that are going to be displayed */
	@Input() badges: EntityMetadata[];
	/** entity metadata for the header */
	@Input() entityMD: EntityMetadata;
	/** entity for the workflow action */
	@Input() entity: any;
	/** emits the value that has changed */
	@Output() update = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	updateEntity(isClosed: boolean, value: any) {
		if (!isClosed) this.update.emit(value);
	}

}
