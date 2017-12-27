import { Route } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { TemplateComponent } from '../template/components/template/template.component';
import { GuestTemplateComponent } from '../template/components/guest-template/guest-template.component';
import { InfoRequestComponent } from '../../features/info-request/components/info-request/info-request.component';
import { HomeComponent } from '../../features/home/components/home/home.component';
import { TestComponent } from '../../features/test/test/test.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { InfoRequestThanksComponent } from '../../features/info-request/components/info-request-thanks/info-request-thanks.component';
import { InfoRequestStepperComponent } from '../../features/info-request/components/info-request-stepper/info-request-stepper.component';
import { AccountCreatedComponent } from '../auth/components/account-created/account-created.component';
import { AuthCardComponent } from '../auth/components/auth-card/auth-card.component';
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

export const routes: Array<Route> = [
	{ path: 'guest', component: GuestTemplateComponent,
		children: [
			{ path: 'info-request', children: [
				{ path: 'thanks', component: InfoRequestThanksComponent },
				{ path: 'stepper/:token', component: InfoRequestStepperComponent }
			]},
			{ path: 'login', component: AuthCardComponent },
			{ path: 'account-created', component: AccountCreatedComponent },


		]
	},
	{ path: '', component: TemplateComponent, canActivate: [ AuthGuardService ], canActivateChild: [ AuthGuardService ],
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{ path: 'products', component: ProductsPageComponent },
			{ path: 'tasks', component: TasksPageComponent },
			{ path: 'suppliers', component: SupplierPageComponent },
			{ path: 'events', component: EventPageComponent },
			// TODO: Remove two under this
			{ path: 'test', component: TestComponent, children: [
				{ path: 'inputs-vanilla', component: TestInputsVanillaComponent },
				{ path: 'inputs-selector', component: TestInputsSelectorsComponent },
				{ path: 'inputs-file-image', component: TestInputsFileComponent },
				{ path: 'carousel', component: TestCarouselComponent },
				{ path: 'comments', component: TestCommentsComponent },
				{ path: 'feedback', component: TestFeedbackComponent }
			] },
			{ path: 'base', component: BaseComponent }
		]
	},
	{ path: '**', redirectTo: '' }
];
