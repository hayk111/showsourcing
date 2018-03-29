import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'side-menu-app',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
