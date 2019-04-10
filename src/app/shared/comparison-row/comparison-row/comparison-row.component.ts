import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';

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
	@Output() selected = new EventEmitter<null>();
	@Output() unselected = new EventEmitter<null>();
	isChecked: boolean;

	constructor() { }

	ngOnInit() {
	}

}
