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
import { SelectModule } from '../select/select.module';
import { FeedbackModule } from '../feedback/feedback.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputsModule,
		SelectModule,
		FeedbackModule,
	],
	providers: [ DynamicFormsService ],
	declarations: [ DynamicFormComponent, DynamicInputComponent ],
	exports: [ DynamicFormComponent ]
})
export class DynamicFormsModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DynamicFormsModule,
			providers: [ DynamicFormComponent ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: DynamicFormsModule
		};
	}
}
