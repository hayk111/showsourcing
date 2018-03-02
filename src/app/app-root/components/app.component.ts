import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenActions } from '~auth';
import { selectUser, User } from '~app/features/user';
import { filter } from 'rxjs/operators';
import { PreloaderService } from '~app/app-root/store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
	constructor(private store: Store<any>, private preloader: PreloaderService) {}

	ngOnInit(): void {
		setTimeout(() => {
			this.store.dispatch(TokenActions.check());
			this.preloader.init();
		}, 0);
	}

	ngAfterViewInit(): void {
		console.log('content init');
	}
}
