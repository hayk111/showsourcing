import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Angulartics2Module } from 'angulartics2';
import { environment } from 'environments/environment';
import { AppComponent } from '~app-root/components/app.component';
import { routes } from '~app-root/routes';
import { CommonModalsModule } from '~common/modals/common-modals.module';
import { AppApolloModule } from '~core/apollo/apollo.module';
import { PortalModule } from '~core/portal';
import { TemplateModule } from '~core/template';
import { SharedModule } from '~shared/shared.module';
import { ApiInterceptor } from '~core/interceptors/api.interceptor';
import { TokenInterceptor } from '~core/interceptors/token.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import * as i18n from '~core/i18n/i18n.service';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule,
		AppApolloModule,
		TemplateModule,
		CommonModalsModule,
		// keep router as last module
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top',
			preloadingStrategy: PreloadAllModules,
			enableTracing: true
		}),
		Angulartics2Module.forRoot({
			pageTracking: {
				clearIds: true,
				// this is for hubspot since the validate email has a token, it cannot be the same for all, we just avoid to check this route
				excludedRoutes: [new RegExp('(validate-email)[\/a-zA-Z0-9]+')]
			}
		}),
		PortalModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: i18n.HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	exports: [RouterModule],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	entryComponents: [],
})
export class AppRootModule { }
