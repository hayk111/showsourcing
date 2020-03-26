import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ERM } from '~core/erm';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'preview-header-app',
	templateUrl: './preview-header.component.html',
	styleUrls: ['./preview-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewHeaderComponent implements OnInit {

	/** entity metadata for the header */
	@Input() typename: Typename;
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
