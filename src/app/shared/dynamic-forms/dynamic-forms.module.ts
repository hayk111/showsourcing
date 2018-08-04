import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';

import { DynamicFormComponent } from '~shared/dynamic-forms/components/dynamic-form/dynamic-form.component';
import { DynamicEditableFormComponent } from '~shared/dynamic-forms/components/dynamic-editable-form/dynamic-editable-form.component';
import { DynamicFormsService } from '~shared/dynamic-forms/services/dynamic-forms.service';
import { DynamicFormFieldComponent } from '~shared/dynamic-forms/components/dynamic-form-field/dynamic-form-field.component';
import { DynamicEditableTextComponent } from '~shared/dynamic-forms/components/dynamic-editable-text/dynamic-editable-text.component';
import { EditableFieldModule } from '~shared/editable-field';
import { FieldCellComponent } from '~shared/dynamic-forms/components/field-cell/field-cell.component';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { BadgeModule } from '~shared/badge';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { UtilsModule } from '~shared/utils';
import { FileModule } from '~shared/file';
import {
	EditablePriceMatrixComponent
} from '~shared/dynamic-forms/components/dynamic-editable-text/inputs/editable-price-matrix/editable-price-matrix.component';
import {
	EditablePriceMatrixRowComponent
} from './components/dynamic-editable-text/inputs/editable-price-matrix/editable-price-matrix-row/editable-price-matrix-row.component';
import {
	EditablePriceComponent
} from './components/dynamic-editable-text/inputs/editable-price/editable-price.component';
import {
	EditablePackagingComponent
} from './components/dynamic-editable-text/inputs/editable-packaging/editable-packaging.component';
import {
	EditableSelectorComponent
} from './components/dynamic-editable-text/inputs/editable-selector/editable-selector.component';
import {
	DynamicInputTextComponent
} from './components/dynamic-input-text/dynamic-input-text.component';
import {
	InputPackagingComponent
} from './components/dynamic-input-text/inputs/input-packaging/input-packaging.component';
import { ImageModule } from '~shared/image/image.module';

import { NgSelectModule } from '@ng-select/ng-select';

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
		NgSelectModule
	],
	declarations: [
		DynamicFormComponent,
		DynamicEditableFormComponent,
		DynamicFormFieldComponent,
		DynamicEditableTextComponent,
		FieldCellComponent,
		EditablePriceMatrixComponent,
		EditablePriceMatrixRowComponent,
		EditablePriceComponent,
		EditablePackagingComponent,
		EditableSelectorComponent,
		DynamicInputTextComponent,
		InputPackagingComponent
	],
	exports: [DynamicFormComponent, DynamicEditableFormComponent]
})
export class DynamicFormsModule {


}
