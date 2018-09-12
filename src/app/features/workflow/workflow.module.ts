import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card/card.module';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { IconsModule } from '~shared/icons/icons.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { SharedModule } from '~shared/shared.module';
import { DndModule } from '~shared/dnd/dnd.module';

import { KanbanColComponent, KanbanItemComponent, WorkflowKanbanComponent } from '~features/workflow/components';
import { KanbanService } from '~features/workflow/services/kanban.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TopPanelModule,
		CardModule,
		ProductCommonModule,
		IconsModule,
		DndModule
	],
	declarations: [WorkflowKanbanComponent, KanbanColComponent, KanbanItemComponent],
	exports: [WorkflowKanbanComponent, KanbanColComponent, KanbanItemComponent],
	providers: [KanbanService]
})
export class WorkflowModule { }
