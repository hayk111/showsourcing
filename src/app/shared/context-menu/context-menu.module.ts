import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MenuTriggerComponent } from './components/menu-trigger/menu-trigger.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ContextMenuComponent, MenuTriggerComponent],
	exports: [ContextMenuComponent, MenuTriggerComponent]
})
export class ContextMenuModule { }
