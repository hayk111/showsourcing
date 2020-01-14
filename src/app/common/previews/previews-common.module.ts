import { NgModule } from '@angular/core';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { CatalogCommonModule } from '~common/catalogs/catalog-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { SamplePreviewComponent } from './sample-preview/sample-preview.component';
import { SupplierPreviewComponent } from './supplier-preview/supplier-preview.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';


@NgModule({
	imports: [
		SharedModule,
		TablesCommonModule,
		CardsCommonModule,
		CatalogCommonModule
	],
	declarations: [
		ProductPreviewComponent,
		SamplePreviewComponent,
		SupplierPreviewComponent,
		TaskPreviewComponent,
	],
	exports: [
		ProductPreviewComponent,
		SamplePreviewComponent,
		SupplierPreviewComponent,
		TaskPreviewComponent
	],
	entryComponents: []
})
export class PreviewsCommonModule { }
