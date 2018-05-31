import { AfterViewInit, Component, OnInit } from '@angular/core';


import { Log } from '~utils';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ApolloClient } from '~shared/apollo';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private authSrv: AuthenticationService) { }

	ngOnInit(): void {
		Log.info('App init');
		this.authSrv.init();
	}
}
