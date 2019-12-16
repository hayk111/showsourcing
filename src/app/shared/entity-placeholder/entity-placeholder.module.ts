import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogoModule } from '~shared/logo';

import { EntityPlaceholderComponent } from './entity.placeholder.component';

@NgModule({
	imports: [
		CommonModule,
		LogoModule,
	],
	declarations: [EntityPlaceholderComponent],
	exports: [EntityPlaceholderComponent],
})
export class EntityPlaceholderModule { }
