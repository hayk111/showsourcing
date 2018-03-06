import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { EntityState } from '~entity';
import { selectTeamMembersState } from '~store/selectors/entities/team-members.selector';
import {
	selectVotesByType,
	selectVotesForCurrentTarget,
	VoteByType,
} from '~store/selectors/target/target.selector';
import { User } from '~user/models/user.model';

@Component({
	selector: 'likes-card-app',
	templateUrl: './likes-card.component.html',
	styleUrls: ['./likes-card.component.scss'],
})
export class LikesCardComponent implements OnInit {
	teamMembers$: Observable<EntityState<User>>;
	votes$: Observable<VoteByType>;
	pending$: Observable<boolean>;
	colorScheme = {
		positive: '#71e591',
		neutral: '#EBEBEB',
		negative: '#f94259',
	};

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.teamMembers$ = this.store.select(selectTeamMembersState);
		this.pending$ = this.store.select(selectVotesForCurrentTarget).pipe(map(state => state.pending));
		this.votes$ = this.store.select(selectVotesByType);
	}
}
