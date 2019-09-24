import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from '~shared/badge';
import { CardModule } from '~shared/card';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DividerModule } from '~shared/divider/divider.module';
import { EditableFieldModule } from '~shared/editable-field';
import { FiltersModule } from '~shared/filters/filters.module';
import { IconsModule } from '~shared/icons';
import { ListModule } from '~shared/list/list.module';
import { LoadersModule } from '~shared/loaders';
import { RatingModule } from '~shared/rating';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { BreadCrumbComponent } from '~shared/top-panel/components/bread-crumb/bread-crumb.component';
import { SubPanelComponent } from '~shared/top-panel/components/sub-panel/sub-panel.component';
import { TopPanelComponent } from '~shared/top-panel/components/top-panel/top-panel.component';
import { ViewSwitcherComponent } from '~shared/top-panel/components/view-switcher/view-switcher.component';
import { UserPictureModule } from '~shared/user-picture/user-picture.module';
import { UtilsModule } from '~shared/utils';
import { TranslateModule } from '@ngx-translate/core';
import { InputsModule } from '~shared/inputs';

import { SubPanelLeftItemComponent } from './components/sub-panel-left-item/sub-panel-left-item.component';
import { SubPanelRightItemComponent } from './components/sub-panel-right-item/sub-panel-right-item.component';
import { TopPanelActionButtonsComponent } from './components/top-panel-action-buttons/top-panel-action-buttons.component';
import { TopPanelDetailsComponent } from './components/top-panel-details/top-panel-details.component';
import { PanelTabComponent} from './components/panel-tab/panel-tab.component';


@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		ReactiveFormsModule,
		RouterModule.forChild([]),
		BadgeModule,
		CardModule,
		ContextMenuModule,
		DividerModule,
		EditableFieldModule,
		FiltersModule,
		FormsModule,
		IconsModule,
		ListModule,
		LoadersModule,
		RatingModule,
		SearchAutocompleteModule,
		SearchBarModule,
		SelectorsModule,
		UserPictureModule,
		UtilsModule,
		TranslateModule
	],
	declarations: [
		TopPanelComponent,
		SubPanelComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
		TopPanelDetailsComponent,
		SubPanelLeftItemComponent,
		SubPanelRightItemComponent,
		TopPanelActionButtonsComponent,
		TopPanelActionButtonsComponent,
		PanelTabComponent,
	],
	exports: [
		TopPanelComponent,
		SubPanelComponent,
		BreadCrumbComponent,
		TopPanelDetailsComponent,
		SubPanelLeftItemComponent,
		SubPanelRightItemComponent,
		TopPanelActionButtonsComponent,
		PanelTabComponent
	],
})
export class TopPanelModule { }
