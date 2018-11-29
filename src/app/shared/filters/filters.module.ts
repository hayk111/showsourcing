import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge/badge.module';
import { FiltersComponent, FilterSelectionEntityPanelComponent } from '~shared/filters/components';
import { FilterBtnListComponent } from '~shared/filters/components/filter-btn-list/filter-btn-list.component';
import { RatingModule } from '~shared/rating';
import { CommonModule } from '@angular/common';
import { LoadersModule } from '~shared/loaders';
import { InputsModule } from '~shared/inputs';
import { PanelModule } from '~shared/panel/panel.module';
import { IconsModule } from '~shared/icons';

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
