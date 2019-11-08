import { NgModule } from '@angular/core';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';
import { ListCommonModule } from '~common/list/list-common.module';

import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { SamplePreviewComponent } from './sample-preview/sample-preview.component';
import { SupplierPreviewComponent } from './supplier-preview/supplier-preview.component';
import { BannerTaskComponent } from './task-preview';
import { TaskPreviewComponent } from './task-preview/task-preview.component';

@NgModule({
	imports: [
		SharedModule,
		TablesCommonModule,
		CardsCommonModule,
		ListCommonModule
	],
	declarations: [
		ProductPreviewComponent,
		SamplePreviewComponent,
		SupplierPreviewComponent,
		TaskPreviewComponent,
		BannerTaskComponent
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
