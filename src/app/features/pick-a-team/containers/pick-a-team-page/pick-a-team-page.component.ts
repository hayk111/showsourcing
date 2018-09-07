import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '~models';
import { TeamService } from '~global-services';
import { switchMap } from 'rxjs/operators';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent extends BaseComponent implements OnInit {
	teams$: Observable<Team[]>;
	form: FormGroup;
	private returnUrl: string;

	constructor(private teamSrv: TeamService, private router: Router, private route: ActivatedRoute) {
    super();
  }

	ngOnInit() {
		this.teams$ = this.teamSrv.teams$;
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
		// go home when team selected
		this.teamSrv.selectedTeam$.pipe(
			switchMap(team => this.router.navigateByUrl(this.returnUrl))
		);
	}

	pickTeam(team: Team) {
		this.teamSrv.pickTeam(team);
	}
}
