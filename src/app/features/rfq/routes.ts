import { Route } from '@angular/router';
import {
	NewRequestPageComponent, FillInformationPageComponent,
	ReviewSendPageComponent, ValidationPageComponent,
	RefusePageComponent
} from '~features/rfq/containers';
import { send } from 'q';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'new-request', pathMatch: 'full' },
	{ path: 'new-request', component: NewRequestPageComponent },
	{ path: 'fill-information', component: FillInformationPageComponent },
	{ path: 'review-send', component: ReviewSendPageComponent },
	{ path: 'validation', component: ValidationPageComponent },
	{ path: 'refuse', component: RefusePageComponent }
];
