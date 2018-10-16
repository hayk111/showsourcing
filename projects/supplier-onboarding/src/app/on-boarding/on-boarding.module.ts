import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import {
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent
} from "./components";
import { SharedModule } from "~shared/shared.module";

const comps = [
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent
];

import {
	FindBusinessComponent,
	WelcomeComponent,
	AddressComponent,
	BusinessTypeComponent,
	CategoryComponent,
	BusinessDescriptionComponent,
	ContactDetailsComponent
} from './components';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: comps,
	exports: comps
})
export class OnBoardingModule { }
