import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge';
import { EditableModule } from '~shared/editable';
import { ERMModule } from '~shared/erm/erm.module';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { InputPriceComponent } from '~shared/inputs-custom/components/_deprecated_input-price/input-price.component';
import { LogoModule } from '~shared/logo';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';

import { BadgeSelectorComponent } from './components/badge-selector/badge-selector.component';
import { InputBadgeSelectorComponent } from './components/input-badge-selector/input-badge-selector.component';
import { InputDescriptionComponent } from './components/input-description/input-description.component';
import { InputPriceInlineComponent } from './components/input-price-inline/input-price-inline.component';
import { SelectCheckboxComponent } from './components/select-checkbox/select-checkbox.component';
import { InputPackagingComponent } from './components-directives/input-packaging/input-packaging.component';
import { InputPriceMatrixComponent } from './components/input-price-matrix/input-price-matrix.component';

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
		EditableModule,
		ERMModule,
		BadgeModule,
		TranslateModule
	],
	declarations: [
		BadgeSelectorComponent,
		InputPriceComponent,
		InputPriceInlineComponent,
		InputDescriptionComponent,
		InputBadgeSelectorComponent,
		SelectCheckboxComponent,
		InputPackagingComponent,
		InputPriceComponent,
		InputPackagingComponent,
		InputPriceMatrixComponent,
	],
	exports: [
		BadgeSelectorComponent,
		InputPriceComponent,
		InputPriceInlineComponent,
		InputDescriptionComponent,
		InputBadgeSelectorComponent,
		SelectCheckboxComponent
	]
})
export class InputsCustomModule { }
