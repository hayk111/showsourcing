import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationRef, NgModule, NgModuleRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { Store, StoreModule } from '@ngrx/store';
import { NotificationsModule } from '~shared/notifications';
import { environment } from 'environments/environment';
import { DataManagementModule } from '~app/features/data-management/data-management.module';
import { AuthGuardService, AuthModule } from '~auth';
import { CardModule } from '~shared/card';
import { IconsModule } from '~shared/icons';
import { LocalStorageModule } from '~shared/local-storage';
import { TemplateModule } from '~shared/template';
import { AppStoreModule } from '~store/store.module';
import { Log } from '~utils';

import { CommentModule } from './../features/comment/comment.module';
import { EventModule } from './../features/event/event.module';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './routes';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';
import { PreloaderModule } from '~app/shared/preloader/preloader.module';
import { HmrModule } from '~app/shared/hmr/hmr.module';
import { EntityModule } from '~app/entity';
import { UserModule } from '~app/features/user';
import { ProductModule } from '~app/features/products';
import { ProjectModule } from '~app/features/project';
import { TasksModule } from '~app/features/tasks';
import { SuppliersModule } from '~app/features/supplier';

declare let module: any;
// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.
@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		AppStoreModule.forRoot(),
		AuthModule.forRoot(),
		PreloaderModule.forRoot(),
		HmrModule.forRoot(),
		BrowserModule,
		BrowserAnimationsModule,
		environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
		StoreModule,
		HttpClientModule,
		TemplateModule.forRoot(),
		EntityModule.forRoot(),
		LocalStorageModule.forRoot(),
		UserModule.forRoot(),
		TemplateModule,
		ProductModule.forRoot(),
		EventModule,
		IconsModule,
		CardModule,
		// shared
		NotificationsModule.forRoot(),
		// modules features
		SuppliersModule.forRoot(),
		ProjectModule.forRoot(),
		TasksModule.forRoot(),
		DataManagementModule.forRoot(),
		// keep this as last module !!
		RouterModule.forRoot(routes, { enableTracing: true }),
		// don't put a module down here !! (Router needs to be last)
	],
	providers: [
		AuthGuardService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpApiRedirectorService,
			multi: true,
		},
	],
	exports: [RouterModule],
	bootstrap: [AppComponent],
})
export class AppRootModule {
	// hot module reloading stuff
	constructor(public appRef: ApplicationRef, private _m: NgModuleRef<any>, private _store: Store<any>) {
		if (environment.hmr && module.hot) {
			module.hot.accept('./app-root.module.ts');
			if (module.hot.data) {
				this.customHmrOnInit(module.hot.data);
			}
		}
	}
	customHmrOnInit(store) {
		if (!store || !store.rootState) return;
		Log.info('HMR store', store.rootState);
		if (store.rootState) {
			this._store.dispatch({
				type: 'SET_ROOT_STATE',
				payload: store.rootState,
			});
		}
	}

	hmrOnInit(store) {
		Log.info('------- HMR init');
		if (!store || !store.rootState) return;
		if ('restoreInputValues' in store) {
			store.restoreInputValues();
		}
		// this.appRef.tick();
		Object.keys(store).forEach(prop => delete store[prop]);
	}

	hmrOnDestroy(store) {
		Log.info('------- HMR OnDestroy');
		this._store.take(1).subscribe(s => (store.rootState = { ...s, hmr: true }));
		const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		store.disposeOldHosts = createNewHosts(cmpLocation);
		store.restoreInputValues = createInputTransfer();
		removeNgStyles();
	}
	hmrAfterDestroy(store) {
		Log.info('------- HMR AfterDestroy');
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
}
