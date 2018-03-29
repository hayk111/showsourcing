import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Log } from '~utils';
import { PreloaderService } from '~app/shared/preloader/preloader.service';
import { HmrService } from '~app/shared/hmr/hmr.service';
import { AuthActions } from '~app/features/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private store: Store<any>, private preloader: PreloaderService, private hmrService: HmrService) { }

	ngOnInit(): void {
		Log.info('App init');
		// hmr service or hot module reloading
		if (!this.hmrService.isStoreLoaded()) {
			this.store.dispatch(AuthActions.checkAuthenticated());
			this.preloader.init();
		}
	}
}
