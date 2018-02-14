import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { MatTableModule } from '@angular/material/table';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';
import { ProductCardViewComponent } from './components/product-card-view/product-card-view.component';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { DynamicFormsModule } from '../../shared/dynamic-forms/dynamic-forms.module';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { SelectModule } from '../../shared/select/select.module';
import { CommentModule } from '../../shared/comment/comment.module';
import { FeedbackModule } from '../../shared/feedback/feedback.module';
import { FileModule } from '../../shared/file/file.module';
import { RouterModule } from '@angular/router';
import { AppStoreModule } from '../../store/store.module';
import { KanbanModule } from '../../shared/kanban/kanban.module';
import { ProductSidePreviewComponent } from './components/product-side-preview/product-side-preview.component';
import { ProductPageModule } from '../product-page/product-page.module';
import { UtilsModule } from '../../shared/utils/utils.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductModule } from '../../shared/product/product.module';
import { ViewSwitcherAction } from '../../store/action/ui/view-switcher.action';
import { ViewSwitcherComponent } from '../../shared/switch/components/view-switcher/view-switcher.component';
import { FilterSearchBarModule } from '../../shared/filter-search-bar/filter-search-bar.module';
import { IconsModule } from '../../shared/icons/icons.module';
import { EntityPageModule } from '../../shared/entity-page/entity-page.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		AppStoreModule.forChild(),
		KanbanModule,
		ProductPageModule,
		UtilsModule,
		NgxDatatableModule,
		ProductModule,
		IconsModule,
		EntityPageModule
	],
	declarations: [
		ProductsPageComponent,
		ProductListViewComponent,
		ProductCardViewComponent,
		ProductSidePreviewComponent
	]
})
export class ProductsPageModule { }
