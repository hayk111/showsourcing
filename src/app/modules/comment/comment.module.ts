import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../store/store.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../shared/icons/icons.module';
import { UtilsModule } from '../shared/utils/utils.module';
import { InputsModule } from '../shared/inputs/inputs.module';
import { LoadersModule } from '../shared/loaders/loaders.module';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentBadgeComponent } from './components/comment-badge/comment-badge.component';
import { CommentCtnrComponent } from './containers/comment-ctnr/comment-ctnr.component';

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
	declarations: [
		CommentComponent,
		CommentListComponent,
		CommentBadgeComponent,
		CommentCtnrComponent
	],
	exports: [ CommentCtnrComponent	]
})
export class CommentModule { }
