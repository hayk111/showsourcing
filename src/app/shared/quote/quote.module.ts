import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { ERM_TOKEN, ERM } from '~models';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';

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
	providers: [
		ListPageViewService,
		ListPageDataService,
		SelectionWithFavoriteService,
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.QUOTE }
	]
	// entryComponents: [CreateTaskDialogComponent, PickerEntitySelectorComponent]
})
export class QuoteCommonModule { }
