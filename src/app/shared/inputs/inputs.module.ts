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
	ErrorComponent,
	HintComponent,
	LabelComponent,
	TextareaAutoGrowsDirective,
	FormFieldControlDirective,
	FocusableDirective
} from '~shared/inputs/components-directives';
import { UtilsModule } from '~shared/utils';


export const components = [
	FormFieldComponent,
	// TODO, we need to see if this one is needed,
	// maybe input directive is enough
	FormFieldControlDirective,
	InputDirective,
	FocusableDirective,
	CheckboxComponent,
	RestrictInputDirective,
	RestrictSpecialInputDirective,
	LabelComponent,
	HintComponent,
	ErrorComponent,
	TextareaAutoGrowsDirective,


	RadioComponent,

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
