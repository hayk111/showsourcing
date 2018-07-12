import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { SearchAutocompleteTriggerComponent } from './components/search-autocomplete-trigger/search-autocomplete-trigger.component';
import { SearchAutocompleteItemComponent } from './components/search-autocomplete-item/search-autocomplete-item.component';
import {
	SearchAutocompleteItemContentComponent
} from './components/search-autocomplete-item-content/search-autocomplete-item-content.component';
import { UtilsModule } from '~shared/utils';
import { SearchAutocompleteDividerComponent } from './components/search-autocomplete-divider/search-autocomplete-divider.component';
import { DividerModule } from '~shared/divider/divider.module';
import { InputsModule } from '~shared/inputs/inputs.module';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		DividerModule,
		InputsModule
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
