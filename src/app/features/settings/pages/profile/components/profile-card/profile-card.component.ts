import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { User } from '~core/orm/models';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'profile-card-app',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent extends AutoUnsub implements OnInit {
	@Input() user: User;
	@Input() form: FormGroup;
	/** hidden file input */
	@ViewChild('inpFile', { static: true }) inpFile: ElementRef;
	@ViewChild(InputDirective, { static: true }) input: InputDirective;
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
			email: ['', [Validators.email, Validators.required]]
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.user);

		this.form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(user => this.valueChange.emit(user));
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

}
