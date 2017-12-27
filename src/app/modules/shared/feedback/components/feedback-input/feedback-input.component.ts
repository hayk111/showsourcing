import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Vote } from '../../../../store/model/vote.model';
import { User } from '../../../../store/model/user.model';
import { selectUser } from '../../../../store/selectors/user.selector';
import { selectVotesForTarget } from '../../../../store/selectors/votes.selector';
import { VoteActions } from '../../../../store/action/vote.action';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
	selector: 'feedback-input-app',
	templateUrl: './feedback-input.component.html',
	styleUrls: ['./feedback-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackInputComponent extends AutoUnsub implements OnInit {
	@Output() request = new EventEmitter<null>();
	@Output() vote = new EventEmitter<number>();
	@Input() votes: Array<Vote> = [];
	userVote: Vote;
	user$: Observable<User>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.user$ = this.store.select(selectUser);
	}

	onVote(value: number) {
		this.vote.emit(value);
	}

	getPercentage(user) {
		const totalVotes = this.votes.length;
		if (!this.votes || totalVotes === 0)
			return 0;
		let totalScore = 0;
		this.votes.forEach(v => {
			if (v.value > 0)
				totalScore++;
			else
				totalScore--;
		});
		return totalScore / totalVotes * 100;
	}

	calcUserVoteValue(user) {
		const vote = this.votes.find(v => v.userId === user.id);
		return vote ? vote.value : undefined;
	}


	isUp(user) {
		return this.calcUserVoteValue(user) === 100;
	}

	isDown(user) {
		return this.calcUserVoteValue(user) === 0;
	}

}
