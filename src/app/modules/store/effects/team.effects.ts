import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionType } from '../action/team.action';


@Injectable()
export class TeamEffects {

	constructor(private actions$: Actions) {}
}
