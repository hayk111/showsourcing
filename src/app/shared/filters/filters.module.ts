import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from '~shared/rating';
import { BadgeModule } from '~shared/badge/badge.module';
import { SharedModule } from '~shared/shared.module';

import {
	FilterEntityPanelComponent,
	FiltersComponent
} from '~shared/filters/components';
import { FilterSelectionPanelComponent } from '~shared/filters/components/filter-selection-panel/filter-selection-panel.component';
import { FilterDataService } from '~shared/filters/services/filter.data.service';
import { FilterBtnListComponent } from '~shared/filters/components/filter-btn-list/filter-btn-list.component';

@NgModule({
	imports: [
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RatingModule,
		BadgeModule
	],
	declarations: [
		FilterEntityPanelComponent,
		FilterBtnListComponent
	],
	exports: [
		FilterEntityPanelComponent,
		FilterBtnListComponent
	],
	providers: [
	]
})
export class FiltersModule {

}
