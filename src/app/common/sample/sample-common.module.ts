import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { SampleListComponent } from './components/sample-list/sample-list.component';
import { SampleComponent } from './components/sample/sample.component';
import { PreviewSampleComponent } from './components/preview-sample/preview-sample.component';
import { SampleCardComponent } from './components/sample-card/sample-card.component';
import { CommentCommonModule } from '~common/comment';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		CommentCommonModule
	],
	declarations: [
		SampleListComponent,
		SampleComponent,
		PreviewSampleComponent,
		SampleCardComponent],
	exports: [
		SampleListComponent,
		SampleComponent,
		PreviewSampleComponent,
		SampleCardComponent
	],
	entryComponents: []
})
export class SampleCommonModule { }
