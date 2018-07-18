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
	RestrictInputDirective
} from '~shared/inputs/components-directives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from '~shared/inputs/components-directives/error/error.component';
import { LabelComponent } from '~shared/inputs/components-directives/label/label.component';
import { HintComponent } from '~shared/inputs/components-directives/hint/hint.component';
import { TextareaAutoGrowsDirective } from '~shared/inputs/components-directives/textarea-auto-grows.directive';

export const components = [
	FormFieldComponent,
	InputDirective,
	CheckboxComponent,
	RestrictInputDirective,
	LabelComponent,
	HintComponent,
	ErrorComponent,
	TextareaAutoGrowsDirective
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
