import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { AppFile } from '~features/file';
import { EntityTarget } from '~entity';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'input-file-app',
	templateUrl: './input-file.component.html',
	styleUrls: ['./input-file.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFileComponent implements OnInit {
	@Input() multi = true;
	@Input() label = '';
	private _type: 'file' | 'image' = 'file';
	accept: string;
	@Output() fileAdded = new EventEmitter<File>();
	@Output() error = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	onFilesAdded(files: Array<File>) {
		if (! this._type || this._type === 'file')
			this.simpleEmit(files);
		else
			this.conditionalEmit(files);
	}

	simpleEmit(files: Array<File>) {
		files.forEach(f => this.fileAdded.emit(f));
	}

	conditionalEmit(files: Array<File>) {
		files.forEach(file => {
			if (file.type.split('/')[0] === this._type) {
				this.fileAdded.emit(file);
			} else {
				this.error.emit('wrong format');
			}
		});
	}

	@Input()
	set type(type: 'file' | 'image') {
		this._type = type;

		switch (type) {
			case 'image':
				this.accept = '.jpg, .jpeg, .png';
		}

	}

	get type() {
		return this._type;
	}

}
