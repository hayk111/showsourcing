import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductVote } from '../../../../store/model/product-vote.model';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectVotesForTarget } from '../../../../store/selectors/votes.selector';
import { Observable } from 'rxjs/Observable';
import { Vote } from '../../../../store/model/vote.model';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { selectUser } from '../../../../store/selectors/user.selector';
import { User } from '../../../../store/model/user.model';
import { VoteActions } from '../../../../store/action/vote.action';

@Component({
	selector: 'feedback-input-app',
	templateUrl: './feedback-input.component.html',
	styleUrls: ['./feedback-input.component.scss']
})
export class FeedbackInputComponent extends AutoUnsub implements OnInit {
	private _target: EntityTarget;
	@Output() request = new EventEmitter<null>();
	votes$: Observable<Vote>;
	percentage = 0;
	userVote: Vote;
	private user: User;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.select(selectUser)
			.takeUntil(this._destroy$)
			.subscribe((user: User) => this.user = user);
		this.votes$ = this.store.select(selectVotesForTarget(this.target));
		this.votes$
		.takeUntil(this._destroy$)
		.subscribe(votes => {
			this.percentage = this.calcPercentage(votes);
			this.userVote = this.calcUserVoteValue(votes);
		});
	}

	vote(value: number) {
		this.store.dispatch(VoteActions.addNew({ value, target: this.target }));
	}

	calcPercentage(votes) {
		if (!votes || votes.length === 0)
			return 0;
		const totalVotes = votes.length;
		let totalScore = 0;
		votes.forEach(v => {
			if (v.value > 0)
				totalScore++;
			else
				totalScore--;
		});
		return totalScore / totalVotes * 100;
	}

	calcUserVoteValue(votes) {
		return votes.find(v => v.userId === this.user.id);
	}

	@Input()
	set target( target: EntityTarget ) {
		this._target = target;
		this.store.dispatch(VoteActions.load(target));
	}

	get target() {
		return this._target;
	}

	get isUp() {
		if (!this.userVote) return false;
		return this.userVote.value === 100;
	}

	get isDown() {
		if (!this.userVote) return false;
		return this.userVote.value === 0;
	}

}
