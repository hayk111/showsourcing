import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFirstProductEntityTarget } from '../../utils.utils';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { switchMap } from 'rxjs/operators/switchMap';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { tap } from 'rxjs/operators';
import { SelectionAction } from '../../../../store/action/selection/selection.action';
import { selectVotesForSelection } from '../../../../store/selectors/selection/selection.selector';

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
			tap((target: EntityTarget) => this.store.dispatch(SelectionAction.select(target))),
		);
		this.votes$ = this.store.select(selectVotesForSelection);
	}

	onVote(value) {
		this.event = `user voted ${value}`;
	}

}
