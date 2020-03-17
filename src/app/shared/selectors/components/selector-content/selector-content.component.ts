import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityMetadata } from '~core/erm';
import { InputDirective } from '~shared/inputs';
import { SelectorsService } from '~shared/selectors/services/selectors.service';

@Component({
	selector: 'selector-content-app',
	templateUrl: './selector-content.component.html',
	styleUrls: ['./selector-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorContentComponent implements OnInit {

	@Input() hasSearch = true;
	@Input() searchText = '';
	@Input() type: EntityMetadata;
	@Output() onInput = new EventEmitter<string>();
	@Output() onKeydown = new EventEmitter<KeyboardEvent>();
	@Output() close = new EventEmitter<null>();
	@Output() resetInput = new EventEmitter<null>();

	@ViewChild(InputDirective, { static: true }) inp: InputDirective;

	group: FormGroup;

	constructor(private selectorSrv: SelectorsService, private fb: FormBuilder) { }

	ngOnInit() {
		this.group = this.fb.group({
			name: ['']
		});
		this.onResetInput();
	}

	onResetInput() {
		if (this.hasSearch) {
			this.inp.control.reset();
			this.inp.focus();
			this.selectorSrv.search('');
		}
	}

}
