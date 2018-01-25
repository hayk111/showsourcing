import { Injectable } from '@angular/core';
import { User } from '../../../store/model/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/selectors/user.selector';


// this is a service made for the user.
// once the application has started we are kinda guaranteed that the user state is not empty.
// thus there is no real need for observable. This service relieve some parts of the app
// from having to use observables.
@Injectable()
export class UserService {
	user: User;

	constructor(private store: Store<any>) {
		this.store.select(selectUser).subscribe(user => this.user = user);
	}

	getUserId() {
		return this.user.id;
	}

	getTeamId() {
		return this.user.currentTeamId;
	}

}
