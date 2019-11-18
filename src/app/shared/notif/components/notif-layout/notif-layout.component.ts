import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'notif-layout-app',
	templateUrl: './notif-layout.component.html',
	styleUrls: ['./notif-layout.component.scss'],
})
export class NotifLayoutComponent implements OnInit {
	@Input() pendingForAnimation = false;
	@Input() isOpen = false;

	constructor() {
	}

	ngOnInit() {

	}

}
