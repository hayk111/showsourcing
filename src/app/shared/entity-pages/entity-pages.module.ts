import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPageComponent } from '~shared/entity-pages/components/entity-page/entity-page.component';
import { TopPanelComponent } from '~shared/entity-pages/components/entity-page/top-panel/top-panel.component';
import { ViewSwitcherComponent } from '~shared/entity-pages/components/entity-page/view-switcher/view-switcher.component';
import { FiltersModule } from '~shared/filters/filters.module';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { DividerModule } from '~shared/divider/divider.module';

@NgModule({
	imports: [
		CommonModule,
		FiltersModule.forChild(),
		IconsModule,
		LoadersModule,
		RouterModule.forChild([]),
		CardModule,
		DividerModule
	],
	declarations: [
		EntityPageComponent,
		TopPanelComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
	],
	exports: [EntityPageComponent, TopPanelComponent, BreadCrumbComponent],
})
export class EntityPagesModule { }
