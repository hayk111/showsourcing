import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		StoreModule.forFeature('testEntities', reducers),
		EffectsModule.forFeature(effects)
	],
	providers: [],
	declarations: [],
	exports: []
})
export class ProductModule {}
