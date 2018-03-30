import { EntityListPipe } from './pipes/entity-list.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPipe, EntityNamePipe, EntityExistPipe } from './pipes';
import { EntityArrayPipe } from './pipes/entity-array.pipe';
import { EntityService } from '~app/entity/store/entity.service';
import { UrlBuilder } from '~app/entity/utils/url-builder.class';
import { CategoryHttpService } from '~app/entity/store/category/category-http.service';
import { CommentHttpService } from '~app/entity/store/comment/comment-http.service';
import { CustomFieldsHttpService } from '~app/entity/store/custom-field/custom-fields-http.service';
import { EventHttpService } from '~app/entity/store/event/event-http.service';
import { FileHttpService } from '~app/entity/store/file/file-http.service';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { ProductHttpService } from '~app/entity/store/product/product-http.service';
import { ProjectHttpService } from '~app/entity/store/project/project-http.service';
import { SupplierHttpService } from '~app/entity/store/supplier/supplier-http.service';
import { TagHttpService } from '~app/entity/store/tag/tag-http.service';
import { TaskHttpService } from '~app/entity/store/task/task-http.service';
import { TeamHttpService } from '~app/entity/store/team/team-http.service';
import { TeamMembersHttpService } from '~app/entity/store/team-member/team-members-http.service';
import { UserHttpService } from '~app/entity/store/user/user.http.service';
import { FocussedEntityService } from '~app/entity/store/focussed-entity/focussed-entity.service';
import { AppStoreModule } from '~app/app-root/store/store.module';
import { Log } from '~app/app-root/utils';

@NgModule({
	imports: [CommonModule, AppStoreModule.forChild()],
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
		FocussedEntityService
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
				CommentHttpService,
				CustomFieldsHttpService,
				EventHttpService,
				FileHttpService,
				ImageHttpService,
				ProductHttpService,
				ProjectHttpService,
				SupplierHttpService,
				TagHttpService,
				TaskHttpService,
				TeamHttpService,
				TeamMembersHttpService,
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
