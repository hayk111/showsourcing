import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { FileModule } from '~shared/file';

import {
	AccountCreationComponent,
	AddressComponent,
	BusinessDescriptionComponent,
	BusinessTypeComponent,
	CategoryComponent,
	CongratulationsComponent,
	ContactDetailsComponent,
	FileRowComponent,
	FindBusinessComponent,
	ProofOfIdentityComponent,
	QRCodeComponent,
	VerificationComponent,
	WelcomeComponent,
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
		SearchAutocompleteModule,
		InputsModule
	],
	declarations: components,
	exports: components
})
export class OnBoardingModule { }
