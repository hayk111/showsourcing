import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormGroupComponent } from './components/dynamic-form-group/dynamic-form-group.component';
import { DynamicFormControlComponent } from './components/dynamic-form-control/dynamic-form-control.component';
import { FormBuilderService } from './services/form-builder.service';
import { InputMap } from './interfaces/input-map.interface';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
	],
	declarations: [ DynamicFormGroupComponent, DynamicFormControlComponent ],
	exports: [ DynamicFormGroupComponent, DynamicFormControlComponent ]
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
