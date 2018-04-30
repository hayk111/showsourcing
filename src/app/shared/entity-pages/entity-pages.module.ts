import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPageComponent } from '~app/shared/entity-pages/components/entity-page/entity-page.component';
import { TopPanelComponent } from '~app/shared/entity-pages/components/entity-page/top-panel/top-panel.component';
import { ViewSwitcherComponent } from '~app/shared/entity-pages/components/entity-page/view-switcher/view-switcher.component';
import { FiltersModule } from '~app/shared/filters/filters.module';
import { IconsModule } from '~app/shared/icons';
import { LoadersModule } from '~app/shared/loaders';
import { RouterModule } from '@angular/router';
import { CardModule } from '~app/shared/card';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { DividerModule } from '~app/shared/divider/divider.module';

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
