import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from '~shared/rating';
import { BadgeModule } from '~shared/badge/badge.module';
import { SharedModule } from '~shared/shared.module';

import {
	FiltersComponent,
} from '~shared/filters/components';

@NgModule({
	imports: [
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RatingModule,
		BadgeModule
	],
	declarations: [
		FilterSelectionEntityPanelComponent,
		FilterBtnListComponent,
		FiltersComponent
	],
	exports: [
		FilterSelectionEntityPanelComponent,
		FilterBtnListComponent,
		FiltersComponent
	],
	providers: [
	]
})
export class FiltersModule {

}
