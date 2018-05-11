import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Log } from '~utils';
import { AuthActions } from '~app/features/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private store: Store<any>) { }

	ngOnInit(): void {
		Log.info('App init');
		// hmr service or hot module reloading
		this.store.dispatch(AuthActions.checkAuthenticated());
	}
}
