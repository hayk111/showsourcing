import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityName } from '~core/models';
import { colorMap } from '~shared/logo';
import { Color } from '~utils';

@Component({
	selector: 'info-badge-app',
	templateUrl: './info-badge.component.html',
	styleUrls: ['./info-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBadgeComponent implements OnInit {

	@Input() type: EntityName.CATEGORY | EntityName.TAG | EntityName.PROJECT;
	@Input() size = 's';
	@Input() hasDelete = false;
	@Output() delete = new EventEmitter<null>();
	color: string;
	infoType: string;

	constructor() { }

	ngOnInit() {
		this.initColor();
	}

	initColor() {
		this.infoType = this.type && colorMap[this.type] ? colorMap[this.type] : Color.SECONDARY;
	}

}
