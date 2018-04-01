import { trigger, state, style, transition, animate } from '@angular/animations';

export const animation = [
	trigger('searchAnimation', [
		state(
			'shrinked',
			style({
				width: '0%',
				opacity: 0,
			})
		),
		state(
			'expanded',
			style({
				width: '100%',
				opacity: 1,
			})
		),
		transition('expanded => shrinked', [
			animate('200ms ease-in-out'),
		]),
		transition('shrinked => expanded', [
			animate('200ms ease-in-out'),
		]),
	]),
];
