import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPipe, EntityNamePipe, EntityExistPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ EntityPipe, EntityNamePipe, EntityExistPipe ]
})
export class EntityModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
			providers: [ ],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: EntityModule,
		};
	}
}
