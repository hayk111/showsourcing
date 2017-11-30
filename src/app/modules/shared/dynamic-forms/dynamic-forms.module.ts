import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormGroupComponent } from './components/dynamic-form-group/dynamic-form-group.component';
import { DynamicFormControlComponent } from './components/dynamic-form-control/dynamic-form-control.component';
import { DynamicFormsService } from './services/dynamic-forms.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { InputMap } from './utils/input-map.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';
import { DynamicFormControl } from './utils/dynamic-controls.class';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		// TODO: remove this when not used anymore
		InputsModule
		//
	],
	providers: [ DynamicFormsService ],
	declarations: [ DynamicFormGroupComponent, DynamicFormControlComponent ],
	exports: [ DynamicFormGroupComponent ]
})
export class DynamicFormsModule {

	static forRoot(inputMap: InputMap): ModuleWithProviders {
		return {
			ngModule: DynamicFormsModule,
			providers: [ DynamicFormsService, , { provide: 'inputMap', useValue: inputMap } ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: DynamicFormsModule
		};
	}
}
