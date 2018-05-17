import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from '~feature/auth';


@Component({
	selector: 'home-app',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

	constructor(private store: Store<any>) {
	}

	ngOnInit() { }

	logout() {
		this.store.dispatch(AuthActions.logout());
	}
}
