import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { SampleTableComponent,
				 SampleComponent,
				 SamplePreviewComponent,
				 SampleCardComponent,
				 SampleBoardPageComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		ProductCommonModule,
		CommentCommonModule
	],
	declarations: [
		SampleComponent,
		SampleTableComponent,
		SamplePreviewComponent,
		SampleCardComponent,
		SampleBoardPageComponent,
	],
	exports: [
		SampleComponent,
		SampleTableComponent,
		SamplePreviewComponent,
		SampleCardComponent,
		SampleBoardPageComponent,
	],
	entryComponents: []
})
export class SampleCommonModule { }
