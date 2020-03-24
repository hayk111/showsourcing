import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { AppImage, EntityName } from '~core/erm';
import { Colors, Color, IconUtils, log, Size } from '~utils';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'logo-app',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'class': 'flexCenter',
		'[class.circle]': 'circle === true',
	}
})
export class LogoComponent implements OnChanges {
	/** we can supply an image to override the icon */
	@Input() logo: AppImage;
	/** typename of entity so we can display its icon */
	@Input() typename: Typename;
	/** whether the background is a circle */
	@Input() circle: boolean;
	/** size of the logo (background included) */
	@Input() size: Size = 'm';
	/** size of icon that can be overriden */
	@Input() iconSize: number;
	/** size of background that can be overriden */
	@Input() backgroundSize: number;
	/** to override the default icon given by typename */
	@Input() icon: string;
	// getset to override the color if typename is specified
	/** displayed color */
	@Input() color: Colors;
	// override the background color if typename is specified
	@Input() backgroundColor: Colors;

	constructor(
		private elRef: ElementRef,
		private renderer: Renderer2
	) { }

	ngOnChanges() {
		this.renderContainerSize();
		this.renderColor();
		if (!this.typename) {
			log.error('No typename specified in logo');
		}
	}

	get computedIcon() {
		return this.icon || IconUtils.iconsMap[this.typename];
	}

	private renderColor() {
		const el: HTMLElement = this.elRef.nativeElement;
		const found = Array.from(el.classList).find(className => className.startsWith('color-'));
		this.renderer.removeClass(el, found);
		this.renderer.addClass(el, 'color-' + this.getComputedColor());

		if (this.backgroundColor) {
			this.renderer.setStyle(el, 'background', 'var(--color-' + this.backgroundColor + ')');
		}
	}

	private getComputedColor() {
		if (this.color)
			return this.color;
		if (IconUtils.iconsColorMap[this.typename])
			return IconUtils.iconsColorMap[this.typename];
		throw Error('no color or typename specified in logo');
	}

	private renderContainerSize() {
		const backgroundSize = this.getComputedBgSize();
		const iconSize = this.getComputedIconSize();
		const el = this.elRef.nativeElement;
		this.renderer.setStyle(el, 'height', `${backgroundSize}px`);
		this.renderer.setStyle(el, 'width', `${backgroundSize}px`);
		this.renderer.setStyle(el, 'font-size', `${iconSize}px`);
	}

	private getComputedBgSize() {
		return this.backgroundSize || this.getComputedSize().background;
	}

	private getComputedIconSize() {
		return this.iconSize || this.getComputedSize().icon;
	}

	private getComputedSize() {
		if (IconUtils.iconsSizeMap[this.size])
			return IconUtils.iconsSizeMap[this.size];
		throw Error(`${this.size} is not a valid size`);
	}
}
