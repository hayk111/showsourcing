import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureComponent } from '~shared/user-picture/user-picture.component';
import { ImageModule } from '~shared/image/image.module';

@NgModule({
	imports: [
		CommonModule,
		ImageModule
	],
	declarations: [UserPictureComponent],
	exports: [UserPictureComponent]
})
export class UserPictureModule { }
