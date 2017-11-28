import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatIconModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule
	],
	declarations: [DialogComponent]
})
export class DialogModule { }
