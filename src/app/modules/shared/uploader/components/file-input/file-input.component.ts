import { Component, OnInit, Input } from '@angular/core';
import { EntityRepresentation } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { AppFile } from '../../../../store/model/app-file.model';

@Component({
	selector: 'file-input-app',
	templateUrl: './file-input.component.html',
	styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
	@Input() entityRepr: EntityRepresentation;
	@Input() entityId: string;

	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	onFileDrop(files: Array<AppFile>) {
		files.forEach(f => {
			this.store.dispatch(this.entityRepr.actionType.addAttachment(this.entityId, f));
		});
	}

	onChange(event) {
		debugger;
	}

}
