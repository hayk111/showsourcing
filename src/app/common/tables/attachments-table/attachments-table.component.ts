import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Attachment } from '~core/erm/models';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { defaultConfig } from '../default-columns/default-config';
import { TableConfig, EntityTableComponent } from '../entity-table.component';


const config: TableConfig = {
	...defaultConfig,
	actions: { name: 'actions', translationKey: 'actions', width: 100, sortable: false, showOnHover: true, fixedWidth: true },
};


@Component({
	selector: 'attachments-table-app',
	templateUrl: './attachments-table.component.html',
	styleUrls: [
		'./attachments-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		UploaderFeedbackService
	]
})
export class AttachmentsTableComponent extends EntityTableComponent<Attachment> implements OnInit {
	@ViewChild('inpFile', { static: true }) inpFile: ElementRef<HTMLInputElement>;
	@Input() linkedEntity;
	@Input() set rows(attachments: Attachment[]) {
		this.uploadFeedback.setFiles(attachments);
	}
	get rows() {
		return this.uploadFeedback.getFiles();
	}
	@Output() upload = new EventEmitter<Attachment[]>();

	tableConfig = config;
	columns = [
		'logo',
		'name',
		'createdBy',
		'creationDate',
		'actions'
	];

	constructor(
		public translate: TranslateService,
		protected uploadFeedback: UploaderFeedbackService,
	) { super(); }

	ngOnInit() {
		super.ngOnInit();
		this.uploadFeedback.init({ linkedEntity: this.linkedEntity });
	}

	addFile(files: Array<File>) {
		this.uploadFeedback.addFiles(files)
			.subscribe(attachments => this.upload.emit(attachments));
	}

	download(attachment: Attachment) {
		saveAs(attachment.url, attachment.fileName);
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

}
