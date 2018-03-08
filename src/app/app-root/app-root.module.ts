import { HmrService } from '~store/services/hmr.service';
import { CommentModule } from './../features/comment/comment.module';
import 'rxjs/add/operator/take';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationRef, NgModule, NgModuleRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
	createInputTransfer,
	createNewHosts,
	removeNgStyles,
} from '@angularclass/hmr';
import { Store, StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotificationModule } from '@swimlane/ngx-ui';
import { environment } from 'environments/environment';
import { AuthModule } from '~features/auth';
import { ProductModule } from '~features/products';
import { ProjectsModule } from '~features/projects';
import { SuppliersModule } from '~features/suppliers';
import { TasksModule } from '~features/tasks';
import { UserModule } from '~features/user';
import { WorkflowModule } from '~features/workflow';
import { CardModule } from '~shared/card';
import { IconsModule } from '~shared/icons';
import { LocalStorageModule } from '~shared/local-storage';
import { TemplateModule } from '~shared/template';
import { AppStoreModule } from '~store//store.module';
import { reducerProvider } from '~store/reducer/_reducers';
import { EntitiesServicesModule } from '~store/services/entities-services.module';
import { Log } from '~utils';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './routes';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';
import { EntityModule } from '~app/shared/entity';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.
@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
		StoreModule,
		TemplateModule,
		AppStoreModule.forRoot(),
		EntityModule.forRoot(),
		RouterModule.forRoot(routes),
		LocalStorageModule,
		NgxChartsModule,
		HttpClientModule,
		EntitiesServicesModule,
		UserModule,
		CommentModule,
		TemplateModule,
		IconsModule,
		CardModule,
		NotificationModule,
		ProductModule,
		WorkflowModule,
		// modules
		SuppliersModule.forRoot(),
		ProjectsModule.forRoot(),
		TasksModule.forRoot(),
		AuthModule.forRoot(),
	],
	providers: [
		HmrService,
		reducerProvider,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpApiRedirectorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppRootModule {
	constructor(
		public appRef: ApplicationRef,
		private _m: NgModuleRef<any>,
		private _store: Store<any>
	) {
		if (environment.hmr && module['hot']) {
			module['hot']['accept']('./app-root.module.ts');
			console.log(module);
			if (module['hot']['data']) {
				this.customHmrOnInit(module['hot']['data']);
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
		const cmpLocation = this.appRef.components.map(
			cmp => cmp.location.nativeElement
		);
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
