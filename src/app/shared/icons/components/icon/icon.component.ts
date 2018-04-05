import { Component, OnInit, Input, ViewChild, TemplateRef, Attribute } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as fontawesome from '@fortawesome/fontawesome';
import { ElementRef } from '@angular/core';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
	@Input() name: string;
	@Input() sizePx: number;
	@Input() size: 'xs' | 's' | 'default' | 'l' | 'xl' | 'xxl' = 'default';
	@Input() color = 'inherit';
	// some icons are displayed with a circular background
	@Input() circleSize: number;
	// color is done via css4 var
	@Input() circleColor: string;
	@Input() circleBorderSize: number;
	@Input() circleBorderColor: string;
	// type solid by default https://fontawesome.com/icons/heart?style=regular
	private _type = 's';
	// symbols give perf gains but are less configurable
	@Input() useSymbol = true;
	// whether font-awesome is used or not
	@Input() fontSet: 'fa' | 'icomoon' | 'svg' = 'icomoon';
	@ViewChild('icon') icon: TemplateRef<any>;

	constructor(elementRef: ElementRef, @Attribute('aria-hidden') ariaHidden: string) {
		// If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
		// the right thing to do for the majority of icon use-cases.
		if (!ariaHidden) {
			elementRef.nativeElement.setAttribute('aria-hidden', 'true');
		}
	}

	ngOnInit() {
		if (!this.useSymbol) fontawesome.dom.i2svg(this.icon.elementRef.nativeElement);
	}

	@Input()
	set type(type: string) {
		// input is either solid regular or light
		// we want the accronym s | r | l
		this._type = type.charAt(0);
	}

	get type() {
		return this._type;
	}

	get style() {
		return {
			color: this.color === 'inherit' ? this.color : 'var(--color-' + this.color + ')',
			// background is used for circle
			background: this.circleColor ? 'var(--color-' + this.circleColor + ')' : 'transparent',
			'font-size': this.sizePx ? this.sizePx + 'px' : 'var(--font-size-' + this.size + ')',
			height: this.circleSize + 'px',
			width: this.circleSize + 'px',
			border: this.circleBorderSize
				? this.circleBorderSize + 'px solid var(--color-' + this.circleBorderColor + ')'
				: 'none',
		};
	}

}
