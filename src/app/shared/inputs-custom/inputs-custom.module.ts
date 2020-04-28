import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge';
import { EditableModule } from '~shared/editable';
import { ERMModule } from '~shared/erm/erm.module';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { LogoModule } from '~shared/logo';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';
import {
	BadgeSelectorComponent, InputPriceComponent, InputDescriptionComponent,
	InputBadgeSelectorComponent, SelectCheckboxComponent,
	InputPackagingComponent, InputPriceMatrixComponent,
	EditablePriceMatrixComponent,
	EditablePackagingComponent
} from './components';


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
		InputDescriptionComponent,
		InputBadgeSelectorComponent,
		SelectCheckboxComponent,
		InputPriceComponent,
		InputPackagingComponent,
		InputPriceMatrixComponent,
		InputPriceComponent,
		EditablePriceMatrixComponent,
		EditablePackagingComponent
	],
	exports: [
		BadgeSelectorComponent,
		InputPriceComponent,
		InputDescriptionComponent,
		InputBadgeSelectorComponent,
		SelectCheckboxComponent,
		InputPriceComponent,
		InputPackagingComponent,
		InputPriceMatrixComponent,
		EditablePriceMatrixComponent,
		EditablePackagingComponent
	]
})
export class InputsCustomModule { }
