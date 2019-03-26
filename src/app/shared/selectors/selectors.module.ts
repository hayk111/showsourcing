import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatchModule, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BadgeModule } from '~shared/badge';
import { DividerModule } from '~shared/divider/divider.module';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';

import {
	CdkOverlayComponent,
	SelectorButtonRowComponent,
	SelectorCategoryRowComponent,
	SelectorComponent,
	SelectorContactRowComponent,
	SelectorCountryRowComponent,
	SelectorCurrencyRowComponent,
	SelectorEventRowComponent,
	SelectorIdRowComponent,
	SelectorNameRowComponent,
	SelectorPickerComponent,
	SelectorPlaceholderComponent,
	SelectorProductRowComponent,
	SelectorProjectRowComponent,
	SelectorSupplierRowComponent,
	SelectorSupplierTypeRowComponent,
	SelectorTagRowComponent,
	SelectorTextRowComponent,
	SelectorUserRowComponent,
} from './components';


const components = [
	CdkOverlayComponent,
	SelectorButtonRowComponent,
	SelectorCategoryRowComponent,
	SelectorComponent,
	SelectorContactRowComponent,
	SelectorCountryRowComponent,
	SelectorCurrencyRowComponent,
	SelectorPlaceholderComponent,
	SelectorEventRowComponent,
	SelectorIdRowComponent,
	SelectorNameRowComponent,
	SelectorPickerComponent,
	SelectorProductRowComponent,
	SelectorProjectRowComponent,
	SelectorSupplierRowComponent,
	SelectorSupplierTypeRowComponent,
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
		UtilsModule,
		ScrollDispatchModule,
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
