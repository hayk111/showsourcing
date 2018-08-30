import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent, CommentListComponent } from '~shared/comment';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [CommentComponent, CommentListComponent],
	exports: [CommentComponent, CommentListComponent]
})
export class CommentModule { }
