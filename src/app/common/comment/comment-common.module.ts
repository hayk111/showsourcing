import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureModule } from '~shared/user-picture';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { UtilsModule } from '~shared/utils';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [CommentComponent, CommentListComponent],
	exports: [CommentComponent, CommentListComponent]
})
export class CommentCommonModule { }
