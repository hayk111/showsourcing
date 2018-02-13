import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';

@NgModule({
  imports: [
    CommonModule
  ],
	declarations: [ ViewSwitcherComponent ],
	exports: [
		ViewSwitcherComponent
	]
})
export class SwitchModule { }
