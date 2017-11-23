import { Component, Output, EventEmitter } from '@angular/core';
import { PreloaderService } from '../../preloader/services/preloader.service';
import { AuthService } from '../../auth/services/auth.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private authSrv: AuthService, private preloader: PreloaderService) {}

}
