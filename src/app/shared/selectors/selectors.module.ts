import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputsModule } from '~shared/inputs/inputs.module';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { UtilsModule } from '~shared/utils';

const components = [
	SelectorComponent,
	SelectorEntityComponent,
	SelectorConstComponent
];

@NgModule({
	imports: [
		CommonModule,
		NgSelectModule,
		FormsModule,
		InputsModule,
		UtilsModule, // to use image pipe to display the small images in the selectors
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
