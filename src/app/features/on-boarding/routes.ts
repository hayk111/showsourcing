import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FindBusinessComponent } from './components';

export const routes: Routes = [
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: 'welcome', component: WelcomeComponent },
	{ path: 'find-business', component: FindBusinessComponent }
];
