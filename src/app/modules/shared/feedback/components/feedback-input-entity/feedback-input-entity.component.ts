import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectVotesForTarget } from '../../../../store/selectors/entities/votes.selector';
import { VoteActions } from '../../../../store/action/entities/vote.action';
import { Vote } from '../../../../store/model/entities/vote.model';

@Component({
	selector: 'feedback-input-entity-app',
	templateUrl: './feedback-input-entity.component.html',
	styleUrls: ['./feedback-input-entity.component.scss']
})
export class FeedbackInputEntityComponent implements OnInit {
	private _target: EntityTarget;
	votes$: Observable<Array<Vote>>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		if (!this.target)
			throw new Error('target must not be empty');
		this.votes$ = this.store.select(selectVotesForTarget(this.target));
	}

	onVote(value: number) {
		this.store.dispatch(VoteActions.addNew(new Vote(value, this._target, this.store)));
	}


	@Input()
	set target( target: EntityTarget ) {
		this._target = target;
		this.store.dispatch(VoteActions.load(target));
	}

	get target() {
		return this._target;
	}

}
