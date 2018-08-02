import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPanelComponent } from '~shared/top-panel/components/top-panel/top-panel.component';
import { SubPanelComponent } from '~shared/top-panel/components/sub-panel/sub-panel.component';
import { ViewSwitcherComponent } from '~shared/top-panel/components/view-switcher/view-switcher.component';
import { FiltersModule } from '~shared/filters/filters.module';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card';
import { BreadCrumbComponent } from '~shared/top-panel/components/bread-crumb/bread-crumb.component';
import { DividerModule } from '~shared/divider/divider.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SharedModule } from '~shared/shared.module';
import { TopPanelDetailsComponent } from './components/top-panel-details/top-panel-details.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		SearchBarModule,
		FiltersModule,
		IconsModule,
		LoadersModule,
		RouterModule.forChild([]),
		CardModule,
		DividerModule,
		SearchAutocompleteModule
	],
	declarations: [
		TopPanelComponent,
		SubPanelComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
		TopPanelDetailsComponent,
	],
	exports: [TopPanelComponent, SubPanelComponent, BreadCrumbComponent, TopPanelDetailsComponent],
})
export class TopPanelModule { }
