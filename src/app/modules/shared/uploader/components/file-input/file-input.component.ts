import { Component, OnInit, Input } from '@angular/core';
import { EntityRepresentation } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { AppFile } from '../../../../store/model/app-file.model';
import { FileActions } from '../../../../store/action/app-file.action';
import { EntityTarget } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'file-input-app',
	templateUrl: './file-input.component.html',
	styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
	@Input() target: EntityTarget;

	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	onFileDrop(files: Array<File>) {
		files.forEach(file => {
			const appFile: AppFile = { file, target: this.target };
			this.store.dispatch(FileActions.addNew(appFile));
		});
	}

	onChange(event) {
		debugger;
	}

}
