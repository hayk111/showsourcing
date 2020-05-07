import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Attachment } from '~core/erm';
import { defaultConfig } from '../default-columns/default-config';
import { TableConfig, EntityTableComponent } from '../entity-table.component';
import { UploaderService } from '~shared/file/services/uploader.service';


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
})
export class AttachmentsTableComponent extends EntityTableComponent<Attachment> implements OnInit {
	@ViewChild('inpFile', { static: true }) inpFile: ElementRef<HTMLInputElement>;
	@Input() linkedEntity;
	@Input() rows: Attachment[];
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
		protected uploader: UploaderService,
	) { super(); }

	ngOnInit() {
		super.ngOnInit();
	}

	addFile(files: Array<File>) {
		// this.uploader.uploadFiles(files, this.nodeId)
		// 	.onTempFiles(_ => do something with temp files)
		// 	.subscribe(attachments => do something when upload finishes);
	}

	download(attachment: Attachment) {
		saveAs(attachment.url, attachment.fileName);
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

}
