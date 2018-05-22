import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card/card.module';
import { IconsModule } from '~shared/icons/icons.module';

import { KanbanColComponent, KanbanItemComponent } from './components';
import { WorkflowKanbanComponent, WorkflowPageComponent } from './containers';
import { routes } from './routes';
import { KanbanService } from './services/kanban.service';
import { EntityPagesModule } from '~shared/entity-pages/entity-pages.module';
import { ProductModule } from '~features/products';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ProductModule,
		EntityPagesModule,
		CardModule,
		IconsModule,
	],
	declarations: [WorkflowPageComponent, WorkflowKanbanComponent, KanbanColComponent, KanbanItemComponent],
	providers: [KanbanService],
})
export class WorkflowModule { }
