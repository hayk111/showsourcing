import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-guidelines',
	templateUrl: './guidelines.component.html',
	styleUrls: ['./guidelines.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidelinesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
