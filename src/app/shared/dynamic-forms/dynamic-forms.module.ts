import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';
import { RatingModule } from '~shared/rating';

import { DynamicFormComponent, DynamicFormEntityComponent, DynamicInputComponent } from './components';
import { DynamicFormsService } from './services';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputsModule,
		RatingModule,
	],
	providers: [DynamicFormsService],
	declarations: [DynamicFormComponent, DynamicInputComponent, DynamicFormEntityComponent],
	exports: [DynamicFormComponent, DynamicFormEntityComponent]
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
