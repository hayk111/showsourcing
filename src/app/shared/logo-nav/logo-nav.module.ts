import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoNavComponent } from './logo-nav.component';

@NgModule({
	declarations: [
		LogoNavComponent,
	],
	imports: [
		CommonModule
	],
	exports: [
		LogoNavComponent,
	]
})
export class LogoNavModule { }
