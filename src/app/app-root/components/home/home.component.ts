import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '~entity';
import { AuthActions } from '~auth';

@Component({
	selector: 'home-app',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user$: Observable<any>;

	res = [
		{
			name: 'sold',
			value: 12545,
		},
		{
			name: 'bought',
			value: 8746,
		},
		{
			name: 'net gains',
			value: 3799,
		},
	];

	colorScheme = {
		domain: ['#F46B45', '#6188fb', '#f7f228'],
	};

	constructor(private store: Store<any>) {
		this.user$ = this.store.select(selectUser);
	}

	ngOnInit() { }

	logout() {
		this.store.dispatch(AuthActions.logout());
	}
}
