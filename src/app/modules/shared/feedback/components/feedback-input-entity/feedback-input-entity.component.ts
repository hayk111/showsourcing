import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Vote } from '../../../../store/model/entities/vote.model';
import { Observable } from 'rxjs/Observable';
import { selectVotesForCurrentTarget } from '../../../../store/selectors/target/target.selector';
import { VoteSlctnActions } from '../../../../store/action/target/vote.action';
import { UserService } from '../../../user/services/user.service';

@Component({
	selector: 'feedback-input-entity-app',
	templateUrl: './feedback-input-entity.component.html',
	styleUrls: ['./feedback-input-entity.component.scss']
})
export class FeedbackInputEntityComponent implements OnInit {
	votes$: Observable<Array<Vote>>;
	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.votes$ = this.store.select(selectVotesForCurrentTarget);
	}

	onVote(value: number) {
		this.store.dispatch(VoteSlctnActions.add(new Vote(value, this.userSrv.getUserId())));
	}

}
