import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '~shared/icons';
import { UserPictureModule } from '~shared/user-picture';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		ReactiveFormsModule,
		TranslateModule,
		UserPictureModule,
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
