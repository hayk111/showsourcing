import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { AppComponent } from '~app-root/components/app.component';
import { routes } from '~app-root/routes';
import { AppApolloModule } from '~core/apollo/apollo.module';
import { PortalModule } from '~core/portal';
import { TemplateModule } from '~core/template';
import { SharedModule } from '~shared/shared.module';
import { CommonModalsModule } from '~common/modals';
import { Angulartics2Module } from 'angulartics2';

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
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top',
			// enableTracing: true
		}),
		Angulartics2Module.forRoot({
			pageTracking: {
				clearIds: true,
				// idsRegExp: new RegExp('^[a-z]\\d+$') /* Workaround: No NgModule metadata found for 'AppModule' */
				// clearQueryParams: true,
				// clearHash: true,
				// excludedRoutes: [
				// 	/\/[0-9]{4}\/[0-9]{2}\/[a-zA-Z0-9|\-]*/,
				// 	'2017/03/article-title'
				// ],
			}
		}),
		PortalModule
	],
	exports: [RouterModule],
	bootstrap: [AppComponent],
	entryComponents: []
})
export class AppRootModule { }
