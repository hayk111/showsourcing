import { Route } from '@angular/router';
import { HomeComponent } from '~app/components/home/home.component';
import { AuthCardComponent, AuthGuardService } from '~auth';

export const routes: Array<Route> = [
	{ path: 'login', component: AuthCardComponent },
	{
		path: '',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		children: [{ path: '', redirectTo: 'home', pathMatch: 'full' }, { path: 'home', component: HomeComponent }],
	},
	{ path: '**', redirectTo: '' },
];
