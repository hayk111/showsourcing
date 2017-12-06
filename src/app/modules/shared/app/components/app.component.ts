import { Component, Output, EventEmitter } from '@angular/core';
import { PreloaderService } from '../../entities-services/preloader.service';
import { AuthService } from '../../auth/services/auth.service';
import { TeamService } from '../../entities-services/team.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private authSrv: AuthService,
							private preloader: PreloaderService,
							private teamSrv: TeamService) {}

}
