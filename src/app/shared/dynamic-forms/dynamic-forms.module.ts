import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormsService } from './services/dynamic-forms.service';
import { DynamicFormFieldComponent } from './components/dynamic-form-field/dynamic-form-field.component';
import { DynamicEditableTextComponent } from './components/dynamic-editable-text/dynamic-editable-text.component';
import { EditableFieldModule } from '~shared/editable-field';
import { FieldCellComponent } from './components/field-cell/field-cell.component';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { TagModule } from '~shared/tag';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { UtilsModule } from '~shared/utils';
import { FileModule } from '~shared/file';
import {
	EditablePriceMatrixComponent
} from './components/dynamic-editable-text/inputs/editable-price-matrix/editable-price-matrix.component';
import {
	EditablePriceMatrixRowComponent
} from './components/dynamic-editable-text/inputs/editable-price-matrix/editable-price-matrix-row/editable-price-matrix-row.component';
import { EditablePriceComponent } from './components/dynamic-editable-text/inputs/editable-price/editable-price.component';
import { EditablePackagingComponent } from './components/dynamic-editable-text/inputs/editable-packaging/editable-packaging.component';
import { EditableSelectorComponent } from './components/dynamic-editable-text/inputs/editable-selector/editable-selector.component';
import { ImageModule } from '~shared/image/image.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		InputsModule,
		InputsCustomModule,
		EditableFieldModule,
		SelectorsModule,
		TagModule, // for displaying multiple values
		UtilsModule,
		FileModule,
		ImageModule
	],
	declarations: [
		DynamicFormComponent,
		DynamicFormFieldComponent,
		DynamicEditableTextComponent,
		FieldCellComponent,
		EditablePriceMatrixComponent,
		EditablePriceMatrixRowComponent,
		EditablePriceComponent,
		EditablePackagingComponent,
		EditableSelectorComponent
	],
	exports: [DynamicFormComponent]
})
export class DynamicFormsModule {


}
