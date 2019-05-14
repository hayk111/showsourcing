import { Directive, Input, OnInit, ElementRef } from '@angular/core';

export type BadgePosition = 'above-right' | 'above-left' | 'below-right' | 'below-left' | 'left' | 'right';

@Directive({
	selector: '[notifBadge]'
})
export class NotificationBadgeDirective implements OnInit {

	@Input() badge: string;
	@Input() badgeOverlap = true;
	@Input() badgeSize: 'l' | 'm' | 's' = 'm';
	@Input() badgeHidden = false;
	@Input() badgePosition: BadgePosition = 'above-right';

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {

	}

}
