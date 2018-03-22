import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PreloaderService } from '~app/app-root/store';
import { TokenActions } from '~auth';

import { HmrService } from './../store/services/hmr.service';
import { Log } from '~utils';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private store: Store<any>, private preloader: PreloaderService, private hmrService: HmrService) {}

	ngOnInit(): void {
		Log.info('App init');
		if (!this.hmrService.isStoreLoaded()) {
			this.store.dispatch(TokenActions.check());
			this.preloader.init();
		}
	}
}
