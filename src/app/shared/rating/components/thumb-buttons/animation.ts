
import { trigger, state, style, transition, animate } from '@angular/animations';


export const thumbAnimation = [
	trigger('thumbAnimation', [
		state('none', style({})),
		state('up', style({
			color: 'var(--color-primary)',
			transform: 'rotateX(0deg)'
		})),
		state('down', style({
			color: 'var(--color-warn)',
			transform: 'rotateX(180deg)'
		})),
		transition('none => up', animate('400ms ease-in')),
		transition('up => down', animate('400ms ease-in')),
		transition('down => up', animate('400ms ease-in')),
	])
];
