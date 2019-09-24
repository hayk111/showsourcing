import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import {
	SampleBoardPageComponent,
	SampleCardComponent,
	SampleComponent,
	SampleListViewComponent,
	SamplePreviewComponent,
} from './components';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		ProductCommonModule,
		ProductCommonModule,
		CommentCommonModule
	],
	declarations: [
		SampleComponent,
		SampleListViewComponent,
		SamplePreviewComponent,
		SampleCardComponent,
		SampleBoardPageComponent,
	],
	exports: [
		SampleComponent,
		SampleListViewComponent,
		SamplePreviewComponent,
		SampleCardComponent,
		SampleBoardPageComponent,
	],
	entryComponents: []
})
export class SampleCommonModule { }
