import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Attachment } from '~core/erm';
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

	@Input() set files(files: Array<Attachment>) {
		this.uploaderFeedback.setFiles(files);
	}
	get files(): Array<Attachment> {
		return this.uploaderFeedback.getFiles();
	}

	defaultImg = DEFAULT_FILE_ICON;

	@Input() secondaryStyle = false;
	@Input() linkedItem: any;
	@Output() uploaded = new EventEmitter<Attachment[]>();
	@Output() deleted = new EventEmitter<Attachment>();

	constructor(
		private uploaderFeedback: UploaderFeedbackService
	) {
		super();
	}


	ngOnInit() {
		this.uploaderFeedback.init({ linkedEntity: this.linkedItem });
		this.uploaderFeedback.uploaded$
			.pipe(takeUntil(this._destroy$))
			.subscribe(attachments => this.uploaded.emit(attachments as Attachment[]));
	}

	onFileAdded(files: Array<File>) {
		this.uploaderFeedback.addFiles(files).subscribe();
	}

}
