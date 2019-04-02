import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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

	downloadFile(file: Attachment) {
		this.attachmentSrv.download(file);
	}

	// dumb function to not have the error: '<anonymous>' does not contain such a member because
	isPending(file: Attachment) {
		return file.pending;
	}

}
