import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { AmplifyService } from 'aws-amplify-angular';
import { environment } from 'environments/environment';
import { AppComponent } from '~app-root/components/app.component';
import { routes } from '~app-root/routes';
import { CreationDialogsCommonModule } from '~common/dialogs/creation-dialogs/creation-dialogs-common.module';
import { CustomDialogsCommonModule } from '~common/dialogs/custom-dialogs/custom-dialogs-common.module';
import { SelectionDialogsCommonModule } from '~common/dialogs/selection-dialogs/selection-dialogs-common.module';
import { createTranslateLoader } from '~core/i18n/loader';
import { AppMissingTranslationHandler } from '~core/i18n/missing-translation.service';
import { ApiInterceptor } from '~core/interceptors/api.interceptor';
import { SharedModule } from '~shared/shared.module';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		CreationDialogsCommonModule,
		SelectionDialogsCommonModule,
		CustomDialogsCommonModule,
		// keep router as last module
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top',
			preloadingStrategy: PreloadAllModules,
			enableTracing: false
		}),
		Angulartics2Module.forRoot({
			developerMode: !environment.production,
			pageTracking: {
				clearIds: true,
				// this is for hubspot since the validate email has a token, it cannot be the same for all, we just avoid to check this route
				excludedRoutes: [new RegExp('(validate-email)[\/a-zA-Z0-9]+')]
			}
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			},
			// quick fix for having things nested
			missingTranslationHandler: { provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler },
		})
	],
	exports: [RouterModule],
	bootstrap: [AppComponent],
	providers: [
		AmplifyService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		}
	],
	entryComponents: [],
})
export class AppRootModule { }
