import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateModule, GuestTemplateComponent } from '~shared/template';
import { RouterModule, Route } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Array<Route> = [
	{ path: 'register', component: TestComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		TestComponent,
		GuestTemplateComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
