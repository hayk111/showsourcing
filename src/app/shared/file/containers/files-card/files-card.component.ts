import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Attachment } from '~core/erm3';
import { AutoUnsub, DEFAULT_FILE_ICON } from '~utils';
import { UploaderService } from '~shared/file/services/uploader.service';

export enum PageType {
	product = 'PRODUCT',
	supplier = 'SUPPLIER'
}

@Component({
	selector: 'files-card-app',
	templateUrl: './files-card.component.html',
	styleUrls: ['./files-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesCardComponent {

	// TODO what is this property, it should be removed
	@Input() secondaryStyle = false;
	// TODO define how we get the image
	attachments: Attachment[] = [];
	// TODO define how we get the nodeId
	nodeId: string;

	constructor(
		private uploaderSrv: UploaderService
	) {
	}

	onFileAdded(files: Array<File>) {
		this.uploaderSrv.uploadFiles(files, this.nodeId)
		.onTempFiles(attachments => this.attachments.push(...attachments))
		.subscribe(_ => {
			// do refetch etc if any
		});
	}

}
