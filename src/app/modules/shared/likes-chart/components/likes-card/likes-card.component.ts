import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTeamMembers } from '../../../../store/selectors/entities/team-members.selector';
import { Observable } from 'rxjs/Observable';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { User } from '../../../../store/model/entities/user.model';
import { selectVotesForCurrentTarget, selectVotesByType, VoteByType } from '../../../../store/selectors/target/target.selector';
import { map, tap } from 'rxjs/operators';
import { Vote } from '../../../../store/model/entities/vote.model';

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
		negative: '#f94259'
	};

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.teamMembers$ = this.store.select(selectTeamMembers);
		this.pending$ = this.store.select(selectVotesForCurrentTarget)
			.pipe(map(state => state.pending));
		this.votes$ = this.store.select(selectVotesByType);
	}

}
