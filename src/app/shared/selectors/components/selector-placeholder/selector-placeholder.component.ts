import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';

@Component({
	selector: 'selector-placeholder-app',
	templateUrl: './selector-placeholder.component.html',
	styleUrls: ['./selector-placeholder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.tabindex]': '0',
		'[class.readonly]': 'readonly'
	}
})
export class SelectorPlaceholderComponent implements OnInit {
	@Input() placeholder: string;
	@Input() hasArrow = true;
	@Input() readonly = false;

	// if we are using transclusion on this component, we must give to the transcluded child the #content (id)
	@ContentChild('content', { static: false }) content: ElementRef;

	constructor() { }

	ngOnInit() {
	}

}
