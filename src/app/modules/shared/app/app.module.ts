import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { TemplateModule } from '../template/template.module';
import { AuthModule } from '../auth/auth.module';
import { StoreModule, ActionReducer, State } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from '../local-storage/local-storage.module';
import { CompanyModule } from '../company/company.module';
import { metaReducers, reducers, reducerToken, reducerProvider } from '../../store/reducer/_reducers';
import { DialogModule } from '../dialog/dialog.module';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '../../store/effects/_effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';
import { EntitiesServicesModule } from '../../store/services/entities-services.module';
import { AppStoreModule } from '../../store/store.module';



@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		TemplateModule,
		DynamicFormsModule.forRoot(),
		AuthModule.forRoot(),
		AppStoreModule.forRoot(),
		LocalStorageModule,
		CompanyModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		MatDialogModule,
		EntitiesServicesModule
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
