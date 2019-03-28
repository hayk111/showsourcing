import { Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { AbstractInput } from '~shared/inputs';
import { NgSelectComponent } from '@ng-select/ng-select';
import { SelectorDeprecatedComponent } from '~deprecated/selector-deprecated/selector-deprecated.component';


export class CustomSelector<G> extends AbstractInput {

	@Input() value: G;
	@Input() multiple = false;
	@Output() select = new EventEmitter<G>();
	@ViewChild('selector') selector: SelectorDeprecatedComponent | NgSelectComponent;
	choices = [];

	open() {
		if (this.selector)
			this.selector.open();
	}

	onSelect(value: G) {
		this.select.emit(value);
		this.value = value;
		// to notify the formControl we need to call this
		this.onChangeFn(value);
	}

}
