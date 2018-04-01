import { trigger, state, style, transition, animate } from '@angular/animations';

export const animations = [
	trigger('transitionMessages', [
		state('void', style({ opacity: 0, transform: 'translateY(-100%)' })),
		transition('void => *', [
			animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
		]),
	])
];



