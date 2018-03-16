import { EntityListPipe } from './pipes/entity-list.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPipe, EntityNamePipe, EntityExistPipe } from './pipes';
import { EntityService, UrlBuilder } from './services';
import { EntityArrayPipe } from './pipes/entity-array.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [EntityPipe, EntityNamePipe, EntityExistPipe, EntityArrayPipe, EntityListPipe],
	exports: [EntityPipe, EntityNamePipe, EntityExistPipe, EntityArrayPipe, EntityListPipe],
	providers: [EntityService, UrlBuilder],
})
export class EntityModule {
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
