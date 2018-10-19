import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeModule } from '~shared/badge';
import { DividerModule } from '~shared/divider/divider.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import {
	SearchAutocompleteDividerComponent,
} from '~shared/search-autocomplete/components/search-autocomplete-divider/search-autocomplete-divider.component';
import {
	SearchAutocompleteItemContentComponent,
} from '~shared/search-autocomplete/components/search-autocomplete-item-content/search-autocomplete-item-content.component';
import {
	SearchAutocompleteItemComponent,
} from '~shared/search-autocomplete/components/search-autocomplete-item/search-autocomplete-item.component';
import {
	SearchAutocompleteTriggerComponent,
} from '~shared/search-autocomplete/components/search-autocomplete-trigger/search-autocomplete-trigger.component';
import {
	SearchAutocompleteComponent,
} from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { UtilsModule } from '~shared/utils';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		DividerModule,
		InputsModule,
		BadgeModule,
		SharedModule
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
