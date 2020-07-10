import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityName, Project, Tag } from '~core/erm';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs/components-directives';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'input-badge-selector-app',
	templateUrl: './input-badge-selector.component.html',
	styleUrls: ['./input-badge-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputBadgeSelectorComponent)]
})
export class InputBadgeSelectorComponent extends AbstractInput {

	private _value;
	@Input() set value(items: Tag[] | Project[]) {
		this._value = items;
	}
	get value() {
		return this._value;
	}
	@Input() typename: Typename; // should be only 'Tag' | 'Project';
	// wheter the selector opens to the most right side or the most left side
	@Input() leftSideOrientationSelector = false;
	@Output() change = new EventEmitter<Tag[] | Project[]>();

	constructor(protected cd: ChangeDetectorRef) { super(cd); }

	onUpdate(result: Tag[] | Project[]) {
		this.value = result;
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}

}
