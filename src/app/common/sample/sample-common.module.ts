import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { SampleListComponent } from './components/sample-list/sample-list.component';
import { SampleComponent } from './components/sample/sample.component';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { IconsModule } from '~shared/icons';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
	imports: [
		CommonModule,
		UserPictureModule,
		ProductCommonModule,
		UtilsModule,
		ImageModule,
		InputsModule,
		UserPictureModule,
		IconsModule,
		DialogModule,
		SharedModule,
		ScrollingModule
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
