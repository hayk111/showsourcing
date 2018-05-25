import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { InputsModule } from '~shared/inputs';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';

const components = [
	SelectorComponent,
	SelectorEntityComponent,
	SelectorConstComponent
]

@NgModule({
	imports: [
		CommonModule,
		NgSelectModule,
		FormsModule,
		InputsModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
