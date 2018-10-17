import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FindBusinessComponent } from './components';
import { AddressComponent } from './components/address/address.component';
import { BusinessTypeComponent } from './components/business-type/business-type.component';
import { CategoryComponent } from './components/category/category.component';
import { BusinessDescriptionComponent } from './components/business-description/business-description.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { ProofOfIdentityComponent } from './components/proof-of-identity/proof-of-identity.component';
import { QRCodeComponent } from './components/qrcode/qrcode.component';
import { VerificationComponent } from './components/verification/verification.component';

export const routes: Routes = [
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
];
