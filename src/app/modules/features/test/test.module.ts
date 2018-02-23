import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs/inputs.module';
import { FilteredListPageModule } from '~shared/filtered-list-page/filtered-list-page.module';
import { DynamicFormsModule } from '~shared/dynamic-forms/dynamic-forms.module';
import { TestInputsSelectorsComponent } from './components/test-inputs-selectors/test-inputs-selectors.component';
import { TestInputsVanillaComponent } from './components/test-inputs-vanilla/test-inputs-vanilla.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '~shared/carousel/carousel.module';
import { SelectModule } from '~shared/select/select.module';
import { FileModule } from '~shared/file/file.module';
import { RatingModule } from '~shared/rating/rating.module';
import { CommentModule } from '~comment';
import { KanbanTestComponent } from './components/kanban-test/kanban-test.component';
import { KanbanModule } from '~shared/kanban/kanban.module';
import { TestLoadesComponent } from './components/test-loades/test-loades.component';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { TestTabsComponent } from './components/test-tabs/test-tabs.component';
import { TabsModule } from '~shared/tabs/tabs.module';
import { TestProductComponent } from './components/test-product/test-product.component';
import { PriceModule } from '~shared/price/price.module';
import { ProductModule } from '~products';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		SelectModule,
		FileModule,
		RatingModule,
		CarouselModule,
		CommentModule,
		KanbanModule,
		DynamicFormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([]),
		LoadersModule,
		TabsModule,
		PriceModule,
		ProductModule
	],
	declarations: [
		TestComponent,
		TestInputsSelectorsComponent,
		TestInputsVanillaComponent,
		KanbanTestComponent,
		TestLoadesComponent,
		TestTabsComponent,
		TestProductComponent
	]
})
export class TestModule {}
