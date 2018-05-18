import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconsModule } from '~shared/icons';

import { UtilsModule } from '../utils/utils.module';
import {
	CheckboxComponent,
	FormFieldComponent,
	InputDirective,
	LabelDirective,
	RestrictInputDirective
} from '~shared/inputs/components-directives';
import { HintDirective } from '~shared/inputs/components-directives/hint.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDirective } from '~shared/inputs/components-directives/error.directive';

export const components = [
	FormFieldComponent,
	InputDirective,
	LabelDirective,
	CheckboxComponent,
	RestrictInputDirective,
	HintDirective,
	ErrorDirective
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UtilsModule,
		IconsModule,
	],
	declarations: components,
	// entryComponents: components,
	exports: components,
})
export class InputsModule { }
