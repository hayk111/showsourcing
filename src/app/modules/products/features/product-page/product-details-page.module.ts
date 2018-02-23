import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TasksPageModule } from '~modules/features/tasks-page/tasks-page.module';
import { ProductModule } from '~products';
import { CardModule } from '~shared/card/card.module';
import { CarouselModule } from '~shared/carousel/carousel.module';
import { CommentModule } from '~comment';
import { EditableFieldModule } from '~shared/editable-field/editable-field.module';
import { EntityMainCardModule } from '~shared/entity-main-card/entity-main-card.module';
import { FileModule } from '~shared/file/file.module';
import { IconsModule } from '~shared/icons/icons.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { LikesChartModule } from '~shared/likes-chart/likes-chart.module';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { PriceModule } from '~shared/price/price.module';
import { SelectModule } from '~shared/select/select.module';
import { TaskModule } from '~shared/task/task.module';
import { UtilsModule } from '~shared/utils/utils.module';
import { AppStoreModule } from '~store/store.module';

import {
	ProductPageMainCardComponent,
	ProductSampleComponent,
	ProductShippingComponent,
	ProductTechDetailsComponent,
} from './components';
import {
	ProductActivityPageComponent,
	ProductFilesComponent,
	ProductPageComponent,
	ProductTasksComponent,
} from './containers';

@NgModule({
	imports: [
		CommonModule,
		EntityMainCardModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([]),
		CarouselModule,
		FileModule,
		SelectModule,
		CommentModule,
		AppStoreModule.forChild(),
		EditableFieldModule,
		LoadersModule,
		PriceModule,
		UtilsModule,
		ProductModule,
		IconsModule,
		CardModule,
		LikesChartModule,
		InputsModule,
		TasksPageModule,
		TaskModule,
	],
	declarations: [
		ProductPageComponent,
		ProductPageComponent,
		ProductActivityPageComponent,
		ProductSampleComponent,
		ProductTechDetailsComponent,
		ProductTasksComponent,
		ProductFilesComponent,
		ProductShippingComponent,
		ProductPageMainCardComponent,
	],
	exports: [ProductPageComponent],
})
export class ProductDetailsPageModule {}
