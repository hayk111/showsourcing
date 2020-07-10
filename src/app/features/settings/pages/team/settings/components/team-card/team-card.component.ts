import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	OnChanges,
	Output,
	SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { Team } from '~core/erm3';
import { UserService } from '~core/auth';

@Component({
	selector: 'team-card-app',
	templateUrl: './team-card.component.html',
	styleUrls: ['./team-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent extends AutoUnsub implements OnInit, OnChanges {
	@Input() team: Team;
	@Input() form: FormGroup;
	@Output() valueChange = new EventEmitter<Team>();
	@Output() addFile = new EventEmitter<any>();
	@Output() changePswd = new EventEmitter<undefined>();

	private teamNameInput: FormControl;

	constructor(private fb: FormBuilder, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.teamNameInput = new FormControl({
			value: ''
		}, Validators.required);
		this.form = new FormGroup(this.fb.group({
			teamName: this.teamNameInput
		}).controls, { updateOn: 'blur' });

		this.form.patchValue({
			teamName: this.team ? this.team.name : ''
		});

		this.form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(team => this.valueChange.emit(team));
	}

	ngOnChanges({ team }: SimpleChanges) {
		if (team.currentValue && team.currentValue.ownerUserId !== UserService.userId ) {
			this.form.controls.teamName.disable();
		}
	}
}
