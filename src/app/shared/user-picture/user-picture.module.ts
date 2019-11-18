import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '~shared/image/image.module';
import { UserPictureComponent } from '~shared/user-picture/user-picture.component';
import { UtilsModule } from '~shared/utils';

@NgModule({
	imports: [
		CommonModule,
		ImageModule,
		UtilsModule,
	],
	declarations: [UserPictureComponent],
	exports: [UserPictureComponent]
})
export class UserPictureModule { }
