import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';
import { StatusUtils } from '~utils';

@Component({
	selector: 'attachment-list-item-app',
	templateUrl: './attachment-list-item.component.html',
	styleUrls: ['./attachment-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentListItemComponent {
	@Input() attachment: Attachment;
}
