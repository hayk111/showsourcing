import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomInputsModule } from '~shared/custom-inputs/custom-inputs.module';
import { InputsModule } from '~shared/inputs/inputs.module';

import {
  FilterBtnComponent,
  FilterBtnsPanelComponent,
  FilterCloudComponent,
  FilterEntityPanelComponent,
  FilterPanelComponent,
  FilterPricePanelComponent,
  FilterRatingPanelComponent,
	FilterSearchBarComponent,
	FilterTagComponent,
	FilterSmartPanelComponent
} from './components';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		CustomInputsModule,
		FormsModule,
		IconsModule
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
		FilterSmartPanelComponent
	],
	exports: [ FilterPanelComponent, FilterSearchBarComponent ]
})
export class FiltersModule { }
