import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../user/store/selectors/user.selector';
import { User } from '../../../user/models/user.model';

@Injectable()
export class UserService {
	user: User;
	constructor(private store: Store<any>) {
		this.store.select(selectUser).subscribe(user => this.user = user);
	}

	getUserId(): string {
		return this.user.id;
	}

}
