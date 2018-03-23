import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputsModule } from '../inputs/inputs.module';
import { UtilsModule } from '../utils/utils.module';
import { InputSelectEntityComponent } from './components/input-select-entity/input-select-entity.component';
import { InputSelectMultiComponent } from './components/input-select-multi/input-select-multi.component';
import { InputSelectOneComponent } from './components/input-select-one/input-select-one.component';
import { SearchableListComponent } from './components/searchable-list/searchable-list.component';

@NgModule({
	imports: [CommonModule, InputsModule, ReactiveFormsModule, UtilsModule],
	declarations: [
		InputSelectOneComponent,
		InputSelectEntityComponent,
		InputSelectMultiComponent,
		SearchableListComponent,
	],
	exports: [InputSelectOneComponent, InputSelectEntityComponent, InputSelectMultiComponent],
})
export class SelectModule {}
