import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HandleInvitationComponent } from '~features/invitation/components';
import { SharedModule } from '~shared/shared.module';

import { routes } from './routes';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		HandleInvitationComponent
	],
	providers: [],
	exports: [
	],
})
export class InvitationModule {

}
