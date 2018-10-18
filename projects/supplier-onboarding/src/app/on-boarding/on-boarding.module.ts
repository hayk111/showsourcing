import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FileModule } from '~shared/file';

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
    FileModule,
		SearchAutocompleteModule
	],
	declarations: components,
	exports: components
})
export class OnBoardingModule { }
