import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductModule } from '~features/products';
import { CardModule } from '~shared/card/card.module';
import { IconsModule } from '~shared/icons/icons.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

import { KanbanColComponent, KanbanItemComponent } from './components';
import { WorkflowKanbanComponent, WorkflowPageComponent } from './containers';
import { routes } from './routes';
import { KanbanService } from './services/kanban.service';
import { ProductFeatureService } from './services/product.feature.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ProductModule,
		TopPanelModule,
		CardModule,
		IconsModule,
	],
	declarations: [WorkflowPageComponent, WorkflowKanbanComponent, KanbanColComponent, KanbanItemComponent],
	providers: [KanbanService, ProductFeatureService],
})
export class WorkflowModule { }
