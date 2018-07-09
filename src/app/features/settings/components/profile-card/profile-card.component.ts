import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '~models';
import { InputDirective, phoneValidator } from '~shared/inputs';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'profile-card-app',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent extends AutoUnsub implements OnInit {

	@Input() item: User;
	@Input() form: FormGroup;
	/** hidden file input */
	@ViewChild('inpFile') inpFile: ElementRef;
	@ViewChild(InputDirective) input: InputDirective;
	@Output() valueChange = new EventEmitter<User>();
	@Output() addFile = new EventEmitter<any>();
	@Output() changePswd = new EventEmitter<undefined>();

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.email, Validators.required])],
			phoneNumber: ['', Validators.compose([phoneValidator, Validators.required])]
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.item);
		this.form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(user => this.valueChange.emit(user));
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

}
