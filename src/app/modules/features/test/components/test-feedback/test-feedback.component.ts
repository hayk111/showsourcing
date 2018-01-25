import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFirstProductEntityTarget } from '../../utils.utils';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { switchMap } from 'rxjs/operators/switchMap';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { tap } from 'rxjs/operators';
import { VoteActions } from '../../../../store/action/vote.action';
import { selectVotesForTarget } from '../../../../store/selectors/target/votes.selector';

@Component({
	selector: 'app-test-feedback',
	templateUrl: './test-feedback.component.html',
	styleUrls: ['./test-feedback.component.scss']
})
export class TestFeedbackComponent extends AutoUnsub implements OnInit {
	event: string;
	votes = [];
	target$;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.target$ = getFirstProductEntityTarget(this.store, this._destroy$);
		this.target$.pipe(
			tap((target: EntityTarget) => this.store.dispatch(VoteActions.load(target))),
			switchMap((target: EntityTarget) => this.store.select(selectVotesForTarget(target))),
		).subscribe(votes => this.votes = votes);
	}

	onVote(value) {
		this.event = `user voted ${value}`;
	}

}
