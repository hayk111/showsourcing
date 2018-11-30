import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { SampleListComponent } from './components/sample-list/sample-list.component';
import { SampleComponent } from './components/sample/sample.component';
import { PreviewSampleComponent } from './components/preview-sample/preview-sample.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule
	],
	declarations: [
		SampleListComponent,
		SampleComponent,
		PreviewSampleComponent],
	exports: [
		SampleListComponent,
		SampleComponent,
		PreviewSampleComponent
	],
	entryComponents: []
})
export class SampleCommonModule { }
