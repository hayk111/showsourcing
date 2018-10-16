import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateModule, GuestTemplateComponent } from '~shared/template';
import { RouterModule, Route } from '@angular/router';
import { routes } from './on-boarding/routes';
import { OnBoardingModule } from './on-boarding';
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';
import { AppApolloModule } from '~shared/apollo';

@NgModule({
	declarations: [AppComponent, GuestTemplateComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		OnBoardingModule,
		HttpClientModule,
		AppApolloModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
