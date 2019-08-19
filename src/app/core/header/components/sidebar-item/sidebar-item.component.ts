import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'sidebar-item-app',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss'],
})

export class SidebarItemComponent implements OnInit {
	@Input() icon: string;
	@Input() link: string;
	@Input() badge: any;
	@Input() subItems: any[];

	constructor() { }

	ngOnInit() { }
}
