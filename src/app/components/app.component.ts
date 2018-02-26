import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenActions } from '~store/action/misc/token.action';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private store: Store<any>) {}

	ngOnInit(): void {
		this.store.dispatch(TokenActions.check());
	}
}
