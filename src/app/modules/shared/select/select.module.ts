import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectOneComponent } from './components/input-select-one/input-select-one.component';
import { InputSelectEntityComponent } from './components/input-select-entity/input-select-entity.component';
import { InputSelectMultiComponent } from './components/input-select-multi/input-select-multi.component';
import { SearchableListComponent } from './components/searchable-list/searchable-list.component';
import { InputsModule } from '../inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		ReactiveFormsModule,
		MatIconModule,
		UtilsModule
	],
	declarations: [ InputSelectOneComponent, InputSelectEntityComponent, InputSelectMultiComponent, SearchableListComponent ],
	exports: [ InputSelectOneComponent, InputSelectEntityComponent, InputSelectMultiComponent ]
})
export class SelectModule { }
