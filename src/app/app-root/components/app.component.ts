import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenActions } from '~auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
	constructor(private store: Store<any>) {}

	ngOnInit(): void {
		setTimeout(() => {
			this.store.dispatch(TokenActions.check());
		}, 0);
	}

	ngAfterViewInit(): void {
		console.log('content init');
	}
}
