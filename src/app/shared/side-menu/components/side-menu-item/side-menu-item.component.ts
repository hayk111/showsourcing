import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'side-menu-item-app',
	templateUrl: './side-menu-item.component.html',
	styleUrls: ['./side-menu-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
