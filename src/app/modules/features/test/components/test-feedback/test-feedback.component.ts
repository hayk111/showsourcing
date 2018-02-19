import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFirstProductEntityTarget } from '../../utils.utils';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { switchMap } from 'rxjs/operators/switchMap';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { tap } from 'rxjs/operators';
import { TargetAction } from '../../../../store/action/target/target.action';
import { selectVotesForCurrentTarget } from '../../../../store/selectors/target/target.selector';

@Component({
	selector: 'app-test-feedback',
	templateUrl: './test-feedback.component.html',
	styleUrls: ['./test-feedback.component.scss']
})
export class TestFeedbackComponent extends AutoUnsub implements OnInit {
	event: string;
	votes$;
	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		getFirstProductEntityTarget(this.store, this._destroy$).pipe(
			tap((target: EntityTarget) => this.store.dispatch(TargetAction.select(target))),
		);
		this.votes$ = this.store.select(selectVotesForCurrentTarget);
	}

	onVote(value) {
		this.event = `user voted ${value}`;
	}

}
