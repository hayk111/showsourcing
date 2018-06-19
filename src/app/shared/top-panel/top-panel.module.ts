import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { SubPanelComponent } from './components/sub-panel/sub-panel.component';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
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
		TopPanelComponent,
		SubPanelComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
	],
	exports: [TopPanelComponent, SubPanelComponent, BreadCrumbComponent],
})
export class TopPanelModule { }
