import { Routes } from '@angular/router';
import { GuestTemplateComponent } from '~shared/template/components/guest-template/guest-template.component';
import { HandleInvitationComponent } from '~features/invitation/components';

export const routes: Routes = [
	{ path: ':id/accept-invite', component: HandleInvitationComponent }
];
