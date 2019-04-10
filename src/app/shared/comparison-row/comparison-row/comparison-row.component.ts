import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'comparison-row-app',
	templateUrl: './comparison-row.component.html',
	styleUrls: ['./comparison-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexBetween'
	}
})
export class ComparisonRowComponent implements OnInit {
	@Input() values: string[];
	@Input() label: string;
	@Input() hasCheckbox = true;
	isChecked: boolean;

	constructor() { }

	ngOnInit() {
	}

}
