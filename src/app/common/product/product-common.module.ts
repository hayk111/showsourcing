import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { CarouselModule } from '~shared/carousel';
import { DialogModule } from '~shared/dialog/dialog.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { FiltersModule } from '~shared/filters';
import { RatingModule } from '~shared/rating/rating.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SharedModule } from '~shared/shared.module';
import { StatusModule } from '~shared/status/status.module';
import { TableModule } from '~shared/table/table.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';

import {
	ProductCardComponent,
	ProductGridCardComponent,
	ProductsCardViewComponent,
	ProductsListViewComponent,
	ProductSortingMenuComponent,
	ProductsCardViewDialogComponent,
} from './components';
import {
	ProductPreviewComponent,
	FindProductsDialogComponent
} from './containers';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		DialogModule,
		SearchAutocompleteModule,
		TopPanelModule,
		TableModule,
		RatingModule,
		WorkflowActionModule,
		ActionBarModule,
		StatusModule,
		FiltersModule,
		DynamicFormsModule,
		ReactiveFormsModule,
		CarouselModule,
		DragDropModule
	],
	declarations: [
		FindProductsDialogComponent,
		ProductsCardViewDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductPreviewComponent,
		ProductCardComponent
	],
	exports: [
		FindProductsDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductPreviewComponent,
		ProductCardComponent
	],
	entryComponents: [FindProductsDialogComponent],
	providers: []
})
export class ProductCommonModule { }
