import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommentService } from '~comment/services/comment.service';
import { FilterEntityPanelService } from '~shared/filters';
import { LocalStorageModule } from '~shared/local-storage/local-storage.module';

import { CategoryService } from './category.service';
import { CustomFieldsService } from './custom-fields.service';
import { EntityService } from './entity.service';
import { PreloaderService } from './preloader.service';
import { SelectionService } from './selection.service';
import { TagService } from './tag.service';
import { TeamItemLoaderService } from './team-item-loader.service';
import { TeamMembersService } from './team-members.service';
import { TeamService } from './team.service';
import { VoteService } from './vote.service';
import { CountryService } from '~app/app-root/store/services/country.service';
import { CurrencyService } from '~app/app-root/store/services/currency.service';
import { IncoTermsService } from '~app/app-root/store/services/inco-terms.service';
import { HarbourService } from '~app/app-root/store/services/harbour.service';

@NgModule({
	imports: [CommonModule, HttpClientModule, LocalStorageModule],
	declarations: [],
	providers: [
		EntityService,
		TeamItemLoaderService,
		TeamService,
		CountryService,
		CurrencyService,
		IncoTermsService,
		HarbourService,
		CustomFieldsService,
		CommentService,
		VoteService,
		TeamMembersService,
		CategoryService,
		TagService,
		PreloaderService,
		FilterEntityPanelService,
		SelectionService,
	],
})
export class EntitiesServicesModule {}
