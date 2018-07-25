import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'stage-indicator-app',
	templateUrl: './stage-indicator.component.html',
	styleUrls: ['./stage-indicator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StageIndicatorComponent implements OnInit {

	@Input() titles: Array<string>;
	@Input() index: number;

	constructor() { }

	ngOnInit() {
	}

}
