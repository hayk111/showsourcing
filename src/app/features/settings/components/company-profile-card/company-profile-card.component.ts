import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutoUnsub } from '~utils';
import { InputDirective } from '~shared/inputs';
import { takeUntil } from 'rxjs/operators';

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
