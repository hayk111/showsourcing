import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { SampleComponent, SamplePreviewComponent, SampleCardComponent, SampleListViewComponent } from './components';

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
		SamplePreviewComponent,
		SampleCardComponent,
		SampleListViewComponent
	],
	exports: [
		SampleComponent,
		SamplePreviewComponent,
		SampleCardComponent,
		SampleListViewComponent
	],
	entryComponents: []
})
export class SampleCommonModule { }
