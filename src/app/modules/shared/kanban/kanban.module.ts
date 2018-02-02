import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanColComponent } from './components/kanban-col/kanban-col.component';
import { KanbanItemComponent } from './components/kanban-item/kanban-item.component';
import { KanbanService } from './services/kanban.service';
import { CardModule } from '../card/card.module';

@NgModule({
	imports: [
		CommonModule,
		CardModule
	],
	declarations: [ KanbanColComponent, KanbanItemComponent],
	exports: [ KanbanColComponent, KanbanItemComponent ],
	providers: [ KanbanService ]
})
export class KanbanModule { }
