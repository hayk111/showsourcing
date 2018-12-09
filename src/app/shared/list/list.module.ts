import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '~shared/list/list/list.component';
import { ListItemComponent } from '~shared/list/list-item/list-item.component';
import { ListActionButtonsComponent } from '~shared/list/button-action-list/button-action-list.component';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [ListComponent, ListItemComponent, ListActionButtonsComponent],
	exports: [ListComponent, ListItemComponent, ListActionButtonsComponent]
})
export class ListModule { }
