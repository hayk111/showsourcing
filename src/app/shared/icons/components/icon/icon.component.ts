import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
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
	@Input() color = 'icon';
	// some icons are displayed with a circular background
	@Input() circleSize: number;
	// color is done via css4 var
	@Input() circleColor: string;
	@Input() circleBorderSize: number;
	@Input() circleBorderColor: string;
	// type solid by default https://fontawesome.com/icons/heart?style=regular
	private _type: string = 's';
	// symbols give perf gains but are less configurable
	@Input() useSymbol = true;
	// whether font-awesome is used or not
	@Input() fa = false;
	@ViewChild('icon') icon: TemplateRef<any>;

	constructor() {}

	ngOnInit() {
		if (this.icon) fontawesome.dom.i2svg(this.icon.elementRef.nativeElement);
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
