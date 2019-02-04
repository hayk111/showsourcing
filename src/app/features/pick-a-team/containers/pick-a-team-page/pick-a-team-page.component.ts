import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApolloStateService, TeamClientInitializer } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { TeamService } from '~entity-services';
import { Team } from '~models';
import { TrackingComponent } from '~utils/tracking-component';


@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss', '../../../auth-pages/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent extends TrackingComponent implements OnInit {
	teams$: Observable<Team[]>;
	pending$ = new BehaviorSubject<boolean>(false);
	form: FormGroup;
	private returnUrl: string;

	constructor(
		private teamSrv: TeamService,
		private router: Router,
		private route: ActivatedRoute,
		private apolloState: ApolloStateService,
		private teamClient: TeamClientInitializer
	) {
		super();
	}

	ngOnInit() {
		this.teamSrv.resetSelectedTeam();
		this.teams$ = this.teamSrv.queryMany({ query: 'status == "active"', take: 0 });
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

	pickTeam(team: Team) {
		this.pending$.next(true);
		this.teamClient.setPending('switching team / no team selected');
		this.teamSrv.pickTeam(team).pipe(
			// we need to wait for the team client to be ready
			switchMap(_ =>
				this.apolloState.getClientWhenReady(
					Client.TEAM,
					'selecting team waiting for client'
				)
			),
		).subscribe(_ => this.router.navigateByUrl(this.returnUrl));
	}
}
