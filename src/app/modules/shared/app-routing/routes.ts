import { Route } from '@angular/router';
import { TemplateComponent } from '../template/components/template/template.component';
import { GuestTemplateComponent } from '../template/components/guest-template/guest-template.component';
import { HomeComponent } from '../../features/home/components/home/home.component';
import { TestComponent } from '../../features/test/test/test.component';
import { SupplierPageComponent } from '../../features/supplier-page/components/supplier-page/supplier-page.component';
import { ProductsPageComponent } from '../../features/products-page/components/products-page/products-page.component';
import { BaseComponent } from '../../features/test/base/base.component';
import { TasksPageComponent } from '../../features/tasks-page/components/tasks-page/tasks-page.component';
import { EventPageComponent } from '../../features/events-page/components/event-page/event-page.component';
import { TestInputsVanillaComponent } from '../../features/test/components/test-inputs-vanilla/test-inputs-vanilla.component';
import { TestInputsSelectorsComponent } from '../../features/test/components/test-inputs-selectors/test-inputs-selectors.component';
import { TestInputsFileComponent } from '../../features/test/components/test-inputs-file/test-inputs-file.component';
import { TestCarouselComponent } from '../../features/test/components/test-carousel/test-carousel.component';
import { TestCommentsComponent } from '../../features/test/components/test-comments/test-comments.component';
import { TestFeedbackComponent } from '../../features/test/components/test-feedback/test-feedback.component';
import { ProductPageComponent } from '../../features/product-page/components/product-page/product-page.component';
import { ProductActivityPageComponent } from '../../features/product-page/components/product-activity-page/product-activity-page.component';
import { ProductSampleComponent } from '../../features/product-page/components/product-sample/product-sample.component';
import { ProductTechDetailsComponent } from '../../features/product-page/components/product-tech-details/product-tech-details.component';
import { ProductTasksComponent } from '../../features/product-page/components/product-tasks/product-tasks.component';
import { ProductFilesComponent } from '../../features/product-page/components/product-files/product-files.component';
import { ProductShippingComponent } from '../../features/product-page/components/product-shipping/product-shipping.component';
import { KanbanTestComponent } from '../../features/test/components/kanban-test/kanban-test.component';
import { TestLoadesComponent } from '../../features/test/components/test-loades/test-loades.component';
import { DataManagementPageComponent } from '../../features/data-management/components/data-management-page/data-management-page.component';
import { TeamManagementPageComponent } from '../../features/team-management/components/team-management-page/team-management-page.component';
import { TestTabsComponent } from '../../features/test/components/test-tabs/test-tabs.component';
import { AuthCardComponent } from '../../features/auth/components/auth-card/auth-card.component';
import { AccountCreatedComponent } from '../../features/auth/components/account-created/account-created.component';
import { AuthGuardService } from '../../features/auth/services/auth-guard.service';

export const routes: Array<Route> = [
	{ path: 'guest', component: GuestTemplateComponent,
		children: [
			{ path: 'login', component: AuthCardComponent },
			{ path: 'account-created', component: AccountCreatedComponent },


		]
	},
	{ path: '', component: TemplateComponent, canActivate: [ AuthGuardService ], canActivateChild: [ AuthGuardService ],
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{ path: 'products', component: ProductsPageComponent },
			{ path: 'product-details/:id', component: ProductPageComponent, children: [
				{ path: 'activity', component: ProductActivityPageComponent },
				{ path: 'sample', component: ProductSampleComponent },
				{ path: 'technical-details', component: ProductTechDetailsComponent },
				{ path: 'tasks', component: ProductTasksComponent },
				{ path: 'shipping', component: ProductShippingComponent },
				{ path: 'files', component: ProductFilesComponent },
			] },
			{ path: 'tasks', component: TasksPageComponent },
			{ path: 'suppliers', component: SupplierPageComponent },
			{ path: 'events', component: EventPageComponent },
			{ path: 'data-management', component: DataManagementPageComponent },
			{ path: 'team-management', component: TeamManagementPageComponent },
			// TODO: Remove two under this
			{ path: 'test', component: TestComponent, children: [
				{ path: 'inputs-vanilla', component: TestInputsVanillaComponent },
				{ path: 'inputs-selector', component: TestInputsSelectorsComponent },
				{ path: 'inputs-file-image', component: TestInputsFileComponent },
				{ path: 'carousel', component: TestCarouselComponent },
				{ path: 'comments', component: TestCommentsComponent },
				{ path: 'feedback', component: TestFeedbackComponent },
				{ path: 'kanban', component: KanbanTestComponent },
				{ path: 'loaders', component: TestLoadesComponent },
				{ path: 'tabs', component: TestTabsComponent }
			] },
			{ path: 'base', component: BaseComponent }
		]
	},
	{ path: '**', redirectTo: '' }
];
