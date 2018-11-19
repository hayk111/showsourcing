import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';

import { QuoteComponent, QuoteListComponent } from '.';

@NgModule({
	imports: [
		CommonModule,
		ProductCommonModule,
		UtilsModule,
		ImageModule,
		InputsModule,
		UserPictureModule,
		IconsModule,
		SharedModule
	],
	declarations: [QuoteListComponent, QuoteComponent],
	exports: [QuoteListComponent, QuoteComponent],
	// entryComponents: [CreateTaskDialogComponent, PickerEntitySelectorComponent]
})
export class QuoteCommonModule { }
