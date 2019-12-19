
import { trigger, style, state, transition, animate } from '@angular/animations';


export const slideAnimation = [
	trigger('slideAnimationTrigger', [
		state('inactive', style({
			opacity: 0,
		})),
		state('active', style({
			opacity: 1,
		})),
		transition('inactive => active', animate('200ms ease-in')),
		transition('active => inactive', animate('200ms ease-in')),
	]),
];

