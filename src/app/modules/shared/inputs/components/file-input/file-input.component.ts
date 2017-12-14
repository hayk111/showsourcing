import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppFile } from '../../../../store/model/app-file.model';
import { FileActions } from '../../../../store/action/file.action';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Observable } from 'rxjs/Observable';
import { selectFilesForTarget } from '../../../../store/selectors/file.selector';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'file-input-app',
	templateUrl: './file-input.component.html',
	styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
	files$: Observable<Array<AppFile>>;
	private _target: EntityTarget;
	// @Input target at the bottom

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.files$ = this.store.select<any>(selectFilesForTarget(this.target));
	}

	onFileChange(files: Array<File>) {
		files.forEach(file => {
			const appFile: AppFile = { file, target: this.target };
			this.store.dispatch(FileActions.addNew(appFile));
		});
	}

	getExtension(name: string) {
		const parts = name.split('.');
		return parts[parts.length - 1];
	}

	@Input()
	set target(target: EntityTarget) {
		this.store.dispatch(FileActions.load(target));
		this._target = target;
	}

	get target() {
		return this._target;
	}

}
