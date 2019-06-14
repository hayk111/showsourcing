import {
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';

@Component({
	selector: 'selector-placeholder-app',
	templateUrl: './selector-placeholder.component.html',
	styleUrls: ['./selector-placeholder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.tabindex]': '0'
	}
})
export class SelectorPlaceholderComponent implements OnInit {

	@Input() name: string;
	@Input() placeholder: string;
	@Input() hasArrow = true;

	// if we are using transclusion on this component, we must give to the transcluded child the #content (id)
	@ContentChild('content') content: ElementRef;

	constructor() { }

	ngOnInit() {
	}

}
