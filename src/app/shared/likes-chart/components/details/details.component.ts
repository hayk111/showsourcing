import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'details-app',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent extends TrackingComponent implements OnInit {
	@Input() votes: any;
	@Input() teamMembers: any;
	detailsShown = false;

	constructor() {
		super();
	}

	ngOnInit() { }

	showDetails() {
		this.detailsShown = true;
	}

	hideDetails() {
		this.detailsShown = false;
	}
}
