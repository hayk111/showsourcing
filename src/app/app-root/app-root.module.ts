import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationRef, NgModule, NgModuleRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { DataManagementModule } from '~features/data-management/data-management.module';
import { ProductModule } from '~features/products';
import { ProjectModule } from '~features/project';
import { SuppliersModule } from '~features/supplier';
import { TasksModule } from '~features/tasks';
import { UserModule } from '~features/user';
import { AuthGuardService, AuthModule } from '~features/auth';
import { CardModule } from '~shared/card';
import { IconsModule } from '~shared/icons';
import { LocalStorageModule } from '~shared/local-storage';
import { NotificationsModule } from '~shared/notifications';
import { TemplateModule } from '~shared/template';
import { Log } from '~utils';

import { EventModule } from './../features/event/event.module';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './routes';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';
import { DialogModule } from '~shared/dialog';
import { AppApolloModule } from '~shared/apollo/apollo.module';
import { TestPageModule } from '~features/test-page/test-page.module';
import { PickATeamModule } from '~features/pick-a-team/pick-a-team.module';

declare let module: any;

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.
@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		AppApolloModule,
		BrowserModule,
		BrowserAnimationsModule,
		AuthModule.forRoot(),
		// environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
		HttpClientModule,
		TemplateModule.forRoot(),
		LocalStorageModule.forRoot(),
		UserModule.forRoot(),
		TemplateModule,
		ProductModule.forRoot(),
		EventModule,
		IconsModule, // used to create symboles at the top
		CardModule,
		// shared
		NotificationsModule.forRoot(),
		DialogModule,
		// modules features
		SuppliersModule.forRoot(),
		ProjectModule.forRoot(),
		TasksModule.forRoot(),
		DataManagementModule.forRoot(),
		PickATeamModule,
		TestPageModule,
		// keep router as last module
		RouterModule.forRoot(routes,
			{ enableTracing: true }
		),
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


}
