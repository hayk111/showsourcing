import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './components/kanban/kanban.component';
import { KanbanColComponent } from './components/kanban-col/kanban-col.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanItemComponent } from './components/kanban-item/kanban-item.component';
import { CheckboxComponent, InputsModule } from '~shared/inputs';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		DragDropModule,
		InputsModule,
		IconsModule
	],
	declarations: [KanbanComponent, KanbanColComponent, KanbanItemComponent],
	exports: [KanbanComponent, KanbanItemComponent, KanbanColComponent]
})
export class KanbanModule { }
