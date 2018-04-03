import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './_effects';
import { reducerProvider, reducerToken, metaReducers } from './_reducers';
import { StoreModule } from '@ngrx/store';
import { ModuleWithProviders } from '@angular/core';


@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot(reducerToken),
		EffectsModule.forRoot(effects),
		StoreDevtoolsModule.instrument({
			maxAge: 2,
		}),
		// doesn't yet work with storeDevTools
		// StoreRouterConnectingModule
	],
	providers: [reducerProvider],
	declarations: [],
	exports: [],
})
export class AppStoreModule {
	constructor() {
		console.log('store constr');
	}
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AppStoreModule,
			providers: [reducerProvider],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: AppStoreModule,
			providers: [],
		};
	}
}
