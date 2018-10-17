import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
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
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';

const components = [
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent
];

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
	imports: [
		CommonModule,
		SharedModule,
		SearchBarModule,
		SearchAutocompleteModule
	],
	declarations: components,
	exports: components
})
export class OnBoardingModule { }
