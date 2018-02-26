import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotificationModule } from '@swimlane/ngx-ui';
import { AuthModule } from '~modules/features/auth/auth.module';
import { HomeModule } from '~modules/features/home/home.module';
import { TestModule } from '~modules/features/test/test.module';
import { ProductDetailsPageModule } from '~modules/products/features/product-details/product-details-page.module';
import { ProductsPageModule } from '~modules/products/features/products-page/products-page.module';
import { ProductModule } from '~modules/products/product.module';
import { SuppliersModule } from '~modules/suppliers/suppliers.module';
import { TasksModule } from '~modules/tasks/tasks.module';
import { UserModule } from '~modules/user/user.module';
import { DynamicFormsModule } from '~shared/dynamic-forms/dynamic-forms.module';
import { IconsModule } from '~shared/icons/icons.module';
import { LocalStorageModule } from '~shared/local-storage/local-storage.module';
import { TemplateModule } from '~shared/template/template.module';
import { EntitiesServicesModule } from '~store//services/entities-services.module';
import { AppStoreModule } from '~store//store.module';
import { reducerProvider } from '~store/reducer/_reducers';

import { environment } from '../environments/environment';
import { AppComponent } from './components/app.component';
import { routes } from './routes';
import { HttpApiRedirectorService } from './services/http-api-redirector.service';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
		TemplateModule,
		DynamicFormsModule.forRoot(),
		AuthModule.forRoot(),
		AppStoreModule.forRoot(),
		RouterModule.forRoot(routes),
		LocalStorageModule,
		HttpClientModule,
		BrowserAnimationsModule,
		EntitiesServicesModule,
		UserModule,
		TemplateModule,
		IconsModule,
		NotificationModule,
		HomeModule,
		ProductsPageModule,
		ProductModule,
		TasksModule,
		SuppliersModule,
		ProductDetailsPageModule,
		TestModule,
	],
	providers: [
		reducerProvider,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpApiRedirectorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
