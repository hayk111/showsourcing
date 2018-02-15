import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductActivityPageComponent } from './components/product-activity-page/product-activity-page.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '../../shared/carousel/carousel.module';
import { FileModule } from '../../shared/file/file.module';
import { SelectModule } from '../../shared/select/select.module';
import { CommentModule } from '../../shared/comment/comment.module';
import { UtilsModule } from '../../shared/utils/utils.module';
import { AppStoreModule } from '../../store/store.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSampleComponent } from './components/product-sample/product-sample.component';
import { ProductTechDetailsComponent } from './components/product-tech-details/product-tech-details.component';
import { ProductTasksComponent } from './components/product-tasks/product-tasks.component';
import { ProductFilesComponent } from './components/product-files/product-files.component';
import { ProductShippingComponent } from './components/product-shipping/product-shipping.component';
import { EditableFieldModule } from '../../shared/editable-field/editable-field.module';
import { LoadersModule } from '../../shared/loaders/loaders.module';
import { ProductModule } from '../../shared/product/product.module';
import { IconsModule } from '../../shared/icons/icons.module';
import { ProductPageMainCardComponent } from './components/product-page-main-card/product-page-main-card.component';
import { CardModule } from '../../shared/card/card.module';
import { LikesChartModule } from '../../shared/likes-chart/likes-chart.module';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { TaskModule } from '../../shared/task/task.module';
import { TasksPageModule } from '../tasks-page/tasks-page.module';
import { TemplateModule } from '../../shared/template/template.module';

@NgModule({
	imports: [
		CommonModule,
		TemplateModule,
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
		ProductModule,
		UtilsModule,
		ProductModule,
		IconsModule,
		CardModule,
		LikesChartModule,
		InputsModule,
		TasksPageModule,
		TaskModule
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
	], exports: [
		ProductPageComponent
	]
})
export class ProductDetailsPageModule { }
