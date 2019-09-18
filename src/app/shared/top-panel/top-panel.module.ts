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
import { ControllerListComponent } from '~shared/top-panel/components/controller-list/controller-list.component';
import { HeaderListComponent } from '~shared/top-panel/components/header-list/header-list.component';
import { ViewSwitcherComponent } from '~shared/top-panel/components/view-switcher/view-switcher.component';
import { UserPictureModule } from '~shared/user-picture/user-picture.module';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
import { ControllerListLeftItemComponent } from './components/controller-list-left-item/controller-list-left-item.component';
import { ControllerListRightItemComponent } from './components/controller-list-right-item/controller-list-right-item.component';
import { HeaderListActionButtonsComponent } from './components/header-list-action-buttons/header-list-action-buttons.component';
import { HeaderDetailsComponent } from './components/header-details/header-details.component';
import { HeaderDetailsTitleComponent } from './components/header-details-title/header-details-title.component';
import { HeaderDetailsInfoComponent } from './components/header-details-info/header-details-info.component';

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
		UtilsModule
	],
	declarations: [
		HeaderListComponent,
		ControllerListComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
		HeaderDetailsComponent,
		HeaderDetailsTitleComponent,
		ControllerListLeftItemComponent,
		ControllerListRightItemComponent,
		HeaderListActionButtonsComponent,
		HeaderDetailsInfoComponent
	],
	exports: [
		HeaderListComponent,
		ControllerListComponent,
		BreadCrumbComponent,
		HeaderDetailsComponent,
		HeaderDetailsTitleComponent,
		ControllerListLeftItemComponent,
		ControllerListRightItemComponent,
		HeaderListActionButtonsComponent,
		HeaderDetailsInfoComponent
	],
})
export class TopPanelModule { }
