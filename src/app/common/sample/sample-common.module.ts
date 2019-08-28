import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { SampleListComponent, SampleComponent, SamplePreviewComponent, SampleCardComponent, SampleBoardPageComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		ProductCommonModule,
		CommentCommonModule
	],
	declarations: [
		SampleListComponent,
		SampleBoardPageComponent,
		SampleComponent,
		SamplePreviewComponent,
		SampleCardComponent],
	exports: [
		SampleListComponent,
		SampleBoardPageComponent,
		SampleComponent,
		SamplePreviewComponent,
		SampleCardComponent
	],
	entryComponents: []
})
export class SampleCommonModule { }
