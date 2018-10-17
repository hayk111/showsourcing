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

export const routes: Routes = [
	{
		path: '', component: GuestTemplateComponent,
		data: { showLogout: false },
		children: [
			{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
			{ path: 'welcome', component: WelcomeComponent },
			{ path: 'find-business', component: FindBusinessComponent },
			{ path: 'address', component: AddressComponent },
			{ path: 'business-type', component: BusinessTypeComponent },
			{ path: 'category', component: CategoryComponent },
			{ path: 'business-description', component: BusinessDescriptionComponent },
			{ path: 'contact-details', component: ContactDetailsComponent },
			{ path: 'account-creation', component: AccountCreationComponent },
			{ path: 'congratulations', component: CongratulationsComponent },
			{ path: 'proof-of-identity', component: ProofOfIdentityComponent },
			{ path: 'qrcode', component: QRCodeComponent },
			{ path: 'verification', component: VerificationComponent }
		]
	}
];
