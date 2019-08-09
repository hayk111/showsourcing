import { Component, ChangeDetectionStrategy, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AppImage, EntityName } from '~models';
import { Colors, Color } from '~utils';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
		'class': 'flexCenter',
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
	/** whether the background is a circle */
	@Input() circle: boolean;
	/** whether a background is displayed */
	@Input() background = true;
	/** size of the logo (background included) */
	@Input() size: number | Sizes = 'm';
	/** size of icon that can be overriden */
	@Input() iconSize: number | Sizes;

	// getset to override the color if type is specified
	/** displayed color */
	@Input() color: Colors;

	constructor(
		private elRef: ElementRef,
		private renderer: Renderer2
	) {}

	ngOnChange() {
		this.renderContainerSize();
		this.iconSize = this.computeIconSize();
		this.color = this.computeColor();
	}

	private computeColor() {
		if (this.color)
			return this.color;
		if (colorMap[this.type])
			return colorMap[this.type];
		throw Error('no color or type specified in logo');
	}

	private computeIconSize() {
		if (this.iconSize) {
			return this.iconSize;
		}
		switch (this.size) {
			case 'm': return 16;
			case 'l': return 23;
			case 'xl': return 40;
		}
	}

	private renderContainerSize() {
		const value = parseInt(this.size as any);
		const el = this.elRef.nativeElement;
		if (Number.isInteger(value)) {
			this.renderer.setStyle(el, 'height', `${value}px`);
			this.renderer.setStyle(el, 'width', `${value}px`);
		} else {
			this.renderer.removeStyle(el, 'height');
			this.renderer.removeStyle(el, 'width');
		}
	}
}
