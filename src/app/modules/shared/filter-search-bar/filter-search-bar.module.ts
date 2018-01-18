import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';
import { FilterSmartPanelComponent } from './components/filter-smart-panel/filter-smart-panel.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [FilterSearchBarComponent, FilterSmartPanelComponent]
})
export class FilterSearchBarModule { }
