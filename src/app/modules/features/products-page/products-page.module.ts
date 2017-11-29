import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { FiltersModule } from '../../shared/filters/filters.module';
import { MatTableModule } from '@angular/material/table';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';
import { ProductCardViewComponent } from './components/product-card-view/product-card-view.component';
import { TeamItemLoaderService } from '../../shared/filtered-list-page/services/team-item-loader.service';
import { MatCheckbox, MatCheckboxModule } from '@angular/material';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { FormBuilderModule } from '../../shared/form-builder/form-builder.module';
import { FileUploadModule } from 'ng2-file-upload';
import { DialogModule } from '../../shared/dialog/dialog.module';

@NgModule({
	imports: [
		CommonModule,
		FiltersModule,
		MatTableModule,
		MatCheckboxModule,
		FilteredListPageModule,
		DialogModule,
		FormBuilderModule.forChild(),
		FileUploadModule
	],
	declarations: [ ProductsPageComponent,
		ProductListViewComponent, ProductCardViewComponent, ProductDialogComponent]
})
export class ProductsPageModule { }
