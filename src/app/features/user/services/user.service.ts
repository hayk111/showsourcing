import { Injectable } from '@angular/core';
import { User } from '~app/entity/store/user/user.model';
import { selectUser } from '~app/entity/store/user/user.selector';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable()
export class UserService {
	user$: Observable<User>;
	user: User;

	constructor(private store: Store<any>) {
		this.user$ = this.store.select(selectUser).pipe(
			// when no id the user hasn't been loaded yet
			filter(user => !!user.id)
		);
		this.user$.subscribe(user => {
			this.user = user;
		});
	}

	// those id returned are used for loading other entities
	// those method are synchronous that means we have to be sure the user is already loaded before loading other entities
	// else those id returned are gonna be undefined
	get userId(): string {
		return this.user.id;
	}

	get teamId(): string {
		return this.user.currentTeamId;
	}
}
