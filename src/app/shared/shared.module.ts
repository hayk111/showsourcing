import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatchModule, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge';
import { CardModule } from '~shared/card';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DividerModule } from '~shared/divider/divider.module';
import { EditableFieldModule } from '~shared/editable-field';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { ListModule } from '~shared/list/list.module';
import { LoadersModule } from '~shared/loaders';
import { PanelModule } from '~shared/panel/panel.module';
import { PriceModule } from '~shared/price';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';

import { ActionBarModule } from './action-bar/action-bar.module';
import { AnimatedStackModule } from './animated-stack/animated-stack.module';
import { CarouselModule } from './carousel/carousel.module';
import { DialogModule } from './dialog/dialog.module';
import { DynamicFormsModule } from './dynamic-forms/dynamic-forms.module';
import { FileModule } from './file/file.module';
import { FiltersModule } from './filters/filters.module';
import { InputsCustomModule } from './inputs-custom/inputs-custom.module';
import { KanbanModule } from './kanban/kanban.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PreviewModule } from './preview/preview.module';
import { RatingModule } from './rating/rating.module';
import { SearchAutocompleteModule } from './search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from './search-bar-animated/search-bar.module';
import { SelectionBarModule } from './selection-bar/selection-bar.module';
import { SideMenuModule } from './side-menu/side-menu.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { StageIndicatorModule } from './stage-indicator/stage-indicator.module';
import { StatusSelectorModule } from './status-selector/status-selector.module';
import { TableModule } from './table/table.module';
import { TopPanelModule } from './top-panel/top-panel.module';
import { BottomPanelModule } from './bottom-panel';

// those modules are used so commonly that we will just import the shared module
const modules = [
	// angular modules
	CommonModule,
	ReactiveFormsModule,

	// cdk modules
	DragDropModule,
	OverlayModule,
	ScrollDispatchModule,
	ScrollingModule,

	// shared modules
	ActionBarModule,
	AnimatedStackModule,
	BadgeModule,
	BottomPanelModule,
	CardModule,
	CarouselModule,
	ContextMenuModule,
	DialogModule,
	DividerModule,
	DynamicFormsModule,
	EditableFieldModule,
	FileModule,
	FiltersModule,
	IconsModule,
	ImageModule,
	InputsCustomModule,
	InputsModule,
	KanbanModule,
	ListModule,
	LoadersModule,
	NotificationsModule,
	PanelModule,
	PreviewModule,
	PriceModule,
	RatingModule,
	SearchAutocompleteModule,
	SearchBarModule,
	SelectionBarModule,
	SelectorsModule,
	SideMenuModule, // TODO: not used but the alternative sidenav isn't great
	SidenavModule,
	StageIndicatorModule,
	StatusSelectorModule,
	TableModule,
	TopPanelModule,
	UserPictureModule,
	UtilsModule,
];

@NgModule({
	declarations: [],
	exports: modules,
	imports: modules,
	providers: [DatePipe]
})
export class SharedModule { }
