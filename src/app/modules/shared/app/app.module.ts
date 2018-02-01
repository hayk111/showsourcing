import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { TemplateModule } from '../template/template.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from '../local-storage/local-storage.module';
import { reducerProvider } from '../../store/reducer/_reducers';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';
import { EntitiesServicesModule } from '../../store/services/entities-services.module';
import { AppStoreModule } from '../../store/store.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../../features/auth/auth.module';
import { environment } from '../../../../environments/environment';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
		AppRoutingModule,
		TemplateModule,
		DynamicFormsModule.forRoot(),
		AuthModule.forRoot(),
		AppStoreModule.forRoot(),
		LocalStorageModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		MatDialogModule,
		EntitiesServicesModule,
		UserModule,
		TemplateModule
	],
	providers: [
		reducerProvider,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpApiRedirectorService,
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
