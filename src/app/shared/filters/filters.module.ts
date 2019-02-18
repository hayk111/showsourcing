import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge/badge.module';
import { FiltersComponent, FilterSelectionEntityPanelComponent } from '~shared/filters/components';
import { FilterBtnListComponent } from '~shared/filters/components/filter-btn-list/filter-btn-list.component';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { PanelModule } from '~shared/panel/panel.module';
import { RatingModule } from '~shared/rating';
import { UtilsModule } from '~shared/utils';

@NgModule({
	imports: [
		CommonModule,
		LoadersModule,
		InputsModule,
		IconsModule,
		PanelModule,
		FormsModule,
		ReactiveFormsModule,
		RatingModule,
		BadgeModule,
		UtilsModule,
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
