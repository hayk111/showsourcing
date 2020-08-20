import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
	SelectorComponent,
	SelectorOptionButtonComponent,
	SelectorOptionContactComponent,
	SelectorOptionCountryComponent,
	SelectorOptionCurrencyComponent,
	SelectorOptionEventComponent,
	SelectorOptionLabelNameComponent,
	SelectorOptionComponent,
	SelectorOptionProductComponent,
	SelectorOptionRequestTemplateComponent,
	SelectorOptionSupplierComponent,
	SelectorOptionUserComponent,
	SelectorOptionValueComponent,
	SelectorPickerComponent,
	SelectorPlaceholderComponent,
	SelectorOverlayComponent,
	SelectorDefaultComponent,
} from './components';


const components = [
	CdkOverlayComponent,
	SelectorComponent,
	SelectorOptionButtonComponent,
	SelectorOptionContactComponent,
	SelectorOptionCountryComponent,
	SelectorOptionCurrencyComponent,
	SelectorOptionEventComponent,
	SelectorOptionLabelNameComponent,
	SelectorOptionComponent,
	SelectorOptionProductComponent,
	SelectorOptionRequestTemplateComponent,
	SelectorOptionSupplierComponent,
	SelectorOptionUserComponent,
	SelectorOptionValueComponent,
	SelectorPickerComponent,
	SelectorPlaceholderComponent,
	SelectorOverlayComponent,
	SelectorDefaultComponent
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
		LoadersModule,
		TranslateModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
