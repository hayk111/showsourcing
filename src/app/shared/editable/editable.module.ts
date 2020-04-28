import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge/badge.module';
import { IconsModule } from '~shared/icons/icons.module';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils/utils.module';
import {
	EditableActionsComponent, EditableContainerComponent,
	EditableField2Component, EditableFieldComponent,
	EditableLabelComponent, EditableValueComponent, EditablePriceMatrixComponent, EditablePackaging2Component
} from './components';
import { PriceModule } from '~shared/price';
import { PackagingModule } from '~shared/packaging/packaging.module';



// text where when it is clicked an input appears
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		InputsModule,
		IconsModule,
		SelectorsModule,
		BadgeModule, // used to display a badge in the status selector
		UtilsModule, // click outside directive used
		ImageModule,
		TranslateModule,
	],
	declarations: [
		EditableContainerComponent,
		EditableFieldComponent,
		EditableField2Component,
		EditableValueComponent,
		EditableActionsComponent,
		EditableLabelComponent,
		EditablePriceMatrixComponent,
		EditablePackaging2Component
	],
	exports: [
		EditableContainerComponent,
		EditableFieldComponent,
		EditableField2Component,
		EditableValueComponent,
		EditableLabelComponent,
		EditablePriceMatrixComponent,
		EditablePackaging2Component
	],
})
export class EditableModule { }