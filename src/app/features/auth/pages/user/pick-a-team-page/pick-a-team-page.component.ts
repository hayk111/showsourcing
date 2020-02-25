import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Team, EntityName } from '~core/erm';
import { TrackingComponent } from '~utils/tracking-component';
import { TeamService } from '~core/auth';
import { ApiService } from '~core/erm3/services/api.service';


@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss', '../../../shared/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent extends TrackingComponent implements OnInit {
	teams$: Observable<Team[]>;
	pending$ = new BehaviorSubject<boolean>(false);
	form: FormGroup;
	private returnUrl: string;

	constructor(
		private teamSrv: TeamService,
		private apiSrv: ApiService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		super();
	}

	ngOnInit() {
		this.teamSrv.resetSelectedTeam();
		this.teams$ = this.apiSrv.queryAll<Team>(EntityName.TEAM).data$;
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

	pickTeam(team: Team) {
		this.pending$.next(true);
		this.teamSrv.pickTeam(team).pipe(
			tap(_ => this.pending$.next(false)),
		).subscribe(_ => this.router.navigateByUrl(this.returnUrl));
	}
}
