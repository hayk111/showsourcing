import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowPageComponent } from './components/workflow-page/workflow-page.component';
import { WorkflowKanbanComponent } from './components/workflow-kanban/workflow-kanban.component';
import { KanbanModule } from '../../shared/kanban/kanban.module';
import { ProductModule } from '~products';
import { EntityPageModule } from '../../shared/entity-page/entity-page.module';

@NgModule({
  imports: [
		CommonModule,
		KanbanModule,
		ProductModule,
		EntityPageModule
  ],
  declarations: [ WorkflowPageComponent, WorkflowKanbanComponent ]
})
export class WorkflowModule { }
