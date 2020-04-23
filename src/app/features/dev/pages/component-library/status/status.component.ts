import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'status-app',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
