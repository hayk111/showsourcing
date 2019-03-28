import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RequestModule } from '../features/request/request.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { routes } from './routes';
import { TemplateModule } from '~core/template';
import { HttpClientModule } from '@angular/common/http';
import { AppApolloModule } from '~core/apollo';
import { Angulartics2Module } from 'angulartics2';
import { environment } from 'environments/environment';
import { SharedModule } from '~shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			enableTracing: !environment.production
		}),
		Angulartics2Module.forRoot({
			pageTracking: {
				clearIds: true,
				// this is for hubspot since the validate email has a token, it cannot be the same for all, we just avoid to check this route
				excludedRoutes: [new RegExp('(?<=validate-email)[/a-zA-Z0-9]+')]
			}
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
