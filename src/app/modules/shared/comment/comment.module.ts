import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsInputComponent } from './components/comments-input/comments-input.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ CommentsInputComponent ],
	exports: [ CommentsInputComponent ]
})
export class CommentModule { }
