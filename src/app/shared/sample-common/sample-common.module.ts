import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { SampleListComponent } from '~shared/sample-common/components/sample-list/sample-list.component';
import { SampleComponent } from '~shared/sample-common/components/sample/sample.component';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { IconsModule } from '~shared/icons';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { ProductCommonModule } from '~shared/product-common/product-common.module';

@NgModule({
	imports: [
		CommonModule,
		UserPictureModule,
		ProductCommonModule,
		DynamicFormsModule,
		UtilsModule,
		ImageModule,
		InputsModule,
		UserPictureModule,
		IconsModule,
		DialogModule,
		SharedModule
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
