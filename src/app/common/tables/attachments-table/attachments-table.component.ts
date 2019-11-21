import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { Attachment, ERM } from '~core/models';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { TranslateService } from '@ngx-translate/core';


const bigTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 200, sortProperty: 'fileName' },
	nameIcon: { name: 'name icon', translationKey: 'name', width: 200, sortProperty: 'fileName' },
	createdBy: { name: 'createdBy', translationKey: 'createdBy', width: 120, sortProperty: 'reference' },
	creationDate: { name: 'creationDate', translationKey: 'creationDate', width: 100, sortProperty: 'creationDate' },
	actions: { name: 'actions', translationKey: 'actions', width: 100, sortProperty: 'product.name', showOnHover: true },
	creationInfoAction: { name: 'createdBy creationDate action', translationKey: '', width: 100, sortable: false },
};


@Component({
	selector: 'attachments-table-app',
	templateUrl: './attachments-table.component.html',
	styleUrls: [
		'./attachments-table.component.scss',
		'../table.scss'
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

	tableConfig = bigTableConfig;
	columns = ['name', 'createdBy', 'creationDate', 'actions'];

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
