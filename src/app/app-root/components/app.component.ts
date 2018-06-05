import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ApolloService } from '~shared/apollo/services/apollo.service';
import { Log } from '~utils';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private authSrv: AuthenticationService, private apolloSrv: ApolloService) { }

	ngOnInit(): void {
		Log.info('App init');
		this.authSrv.init();
		this.apolloSrv.init();
	}
}
