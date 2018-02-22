import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { ProjectsListViewComponent } from './components/projects-list-view/projects-list-view.component';
import { EntityPageModule } from '../../shared/entity-page/entity-page.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UtilsModule } from '../../shared/utils/utils.module';
import { AppStoreModule } from '../../store/store.module';
import { UserModule } from '../../shared/user/user.module';
import { SelectionBarModule } from '../../shared/selection-bar/selection-bar.module';

@NgModule({
	imports: [
		CommonModule,
		EntityPageModule,
		NgxDatatableModule,
		UtilsModule,
		AppStoreModule.forChild(),
		UserModule,
		SelectionBarModule
	],
	declarations: [ProjectsPageComponent, ProjectsListViewComponent]
})
export class ProjectsPageModule {}
