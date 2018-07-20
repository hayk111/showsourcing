import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card/card.module';
import { IconsModule } from '~shared/icons/icons.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { SharedModule } from '~shared/shared.module';

import { KanbanColComponent, KanbanItemComponent, KanbanItemCardComponent, WorkflowKanbanComponent } from './components';
import { KanbanService } from './services/kanban.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TopPanelModule,
		CardModule,
		IconsModule,
	],
	declarations: [WorkflowKanbanComponent, KanbanColComponent, KanbanItemComponent, KanbanItemCardComponent],
	exports: [WorkflowKanbanComponent, KanbanColComponent, KanbanItemComponent, KanbanItemCardComponent],
	providers: [KanbanService]
})
export class WorkflowModule { }
