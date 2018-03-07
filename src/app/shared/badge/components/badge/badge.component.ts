import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'badge-app',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
	@Input() title;
	@Input() color = 'primary';
	constructor() {}

	ngOnInit() {}
}
