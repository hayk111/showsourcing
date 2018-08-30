import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureModule } from '~shared/user-picture';
import { CommentComponent } from '~shared/comment/components/comment/comment.component';
import { CommentListComponent } from '~shared/comment/components/comment-list/comment-list.component';

@NgModule({
	imports: [
		CommonModule,
		UserPictureModule
	],
	declarations: [CommentComponent, CommentListComponent],
	exports: [CommentComponent, CommentListComponent]
})
export class CommentModule { }
