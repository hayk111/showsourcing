import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { FileActions } from '../../../../store/action/entities/file.action';

@Component({
	selector: 'file-preview-app',
	templateUrl: './file-preview.component.html',
	styleUrls: ['./file-preview.component.scss'],
	// if OnPush is used here we have to make sure the
	// @Input() files is changing ref
})
export class FilePreviewComponent implements OnInit {
	@Input() files: Array<AppFile> = [];
	@Output() fileClicked = new EventEmitter<AppFile>();

	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	onClick(index) {
		this.fileClicked.emit(this.files[index]);
	}

	getExtension(file: AppFile) {
		return AppFile.getExtension(file.fileName);
	}

	download(f: AppFile) {
		this.store.dispatch(FileActions.download(f));
	}

}
