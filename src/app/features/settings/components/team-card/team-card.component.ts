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
import { Team } from '~models';
import { InputDirective, phoneValidator } from '~shared/inputs';
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
	/** hidden file input */
	@ViewChild('inpFile', { static: true }) inpFile: ElementRef;
	@ViewChild(InputDirective, { static: true }) input: InputDirective;
	@Output() valueChange = new EventEmitter<Team>();
	@Output() addFile = new EventEmitter<any>();
	@Output() changePswd = new EventEmitter<undefined>();

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
			teamName: ['', Validators.required],
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.team);

		this.form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(team => this.valueChange.emit(team));
	}
}
