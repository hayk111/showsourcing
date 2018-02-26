import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPageComponent } from './components/entity-page/entity-page.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { LoadersModule } from '../loaders/loaders.module';
import { ViewSwitcherComponent } from './components';
import { FiltersModule } from '~shared/filters';

// template for the main pages (suppliers, product, tasks, etc.)
@NgModule({
  imports: [
		CommonModule,
		FiltersModule,
		LoadersModule
  ],
	declarations: [ EntityPageComponent, TopPanelComponent, ViewSwitcherComponent ],
	exports: [ EntityPageComponent ]
})
export class EntityPageModule {}
