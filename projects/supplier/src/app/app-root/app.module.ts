import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { CommonModalsModule } from '~common/modals';
import { AppApolloModule } from '~core/apollo';
import { ApiInterceptor } from '~core/interceptors/api.interceptor';
import { SharedModule } from '~shared/shared.module';
import { TemplateModule } from '../core/template';
import { AppComponent } from './app.component';
import { routes } from './routes';
import { environment } from 'environments/environment';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		TemplateModule,
		HttpClientModule,
		SharedModule,
		AppApolloModule,
		CommonModalsModule,
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			// enableTracing: !environment.production
		}),
		Angulartics2Module.forRoot({
			pageTracking: {
				clearIds: true,
				// this is for hubspot since the validate email has a token, it cannot be the same for all, we just avoid to check this route
				excludedRoutes: [new RegExp('(validate-email)[\/a-zA-Z0-9]+')]
			}
		}),
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
