import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormsService } from './services/dynamic-forms.service';
import { ModuleWithProviders } from '@angular/core';
import { InputMap } from './utils/input-map.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';
import { DynamicFormControl } from './utils/dynamic-controls.class';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputsModule
	],
	providers: [ DynamicFormsService ],
	declarations: [ DynamicFormComponent, DynamicInputComponent ],
})
export class DynamicFormsModule {

}
