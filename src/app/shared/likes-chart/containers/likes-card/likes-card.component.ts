import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '~models';

@Component({
	selector: 'likes-card-app',
	templateUrl: './likes-card.component.html',
	styleUrls: ['./likes-card.component.scss'],
})
export class LikesCardComponent implements OnInit {
	// teamMembers$: Observable<EntityState<User>>;
	votes$: Observable<any>;
	pending$: Observable<boolean>;
	colorScheme = {
		positive: '#71e591',
		neutral: '#EBEBEB',
		negative: '#f94259',
	};

	constructor() { }

	ngOnInit() {
		// this.teamMembers$ = this.store.select(fromTeamMember.selectState);
		// votes must be loaded once again
		// this.pending$ = this.store.select(selectVotesForCurrentTarget).pipe(map(state => state.pending));
		// this.votes$ = this.store.select(selectVotesByType);
	}
}
