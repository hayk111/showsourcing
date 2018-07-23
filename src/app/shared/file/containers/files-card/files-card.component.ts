import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppFile } from '~models';
import { UploaderService } from '~shared/file/services/uploader.service';
import { DEFAULT_FILE_ICON } from '~utils';
import { PendingFile } from '~utils/pending-file.class';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'files-card-app',
	templateUrl: './files-card.component.html',
	styleUrls: ['./files-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesCardComponent {
	@Input() set files(files: Array<AppFile | PendingFile>) {
		this._files = files;
	}
	get files() {
		return [...this._files, ...this._pendingFiles];
	}
	private _files = [];
	private _pendingFiles = [];

	@Output() fileRemove = new EventEmitter<AppFile>();
	defaultImg = DEFAULT_FILE_ICON;

	constructor(
		private uploader: UploaderService,
		private dlgSrv: DialogService
	) { }

	onFileAdded(files: Array<File>) {
		this._pendingFiles = files.map(file => new PendingFile(file));
		this.uploader.uploadFiles(files).subscribe(_ => this._pendingFiles = []);
	}

	onFileRemoved(file: AppFile) {
		this.dlgSrv.open(ConfirmDialogComponent, {
			text: 'Remove 1 file ?',
			callback: () => this.fileRemove.emit(file)
		});
	}
}
