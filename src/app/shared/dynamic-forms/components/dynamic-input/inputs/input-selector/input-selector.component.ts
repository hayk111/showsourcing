import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { ERM } from '~core/erm';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { TabFocusActionDirective } from '~shared/utils';
import { ID } from '~utils';

@Component({
	selector: 'input-selector-app',
	templateUrl: './input-selector.component.html',
	styleUrls: ['./input-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputSelectorComponent)],
})
export class InputSelectorComponent extends AbstractInput implements OnInit, AfterViewInit {

	@Input() value: any;

	@Input() type: string;
	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() width: number;
	@Input() autofocus = false;
	@Input() placeholder: string;
	// if the parent component has a label in order to translate in case placeholder is missing, just for translate placeholder purposes
	// some translations of type we find it in 'text' translations, this way we can choose what to display
	@Input() translationKey: 'placeholder' | 'text' = 'placeholder';
	// wether we display a info-badge-app or just plain tex
	@Input() hasBadge = false;
	@Input() disabled = false;
	@Input() definitionReference: ID;
	@Output() update = new EventEmitter<any>();

	@ViewChild('oneValueLabel', { static: true }) oneLabel: TemplateRef<any>;
	@ViewChild('multipleValuesLabel', { static: true }) manyLabel: TemplateRef<any>;
	@ViewChild('switchType', { static: true }) switchType: TemplateRef<any>;
	@ViewChild(TabFocusActionDirective, { static: false }) tab: TabFocusActionDirective;

	// wether the value is a literal string or an Object e.g.(harbour vs category)
	isEntity = true;
	erm = ERM;

	constructor(private cdr: ChangeDetectorRef) {
		super(cdr);
	}

	ngOnInit() {
		switch (this.type) {
			case ERM.LENGTH_UNIT.singular:
			case ERM.WEIGHT_UNIT.singular:
			case ERM.HARBOUR.singular:
			case ERM.INCO_TERM.singular:
			case ERM.COUNTRY.singular:
				this.isEntity = false;
				break;
		}
	}

	ngAfterViewInit() {
		if (this.autofocus && this.tab)
			this.tab.focus();
	}

	onChange(value: any) {
		this.value = value;
		this.onChangeFn(this.value);
		this.update.emit(this.value);
	}

	getLabelTemplate() {
		return this.multiple ? this.manyLabel : this.oneLabel;
	}

	onValueChange(item) {
		this.onChange(item);
	}

	trackByFn(index, value) {
		return index;
	}

}
