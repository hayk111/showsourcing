import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormControlComponent } from './components/dynamic-form-control/dynamic-form-control.component';
import { FormBuilderService } from './services/form-builder.service';
import { InputMap } from './interfaces/input-map.interface';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputsModule
	],
	declarations: [ DynamicFormComponent, DynamicFormControlComponent, DynamicInputComponent ],
	entryComponents: [ DynamicInputComponent ],
	exports: [ DynamicFormComponent, DynamicFormControlComponent, DynamicInputComponent ]
})
export class FormBuilderModule {

	static forRoot(inp: InputMap): ModuleWithProviders {
		return {
			ngModule: FormBuilderModule,
			providers: [ FormBuilderService, { provide: 'inputMap', useValue: inp } ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: FormBuilderModule
		};
	}
}
