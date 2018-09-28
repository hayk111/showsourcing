import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card/card.module';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { IconsModule } from '~shared/icons/icons.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { SharedModule } from '~shared/shared.module';
import { DndModule } from '~shared/dnd/dnd.module';

import { KanbanCol2Component, KanbanItem2Component, WorkflowKanban2Component } from '~features/workflow2/components';
import { Kanban2Service } from '~features/workflow2/services/kanban2.service';

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
	declarations: [WorkflowKanban2Component, KanbanCol2Component, KanbanItem2Component],
	exports: [WorkflowKanban2Component, KanbanCol2Component, KanbanItem2Component],
	providers: [Kanban2Service]
})
export class Workflow2Module { }
