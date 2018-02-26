import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { FilterBtnsPanelComponent } from './components/filter-btns-panel/filter-btns-panel.component';
import { FilterBtnComponent } from './components/filter-btn/filter-btn.component';
import { FilterEntityPanelComponent } from './components/filter-entity-panel/filter-entity-panel.component';
import { InputsModule } from '../inputs/inputs.module';
import { FilterRatingPanelComponent } from './components/filter-rating-panel/filter-rating-panel.component';
import { CustomInputsModule } from '../custom-inputs/custom-inputs.module';
import { FilterPricePanelComponent } from './components/filter-price-panel/filter-price-panel.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		CustomInputsModule,
		FormsModule
	],
	declarations: [
		FilterPanelComponent,
		FilterBtnsPanelComponent,
		FilterBtnComponent,
		FilterEntityPanelComponent,
		FilterRatingPanelComponent,
		FilterPricePanelComponent
	],
	exports: [ FilterPanelComponent ]
})
export class Filters2Module { }
