import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomInputsModule } from '~shared/custom-inputs/custom-inputs.module';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs/inputs.module';

import {
	FilterBtnComponent,
	FilterBtnsPanelComponent,
	FilterCloudComponent,
	FilterEntityPanelComponent,
	FilterPricePanelComponent,
	FilterRatingPanelComponent,
	FilterSearchBarComponent,
	FilterSmartPanelComponent,
	FilterTagComponent,
} from './components';
import { FilterPanelComponent } from './containers';

@NgModule({
	imports: [CommonModule, InputsModule, CustomInputsModule, FormsModule, IconsModule],
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
export class FiltersModule {}
