import { Injectable } from '@angular/core';
import { User } from '~models';
import { selectUser } from '~app/entity/store/user/user.selector';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable()
export class UserService {
	private _user$ = new BehaviorSubject<User>(null);
	user$: Observable<User> = this._user$.asObservable();
	private _user: User;


	setUser(user: User) {
		this._user$.next(user);
		this._user = user;
	}


	resetUser() {
		this._user = undefined;
		this._user$.next(undefined);
	}


	get userId(): string {
		return this._user.id;
	}

	get teamId(): string {
		return this._user.currentTeam.id;
	}
}
