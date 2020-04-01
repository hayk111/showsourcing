import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { SectionComponent } from './components/section/section.component';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import { DynamicEditableFieldComponent } from './components/dynamic-editable-field/dynamic-editable-field.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [DynamicFormComponent, SectionComponent, DynamicFieldComponent, DynamicEditableFieldComponent],
	imports: [
		CommonModule,
		FormsModule
	]
})
export class DescriptorModule { }
