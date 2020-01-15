import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'compare-spacer-app',
	templateUrl: './compare-spacer.component.html',
	styleUrls: ['./compare-spacer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareSpacerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
