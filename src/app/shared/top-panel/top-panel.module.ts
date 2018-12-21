import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DividerModule } from '~shared/divider/divider.module';
import { EditableFieldModule } from '~shared/editable-field';
import { FiltersModule } from '~shared/filters/filters.module';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { BreadCrumbComponent } from '~shared/top-panel/components/bread-crumb/bread-crumb.component';
import { SubPanelComponent } from '~shared/top-panel/components/sub-panel/sub-panel.component';
import { TopPanelComponent } from '~shared/top-panel/components/top-panel/top-panel.component';
import { ViewSwitcherComponent } from '~shared/top-panel/components/view-switcher/view-switcher.component';

import { SubPanelLeftItemComponent } from './components/sub-panel-left-item/sub-panel-left-item.component';
import { SubPanelRightItemComponent } from './components/sub-panel-right-item/sub-panel-right-item.component';
import { TopPanelDetailsComponent } from './components/top-panel-details/top-panel-details.component';
import { ListModule } from '~shared/list/list.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild([]),
		SearchBarModule,
		FiltersModule,
		IconsModule,
		LoadersModule,
		CardModule,
		DividerModule,
		SearchAutocompleteModule,
		FormsModule,
		ContextMenuModule,
		ListModule,
		EditableFieldModule
	],
	declarations: [
		TopPanelComponent,
		SubPanelComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
		TopPanelDetailsComponent,
		SubPanelLeftItemComponent,
		SubPanelRightItemComponent,
	],
	exports: [
		TopPanelComponent,
		SubPanelComponent,
		BreadCrumbComponent,
		TopPanelDetailsComponent,
		SubPanelLeftItemComponent,
		SubPanelRightItemComponent
	],
})
export class TopPanelModule { }
