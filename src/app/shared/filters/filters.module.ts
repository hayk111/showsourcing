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
import { FilterService } from '~shared/filters/services';
import { FilterDataService } from '~shared/filters/services/filter.data.service';

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
	providers: [
	]
})
export class FiltersModule {

}
