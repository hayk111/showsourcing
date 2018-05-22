import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';

const components = [
	SelectorComponent,
	SelectorEntityComponent
]

@NgModule({
	imports: [
		CommonModule,
		NgSelectModule,
		FormsModule
	],
	declarations: components,
	exports: components
})
export class SelectorsModule { }
