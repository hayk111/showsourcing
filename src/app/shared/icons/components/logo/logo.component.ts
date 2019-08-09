import { Component, ChangeDetectionStrategy, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AppImage, EntityName } from '~models';
import { Colors, Color } from '~utils';


export const colorMap = {
	[EntityName.CATEGORY]: Color.ACCENT,
	[EntityName.COMMENT]: Color.PRIMARY,
	[EntityName.CONTACT]: Color.SECONDARY,
	[EntityName.EVENT]: Color.SECONDARY,
	[EntityName.PRODUCT]: Color.PRIMARY,
	[EntityName.PROJECT]: Color.SECONDARY,
	[EntityName.SAMPLE]: Color.ACCENT,
	[EntityName.TAG]: Color.SECONDARY,
	[EntityName.TASK]: Color.SUCCESS,
	[EntityName.SUPPLIER]: Color.VIBRANT,
};

type Sizes = 's' | 'm' | 'l' | 'xl';

@Component({
	selector: 'logo-app',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		// colors
		'[class.primary]': 'color === "primary"',
		'[class.secondary]': 'color === "secondary"',
		'[class.warn]': 'color === "warn"',
		'[class.success]': 'color === "success"',
		'[class.accent]': 'color === "accent"',
		'[class.vibrant]': 'color === "vibrant"',
		// circle
		'[class.circle]': 'circle === true',
		// size
		'[class.size-s]': 'size === "s"',
		'[class.size-m]': 'size === "m"',
		'[class.size-l]': 'size === "l"',
		'[class.size-xl]': 'size === "xl"',
	}
})
export class LogoComponent {
	/** we can supply an image to override the icon */
	@Input() logo: AppImage;
	/** type of entity so we can display its icon */
	@Input() type: EntityName;
	/** size of icon that can be overriden */
	@Input() iconSize: number;
	/** whether the background is a circle */
	@Input() circle: boolean;
	/** whether a background is displayed */
	@Input() background = true;

	// getset to override the color if type is specified
	/** displayed color */
	@Input()
	set color(color: Colors) { this._color = color; }
	get color() {
		if (this._color)
			return this._color;
		if (colorMap[this.type])
			return colorMap[this.type];
		throw Error('no color or type specified in logo');
	}
	private _color: Colors;

	/** size of the logo (background included) */
	@Input()
	set size(size: number | Sizes) {
		this._size = size;
		this.refreshSize();
	}
	get size() {
		return this._size;
	}
	private _size: number | Sizes = 'm';

	constructor(
		private elRef: ElementRef,
		private renderer: Renderer2
	) {}

	private refreshSize() {
		const value = parseInt(this.size as any);
		if (Number.isInteger(value)) {
			const el = this.elRef.nativeElement;
			this.renderer.setStyle(el, 'height', `${value}px`);
			this.renderer.setStyle(el, 'width', `${value}px`);
		}
	}
}
