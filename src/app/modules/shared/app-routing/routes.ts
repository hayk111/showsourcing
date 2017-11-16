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
			// TODO: Remove two under this
			{ path: 'test', component: TestComponent },
			{ path: 'base', component: BaseComponent }
		]
	},
	{ path: '**', redirectTo: '' }
];
