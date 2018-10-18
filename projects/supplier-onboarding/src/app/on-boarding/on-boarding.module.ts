import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
	FileRowComponent,
} from './components';

const components = [
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent,
	AccountCreationComponent,
	CongratulationsComponent,
	ProofOfIdentityComponent,
	QRCodeComponent,
	VerificationComponent,
	FileRowComponent
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		SearchBarModule,
		SearchAutocompleteModule
	],
	declarations: components,
	exports: components
})
export class OnBoardingModule { }
