import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '~app/shared/category/category.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: []
})
export class CategoryModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CategoryModule,
			providers: [CategoryService]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: CategoryModule
		};
	}
}
