import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsPageComponent } from '~features/shows/containers/shows-page/shows-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { ShowListComponent } from '~features/shows/components/show-list/show-list.component';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { ShowDetailsComponent } from './containers/show-details/show-details.component';
import { ImgShowComponent } from './components/img-show/img-show.component';
import { ShowSummaryComponent } from './components/show-summary/show-summary.component';
import { ShowAboutComponent } from './components/show-about/show-about.component';
import { ShowExhibitorsComponent } from './components/show-exhibitors/show-exhibitors.component';
import { ShowTopPanelDetailComponent } from './components/show-top-panel-detail/show-top-panel-detail.component';
import { ShowFeatureService } from '~features/shows/services/show-feature.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{ path: '', component: ShowsPageComponent, pathMatch: 'full' },
			{ path: ':id', component: ShowDetailsComponent }
		])
	],
	declarations: [
		ShowsPageComponent,
		ShowListComponent,
		ShowDetailsComponent,
		ImgShowComponent,
		ShowSummaryComponent,
		ShowAboutComponent,
		ShowExhibitorsComponent,
		ShowTopPanelDetailComponent
	],
	providers: [
		ShowFeatureService
	]
})
export class ShowsModule { }
