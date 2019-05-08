import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Show } from '~models/show.model';

@Component({
	selector: 'show-top-panel-detail-app',
	templateUrl: './show-top-panel-detail.component.html',
	styleUrls: ['./show-top-panel-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowTopPanelDetailComponent implements OnInit {
	@Input() show: Show;
	constructor() { }

	ngOnInit() {
	}

}
