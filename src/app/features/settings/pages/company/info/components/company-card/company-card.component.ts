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
import { Company } from '~core/orm/models';
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
	@Input() companyOwner = false;
	@Output() valueChange = new EventEmitter<Company>();
	@Output() addFile = new EventEmitter<any>();
	@Output() changePswd = new EventEmitter<undefined>();

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
			name: new FormControl({value: this.company.name, disabled: !this.companyOwner}),
			companyOwner: new FormControl({value: this.company.owner.firstName + ' ' + this.company.owner.lastName,
				disabled: !this.companyOwner}),
			currentPlan: new FormControl({value: '', disabled: !this.companyOwner}), // TODO Backend add field
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.company);

		this.form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(team => this.valueChange.emit(team));
	}
}
