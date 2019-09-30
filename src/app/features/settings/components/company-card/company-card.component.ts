import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Company } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'company-card-app',
	templateUrl: './company-card.component.html',
	styleUrls: ['./company-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyCardComponent extends AutoUnsub implements OnInit {
	@Input() company: Company;
	@Input() form: FormGroup;
	@Input() teamOwner = false;
	@Output() valueChange = new EventEmitter<Company>();
	@Output() addFile = new EventEmitter<any>();
	@Output() changePswd = new EventEmitter<undefined>();

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.company);

		this.form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(team => this.valueChange.emit(team));
	}
}
