import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor() { }

	ngOnInit(): void {}

}


