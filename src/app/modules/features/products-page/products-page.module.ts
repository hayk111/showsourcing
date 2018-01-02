import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { FiltersModule } from '../../shared/filters/filters.module';
import { MatTableModule } from '@angular/material/table';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';
import { ProductCardViewComponent } from './components/product-card-view/product-card-view.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { DynamicFormsModule } from '../../shared/dynamic-forms/dynamic-forms.module';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { SelectModule } from '../../shared/select/select.module';
import { CommentModule } from '../../shared/comment/comment.module';
import { FeedbackModule } from '../../shared/feedback/feedback.module';
import { FileModule } from '../../shared/file/file.module';
import { RouterModule } from '@angular/router';
import { AppStoreModule } from '../../store/store.module';

@NgModule({
	imports: [
		CommonModule,
		FiltersModule,
		MatTableModule,
		MatCheckboxModule,
		FilteredListPageModule,
		DialogModule,
		DynamicFormsModule,
		InputsModule,
		SelectModule,
		CommentModule,
		FeedbackModule,
		FileModule,
		RouterModule.forChild([]),
		AppStoreModule.forChild()
	],
	declarations: [ ProductsPageComponent,
		ProductListViewComponent, ProductCardViewComponent, ProductDialogComponent]
})
export class ProductsPageModule { }
