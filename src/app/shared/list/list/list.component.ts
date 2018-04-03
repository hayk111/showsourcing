import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'list-app',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
