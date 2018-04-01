import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconsModule } from '~app/shared/icons';
import { EntityModule } from '~entity/entity.module';

import { UtilsModule } from '../utils/utils.module';
import {
	CheckboxComponent,
	FormFieldComponent,
	InputDirective,
	LabelDirective,
	RestrictInputDirective
} from '~app/shared/inputs/components-directives';
import { HintDirective } from '~app/shared/inputs/components-directives/hint.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectorComponent } from '~app/shared/inputs/components-directives/selector/selector.component';

export const components = [
	FormFieldComponent,
	InputDirective,
	LabelDirective,
	CheckboxComponent,
	SelectorComponent,
	RestrictInputDirective,
	HintDirective
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UtilsModule,
		EntityModule.forChild(),
		IconsModule,
		NgSelectModule
	],
	declarations: components,
	// entryComponents: components,
	exports: components,
})
export class InputsModule { }
