import { EntityListPipe } from './pipes/entity-list.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPipe, EntityNamePipe, EntityExistPipe } from './pipes';
import { EntityArrayPipe } from './pipes/entity-array.pipe';
import { EntityService } from '~app/entity/store/entity.service';
import { UrlBuilder } from '~app/entity/utils/url-builder.class';

@NgModule({
	imports: [CommonModule],
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
	providers: [EntityService, UrlBuilder],
})
export class EntityModule {
	constructor() {
		console.log('entitymodule constr');
	}
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
			providers: [EntityService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
		};
	}
}
