import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment, Supplier } from '~models';
import { UploaderService } from '~shared/file/services/uploader.service';
import { DEFAULT_FILE_ICON, AutoUnsub } from '~utils';
import { PendingFile } from '~utils/pending-file.class';
import { DialogService } from '~shared/dialog/services';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { TrackingComponent } from '~utils/tracking-component';
import { any } from 'async';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { AttachmentService } from '~core/entity-services';
import { takeUntil, switchMap } from 'rxjs/operators';

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
export class FilesCardComponent extends AutoUnsub {
	@Input() set files(files: Array<Attachment | PendingFile>) {
		this._files = files || [];
	}
	get files(): Array<Attachment | PendingFile> {
		return [...this._files, ...this._pendingFiles];
	}
	private _files = [];
	private _pendingFiles = [];

	defaultImg = DEFAULT_FILE_ICON;

	@Input() linkedItem: any;

	constructor(
		private uploader: UploaderService,
		private dlgSrv: DialogService,
		private attachmentSrv: AttachmentService
	) {
		super();
	}

	onFileAdded(files: Array<File>) {
		this._pendingFiles = files.map(file => new PendingFile(file));
		this.uploader.uploadFiles(files, this.linkedItem).subscribe(addedFiles => {
			this._pendingFiles = [];
		});
	}

	onFileRemoved(file: Attachment) {
		this.dlgSrv.open(ConfirmDialogComponent, {
			text: 'Remove 1 file ?'
		}).pipe(
			takeUntil(this._destroy$),
			switchMap(_ => this.removeFile(file))
		).subscribe();
	}

	private removeFile(file: Attachment) {
		return this.attachmentSrv.delete(file.id);
	}

	// dumb function to not have the error: '<anonymous>' does not contain such a member
	isPending(file: Attachment) {
		return file.pending;
	}
}
