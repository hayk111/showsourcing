import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { SampleListViewComponent, SampleComponent, SamplePreviewComponent, SampleCardComponent } from './components';

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
		SampleListViewComponent,
		SamplePreviewComponent,
		SampleCardComponent,
	],
	exports: [
		SampleComponent,
		SampleListViewComponent,
		SamplePreviewComponent,
		SampleCardComponent,
	],
	entryComponents: []
})
export class SampleCommonModule { }
