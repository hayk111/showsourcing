import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuardService, AuthModule } from '~features/auth';
import { DataManagementModule } from '~features/data-management/data-management.module';
import { PickATeamModule } from '~features/pick-a-team/pick-a-team.module';
import { ProductModule } from '~features/products';
import { ProjectModule } from '~features/project';
import { SettingsModule } from '~features/settings';
import { SuppliersModule } from '~features/supplier';
import { TasksModule } from '~features/tasks';
import { TestPageModule } from '~features/test-page/test-page.module';
import { UserModule } from '~features/user';
import { AppApolloModule } from '~shared/apollo/apollo.module';
import { CardModule } from '~shared/card';
import { DialogModule } from '~shared/dialog';
import { GenericDialogModule } from '~shared/generic-dialog/';
import { IconsModule } from '~shared/icons';
import { LocalStorageModule } from '~shared/local-storage';
import { NotificationsModule } from '~shared/notifications';
import { TemplateModule } from '~shared/template';

import { EventModule } from './../features/event/event.module';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './routes';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';

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
		SettingsModule.forRoot(),
		UserModule.forRoot(),
		TemplateModule,
		ProductModule.forRoot(),
		EventModule,
		IconsModule, // used to create symboles at the top
		CardModule,
		// shared
		NotificationsModule.forRoot(),
		DialogModule,
		GenericDialogModule,
		// modules features
		SuppliersModule.forRoot(),
		ProjectModule.forRoot(),
		TasksModule.forRoot(),
		DataManagementModule.forRoot(),
		PickATeamModule,
		TestPageModule,
		// keep router as last module
		RouterModule.forRoot(routes,
			// { enableTracing: true }
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
