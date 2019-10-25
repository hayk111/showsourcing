import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import * as Pages from './pages';
import { routes } from './routes';
import * as SharedComponents from './shared';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		Pages.AccountCreatedPageComponent,
		Pages.ForgotPasswordPageComponent,
		Pages.LoginPageComponent,
		Pages.PasswordResettedPageComponent,
		Pages.RegisterPageComponent,
		Pages.ResetPasswordPageComponent,
		Pages.UnvalidatedEmailPageComponent,
		Pages.ValidateEmailPageComponent,
		Pages.PickATeamPageComponent,
		Pages.CreateATeamPageComponent,
		Pages.CreateACompanyPageComponent,
		SharedComponents.AuthFormHeaderComponent,
		SharedComponents.AuthFormBaseComponent,
		SharedComponents.AuthHeaderContentComponent,
		SharedComponents.AuthHeaderSubtitleComponent,
		SharedComponents.AuthHeaderTitleComponent
	],
	exports: []
})
export class AuthFeatureModule { }
