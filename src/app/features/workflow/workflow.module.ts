import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product/product-common.module';
import { KanbanColComponent, KanbanItemComponent, WorkflowKanbanComponent } from '~features/workflow/components';
import { KanbanService } from '~features/workflow/services/kanban.service';
import { CardModule } from '~shared/card/card.module';
import { DndModule } from '~shared/dnd/dnd.module';
import { IconsModule } from '~shared/icons/icons.module';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

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
