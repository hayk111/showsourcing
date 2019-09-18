import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Show } from '~models/show.model';

@Component({
	selector: 'show-header-detail-app',
	templateUrl: './show-header-detail.component.html',
	styleUrls: ['./show-header-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowHeaderDetailComponent implements OnInit {
	@Input() show: Show;
	constructor() { }

	ngOnInit() {
	}

}
