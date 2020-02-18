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
		Pages.SignInPageComponent,
		Pages.SignUpPageComponent,
		Pages.ConfirmSignUpPageComponent,
		Pages.ForgotPasswordPageComponent,
		Pages.ForgotPasswordSubmitPageComponent,
		Pages.PickATeamPageComponent,
		Pages.CreateATeamPageComponent,
		Pages.CreateACompanyPageComponent,
		SharedComponents.AuthFormHeaderComponent,
	],
	exports: []
})
export class AuthFeatureModule { }
