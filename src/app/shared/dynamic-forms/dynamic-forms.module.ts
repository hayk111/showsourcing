import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormsService } from './services/dynamic-forms.service';
import { DynamicFormFieldComponent } from './components/dynamic-form-field/dynamic-form-field.component';
import { DynamicEditableTextComponent } from './components/dynamic-editable-text/dynamic-editable-text.component';
import { EditableFieldModule } from '~shared/editable-field';
import { FieldCellComponent } from './components/field-cell/field-cell.component';
import { SelectorsModule } from '~shared/selectors/selectors.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputsModule,
		EditableFieldModule,
		SelectorsModule
	],
	providers: [DynamicFormsService],
	declarations: [DynamicFormComponent, DynamicFormFieldComponent, DynamicEditableTextComponent, FieldCellComponent],
	exports: [DynamicFormComponent]
})
export class DynamicFormsModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DynamicFormsModule,
			providers: [DynamicFormComponent]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: DynamicFormsModule
		};
	}
}
