import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityName } from '~core/models';
import { IconUtils } from '~utils';

@Component({
	selector: 'info-badge-app',
	templateUrl: './info-badge.component.html',
	styleUrls: ['./info-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBadgeComponent {

	@Input() type: EntityName.CATEGORY | EntityName.TAG | EntityName.PROJECT;
	@Input() hasDelete = false;
	@Output() delete = new EventEmitter<null>();

	iconsUtils = IconUtils;

	constructor() { }

}
