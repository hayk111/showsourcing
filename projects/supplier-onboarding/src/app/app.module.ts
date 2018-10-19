import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppApolloModule } from '~shared/apollo';
import { TemplateModule } from '~shared/template';

import { AppComponent } from './app.component';
import { OnBoardingModule } from './on-boarding';
import { routes } from './on-boarding/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		OnBoardingModule,
		TemplateModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		AppApolloModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
