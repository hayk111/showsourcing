import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateModule, GuestTemplateComponent } from '~shared/template';
import { RouterModule, Route } from '@angular/router';
import { routes } from './on-boarding/routes';
import { OnBoardingModule } from './on-boarding';

@NgModule({
	declarations: [AppComponent, GuestTemplateComponent],
	imports: [BrowserModule, RouterModule.forRoot(routes), OnBoardingModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
