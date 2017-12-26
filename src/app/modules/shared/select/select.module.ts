import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectOneComponent } from './components/input-select-one/input-select-one.component';
import { InputSelectEntityComponent } from './components/input-select-entity/input-select-entity.component';
import { InputSelectMultiComponent } from './components/input-select-multi/input-select-multi.component';
import { SearchableListComponent } from './components/searchable-list/searchable-list.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ InputSelectOneComponent, InputSelectEntityComponent, InputSelectMultiComponent, SearchableListComponent ],
	exports: [ InputSelectOneComponent, InputSelectEntityComponent, InputSelectMultiComponent ]
})
export class SelectModule { }
