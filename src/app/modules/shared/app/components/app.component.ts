import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { TeamService } from '../../../store/services/team.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private authSrv: AuthService) {}

}
