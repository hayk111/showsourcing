import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { CustomDialogsCommonModule } from '~common/dialogs/custom-dialogs/custom-dialogs-common.module';
import * as i18n from '~core/i18n/i18n.service';
import { ApiInterceptor } from '~core/interceptors/api.interceptor';
import { SharedModule } from '~shared/shared.module';
import { TemplateModule } from '../core/template';
import { AppComponent } from './app.component';
import { routes } from './routes';



@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		TemplateModule,
		SharedModule,
		CustomDialogsCommonModule,
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			enableTracing: false
		}),
		Angulartics2Module.forRoot({
			pageTracking: {
				clearIds: true,
				// this is for hubspot since the validate email has a token, it cannot be the same for all, we just avoid to check this route
				excludedRoutes: [new RegExp('(validate-email)[\/a-zA-Z0-9]+')]
			}
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: i18n.HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
