import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';

import { KanbanColComponent } from './components/kanban-col/kanban-col.component';
import { KanbanItemComponent } from './components/kanban-item/kanban-item.component';
import { KanbanComponent } from './components/kanban/kanban.component';

@NgModule({
	imports: [
		CommonModule,
		DragDropModule,
		InputsModule,
		IconsModule
	],
	declarations: [KanbanComponent, KanbanColComponent, KanbanItemComponent],
	exports: [KanbanComponent]
})
export class KanbanModule { }
