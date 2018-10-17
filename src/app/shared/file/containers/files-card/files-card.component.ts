import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment, Supplier } from '~models';
import { UploaderService } from '~shared/file/services/uploader.service';
import { DEFAULT_FILE_ICON } from '~utils';
import { PendingFile } from '~utils/pending-file.class';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { any } from 'async';

export enum PageType {
	product = 'PRODUCT',
	supplier = 'SUPPLIER'
}


@Component({
	selector: 'files-card-app',
	templateUrl: './files-card.component.html',
	styleUrls: ['./files-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesCardComponent extends TrackingComponent {
	@Input() set files(files: Array<Attachment | PendingFile>) {
		this._files = files || [];
	}
	get files() {
		return [...this._files, ...this._pendingFiles];
	}
	private _files = [];
	private _pendingFiles = [];

	@Output() fileRemove = new EventEmitter<Attachment>();
	@Output() fileAdded = new EventEmitter<Attachment[]>();
	defaultImg = DEFAULT_FILE_ICON;

  @Input() linkedItem: any;

	constructor(
		private uploader: UploaderService,
		private dlgSrv: DialogService
	) {
    super();
  }

	onFileAdded(files: Array<File>) {
		this._pendingFiles = files.map(file => new PendingFile(file));
		this.uploader.uploadFiles(files, this.linkedItem).subscribe(addedFiles => {
      // console.log(addedFiles);
			this.fileAdded.emit(addedFiles);
			this._pendingFiles = [];
		});
	}

	onFileRemoved(file: Attachment) {
		this.dlgSrv.open(ConfirmDialogComponent, {
			text: 'Remove 1 file ?',
			callback: () => this.fileRemove.emit(file)
		});
	}
}
