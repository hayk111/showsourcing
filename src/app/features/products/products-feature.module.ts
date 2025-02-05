import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { GridsCommonModule } from '~common/grids/grids-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { SelectionBarsCommonModule } from '~common/selection-bars/selection-bars-common.module';
import { SortingMenusCommonModule } from '~common/sorting-menus/sorting-menus-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { ListCommonModule } from '~common/list/list-common.module';
import { routes } from '~features/products/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import * as DetailsPage from './pages/product-details';
import * as TablePage from './pages/products';
import { ProductFeatureService, QuoteFeatureService } from './services';
import { CardsCommonModule } from '~common/cards/cards-common.module';


@NgModule({
	imports: [
		SharedModule,
		ActivityCommonModule,
		CommonModule,
		NavBarModule,
		ListCommonModule,
		RouterModule.forChild(routes),
		PreviewsCommonModule,
		TablesCommonModule,
		BoardsCommonModule,
		GridsCommonModule,
		CardsCommonModule,
		SelectionBarsCommonModule,
		SortingMenusCommonModule
	],
	declarations: [
		DetailsPage.ProductDetailsPageComponent,
		DetailsPage.ActivityPageComponent,
		DetailsPage.SamplesPageComponent,
		DetailsPage.InfoPageComponent,
		DetailsPage.FilesPageComponent,
		DetailsPage.TasksPageComponent,
		DetailsPage.RequestsPageComponent,
		DetailsPage.ProductHeaderDetailsComponent,
		DetailsPage.ProductSubHeaderDetailsComponent,
		DetailsPage.ProductDocketComponent,
		DetailsPage.ProductMainComponent,
		TablePage.ProductsPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
		ProductFeatureService,
		QuoteFeatureService
	]
})
export class ProductsFeatureModule {

}
