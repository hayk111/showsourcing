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
})
export class SelectorPlaceholderComponent implements OnInit {

	@Input() name: string;
	@Input() placeholder: string;
	@Input() hasArrow = true;
	@Output() enter = new EventEmitter<null>();
	// if we are using transclusion on this component, we must give to the transcluded child the #content (id)
	@ContentChild('content') content: ElementRef;

	constructor() { }

	ngOnInit() {
	}

	onEnter(item) {
		console.log('we are entering: ', item);
	}

}
