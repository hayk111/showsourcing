import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Attachment } from 'showsourcing-api-lib';

import { AbstractListItemComponent } from '../abstract-list-item.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'attachment-list-item-app',
	templateUrl: './attachment-list-item.component.html',
	styleUrls: ['./attachment-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentListItemComponent extends AbstractListItemComponent<Attachment> {
	@Input() attachment: Attachment;
	@Output() download = new EventEmitter<Attachment>();

	constructor(public translate: TranslateService) { super(); }

	get fileName() {
		const fileName = this.attachment.fileName;
		return fileName.slice(fileName.lastIndexOf('/') + 1);
	}
}
