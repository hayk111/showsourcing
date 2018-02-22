import { ProductModule } from '@modules/products';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { FilteredListPageModule } from '@shared/filtered-list-page/filtered-list-page.module';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';
import { ProductCardViewComponent } from './components/product-card-view/product-card-view.component';
import { DialogModule } from '@shared/dialog/dialog.module';
import { DynamicFormsModule } from '@shared/dynamic-forms/dynamic-forms.module';
import { InputsModule } from '@shared/inputs/inputs.module';
import { SelectModule } from '@shared/select/select.module';
import { CommentModule } from '@shared/comment/comment.module';
import { RatingModule } from '@shared/rating/rating.module';
import { FileModule } from '@shared/file/file.module';
import { RouterModule } from '@angular/router';
import { AppStoreModule } from '../../store/store.module';
import { KanbanModule } from '@shared/kanban/kanban.module';
import { ProductSidePreviewComponent } from './components/product-side-preview/product-side-preview.component';
import { ProductDetailsPageModule } from '../product-page/product-details-page.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PriceModule } from '@shared/price/price.module';
import { ViewSwitcherAction } from '../../store/action/ui/view-switcher.action';
import { ViewSwitcherComponent } from '@shared/switch/components/view-switcher/view-switcher.component';
import { FilterSearchBarModule } from '@shared/filter-search-bar/filter-search-bar.module';
import { IconsModule } from '@shared/icons/icons.module';
import { EntityPageModule } from '@shared/entity-page/entity-page.module';
import { SelectionBarModule } from '@shared/selection-bar/selection-bar.module';
import { SelectionActionsComponent } from './components/selection-actions/selection-actions.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		AppStoreModule.forChild(),
		ProductDetailsPageModule,
		UtilsModule,
		NgxDatatableModule,
		PriceModule,
		EntityPageModule,
		IconsModule,
		SelectionBarModule,
		ProductModule
	],
	declarations: [
		ProductsPageComponent,
		ProductListViewComponent,
		ProductCardViewComponent,
		ProductSidePreviewComponent,
		SelectionActionsComponent
	]
})
export class ProductsPageModule {}
