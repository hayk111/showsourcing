import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActionType, VoteActions } from '../action/vote.action';
import { EntityTarget } from '../utils/entities.utils';
import { Vote } from '../model/vote.model';
import { VoteService } from '../services/vote.service';

@Injectable()
export class VoteEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map( action => action.payload),
		switchMap( (p: EntityTarget) => this.srv.load(p)),
		map((votes: Array<Vote>) => VoteActions.setVote(votes))
	);


	@Effect()
	comment$ = this.actions$.ofType<any>(ActionType.ADD_NEW).pipe(
		map(action => action.payload),
		map(vote => this.srv.getPendingVote(vote)),
		map(vote => VoteActions.addPending(vote))
	);

	@Effect({ dispatch: false})
	pendingComment$ = this.actions$.ofType<any>(ActionType.ADD_PENDING)
	.pipe(
		map(action => action.payload),
		switchMap(
			(vote: Vote) => this.srv.postVote(vote))
	);

	constructor(private actions$: Actions, private srv: VoteService) {}


}
