import { NgModule } from '@angular/core';
import {
	ControllerListComponent,
	ControllerListActionsComponent,
	ViewSwitcherComponent
} from './components';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { CommonModule } from '@angular/common';
import { DividerModule } from '~shared/divider/divider.module';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		SearchBarModule,
		DividerModule,
		TranslateModule,
		IconsModule,
		InputsModule,
		ReactiveFormsModule
	],
	declarations: [
		ControllerListComponent,
		ControllerListActionsComponent,
		ViewSwitcherComponent
	],
	exports: []
})
export class ControllerListModule { }
