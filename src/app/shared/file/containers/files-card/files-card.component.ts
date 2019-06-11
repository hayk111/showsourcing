import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AttachmentService } from '~core/entity-services';
import { Attachment } from '~models';
import { DialogService } from '~shared/dialog/services';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { AutoUnsub, DEFAULT_FILE_ICON } from '~utils';
import { PendingFile } from '~utils/pending-file.class';

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

	defaultImg = DEFAULT_FILE_ICON;

	@Input() linkedItem: any;

	constructor(
		private uploaderFeedback: UploaderFeedbackService
	) {
		super();
	}


	ngOnInit() {
		this.uploaderFeedback.init({ linkedEntity: this.linkedItem });
	}

	onFileAdded(files: Array<File>) {
		this.uploaderFeedback.addFiles(files);
	}

}
