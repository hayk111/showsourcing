import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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
import { UploaderFeedbackService } from '~shared/file/services/uploader-view.service';

export enum PageType {
	product = 'PRODUCT',
	supplier = 'SUPPLIER'
}


@Component({
	selector: 'files-card-app',
	templateUrl: './files-card.component.html',
	styleUrls: ['./files-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService]
})
export class FilesCardComponent extends AutoUnsub implements OnInit {
	@Input() set files(files: Array<Attachment | PendingFile>) {
		this.uploaderFeedback.setFiles(files);
	}
	get files(): Array<Attachment | PendingFile> {
		return this.uploaderFeedback.getFiles();
	}
	private _files = [];
	private _pendingFiles = [];

	defaultImg = DEFAULT_FILE_ICON;

	@Input() linkedItem: any;

	constructor(
		private uploaderFeedback: UploaderFeedbackService,
		private dlgSrv: DialogService,
		private attachmentSrv: AttachmentService
	) {
		super();
	}

	ngOnInit() {
		this.uploaderFeedback.init({ linkedEntity: this.linkedItem });
	}

	onFileAdded(files: Array<File>) {
		this.uploaderFeedback.addFiles(files);
	}

	onFileRemoved(file: Attachment, event: MouseEvent) {
		event.stopPropagation();
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

	downloadFile(file: Attachment) {
		this.attachmentSrv.download(file);
	}
}
