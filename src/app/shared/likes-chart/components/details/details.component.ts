import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityState } from '~app/entity';
import { User } from '~models';

@Component({
	selector: 'details-app',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
	@Input() votes: any;
	@Input() teamMembers: EntityState<User>;
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
