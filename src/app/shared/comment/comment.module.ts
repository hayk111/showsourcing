import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent, CommentListComponent } from '~shared/comment';
import { UserPictureModule } from '~shared/user-picture';

@NgModule({
	imports: [
		CommonModule,
		UserPictureModule
	],
	declarations: [CommentComponent, CommentListComponent],
	exports: [CommentComponent, CommentListComponent]
})
export class CommentModule { }
