import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';
import { FilterSmartPanelComponent } from './components/filter-smart-panel/filter-smart-panel.component';
import { InputsModule } from '../inputs/inputs.module';
import { UtilsModule } from '../utils/utils.module';
import { IconsModule } from '../icons/icons.module';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		UtilsModule,
		IconsModule
	],
	declarations: [FilterSearchBarComponent, FilterSmartPanelComponent],
	exports: [ FilterSearchBarComponent ]
})
export class FilterSearchBarModule { }
