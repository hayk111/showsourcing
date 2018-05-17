import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

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
	],
})
export class EntityModule {
	constructor() {
	}
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
			providers: [
			],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
		};
	}
}
