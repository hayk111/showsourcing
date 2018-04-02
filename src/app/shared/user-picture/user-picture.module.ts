import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureComponent } from './user-picture.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [UserPictureComponent],
	exports: [UserPictureComponent]
})
export class UserPictureModule { }
