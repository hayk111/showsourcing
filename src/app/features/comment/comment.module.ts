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
import { CommentService } from './services';
import { EntityModule } from '~app/shared/entity';

@NgModule({
	imports: [
		CommonModule,
		EntityModule.forChild(),
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
	exports: [ CommentCtnrComponent	],
	providers: [ CommentService ]
})
export class CommentModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CommentModule,
			providers: [ CommentService ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: CommentModule,
		};
	}
}
