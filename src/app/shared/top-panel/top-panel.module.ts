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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { EditableFieldModule } from '~shared/editable-field';
import { SubPanelLeftItemComponent } from './components/sub-panel-left-item/sub-panel-left-item.component';

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
		EditableFieldModule
	],
	declarations: [
		TopPanelComponent,
		SubPanelComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
		TopPanelDetailsComponent,
		SubPanelLeftItemComponent,
	],
	exports: [
		TopPanelComponent,
		SubPanelComponent,
		BreadCrumbComponent,
		TopPanelDetailsComponent,
		SubPanelLeftItemComponent
	],
})
export class TopPanelModule { }
