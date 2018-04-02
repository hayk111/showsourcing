import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { PreloaderEffects } from '~app/shared/preloader/preloader.effects';

@NgModule({
	imports: [
		CommonModule,
		EffectsModule.forFeature([PreloaderEffects])
	],
	declarations: []
})
export class PreloaderModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PreloaderModule,
			providers: []
		};
	}
}
