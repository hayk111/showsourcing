import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FindBusinessComponent } from './components';
import { AddressComponent } from './components/address/address.component';
import { BusinessTypeComponent } from './components/business-type/business-type.component';
import { CategoryComponent } from './components/category/category.component';
import { BusinessDescriptionComponent } from './components/business-description/business-description.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

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
