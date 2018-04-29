import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusedEntityService } from './focused-entity.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: []
})
export class FocusedEntityModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: FocusedEntityModule,
			providers: [FocusedEntityService]
		};
	}
}
