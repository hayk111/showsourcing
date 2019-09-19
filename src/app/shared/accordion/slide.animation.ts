import { trigger, state, style, transition, animate } from '@angular/animations';

const styleIn = style({ opacity: 1, 'max-height': '1000px' });
const styleOut = style({ opacity: 0, 'max-height': '0px' });

export const slideAnimation = [
	trigger('slideAnimationTrigger', [
		transition(':enter', [
			styleOut,
			animate('400ms ease-in', styleIn)
		]),
		transition(':leave', [
			styleIn,
			animate('400ms ease-out', styleOut)
		]),
	])
];
