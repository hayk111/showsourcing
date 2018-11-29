import { Routes } from '@angular/router';

import {
	AccountCreationComponent,
	AddressComponent,
	BusinessDescriptionComponent,
	BusinessTypeComponent,
	CategoryComponent,
	CongratulationsComponent,
	ContactDetailsComponent,
	FindBusinessComponent,
	ProofOfIdentityComponent,
	QRCodeComponent,
	VerificationComponent,
	WelcomeComponent,
} from './components';
import { GuestTemplateComponent } from '~shared/template';
import { GlobalDataClientReadyGuard, SupplierOnboardingClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';
import { ProcessStartedGuard } from './services/process-started.guard';

export const routes: Routes = [
	{
		path: '', component: GuestTemplateComponent,
		data: { showLogout: false },
		canActivateChild: [],
		children: [
			{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
			{ path: 'welcome', component: WelcomeComponent },
			{ path: 'find-business', component: FindBusinessComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'address', component: AddressComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'business-type', component: BusinessTypeComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'category', component: CategoryComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'business-description', component: BusinessDescriptionComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'contact-details', component: ContactDetailsComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'account-creation', component: AccountCreationComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'congratulations', component: CongratulationsComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'proof-of-identity', component: ProofOfIdentityComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'qrcode', component: QRCodeComponent, canActivate: [ProcessStartedGuard] },
			{ path: 'verification', component: VerificationComponent, canActivate: [ProcessStartedGuard] }
		]
	}
];
