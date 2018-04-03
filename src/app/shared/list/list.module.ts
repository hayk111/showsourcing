import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ListComponent, ListItemComponent],
	exports: [ListComponent, ListItemComponent]
})
export class ListModule { }
