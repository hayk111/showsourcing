import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { CommentComponent } from './components';
import { CommentListComponent } from './components';
import { CommentBadgeComponent } from './components';
import { CommentCtnrComponent } from './containers';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule
	],
	declarations: [CommentCtnrComponent, CommentComponent, CommentListComponent, CommentBadgeComponent],
	exports: [CommentCtnrComponent],
	providers: [],
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
