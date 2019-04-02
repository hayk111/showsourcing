import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomPanelComponent } from './components';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		BottomPanelComponent
	],
	exports: [
		BottomPanelComponent
	],
})
export class BottomPanelModule { }
