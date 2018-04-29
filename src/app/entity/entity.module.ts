import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CategoryHttpService } from '~app/entity/store/category/category-http.service';
import { CustomFieldsHttpService } from '~app/entity/store/custom-field/custom-field-http.service';
import { EntityService } from '~app/entity/store/entity.service';
import { EventHttpService } from '~app/entity/store/event/event-http.service';
import { FileHttpService } from '~app/entity/store/file/file-http.service';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { ProjectHttpService } from '~app/entity/store/project/project-http.service';
import { SupplierHttpService } from '~app/entity/store/supplier/supplier-http.service';
import { TagHttpService } from '~app/entity/store/tag/tag-http.service';
import { TaskHttpService } from '~app/entity/store/task/task-http.service';
import { TeamMemberHttpService } from '~app/entity/store/team-member/team-member-http.service';
import { TeamHttpService } from '~app/entity/store/team/team-http.service';
import { UserHttpService } from '~app/entity/store/user/user.http.service';
import { UrlBuilder } from '~app/entity/utils/url-builder.class';

import { EntityExistPipe, EntityNamePipe, EntityPipe } from './pipes';
import { EntityArrayPipe } from './pipes/entity-array.pipe';
import { EntityListPipe } from './pipes/entity-list.pipe';


@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		// pipes
		EntityPipe,
		EntityNamePipe,
		EntityExistPipe,
		EntityArrayPipe,
		EntityListPipe,
	],
	exports: [
		// pipes
		EntityPipe,
		EntityNamePipe,
		EntityExistPipe,
		EntityArrayPipe,
		EntityListPipe,
	],
	providers: [
		EntityService,
		UrlBuilder,
	],
})
export class EntityModule {
	constructor() {
	}
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
			providers: [
				EntityService,
				// http modules
				CategoryHttpService,
				CustomFieldsHttpService,
				EventHttpService,
				FileHttpService,
				ImageHttpService,
				ProjectHttpService,
				SupplierHttpService,
				TagHttpService,
				TaskHttpService,
				TeamHttpService,
				TeamMemberHttpService,
				UserHttpService
			],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
		};
	}
}
