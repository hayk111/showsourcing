import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommentService } from '~comment/services/comment.service';
import { ProjectService } from '~projects/services/project.service';
import { LocalStorageModule } from '~shared/local-storage/local-storage.module';
import { SupplierService } from '~suppliers';
import { TaskService } from '~tasks/services/task.service';
import { UserService } from '~user/services/user.service';

import { CategoryService } from './category.service';
import { CountryService } from './country.service';
import { CurrencyService } from './currency.service';
import { CustomFieldsService } from './custom-fields.service';
import { EntityService } from './entity.service';
import { EventService } from './event.service';
import { FilterEntityPanelService } from './filter-entity-panel.service';
import { PreloaderService } from './preloader.service';
import { SelectionService } from './selection.service';
import { TagService } from './tag.service';
import { TeamItemLoaderService } from './team-item-loader.service';
import { TeamMembersService } from './team-members.service';
import { TeamService } from './team.service';
import { VoteService } from './vote.service';

@NgModule({
	imports: [CommonModule, HttpClientModule, LocalStorageModule],
	declarations: [],
	providers: [
		EntityService,
		TeamItemLoaderService,
		TeamService,
		// TaskService,
		CustomFieldsService,
		CommentService,
		// FileService,
		CurrencyService,
		CountryService,
		VoteService,
		// AuthService,
		// UserService,
		// TokenService,
		// ImageService,
		TeamMembersService,
		CategoryService,
		// SupplierService,
		// ProjectService,
		EventService,
		TagService,
		PreloaderService,
		FilterEntityPanelService,
		SelectionService,
	],
})
export class EntitiesServicesModule {}
