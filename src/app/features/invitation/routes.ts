import { Routes } from '@angular/router';
import { HandleInvitationComponent } from '~features/invitation/pages';

export const routes: Routes = [
	{
		path: ':id/accept-invite',
		component: HandleInvitationComponent,
	}
];
