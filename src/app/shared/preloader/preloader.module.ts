import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderService } from './preloader.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: []
})
export class PreloaderModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PreloaderModule,
			providers: [PreloaderService]
		};
	}
}
