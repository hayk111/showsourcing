import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HandleInvitationComponent } from '~features/invitation/components';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';
import { SharedModule } from '~shared/shared.module';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
	],
	declarations: [
		HandleInvitationComponent
	],
	providers: [
		InvitationFeatureService
	],
	exports: [
	],
})
export class InvitationModule {

}
