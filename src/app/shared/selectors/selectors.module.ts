import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatchModule, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge';
import { DividerModule } from '~shared/divider/divider.module';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';

import {
	CdkOverlayComponent,
	SelectorButtonRowComponent,
	SelectorComponent,
	SelectorContactRowComponent,
	SelectorCountryRowComponent,
	SelectorCurrencyRowComponent,
	SelectorEventRowComponent,
	SelectorLabelNameRowComponent,
	SelectorNameRowComponent,
	SelectorPickerComponent,
	SelectorPlaceholderComponent,
	SelectorRequestTemplateRowComponent,
	SelectorSupplierRowComponent,
	SelectorUserRowComponent,
	SelectorValueRowComponent,
} from './components';


const components = [
	CdkOverlayComponent,
	SelectorButtonRowComponent,
	SelectorComponent,
	SelectorContactRowComponent,
	SelectorCountryRowComponent,
	SelectorCurrencyRowComponent,
	SelectorPlaceholderComponent,
	SelectorEventRowComponent,
	SelectorLabelNameRowComponent,
	SelectorNameRowComponent,
	SelectorPickerComponent,
	SelectorRequestTemplateRowComponent,
	SelectorSupplierRowComponent,
	SelectorUserRowComponent,
	SelectorValueRowComponent,
];

@NgModule({
	imports: [
		CommonModule,
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
		LoadersModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
