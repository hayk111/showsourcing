import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmrService } from '~app/shared/hmr/hmr.service';


// hmr service or hot module reloading

@NgModule({
	imports: [
		CommonModule
	],
	declarations: []
})
export class HmrModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: HmrModule,
			providers: [HmrService]
		};
	}
}
