import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPageComponent } from './containers/projects-page/projects-page.component';
import { ProjectsListViewComponent } from './components/projects-list-view/projects-list-view.component';
import { EntityPageModule } from '~shared/entity-page/entity-page.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UtilsModule } from '~shared/utils/utils.module';
import { AppStoreModule } from '~store/store.module';
import { UserModule } from '~user';
import { SelectionBarModule } from '~shared/selection-bar/selection-bar.module';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';

@NgModule({
  imports: [
		CommonModule,
		EffectsModule.forFeature(effects),
		AppStoreModule.forChild(), // TODO to be removed and placed inside the component module using it
		EntityPageModule, // TODO to be removed and placed inside the component module using it
		NgxDatatableModule, // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // TODO to be removed and placed inside the component module using it
  ],
  declarations: [ ProjectsPageComponent, ProjectsListViewComponent ]
})
export class ProjectsModule { }
