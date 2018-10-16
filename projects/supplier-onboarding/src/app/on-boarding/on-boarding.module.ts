import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent
} from './components';
import { SharedModule } from '~shared/shared.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';

const comps = [
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
	imports: [CommonModule, SharedModule, SearchBarModule, SearchAutocompleteModule],
	declarations: comps,
	exports: comps
})
export class OnBoardingModule { }
