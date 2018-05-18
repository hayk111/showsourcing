import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from '~shared/rating';
import { UtilsModule } from '~shared/utils';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs/inputs.module';

import {
	FilterBtnComponent,
	FilterEntityPanelComponent,
	FilterPricePanelComponent,
	FilterRatingPanelComponent,
	FilterSearchBarComponent,
	FilterSmartPanelComponent,
	FilterTagComponent,
	FilterPanelComponent,
} from './components';
import { SharedModule } from '~shared/shared.module';
import { SearchBarAnimatedModule } from '~shared/search-bar-animated/search-bar-animated.module';
import { FilterBtnsPanelComponent } from './components/filter-btns-panel/filter-btns-panel.component';
import { FilterSelectionPanelComponent } from './components/filter-selection-panel/filter-selection-panel.component';

@NgModule({
	imports: [
		SharedModule,
		SearchBarAnimatedModule,
		FormsModule,
		ReactiveFormsModule,
		RatingModule,
	],
	declarations: [
		FilterPanelComponent,
		FilterBtnComponent,
		FilterEntityPanelComponent,
		FilterRatingPanelComponent,
		FilterPricePanelComponent,
		FilterSearchBarComponent,
		FilterTagComponent,
		FilterSmartPanelComponent,
		FilterBtnsPanelComponent,
		FilterSelectionPanelComponent
	],
	exports: [
		FilterPanelComponent,
		FilterBtnComponent,
		FilterEntityPanelComponent,
		FilterRatingPanelComponent,
		FilterPricePanelComponent,
		FilterSearchBarComponent,
		FilterTagComponent,
		FilterSmartPanelComponent,
		FilterBtnsPanelComponent,
		FilterSelectionPanelComponent
	],
	providers: []
})
export class FiltersModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: FiltersModule,
			providers: []
		};
	}
	static forChild(): ModuleWithProviders {
		return {
			ngModule: FiltersModule,
		};
	}
}
