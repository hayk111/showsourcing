import { NgModule } from '@angular/core';
import {
	ControllerListComponent,
	ControllerListActionsComponent,
	ControllerListViewSwitcherComponent,
	ControllerListQuickFiltersComponent,
	ControllerListQuickActionsComponent

} from './components';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { CommonModule } from '@angular/common';
import { DividerModule } from '~shared/divider/divider.module';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '~shared/utils';

@NgModule({
	imports: [
		CommonModule,
		SearchBarModule,
		DividerModule,
		TranslateModule,
		IconsModule,
		InputsModule,
		ReactiveFormsModule,
		UtilsModule
	],
	declarations: [
		ControllerListComponent,
		ControllerListActionsComponent,
		ControllerListViewSwitcherComponent,
		ControllerListQuickFiltersComponent,
		ControllerListQuickActionsComponent
	],
	exports: [
		ControllerListComponent,
		ControllerListViewSwitcherComponent,
		ControllerListQuickFiltersComponent,
		ControllerListQuickActionsComponent
	]
})
export class ControllerListModule { }
