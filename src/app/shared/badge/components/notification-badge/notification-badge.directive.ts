import { Directive, Input, OnInit, ElementRef, ViewContainerRef, TemplateRef } from '@angular/core';

export type BadgePosition = 'above-after' | 'above-before' | 'below-after' | 'below-before' | 'before' | 'after';

@Directive({
	selector: '[notifBadge]'
})
export class NotificationBadgeDirective implements OnInit {

	@Input() badge: string;
	@Input() badgeOverlap = true;
	@Input() badgeSize: 'l' | 'm' | 's' = 'm';
	@Input() badgeHidden = false;
	@Input() badgePosition: BadgePosition = 'above-after';

	constructor(private element: ElementRef) { }

	ngOnInit() {

	}

}
