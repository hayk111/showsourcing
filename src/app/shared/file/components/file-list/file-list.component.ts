import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Attachment } from '~core/models';
import { AttachmentService } from '~core/entity-services';
import { DialogService, CloseEvent, CloseEventType } from '~shared/dialog';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { takeUntil, switchMap, filter } from 'rxjs/operators';

@Component({
	selector: 'file-list-app',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListComponent extends AutoUnsub implements OnInit {
	@Input() files: Attachment[];
	/** whether we display a place holder when there is no files */
	@Input() hasPlaceholder = true;
	@Input() linkedItem: any;
	/** whether we can add files or not */
	@Input() static = false;
	/** whether we show the confirm dialog before deleting,
	 * useful when we are already in a dialog and don't want the first
	 * one to appear */
	@Input() showConfirmOnDelete = true;

	@ViewChild('inpFile') inpFile: ElementRef<HTMLInputElement>;

	constructor(
		private uploaderFeedback: UploaderFeedbackService,
		private dlgSrv: DialogService,
		private attachmentSrv: AttachmentService
	) {
		super();
	}

	ngOnInit() {
		if (!this.static)
			this.uploaderFeedback.init({ linkedEntity: this.linkedItem });
	}

	onFileAdded(files: Array<File>) {
		if (!this.static)
			this.uploaderFeedback.addFiles(files);
	}

	onFileRemoved(file: Attachment, event: MouseEvent) {
		if (this.static)
			return;

		event.stopPropagation();
		if (this.showConfirmOnDelete) {
			this.dlgSrv.open(ConfirmDialogComponent, {
				text: 'Remove 1 file ?'
			}).pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.removeFile(file)),
				takeUntil(this._destroy$),
			).subscribe();
		} else {
			this.removeFile(file).subscribe();
		}
	}

	private removeFile(file: Attachment) {
		return this.attachmentSrv.delete(file.id);
	}

	downloadFile(file: Attachment) {
		this.attachmentSrv.download(file);
	}

	// dumb function to not have the error: '<anonymous>' does not contain such a member because
	isPending(file: Attachment) {
		return file.pending;
	}

	openFileBrowser() {
		if (!this.static)
			this.inpFile.nativeElement.click();
	}

}