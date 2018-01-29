import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/selectors/entities/user.selector';
import { User } from '../../../store/model/entities/user.model';

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
