import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateModule, GuestTemplateComponent } from '~shared/template';
import { RouterModule, Route } from '@angular/router';
import { routes } from './on-boarding/routes';
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';
import { AppApolloModule } from '~shared/apollo';
import { OnBoardingModule } from './on-boarding';

@NgModule({
	declarations: [AppComponent, GuestTemplateComponent],
	imports: [
		BrowserModule,
		OnBoardingModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		AppApolloModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
