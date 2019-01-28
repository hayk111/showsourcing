import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product';
import { SharedModule } from '~shared/shared.module';

import { ProductGeneralInfoComponent } from './product-general-info/product-general-info.component';
import { ProductGridCardDeprecatedComponent } from './product-grid-card-deprecated/product-grid-card-deprecated.component';
import { SelectorConstComponent } from './selector-const/selector-const.component';
import { SelectorDeprecatedComponent } from './selector-deprecated/selector-deprecated.component';
import { SelectorEntityComponent } from './selector-entity/selector-entity.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';
import { ImageModule } from '~shared/image/image.module';
import { UserPictureModule } from '~shared/user-picture';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		SharedModule,
		CommonModule,
		ProductCommonModule,
		NgSelectModule,
		ReactiveFormsModule,
		FormsModule,
		InputsModule,
		ImageModule, // pipes are used
		UserPictureModule,
		IconsModule,
	],
	declarations: [
		ProductGridCardDeprecatedComponent,
		SupplierCardComponent,
		ProductGeneralInfoComponent,
		SelectorEntityComponent,
		SelectorConstComponent,
		SelectorDeprecatedComponent
	],
	exports: [
		ProductGridCardDeprecatedComponent,
		SelectorConstComponent
	]
})
export class DeprecatedModule { }
