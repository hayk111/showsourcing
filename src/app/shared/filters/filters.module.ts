import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterEntityPanelService } from '~app/shared/filters/services';
import { RatingModule } from '~app/shared/rating';
import { UtilsModule } from '~app/shared/utils';
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
import { SharedModule } from '~app/shared/shared.module';
import { SearchBarAnimatedModule } from '~app/shared/search-bar-animated/search-bar-animated.module';

@NgModule({
	imports: [
		CommonModule,
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
		FilterSmartPanelComponent
	],
	exports: [
		FilterPanelComponent,
		FilterBtnComponent,
		FilterEntityPanelComponent,
		FilterRatingPanelComponent,
		FilterPricePanelComponent,
		FilterSearchBarComponent,
		FilterTagComponent,
		FilterSmartPanelComponent
	],
	providers: [FilterEntityPanelService]
})
export class FiltersModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: FiltersModule,
			providers: [FilterEntityPanelService]
		};
	}
	static forChild(): ModuleWithProviders {
		return {
			ngModule: FiltersModule,
		};
	}
}
