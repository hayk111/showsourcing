import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '~shared/icons';
import {
	CheckboxComponent,
	FormFieldComponent,
	InputDirective,
	RadioComponent,
	RestrictInputDirective,
	RestrictSpecialInputDirective,
} from '~shared/inputs/components-directives';
import { ErrorComponent } from '~shared/inputs/components-directives/error/error.component';
import { FormFieldControlDirective } from '~shared/inputs/components-directives/form-field-control.directive';
import { HintComponent } from '~shared/inputs/components-directives/hint/hint.component';
import { LabelComponent } from '~shared/inputs/components-directives/label/label.component';
import { TextareaAutoGrowsDirective } from '~shared/inputs/components-directives/textarea-auto-grows.directive';
import { UtilsModule } from '~shared/utils/utils.module';

export const components = [
	FormFieldComponent,
	FormFieldControlDirective,
	InputDirective,
	CheckboxComponent,
	RestrictInputDirective,
	RestrictSpecialInputDirective,
	LabelComponent,
	HintComponent,
	ErrorComponent,
	TextareaAutoGrowsDirective,
	RadioComponent
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
