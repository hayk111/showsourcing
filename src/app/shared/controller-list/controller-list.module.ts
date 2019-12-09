import { NgModule } from '@angular/core';
import {
	ControllerListComponent,
	ControllerListActionsComponent,
	ViewSwitcherComponent
} from './components';


@NgModule({
	imports: [
	],
	declarations: [
		ControllerListComponent,
		ControllerListActionsComponent,
		ViewSwitcherComponent
	],
	exports: []
})
export class ControllerListModule { }
