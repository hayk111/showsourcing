import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { Attachment, ERM } from '~core/models';
import { ID } from '~utils/id.utils';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';


const bigTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 200, sortable: true },
	createdBy: { name: 'createdBy', translationKey: 'createdBy', width: 120, sortProperty: 'reference' },
	creationDate: { name: 'creationDate', translationKey: 'creationDate', width: 100, sortProperty: 'creationDate' },
	actions: { name: 'actions', translationKey: 'actions', width: 100, sortProperty: 'product.name' },
};


@Component({
	selector: 'attachment-table-app',
	templateUrl: './attachment-table.component.html',
	styleUrls: [
		'./attachment-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentTableComponent extends EntityTableComponent<Attachment> implements OnInit {

	@Input() set rows(attachments: Attachment[]) {
		this.uploadFeedback.setFiles(attachments);
	}
	get rows() {
		return this.uploadFeedback.getFiles();
	}
	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();

	tableConfig = bigTableConfig;
	columns = ['name', 'createdBy', 'creationDate', 'actions'];
	erm = ERM;

	constructor(
		protected uploadFeedback: UploaderFeedbackService,
		public translate: TranslateService
		) { super(); }

	addFile(files: Array<File>) {
		this.uploadFeedback.addFiles(files);
	}


}
