import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { EntityState } from '~entity';
import { User } from '~user/models/user.model';

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

	constructor() {}

	ngOnInit() {}

	showDetails() {
		this.detailsShown = true;
	}

	hideDetails() {
		this.detailsShown = false;
	}
}
