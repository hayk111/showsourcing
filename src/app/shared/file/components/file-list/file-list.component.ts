import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attachment } from '~core/models';
import { AttachmentService } from '~core/entity-services';
import { DialogService } from '~shared/dialog';
import { UploaderFeedbackService } from '~shared/file/services/uploader-view.service';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
	selector: 'file-list-app',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListComponent extends AutoUnsub implements OnInit {
	@Input() files: Attachment[];
	@Input() linkedItem: any;
	/** whether we can add files or not */
	@Input() static = false;
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
