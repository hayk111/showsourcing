import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from '~features/test-page/test-page/test-page.component';
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
import { OverlayModule } from '@angular/cdk/overlay';
import { PreviewTestComponent } from './preview-test/preview-test.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestPageComponent, PreviewTestComponent],
  exports: [TestPageComponent],
  providers: [
    ProjectFeatureService,
    ProjectWorkflowFeatureService
  ]
})
export class TestPageModule { }
