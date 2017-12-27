import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsInputComponent } from './components/comments-input/comments-input.component';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../../store/store.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		AppStoreModule.forChild(),
		ReactiveFormsModule
	],
	declarations: [ CommentsInputComponent ],
	exports: [ CommentsInputComponent ]
})
export class CommentModule { }
