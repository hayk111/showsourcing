import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SamplePreviewComponent } from './sample-preview/sample-preview.component';
import { SupplierPreviewComponent } from './supplier-preview/supplier-preview.component';
import { BannerTaskComponent } from './task-preview';
import { TaskPreviewComponent } from './task-preview/task-preview.component';


@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule,
	],
	declarations: [
		SamplePreviewComponent,
		SupplierPreviewComponent,
		TaskPreviewComponent,
		BannerTaskComponent
	],
	exports: [
		SamplePreviewComponent,
		SupplierPreviewComponent,
		TaskPreviewComponent
	],
	entryComponents: []
})
export class PreviewsCommonModule { }
