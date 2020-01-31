import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatchModule, ScrollingModule } from '@angular/cdk/scrolling';
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
	SelectorOptionNameComponent,
	SelectorOptionProductComponent,
	SelectorOptionRequestTemplateComponent,
	SelectorOptionSupplierComponent,
	SelectorOptionUserComponent,
	SelectorOptionValueComponent,
	SelectorPickerComponent,
	SelectorPlaceholderComponent,
} from './components';
import {
	SelectorContentItemsComponent,
} from './components/selector-content/selector-content-items/selector-content-items.component';
import {
	SelectorContentStoredComponent,
} from './components/selector-content/selector-content-stored/selector-content-stored.component';
import { SelectorContentComponent } from './components/selector-content/selector-content.component';
import { CategorySelectorComponent } from './components/selectors/category-selector/category-selector.component';
import { EventSelectorComponent } from './components/selectors/event-selector/event-selector.component';
import { ProjectSelectorComponent } from './components/selectors/project-selector/project-selector.component';
import { SupplierSelectorComponent } from './components/selectors/supplier-selector/supplier-selector.component';
import { SupplierTypeSelectorComponent } from './components/selectors/supplier-type-selector/supplier-type-selector.component';
import { TagSelectorComponent } from './components/selectors/tag-selector/tag-selector.component';
import { CurrencySelectorComponent } from './components/selectors/currency-selector/currency-selector.component';
import { UserSelectorComponent } from './components/selectors/user-selector/user-selector.component';


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
		LoadersModule,
		TranslateModule
	],
	declarations: [
		CdkOverlayComponent,
		SelectorComponent,
		SelectorOptionButtonComponent,
		SelectorOptionContactComponent,
		SelectorOptionCountryComponent,
		SelectorOptionCurrencyComponent,
		SelectorOptionEventComponent,
		SelectorOptionLabelNameComponent,
		SelectorOptionNameComponent,
		SelectorOptionProductComponent,
		SelectorOptionRequestTemplateComponent,
		SelectorOptionSupplierComponent,
		SelectorOptionUserComponent,
		SelectorOptionValueComponent,
		SelectorPickerComponent,
		SelectorPlaceholderComponent,
		CategorySelectorComponent,
		SelectorContentComponent,
		SelectorContentStoredComponent,
		SelectorContentItemsComponent,
		EventSelectorComponent,
		ProjectSelectorComponent,
		SupplierSelectorComponent,
		SupplierTypeSelectorComponent,
		TagSelectorComponent,
		CurrencySelectorComponent,
		UserSelectorComponent
	],
	exports: [
		SelectorComponent,
		SelectorPlaceholderComponent,
		CdkOverlayComponent
	]
})
export class SelectorsModule { }
