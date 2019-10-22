import { NgModule } from '@angular/core';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { CommentCommonModule } from '~common/comment';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { SamplePreviewComponent } from './sample-preview/sample-preview.component';
import { SupplierPreviewComponent } from './supplier-preview/supplier-preview.component';
import { BannerTaskComponent } from './task-preview';
import { TaskPreviewComponent } from './task-preview/task-preview.component';


@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule,
		TablesCommonModule,
		CardsCommonModule
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
