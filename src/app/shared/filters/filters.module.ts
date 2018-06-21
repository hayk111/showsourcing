import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import {
	FilterBtnComponent,
	FilterEntityPanelComponent,
	FilterPricePanelComponent,
	FilterRatingPanelComponent,
	FilterSmartPanelComponent,
	FilterTagComponent,
} from './components';
import { FilterSelectionPanelComponent } from './components/filter-selection-panel/filter-selection-panel.component';
import { FilterBtnsPanelComponent } from '~shared/filters/components/filter-btns-panel/filter-btns-panel.component';

@NgModule({
	imports: [
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RatingModule,
	],
	declarations: [
		FilterBtnComponent,
		FilterBtnsPanelComponent,
		FilterEntityPanelComponent,
		FilterRatingPanelComponent,
		FilterPricePanelComponent,
		FilterTagComponent,
		FilterSmartPanelComponent,
		FilterSelectionPanelComponent
	],
	exports: [
		FilterBtnComponent,
		FilterBtnsPanelComponent,
		FilterEntityPanelComponent,
		FilterRatingPanelComponent,
		FilterPricePanelComponent,
		FilterTagComponent,
		FilterSmartPanelComponent,
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
