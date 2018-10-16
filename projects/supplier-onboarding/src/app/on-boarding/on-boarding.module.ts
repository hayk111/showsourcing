import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { FindBusinessComponent } from './components';
import { AddressComponent } from './components/address/address.component';
import { BusinessDescriptionComponent } from './components/business-description/business-description.component';
import { BusinessTypeComponent } from './components/business-type/business-type.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		FindBusinessComponent, WelcomeComponent,
		AddressComponent, BusinessTypeComponent,
		CategoryComponent, BusinessDescriptionComponent,
		ContactDetailsComponent
	]
})
export class OnBoardingModule { }
