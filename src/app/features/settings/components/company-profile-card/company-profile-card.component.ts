import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'company-profile-card-app',
	templateUrl: './company-profile-card.component.html',
	styleUrls: ['./company-profile-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyProfileCardComponent extends AutoUnsub implements OnInit {

	// @Input() item: Company;
	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;
	// @Output() valueChange = new EventEmitter<Company>();

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit() {
		// Uncomment when Company realm is out
		// this.form = new FormGroup(this.fb.group({
		// 	companyName: ['', Validators.required],
		// 	country: ['', Validators.required], // create selector form ma
		// 	address: ['', Validators.required],
		// 	taxId: ['', Validators.required]
		// }).controls, { updateOn: 'blur' });
		// this.form.patchValue(this.item);
		// this.form.valueChanges
		// .pipe(takeUntil(this._destroy$))
		// .subscribe(user => this.valueChange.emit(user));
	}

}
