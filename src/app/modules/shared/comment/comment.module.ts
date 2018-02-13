import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsInputComponent } from './components/comments-input/comments-input.component';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../../store/store.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsInputEntityComponent } from './components/comments-input-entity/comments-input-entity.component';
import { IconsModule } from '../icons/icons.module';
import { UtilsModule } from '../utils/utils.module';
import { InputsModule } from '../inputs/inputs.module';
import { LoadersModule } from '../loaders/loaders.module';

@NgModule({
	imports: [
		CommonModule,
		AppStoreModule.forChild(),
		ReactiveFormsModule,
		IconsModule,
		UtilsModule,
		InputsModule,
		LoadersModule
	],
	declarations: [ CommentsInputComponent, CommentsInputEntityComponent ],
	exports: [ CommentsInputComponent, CommentsInputEntityComponent ]
})
export class CommentModule { }
