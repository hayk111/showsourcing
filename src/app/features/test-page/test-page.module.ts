import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { PlaygroundPageComponent } from '../dev/pages/playground/playground-page.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: '', component: PlaygroundPageComponent }
		])
	],
	declarations: [PlaygroundPageComponent],
	exports: [PlaygroundPageComponent]
})
export class TestPageModule { }
