import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'notif-list-app',
	templateUrl: './notif-list.component.html',
	styleUrls: ['./notif-list.component.scss'],
})
export class NotifListComponent implements OnInit {

	@Input() items: any[] = [];

	constructor() {
	}

	ngOnInit() {

	}

}
