import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs/inputs.module';

import {
	FilterBtnComponent,
	FilterBtnsPanelComponent,
	FilterEntityPanelComponent,
	FilterPricePanelComponent,
	FilterRatingPanelComponent,
	FilterSearchBarComponent,
	FilterSmartPanelComponent,
	FilterTagComponent,
} from './components';
import { FilterPanelComponent, FilterCloudComponent } from './containers';
import { RatingModule } from '~app/shared/rating';
import { UtilsModule } from '~app/shared/utils';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		FormsModule,
		ReactiveFormsModule,
		RatingModule, // used in rating panel,
		UtilsModule, // for click outside
		IconsModule,
	],
	declarations: [
		FilterPanelComponent,
		FilterBtnsPanelComponent,
		FilterBtnComponent,
		FilterEntityPanelComponent,
		FilterRatingPanelComponent,
		FilterPricePanelComponent,
		FilterSearchBarComponent,
		FilterCloudComponent,
		FilterTagComponent,
		FilterSmartPanelComponent,
	],
	exports: [FilterPanelComponent, FilterSearchBarComponent, FilterCloudComponent],
})
export class FiltersModule {
	static forChild(): ModuleWithProviders {
		return {
			ngModule: FiltersModule,
		};
	}
}
