import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { CommentComponent } from './components';
import { CommentListComponent } from './components';
import { CommentBadgeComponent } from './components';
import { CommentCtnrComponent } from './containers';
import { EntityModule } from '~app/entity';
import { SharedModule } from '~app/shared/shared.module';
import { CommentHttpService } from './store/comment/comment-http.service';
import { reducer } from './store/comment';
import { EffectsModule } from '@ngrx/effects';
import { CommentEffects } from '~app/features/comment/store/comment/comment.effects';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		StoreModule.forFeature('comment', reducer),
		EffectsModule.forFeature([CommentEffects])
	],
	declarations: [CommentCtnrComponent, CommentComponent, CommentListComponent, CommentBadgeComponent],
	exports: [CommentCtnrComponent],
	providers: [CommentHttpService],
})
export class CommentModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CommentModule,
			providers: [],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: CommentModule,
		};
	}
}
