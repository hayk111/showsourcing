import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { BaseComponent } from './base/base.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { FiltersModule } from '../../shared/filters/filters.module';
import { DynamicFormsModule } from '../../shared/dynamic-forms/dynamic-forms.module';
import { TestInputsFileComponent } from './components/test-inputs-file/test-inputs-file.component';
import { TestInputsSelectorsComponent } from './components/test-inputs-selectors/test-inputs-selectors.component';
import { TestInputsVanillaComponent } from './components/test-inputs-vanilla/test-inputs-vanilla.component';
import { RouterModule } from '@angular/router';
import { TestCarouselComponent } from './components/test-carousel/test-carousel.component';
import { CarouselModule } from '../../shared/carousel/carousel.module';
import { SelectModule } from '../../shared/select/select.module';
import { FileModule } from '../../shared/file/file.module';
import { FeedbackModule } from '../../shared/feedback/feedback.module';
import { TestCommentsComponent } from './components/test-comments/test-comments.component';
import { TestFeedbackComponent } from './components/test-feedback/test-feedback.component';
import { CommentModule } from '../../shared/comment/comment.module';
import { KanbanTestComponent } from './components/kanban-test/kanban-test.component';
import { DndModule } from 'ng2-dnd';
import { KanbanModule } from '../../shared/kanban/kanban.module';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		SelectModule,
		FileModule,
		FeedbackModule,
		CarouselModule,
		CommentModule,
		DndModule,
		KanbanModule,
		DynamicFormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([])
	],
	declarations: [TestComponent, BaseComponent,
		 TestInputsFileComponent,
		 TestInputsSelectorsComponent,
		 TestInputsVanillaComponent,
		 TestCarouselComponent,
		 TestCommentsComponent,
		 TestFeedbackComponent,
		 KanbanTestComponent],
})
export class TestModule { }
