import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterItemListComponent } from './components/filter-item-list/filter-item-list.component';
import { MatCheckboxModule, MatIconModule } from '@angular/material';
import { FilterComponent } from './components/filter/filter.component';
import { FilterTagCloudComponent } from './components/filter-tag-cloud/filter-tag-cloud.component';
import { FilterTagComponent } from './components/filter-tag/filter-tag.component';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { InputsModule } from '../inputs/inputs.module';
import { FormsModule } from '@angular/forms';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { FilterPricePanelComponent } from './components/filter-price-panel/filter-price-panel.component';
import { FilterRatingPanelComponent } from './components/filter-rating-panel/filter-rating-panel.component';
import { FilterSortByPanelComponent } from './components/filter-sort-by-panel/filter-sort-by-panel.component';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		FormsModule,
		MatCheckboxModule,
		MatIconModule
	],
	declarations: [ FilterItemListComponent, FilterComponent, FilterTagCloudComponent, 
		FilterTagComponent, FilterSearchBarComponent, FilterPanelComponent, FilterListComponent, FilterPricePanelComponent, FilterRatingPanelComponent, FilterSortByPanelComponent ],
	exports: [ FilterItemListComponent, FilterComponent, FilterSearchBarComponent, 
		FilterTagCloudComponent, FilterPanelComponent, FilterListComponent ]
})
export class FiltersModule { }

