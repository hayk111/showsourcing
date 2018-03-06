import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPipe, EntityNamePipe, EntityExistPipe } from './pipes';
import { EntityService, UrlBuilder } from './services';

@NgModule({
	imports: [CommonModule],
	declarations: [EntityPipe, EntityNamePipe, EntityExistPipe],
	exports: [EntityPipe, EntityNamePipe, EntityExistPipe],
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
