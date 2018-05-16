import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '~app/entity';
import { AuthActions } from '~feature/auth';


@Component({
	selector: 'home-app',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user$: Observable<any>;

	constructor(private store: Store<any>) {
		this.user$ = this.store.select(selectUser);
	}

	ngOnInit() { }

	logout() {
		this.store.dispatch(AuthActions.logout());
	}
}
