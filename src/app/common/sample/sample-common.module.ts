import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { SampleListComponent } from './components/sample-list/sample-list.component';
import { SampleComponent } from './components/sample/sample.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule
	],
	declarations: [
		SampleListComponent,
		SampleComponent],
	exports: [
		SampleListComponent,
		SampleComponent
	],
	entryComponents: []
})
export class SampleCommonModule { }
