import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions, ActionType } from '../action/user.action';
import { User } from '../model/user.model';
import { TeamActions } from '../action/team.action';



@Injectable()
export class UserEffects {

	constructor(private actions$: Actions) {}

}
