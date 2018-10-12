
import { trigger, state, style, transition, animate } from '@angular/animations';


export const selectionBarAnimation = [
	trigger('selectionBarTrigger', [

		transition(':enter', [
			style({
				opacity: 0,
				transform: 'translateY(65px)'
			}),
			animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
		]),

		transition(':leave', [
			animate('300ms', style({
				opacity: 0,
				transform: 'translateY(65px)'
			}))
		])

	])
];

