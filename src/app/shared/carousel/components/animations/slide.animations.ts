
import { trigger, style, state, transition, animate } from '@angular/animations';


export const slideAnimation = [
		trigger('slideAnimationTrigger', [
			state('inactive', style({
				opacity: 0,
			})),
			state('active', style({
				opacity: 1,
			})),
			transition('inactive => active', animate('300ms ease-in')),
			transition('active => inactive', animate('300ms ease-in')),
	]),
];

