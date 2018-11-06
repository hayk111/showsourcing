import { Route } from '@angular/router';
import {
	NewRequestPageComponent, FillInformationPageComponent,
	ReviewSendPageComponent, ValidationPageComponent
} from '~features/rfq/containers';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'new-request', pathMatch: 'full' },
	{ path: 'new-request', component: NewRequestPageComponent },
	{ path: 'fill-information', component: FillInformationPageComponent },
	{ path: 'review-send', component: ReviewSendPageComponent },
	{ path: 'validation', component: ValidationPageComponent }
];
