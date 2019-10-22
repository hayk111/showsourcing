import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '~shared/shared.module';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { AddCommentComponent } from './add-comment/add-comment.component';


@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		CommentComponent,
		CommentListComponent,
		AddCommentComponent
	],
	exports: [
		CommentComponent,
		CommentListComponent,
		AddCommentComponent
	]
})
export class CommentModule { }
