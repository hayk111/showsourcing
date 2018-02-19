import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPageComponent } from './components/entity-page/entity-page.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { SwitchModule } from '../switch/switch.module';
import { FilterSearchBarModule } from '../filter-search-bar/filter-search-bar.module';
import { LoadersModule } from '../loaders/loaders.module';


// template for the main pages (suppliers, product, tasks, etc.)
@NgModule({
  imports: [
		CommonModule,
		SwitchModule,
		FilterSearchBarModule,
		LoadersModule
  ],
	declarations: [ EntityPageComponent, TopPanelComponent ],
	exports: [ EntityPageComponent ]
})
export class EntityPageModule { }
