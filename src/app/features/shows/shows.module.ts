import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsPageComponent } from '~features/shows/containers/shows-page/shows-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { ShowListComponent } from '~features/shows/components/show-list/show-list.component';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TopPanelModule,
    SearchBarModule,
    RouterModule.forChild([
      { path: '', component: ShowsPageComponent }
    ])
  ],
  declarations: [ShowsPageComponent, ShowListComponent]
})
export class ShowsModule { }
