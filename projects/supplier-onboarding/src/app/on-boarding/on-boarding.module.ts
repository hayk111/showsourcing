import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import {
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent
} from './components';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [],
	exports: [FindBusinessComponent, WelcomeComponent]
})
export class OnBoardingModule { }
