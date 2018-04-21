import { Component, OnInit, Input, ViewChild, TemplateRef, Attribute } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as fontawesome from '@fortawesome/fontawesome';
import { ElementRef } from '@angular/core';
import { FontSet } from '../font-set.enum';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
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
