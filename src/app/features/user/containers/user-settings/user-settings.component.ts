import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions, User, selectUser } from '~app/entity/store/user';
import { Observable } from 'rxjs';

@Component({
	selector: 'user-settings-app',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit {
	form: FormGroup;
	user$: Observable<User>;

	constructor(private fb: FormBuilder, private store: Store<any>) {
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.email, Validators.required])]
		});
	}

	ngOnInit() {
		this.user$ = this.store.select(selectUser);
	}

	update(propName: string, value: string) {
		this.store.dispatch(UserActions.patch({ propName, value }));
	}

}
