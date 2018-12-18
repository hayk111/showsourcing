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
	SelectorCurrencyRowComponent,
	SelectorProductRowComponent,
	SelectorProjectRowComponent,
	SelectorSupplierRowComponent,
	SelectorTextRowComponent,
	SelectorUserRowComponent,
	SelectorPickerComponent,
	Selector2Component,
	SelectorCountryRowComponent,
} from './components';
import { SelectorConstComponent } from './components/selector-const/selector-const.component';
import { SelectorEntityComponent } from './components/selector-entity/selector-entity.component';
import { DividerModule } from '~shared/divider/divider.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BadgeModule } from '~shared/badge';
import { A11yModule } from '@angular/cdk/a11y';
import { SelectorTagRowComponent } from './components/selector-tag-row/selector-tag-row.component';
import { UtilsModule } from '~shared/utils';


const components = [
	CdkOverlayComponent,
	Selector2Component,
	SelectorComponent,
	SelectorConstComponent,
	SelectorCountryRowComponent,
	SelectorCurrencyRowComponent,
	SelectorEntityComponent,
	SelectorPickerComponent,
	SelectorProductRowComponent,
	SelectorProjectRowComponent,
	SelectorSupplierRowComponent,
	SelectorTagRowComponent,
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
		DividerModule,
		ScrollingModule,
		BadgeModule,
		A11yModule,
		UtilsModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
