import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Team } from '~models';
import { TeamService } from '~global-services';
import { switchMap, tap } from 'rxjs/operators';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';


@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent extends TrackingComponent implements OnInit {
	teams$: Observable<Team[]>;
	pending$ = new BehaviorSubject<boolean>(false);
	form: FormGroup;
	private returnUrl: string;

	constructor(private teamSrv: TeamService, private router: Router, private route: ActivatedRoute) {
		super();
	}

	ngOnInit() {
		this.teams$ = this.teamSrv.queryMany({ query: 'status == "active"', take: 0 });
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

	pickTeam(team: Team) {
		this.pending$.next(true);
		this.teamSrv.pickTeam(team)
			.subscribe(_ => this.router.navigateByUrl(this.returnUrl));
	}
}
