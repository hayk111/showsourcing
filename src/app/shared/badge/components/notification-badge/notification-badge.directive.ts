import { Directive, Input, OnInit, ElementRef, ViewContainerRef, TemplateRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

export type BadgePosition = 'above-after' | 'above-before' | 'below-after' | 'below-before' | 'before' | 'after';
export type BadgeSize = 's' | 'm' | 'l';
export type BadgeColor = 'primary' | 'accent' | 'warn' | 'success';
let nextId = 0;

@Directive({
	selector: '[notifBadge]',
	host: {
		'class': 'notif-badge',
		'[class.notif-badge-overlap]': 'badgeOverlap',
		'[class.notif-badge-above]': 'isAbove()',
		'[class.notif-badge-below]': '!isAbove()',
		'[class.notif-badge-before]': '!isAfter()',
		'[class.notif-badge-after]': 'isAfter()',
		'[class.notif-badge-s]': 'badgeSize === "s"',
		'[class.notif-badge-m]': 'badgeSize === "m"',
		'[class.notif-badge-l]': 'badgeSize === "l"',
		'[class.notif-badge-hidden]': 'badgeHidden || !_hasContent',
		'[class.notif-badge-disabled]': 'disabled',
	}
})
export class NotificationBadgeDirective implements OnChanges {

	@Input() badge: string;
	@Input() badgeOverlap = true;
	@Input() badgeSize: BadgeSize = 's';
	@Input() badgeHidden = false;
	@Input() badgePosition: BadgePosition = 'above-after';
	/** The color of the badge. Can be `primary`, `accent`, or `warn`. */
	@Input()
	get badgeColor(): BadgeColor { return this._color; }
	set badgeColor(value: BadgeColor) {
		this._color = value;
	}
	private _color: BadgeColor = 'warn';


	private _badgeElement: HTMLElement;
	_hasContent = false;
	_id: number = nextId++;

	constructor(
		private _elementRef: ElementRef,
		private _renderer: Renderer2
	) { }

	ngOnChanges(changes: SimpleChanges) {
		const contentChange = changes.badge;

		if (contentChange) {
			const value = contentChange.currentValue;
			this._hasContent = value != null && `${value}`.trim().length > 0;
			this._updateTextContent();
		}
	}

	/** Whether the badge is above the host or not */
	isAbove(): boolean {
		return this.badgePosition.indexOf('below') === -1;
	}

	/** Whether the badge is after the host or not */
	isAfter(): boolean {
		return this.badgePosition.indexOf('before') === -1;
	}

	getbadgeElement(): HTMLElement | undefined {
		return this._badgeElement;
	}

	/** Injects a span element into the DOM with the content. */
	private _updateTextContent(): HTMLSpanElement {
		if (!this._badgeElement)
			this._badgeElement = this._createBadgeElement();
		else
			this._badgeElement.textContent = this.badge;

		return this._badgeElement;
	}

	/** Creates the badge element */
	private _createBadgeElement(): HTMLElement {
		const badgeElement = this._renderer.createElement('span');
		const activeClass = 'notif-badge-active';
		const contentClass = 'notif-badge-content';
		const backgroundClass = `bg-${this.badgeColor}`;
		const colorClass = 'color-white';

		// Clear any existing badges which may have persisted from a server-side render.
		this._clearExistingBadges(contentClass);
		badgeElement.setAttribute('id', `notif-badge-content-${this._id}`);
		badgeElement.classList.add(contentClass, backgroundClass, colorClass);
		badgeElement.textContent = this.badge;

		this._elementRef.nativeElement.appendChild(badgeElement);
		badgeElement.classList.add(activeClass);


		return badgeElement;
	}

	/** Clears any existing badges that might be left over from server-side rendering. */
	private _clearExistingBadges(cssClass: string) {
		const element = this._elementRef.nativeElement;
		let childCount = element.children.length;

		// Use a reverse while, because we'll be removing elements from the list as we're iterating.
		while (childCount--) {
			const currentChild = element.children[childCount];
			if (currentChild.classList.contains(cssClass))
				element.removeChild(currentChild);
		}
	}

}
