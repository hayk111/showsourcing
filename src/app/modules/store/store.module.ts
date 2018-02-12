import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './effects/_effects';
import { reducerProvider, reducerToken, metaReducers } from './reducer/_reducers';
import { StoreModule } from '@ngrx/store';
import { ModuleWithProviders } from '@angular/core';
import { EntityNamePipe } from './pipes/entity-name.pipe';
import { EntitiesServicesModule } from './services/entities-services.module';
import { EntityExistPipe } from './pipes/entity-exist.pipe';
import { EntityStatusPipe } from './pipes/entity-status.pipe';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot( reducerToken , { metaReducers }),
		EffectsModule.forRoot(effects),
		StoreDevtoolsModule.instrument({
			maxAge: 2
		}),
		EntitiesServicesModule,
		// doesn't yet work with storeDevTools
		// StoreRouterConnectingModule
	],
	providers: [
		reducerProvider,
	],
	declarations: [ EntityNamePipe, EntityExistPipe, EntityStatusPipe ],
	exports: [ EntityNamePipe, EntityExistPipe, EntityStatusPipe ]
})
export class AppStoreModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AppStoreModule,
			providers: [ reducerProvider ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: AppStoreModule
		};
	}
}
