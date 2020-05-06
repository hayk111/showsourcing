import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '~shared/icons';
import { LogoModule } from '~shared/logo';
import { UserPictureModule } from '~shared/user-picture';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentComponent } from './comment/comment.component';
import { ERMModule } from '~shared/erm/erm.module';
import { UtilsModule } from '~shared/utils';


@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		ReactiveFormsModule,
		TranslateModule,
		UserPictureModule,
		LogoModule,
		ERMModule,
		UtilsModule
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
