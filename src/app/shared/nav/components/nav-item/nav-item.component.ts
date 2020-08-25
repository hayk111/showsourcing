import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'nav-item-app',
	templateUrl: './nav-item.component.html',
	styleUrls: ['./nav-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent {
	@Input() icon: string;
	@Input() name: string;
	@Input() link: string;
	@Input() active = false;
	@Input() badgeContent: number;

	constructor() { }

}
