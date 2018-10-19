import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BadgeModule } from '~shared/badge';
import {
	DynamicEditableFormComponent,
} from '~shared/dynamic-forms/components/dynamic-editable-form/dynamic-editable-form.component';
import {
	DynamicEditableTextComponent,
} from '~shared/dynamic-forms/components/dynamic-editable-text/dynamic-editable-text.component';
import {
	EditablePackagingComponent,
} from '~shared/dynamic-forms/components/dynamic-editable-text/inputs/editable-packaging/editable-packaging.component';
import {
	EditablePriceMatrixRowComponent,
} from './components/dynamic-editable-text/inputs/editable-price-matrix/editable-price-matrix-row/editable-price-matrix-row.component';
import {
	EditablePriceMatrixComponent,
} from '~shared/dynamic-forms/components/dynamic-editable-text/inputs/editable-price-matrix/editable-price-matrix.component';
import {
	EditablePriceComponent,
} from '~shared/dynamic-forms/components/dynamic-editable-text/inputs/editable-price/editable-price.component';
import { DynamicFormComponent } from '~shared/dynamic-forms/components/dynamic-form/dynamic-form.component';
import { EditableFieldModule } from '~shared/editable-field';
import { FileModule } from '~shared/file';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';

import {
	EditableSelectorComponent,
} from './components/dynamic-editable-text/inputs/editable-selector/editable-selector.component';
import { DynamicInputTextComponent } from './components/dynamic-input-text/dynamic-input-text.component';
import { InputPackagingComponent } from './components/dynamic-input-text/inputs/input-packaging/input-packaging.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		InputsModule,
		InputsCustomModule,
		EditableFieldModule,
		SelectorsModule,
		BadgeModule, // for displaying multiple values
		UtilsModule,
		FileModule,
		ImageModule,
		NgSelectModule,
		UserPictureModule
	],
	declarations: [
		DynamicFormComponent,
		DynamicEditableFormComponent,
		DynamicEditableTextComponent,
		EditablePriceMatrixComponent,
		EditablePriceMatrixRowComponent,
		EditablePriceComponent,
		EditablePackagingComponent,
		EditableSelectorComponent,
		DynamicInputTextComponent,
		InputPackagingComponent,
		DynamicInputComponent
	],
	exports: [DynamicFormComponent, DynamicEditableFormComponent]
})
export class DynamicFormsModule {


}
