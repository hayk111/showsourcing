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
import { Team } from '~core/orm/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'team-card-app',
	templateUrl: './team-card.component.html',
	styleUrls: ['./team-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent extends AutoUnsub implements OnInit {
	@Input() team: Team;
	@Input() form: FormGroup;
	@Input() teamOwner = false;
	@Output() valueChange = new EventEmitter<Team>();
	@Output() addFile = new EventEmitter<any>();
	@Output() changePswd = new EventEmitter<undefined>();

	private teamNameInput: FormControl;

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit() {
		this.teamNameInput = new FormControl({value: '', disabled: !this.teamOwner}, Validators.required);
		this.form = new FormGroup(this.fb.group({
			teamName: this.teamNameInput
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.team);

		this.form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(team => this.valueChange.emit(team));
	}
}
