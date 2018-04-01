import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'side-menu-item-app',
	templateUrl: './side-menu-item.component.html',
	styleUrls: ['./side-menu-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'pointer ripple' }
})
export class SideMenuItemComponent implements OnInit {
	// just adds classes to host on selection
	@HostBinding('class.selected') @Input() selected: boolean;
	@HostBinding('class.unselected') get unselected() { return !this.selected; }

	constructor() { }

	ngOnInit() {
	}

}
