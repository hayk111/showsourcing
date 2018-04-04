import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'list-item-app',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'pointer' }
})
export class ListItemComponent {
	@Input() @HostBinding('class.selected') selected;
	constructor() { }



}
