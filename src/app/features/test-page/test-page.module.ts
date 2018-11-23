import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: TestPageComponent }
		])
	],
	declarations: [TestPageComponent]
})
export class TestPageModule { }
