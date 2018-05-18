import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '~models';

@Component({
	selector: 'details-app',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
	@Input() votes: any;
	@Input() teamMembers: any;
	detailsShown = false;

	constructor() { }

	ngOnInit() { }

	showDetails() {
		this.detailsShown = true;
	}

	hideDetails() {
		this.detailsShown = false;
	}
}
