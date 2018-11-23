import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from '~features/test-page/test-page/test-page.component';
import { TestKanbanComponent } from '~features/test-page/test-kanban/test-kanban.component';
import { EditableFieldModule } from '~shared/editable-field';
import { CardModule } from '~shared/card';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { FormsModule } from '@angular/forms';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { IconsModule } from '~shared/icons';
import { DividerModule } from '~shared/divider/divider.module';
import { UserPictureModule } from '~shared/user-picture';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { InputsModule } from '~shared/inputs';
import { Workflow2Module } from '~features/workflow2/workflow2.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { KanbanModule } from '~shared/kanban/kanban.module';
import { ProductCommonModule } from '~shared/product-common/product-common.module';

@NgModule({
	imports: [
		CommonModule,
		EditableFieldModule,
		CardModule,
		SelectorsModule,
		FormsModule,
		DynamicFormsModule,
		NgSelectModule,
		IconsModule,
		ContextMenuModule,
		DividerModule,
		UserPictureModule,
		SearchBarModule,
		InputsModule,
		TopPanelModule,
		Workflow2Module,
		KanbanModule,
		ProductCommonModule
	],
	declarations: [TestPageComponent, TestKanbanComponent],
	exports: [TestPageComponent, TestKanbanComponent],
	providers: [
		ProjectFeatureService,
		ProjectWorkflowFeatureService
	]
})
export class TestPageModule { }
