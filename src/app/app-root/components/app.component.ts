import { AfterViewInit, Component, OnInit } from '@angular/core';


import { Log } from '~utils';
import { AuthenticationService } from '~features/auth/services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private authSrv: AuthenticationService) { }

	ngOnInit(): void {
		Log.info('App init');
		// hmr service or hot module reloading
		this.authSrv.checkAlreadyAuthenticated();
	}
}
