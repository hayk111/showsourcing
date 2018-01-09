import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanDirective } from './directives/kanban.directive';
import { KanbanColComponent } from './components/kanban-col/kanban-col.component';
import { KanbanItemComponent } from './components/kanban-item/kanban-item.component';
import { KanbanService } from './services/kanban.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [KanbanDirective, KanbanColComponent, KanbanItemComponent],
	exports: [ KanbanColComponent, KanbanItemComponent ],
	providers: [ KanbanService ]
})
export class KanbanModule { }
