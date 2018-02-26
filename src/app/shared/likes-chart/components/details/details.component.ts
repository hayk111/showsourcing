import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { EntityState } from '~store/utils/entities.utils';
import { User } from '~user/models/user.model';
import { VoteByType } from '~store/selectors/target/target.selector';

@Component({
	selector: 'details-app',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
	@Input() votes: VoteByType;
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
