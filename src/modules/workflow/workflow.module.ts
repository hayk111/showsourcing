import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductModule } from '~products';
import { CardModule } from '~shared/card/card.module';
import { EntityPageModule } from '~shared/entity-page/entity-page.module';
import { IconsModule } from '~shared/icons/icons.module';

import { KanbanColComponent, KanbanItemComponent } from './components';
import { WorkflowKanbanComponent, WorkflowPageComponent } from './containers';
import { routes } from './routes';
import { KanbanService } from './services/kanban.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ProductModule,
		EntityPageModule,
		CardModule,
		IconsModule,
	],
	declarations: [WorkflowPageComponent, WorkflowKanbanComponent, KanbanColComponent, KanbanItemComponent],
	providers: [KanbanService],
})
export class WorkflowModule {}
