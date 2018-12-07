import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { SampleListComponent, SampleComponent, SamplePreviewComponent, SampleCardComponent } from './components';

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
		SamplePreviewComponent,
		SampleCardComponent],
	exports: [
		SampleListComponent,
		SampleComponent,
		SamplePreviewComponent,
		SampleCardComponent
	],
	entryComponents: []
})
export class SampleCommonModule { }
