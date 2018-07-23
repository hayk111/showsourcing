import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { ContextMenuTriggerComponent } from '~shared/context-menu/components/context-menu-trigger/context-menu-trigger.component';
import { ContextMenuItemComponent } from '~shared/context-menu/components/context-menu-item/context-menu-item.component';
import { UtilsModule } from '~shared/utils';
import { ContextMenuDividerComponent } from '~shared/context-menu/components/context-menu-divider/context-menu-divider.component';
import { DividerModule } from '~shared/divider/divider.module';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		DividerModule
	],
	declarations: [ContextMenuComponent, ContextMenuTriggerComponent, ContextMenuItemComponent, ContextMenuDividerComponent],
	exports: [ContextMenuComponent, ContextMenuTriggerComponent, ContextMenuItemComponent, ContextMenuDividerComponent]
})
export class ContextMenuModule { }
