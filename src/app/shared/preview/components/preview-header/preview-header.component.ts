import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { EntityMetadata, ERM, AppImage, Supplier } from '~core/erm';

@Component({
	selector: 'preview-header-app',
	templateUrl: './preview-header.component.html',
	styleUrls: ['./preview-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewHeaderComponent implements OnInit {

	/** entity metadata for the header */
	@Input() entityMD: EntityMetadata;
	/** entity for the workflow action */
	@Input() entity: any;
	/** property that we will read from the entity for the title */
	@Input() titleProp = 'name';
	/** emits the value that has changed */
	@Output() update = new EventEmitter<any>();
	@Output() statusUpdated = new EventEmitter<any>();

	erm = ERM;

	constructor() { }

	ngOnInit() {
	}

	updateEntity(isClosed: boolean, value: any) {
		if (!isClosed) this.update.emit(value);
	}

}
