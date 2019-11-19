import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge';
import { EditableFieldModule } from '~shared/editable-field';
import { ERMModule } from '~shared/erm/erm.module';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { InputPriceComponent } from '~shared/inputs-custom/components/input-price/input-price.component';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';

import { BadgeSelectorComponent } from './components/badge-selector/badge-selector.component';
import { InputBadgeSelectorComponent } from './components/input-badge-selector/input-badge-selector.component';
import { InputDescriptionComponent } from './components/input-description/input-description.component';
import { InputPriceInlineComponent } from './components/input-price-inline/input-price-inline.component';
import { LogoModule } from '~shared/logo';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectorsModule,
		IconsModule,
		LogoModule,
		UtilsModule,
		InputsModule,
		EditableFieldModule,
		ERMModule,
		BadgeModule,
		TranslateModule
	],
	declarations: [
		BadgeSelectorComponent,
		InputPriceComponent,
		InputPriceInlineComponent,
		InputDescriptionComponent,
		InputBadgeSelectorComponent
	],
	exports: [
		BadgeSelectorComponent,
		InputPriceComponent,
		InputPriceInlineComponent,
		InputDescriptionComponent,
		InputBadgeSelectorComponent
	]
})
export class InputsCustomModule { }
