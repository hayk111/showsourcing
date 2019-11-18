import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeModule } from '~shared/badge';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { IconsModule } from '~shared/icons';
import { ListActionButtonsComponent } from '~shared/list/button-action-list/button-action-list.component';
import { ListItemComponent } from '~shared/list/list-item/list-item.component';
import { ListComponent } from '~shared/list/list/list.component';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		ContextMenuModule,
		BadgeModule
	],
	declarations: [ListComponent, ListItemComponent, ListActionButtonsComponent],
	exports: [ListComponent, ListItemComponent, ListActionButtonsComponent]
})
export class ListModule { }
