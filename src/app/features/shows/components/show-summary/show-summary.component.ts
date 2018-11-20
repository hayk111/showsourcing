import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Show } from '~models';

@Component({
	selector: 'show-summary-app',
	templateUrl: './show-summary.component.html',
	styleUrls: ['./show-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSummaryComponent implements OnInit {
	@Input() show: Show;
	constructor() { }

	ngOnInit() {
	}

}
