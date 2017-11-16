import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterItemListComponent } from './components/filter-item-list/filter-item-list.component';
import { MatCheckboxModule, MatIconModule } from '@angular/material';
import { FilterComponent } from './components/filter/filter.component';
import { FilterTagCloudComponent } from './components/filter-tag-cloud/filter-tag-cloud.component';
import { FilterTagComponent } from './components/filter-tag/filter-tag.component';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';

@NgModule({
	imports: [
		CommonModule,
		MatCheckboxModule,
		MatIconModule
	],
	declarations: [ FilterItemListComponent, FilterComponent, FilterTagCloudComponent, 
		FilterTagComponent, FilterSearchBarComponent ],
	exports: [ FilterItemListComponent, FilterComponent, FilterSearchBarComponent, 
		FilterTagCloudComponent ]
})
export class FiltersModule { }

