import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { FilterBtnsPanelComponent } from './components/filter-btns-panel/filter-btns-panel.component';
import { FilterBtnComponent } from './components/filter-btn/filter-btn.component';
import { FilterEntityPanelComponent } from './components/filter-entity-panel/filter-entity-panel.component';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
	imports: [
		CommonModule,
		InputsModule
	],
	declarations: [
		FilterPanelComponent,
		FilterBtnsPanelComponent,
		FilterBtnComponent,
		FilterEntityPanelComponent ],
	exports: [ FilterPanelComponent ]
})
export class Filters2Module { }
