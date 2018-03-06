import { Action } from '@ngrx/store';

export interface TypedAction<G> extends Action {
	payload: G;
}
