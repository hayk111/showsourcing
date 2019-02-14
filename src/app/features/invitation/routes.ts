import { Routes } from '@angular/router';
import { HandleInvitationComponent } from '~features/invitation/components';

export const routes: Routes = [
	{
		path: ':id/accept-invite',
		component: HandleInvitationComponent,
	}
];
