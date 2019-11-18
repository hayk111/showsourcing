import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Booth } from '~models/booth.model';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'show-exhibitors-app',
	templateUrl: './show-exhibitors.component.html',
	styleUrls: ['./show-exhibitors.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowExhibitorsComponent extends TrackingComponent implements OnInit {
	@Input() booths: Booth[];
	constructor() {
		super();
	}

	ngOnInit() {
	}

}
