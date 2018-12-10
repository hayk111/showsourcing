import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { UserPictureModule } from '~shared/user-picture';

import {
	CdkOverlayComponent,
	SelectorComponent,
	SelectorPriceRowComponent,
	SelectorProductRowComponent,
	SelectorProjectRowComponent,
	SelectorSupplierRowComponent,
	SelectorTextRowComponent,
	SelectorUserRowComponent,
	Selector2Component,
} from './components';
import { SelectorConstComponent } from './components/selector-const/selector-const.component';
import { SelectorEntityComponent } from './components/selector-entity/selector-entity.component';
import { DividerModule } from '~shared/divider/divider.module';


const components = [
	CdkOverlayComponent,
	SelectorComponent,
	Selector2Component,
	SelectorConstComponent,
	SelectorEntityComponent,
	SelectorPriceRowComponent,
	SelectorProductRowComponent,
	SelectorProjectRowComponent,
	SelectorSupplierRowComponent,
	SelectorTextRowComponent,
	SelectorUserRowComponent
];

@NgModule({
	imports: [
		CommonModule,
		NgSelectModule,
		ReactiveFormsModule,
		FormsModule,
		InputsModule,
		ImageModule, // pipes are used
		UserPictureModule,
		IconsModule,
		OverlayModule,
		DividerModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
