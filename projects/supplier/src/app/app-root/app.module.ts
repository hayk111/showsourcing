import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { AppApolloModule } from '~core/apollo';
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
		HttpClientModule,
		SharedModule,
		AppApolloModule,
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			// enableTracing: !environment.production
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
