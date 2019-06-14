import {
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
import { ERM } from '~core/models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { TabFocusDirective } from '~shared/utils';

@Component({
	selector: 'input-selector-app',
	templateUrl: './input-selector.component.html',
	styleUrls: ['./input-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputSelectorComponent)],
})
export class InputSelectorComponent extends AbstractInput implements OnInit {

	@Input() value: any;

	@Input() type: string;
	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() width: number;
	// wether we display a info-badge-app or just plain tex
	@Input() hasBadge = false;
	@Output() update = new EventEmitter<any>();

	@ViewChild('oneValueLabel') oneLabel: TemplateRef<any>;
	@ViewChild('multipleValuesLabel') manyLabel: TemplateRef<any>;
	@ViewChild('switchType') switchType: TemplateRef<any>;
	@ViewChild(TabFocusDirective) tab: TabFocusDirective;

	// wether the value is a literal string or an Object e.g.(harbour vs category)
	isEntity = true;
	erm = ERM;

	constructor(private cdr: ChangeDetectorRef) {
		super(cdr);
	}

	ngOnInit() {
		switch (this.type) {
			case 'length unit':
			case 'weight unit':
			case 'harbour':
			case 'inco term':
			case 'country':
				this.isEntity = false;
				break;
		}
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

}
