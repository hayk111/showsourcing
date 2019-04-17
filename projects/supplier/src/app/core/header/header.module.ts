import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { HeaderComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
	],
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
})
export class HeaderModule { }
