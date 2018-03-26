import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommentHttpService } from '~comment/services/comment-http.service';
import { FilterEntityPanelService } from '~shared/filters';
import { LocalStorageModule } from '~shared/local-storage/local-storage.module';

import { CategoryHttpService } from './category-http.service';
import { CustomFieldsHttpService } from './custom-fields-http.service';
import { EntityService } from './entity.service';
import { PreloaderService } from './preloader.service';
import { SelectionService } from './selection.service';
import { TagHttpService } from './tag-http.service';
import { TeamMembersHttpService } from './team-members-http.service';
import { TeamHttpService } from './team-http.service';
import { VoteHttpService } from './vote-http.service';

@NgModule({
	imports: [CommonModule, HttpClientModule, LocalStorageModule],
	declarations: [],
	providers: [
		EntityService,
		TeamHttpService,
		CustomFieldsHttpService,
		CommentHttpService,
		VoteHttpService,
		TeamMembersHttpService,
		CategoryHttpService,
		TagHttpService,
		PreloaderService,
		FilterEntityPanelService,
		SelectionService,
	],
})
export class EntitiesServicesModule { }
