import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import {
	HandleInvitationComponent
} from '~features/invitation/components';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ReactiveFormsModule,
	],
	declarations: [
		HandleInvitationComponent
	],
	providers: [
		InvitationFeatureService
	],
	exports: [
		// RouterModule
	],
})
export class InvitationModule {

}
