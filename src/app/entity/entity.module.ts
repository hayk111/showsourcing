import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CustomFieldsHttpService } from '~app/entity/store/custom-field/custom-field-http.service';
import { EntityService } from '~app/entity/store/entity.service';
import { FileHttpService } from '~app/entity/store/file/file-http.service';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
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
				CustomFieldsHttpService,
				FileHttpService,
				ImageHttpService,
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
