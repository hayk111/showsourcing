import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { CommentComponent } from '~features/comment/components';
import { CommentListComponent } from '~features/comment/components';
import { CommentBadgeComponent } from '~features/comment/components';
import { CommentCtnrComponent } from '~features/comment/containers';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule
	],
	declarations: [CommentCtnrComponent, CommentComponent, CommentListComponent, CommentBadgeComponent],
	exports: [CommentCtnrComponent],
})
export class CommentModule {

}
