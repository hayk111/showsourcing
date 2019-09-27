import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { EntityName, Project, Tag } from '~core/models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs/components-directives';

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
	@Input() type: EntityName.TAG | EntityName.PROJECT;
	// position of the selector in case we need a special one
	@Input() offsetX = 0;
	@Input() offsetY = -28;
	// wheter the selector opens to the most right side or the most left side
	@Input() leftSideOrientationSelector = false;
	@Input() isBadgeStyle = true;
	@Output() change = new EventEmitter<Tag[] | Project[]>();

	@ViewChild('badgeStyle', { static: true }) badgeTemplate: TemplateRef<any>;
	@ViewChild('textStyle', { static: true }) textTemplate: TemplateRef<any>;

	constructor(protected cd: ChangeDetectorRef) { super(cd); }

	getTemplate() {
		return this.isBadgeStyle ? this.badgeTemplate : this.textTemplate;
	}

	onUpdate(result: Tag[] | Project[]) {
		this.value = result;
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}

}
