import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotificationModule } from '@swimlane/ngx-ui';
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

import { environment } from 'environments/environment';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './routes';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.
@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
		TemplateModule,
		AppStoreModule.forRoot(),
		RouterModule.forRoot(routes),
		LocalStorageModule,
		NgxChartsModule,
		HttpClientModule,
		EntitiesServicesModule,
		UserModule,
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
		reducerProvider,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpApiRedirectorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppRootModule {}
