import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'input-packaging-app',
	templateUrl: './input-packaging.component.html',
	styleUrls: ['./input-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPackagingComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
