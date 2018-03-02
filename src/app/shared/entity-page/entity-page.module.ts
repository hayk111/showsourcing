import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FiltersModule } from '~shared/filters';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';

import { EntityPageComponent, TopPanelComponent, ViewSwitcherComponent } from './components';

// template for the main pages (suppliers, product, tasks, etc.)
@NgModule({
	imports: [CommonModule, FiltersModule, LoadersModule, IconsModule],
	declarations: [EntityPageComponent, TopPanelComponent, ViewSwitcherComponent],
	exports: [EntityPageComponent],
})
export class EntityPageModule {}
