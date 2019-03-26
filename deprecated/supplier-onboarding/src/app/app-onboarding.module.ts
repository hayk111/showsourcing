import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppApolloModule } from '~core/apollo';
import { TemplateModule } from '~core/template';

import { AppOnboardingComponent } from './app-onboarding.component';
import { OnBoardingModule } from './on-boarding';
import { routes } from './on-boarding/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppOnboardingComponent],
	imports: [
		BrowserModule,
		OnBoardingModule,
		TemplateModule,
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top'
		}),
		HttpClientModule,
		AppApolloModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppOnboardingComponent]
})
export class AppOnboardingModule { }
