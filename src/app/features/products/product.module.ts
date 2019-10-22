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
import { routes } from '~features/products/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import {
	ProductActivityComponent,
	ProductActivityNavComponent,
	ProductDetailsPageComponent,
	ProductFilesComponent,
	ProductHeaderDetailsComponent,
	ProductInfoComponent,
	ProductSamplesComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './pages';
import { ProductFeatureService, QuoteFeatureService } from './services';



@NgModule({
	imports: [
		SharedModule,
		ActivityCommonModule,
		CommonModule,
		NavBarModule,
		RouterModule.forChild(routes),
		PreviewsCommonModule,
		TablesCommonModule,
		BoardsCommonModule,
		GridsCommonModule,
		SelectionBarsCommonModule,
		SortingMenusCommonModule
	],
	declarations: [
		ProductActivityComponent,
		ProductDetailsPageComponent,
		ProductSamplesComponent,
		ProductInfoComponent,
		ProductFilesComponent,
		ProductTasksComponent,
		ProductHeaderDetailsComponent,
		ProductsPageComponent,
		ProductActivityNavComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
		ProductFeatureService,
		QuoteFeatureService
	]
})
export class ProductModule {

}
