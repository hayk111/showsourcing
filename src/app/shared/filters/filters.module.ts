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
	FilterBtnsPanelComponent,
	FilterEntityPanelComponent,
	FilterPricePanelComponent,
	FilterRatingPanelComponent,
	FilterSearchBarComponent,
	FilterSmartPanelComponent,
	FilterTagComponent,
} from './components';
import { FilterCloudComponent, FilterPanelComponent } from './containers';

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
	providers: [FilterEntityPanelService],
	exports: [FilterPanelComponent, FilterSearchBarComponent, FilterCloudComponent],
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
