import { NgModule } from '@angular/core';
import {
	ControllerTableComponent,
	ControllerTableContentComponent,
	ControllerTableViewSwitcherComponent,
	ControllerTableQuickFiltersComponent,
	ControllerTableQuickActionsComponent

} from './components';
import { FilterService } from '../../core/filters/filter.service';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { CommonModule } from '@angular/common';
import { DividerModule } from '~shared/divider/divider.module';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '~shared/utils';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';

@NgModule({
	imports: [
		CommonModule,
		SearchBarModule,
		DividerModule,
		TranslateModule,
		IconsModule,
		InputsModule,
		ReactiveFormsModule,
		UtilsModule,
		ContextMenuModule
	],
	declarations: [
		ControllerTableComponent,
		ControllerTableContentComponent,
		ControllerTableViewSwitcherComponent,
		ControllerTableQuickFiltersComponent,
		ControllerTableQuickActionsComponent
	],
	exports: [
		ControllerTableComponent,
		ControllerTableContentComponent,
		ControllerTableViewSwitcherComponent,
		ControllerTableQuickFiltersComponent,
		ControllerTableQuickActionsComponent
	]
})
export class ControllerTableModule { }
