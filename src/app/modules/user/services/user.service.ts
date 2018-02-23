import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@modules/user';
import { Store } from '@ngrx/store';
import { selectUser } from '@modules/user';


@Injectable()
export class UserService {
  user: User;
  constructor(private http: HttpClient, private store: Store<any>) {
    this.store.select(selectUser).subscribe(user => this.user = user);
  }

  getUserId(): string {
    return this.user.id;
  }


  load() {
		return this.http.get('api/user');
	}
}
