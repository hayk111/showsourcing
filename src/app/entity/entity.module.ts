import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';



@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
	],
	exports: [
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
