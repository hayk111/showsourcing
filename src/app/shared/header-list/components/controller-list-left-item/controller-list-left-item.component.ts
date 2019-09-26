import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'controller-list-left-item-app',
	templateUrl: './controller-list-left-item.component.html',
	styleUrls: ['./controller-list-left-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex' }
})
export class ControllerListLeftItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
