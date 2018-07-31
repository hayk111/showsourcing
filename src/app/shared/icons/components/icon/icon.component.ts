import { Attribute, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { FontSet } from '~shared/icons/components/font-set.enum';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexCenter]': 'true',
		'[class.xs]': 'size === \'xs\'',
		'[class.s]': 'size === \'s\'',
		'[class.m]': 'size === \'m\'',
		'[class.l]': 'size === \'l\''
	}
})
export class IconComponent {
	@Input() size: 'xs' | 's' | 'm' | 'l' = 's';
	@Input() name: string;
	// type solid by default https://fontawesome.com/icons/heart?style=regular
	@Input() type: 's' | 'r' | 'l' = 's';
	// symbols give perf gains but are less configurable
	// the fontset used, could be font awesome, svg or anything else added
	@Input() fontSet: FontSet = FontSet.FA;

	constructor(elementRef: ElementRef, @Attribute('aria-hidden') ariaHidden: string) {
		// If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
		// the right thing to do for the majority of icon use-cases.
		if (!ariaHidden) {
			elementRef.nativeElement.setAttribute('aria-hidden', 'true');
		}
	}



}
