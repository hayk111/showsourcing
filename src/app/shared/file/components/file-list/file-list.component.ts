import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Attachment, AttachmentService } from '~core/erm';

@Component({
	selector: 'file-list-app',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
	@Input() files: Attachment[];
	/** whether we display a place holder when there is no files */
	@Input() hasPlaceholder = true;
	/** whether we can add files or not */
	@Input() static = false;
	/** whether we show the confirm dialog before deleting,
	 * useful when we are already in a dialog and don't want the first
	 * one to disappear */
	@Input() showConfirmOnDelete = true;
	@ViewChild('inp', { static: false }) inpFile: ElementRef<HTMLInputElement>;

	constructor(
		private dlgCommonSrv: DialogCommonService,
		private attachmentSrv: AttachmentService,
		private translate: TranslateService
	) {
	}

	onFileAdded(files: File[]) {
		// TODO see where we handle upload, here or above
	}

	onFileRemoved(file: Attachment, event: MouseEvent) {
		if (this.static)
			return;
		event.stopPropagation();

		// TODO see where we handle delete

		// if (this.showConfirmOnDelete) {
		// 	this.dlgCommonSrv.openConfirmDlg({
		// 		text: this.translate.instant('message.remove-1-file')
		// 	}).data$.pipe(
		// 			switchMap(_ => this.removeFile(file)),
		// 			takeUntil(this._destroy$),
		// 		).subscribe(_ => this.deleted.emit(file));
		// } else {
		// 	this.removeFile(file).subscribe();
		// 	this.deleted.emit(file);
		// }
	}


	downloadFile(file: Attachment) {
		this.attachmentSrv.download(file);
	}

	isPending(file: Attachment) {
		return file.pending;
	}

	openFileBrowser() {
		if (!this.static)
			this.inpFile.nativeElement.click();
	}

	trackByFn(index, attachment) {
		return attachment.id;
	}

}
