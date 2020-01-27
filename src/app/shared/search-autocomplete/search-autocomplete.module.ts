import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeModule } from '~shared/badge/badge.module';
import { DividerModule } from '~shared/divider/divider.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import {
	SearchAutocompleteDividerComponent,

} from './components/search-autocomplete-divider/search-autocomplete-divider.component';
import {
	SearchAutocompleteItemContentComponent,
} from './components/search-autocomplete-item-content/search-autocomplete-item-content.component';
import {
	SearchAutocompleteItemComponent,
} from './components/search-autocomplete-item/search-autocomplete-item.component';
import {
	SearchAutocompleteTriggerComponent,
} from './components/search-autocomplete-trigger/search-autocomplete-trigger.component';
import {
	SearchAutocompleteComponent,
} from './components/search-autocomplete/search-autocomplete.component';
import { UtilsModule } from '~shared/utils';
import { ImageModule } from '~shared/image/image.module';
import { PriceModule } from '~shared/price';
import { RatingModule } from '~shared/rating';
import { LogoModule } from '~shared/logo';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		DividerModule,
		InputsModule,
		BadgeModule,
		ImageModule,
		PriceModule,
		RatingModule,
		LogoModule,
	],
	declarations: [
		SearchAutocompleteComponent, SearchAutocompleteTriggerComponent,
		SearchAutocompleteItemComponent, SearchAutocompleteDividerComponent,
		SearchAutocompleteItemContentComponent
	],
	exports: [
		SearchAutocompleteComponent, SearchAutocompleteTriggerComponent,
		SearchAutocompleteItemComponent, SearchAutocompleteDividerComponent,
		SearchAutocompleteItemContentComponent
	]
})
export class SearchAutocompleteModule { }
