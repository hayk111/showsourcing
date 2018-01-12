import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterItemListComponent } from './components/filter-item-list/filter-item-list.component';
import { MatCheckboxModule } from '@angular/material';
import { FilterComponent } from './components/filter/filter.component';
import { FilterTagCloudComponent } from './components/filter-tag-cloud/filter-tag-cloud.component';
import { FilterTagComponent } from './components/filter-tag/filter-tag.component';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { InputsModule } from '../inputs/inputs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { FilterPricePanelComponent } from './components/filter-price-panel/filter-price-panel.component';
import { FilterRatingPanelComponent } from './components/filter-rating-panel/filter-rating-panel.component';
import { FilterSortByPanelComponent } from './components/filter-sort-by-panel/filter-sort-by-panel.component';
import { FilterSelectionPanelComponent } from './components/filter-selection-panel/filter-selection-panel.component';
import { UtilsModule } from '../utils/utils.module';
import { WithArchivedButtonComponent } from './components/with-archived-button/with-archived-button.component';
import { FilterProductSortPanelComponent } from './components/filter-product-sort-panel/filter-product-sort-panel.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		FormsModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatRadioModule,
		UtilsModule,
	],
	declarations: [ FilterItemListComponent, FilterComponent, FilterTagCloudComponent,
		FilterTagComponent, FilterSearchBarComponent, FilterPanelComponent, FilterListComponent,
		FilterPricePanelComponent, FilterRatingPanelComponent, FilterSortByPanelComponent,
		FilterSelectionPanelComponent,
		WithArchivedButtonComponent,
		FilterProductSortPanelComponent],
	exports: [ FilterItemListComponent, FilterComponent, FilterSearchBarComponent,
		FilterTagCloudComponent, FilterPanelComponent, FilterListComponent, WithArchivedButtonComponent ]
})
export class FiltersModule { }

