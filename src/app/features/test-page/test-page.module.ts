import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { TestPageComponent } from './test-page.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: '', component: TestPageComponent }
		])
	],
	declarations: [TestPageComponent]
})
export class TestPageModule { }
