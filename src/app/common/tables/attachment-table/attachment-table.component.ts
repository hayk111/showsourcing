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


const bigTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 200, sortable: true },
	createdBy: { name: 'createdBy', translationKey: 'createdBy', width: 120, sortProperty: 'reference' },
	creationDate: { name: 'creationDate', translationKey: 'creationDate', width: 100, sortProperty: 'creationDate' },
	actions: { name: 'actions', translationKey: 'actions', width: 100, sortProperty: 'product.name', showOnHover: true },
};


@Component({
	selector: 'attachment-table-app',
	templateUrl: './attachment-table.component.html',
	styleUrls: [
		'./attachment-table.component.scss',
		'../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		UploaderFeedbackService
	]
})
export class AttachmentTableComponent extends EntityTableComponent<Attachment> implements OnInit {
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
	erm = ERM;

	constructor(
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
