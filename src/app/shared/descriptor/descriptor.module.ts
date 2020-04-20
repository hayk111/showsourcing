import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import { DynamicEditableFieldComponent } from './components/dynamic-editable-field/dynamic-editable-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';
import { EditableModule } from '~shared/editable';
import { EditablePackagingComponent } from '~shared/dynamic-forms';

@NgModule({
	declarations: [
		DynamicFormComponent,
		DynamicFieldComponent,
		DynamicEditableFieldComponent,
	],
	exports: [
		DynamicFormComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		InputsModule,
		EditableModule,
	]
})
export class DescriptorModule { }
