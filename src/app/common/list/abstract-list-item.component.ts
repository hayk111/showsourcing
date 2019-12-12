import { EventEmitter, Input, Output } from '@angular/core';
import { AutoUnsub, ID } from '~utils';

export abstract class AbstractListItemComponent<T> extends AutoUnsub {
	@Input() hasSelection = true;
	@Input() selection: Map<string, boolean>;

	@Output() select = new EventEmitter<T>();
	@Output() unselect = new EventEmitter<T>();
	@Output() nameClick = new EventEmitter<T>();

	isSelected(entity: { id: ID }) {
		if (!this.hasSelection)
			return false;

		if (this.selection)
			return this.selection.has(entity.id);

		throw Error(`Selection Input is undefnied`);
	}
}
