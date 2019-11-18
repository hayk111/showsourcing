import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'side-menu-app',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'z-2' }
})
export class SideMenuComponent implements OnInit {
	@Input() title = '';
	constructor() { }

	ngOnInit() {
	}

}
