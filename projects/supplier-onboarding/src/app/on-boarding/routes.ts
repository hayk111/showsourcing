import { Routes } from '@angular/router';
import {
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent
} from './components';

export const routes: Routes = [
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: 'welcome', component: WelcomeComponent },
	{ path: 'find-business', component: FindBusinessComponent },
	{ path: 'address', component: AddressComponent },
	{ path: 'business-type', component: BusinessTypeComponent },
	{ path: 'category', component: CategoryComponent },
	{ path: 'business-description', component: BusinessDescriptionComponent },
	{ path: 'contact-details', component: ContactDetailsComponent }
];
