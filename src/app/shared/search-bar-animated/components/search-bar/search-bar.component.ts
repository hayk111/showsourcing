import { ChangeDetectionStrategy, Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { makeAccessorProvider, AbstractInput } from '~shared/inputs';


@Component({
	selector: 'search-bar-app',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SearchBarComponent)],
	host: {
		'(click)': 'onClick()'
	}
})
export class SearchBarComponent extends AbstractInput {
	focussed = false;
	@Output() search = new EventEmitter<string>();

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	onBlur() {
		this.onTouchedFn();
		this.focussed = false;
	}

	onChange(value: string) {
		this.onChangeFn(value);
		this.search.emit(value);
	}

	onClick() {
		this.focussed = true;
	}
}
