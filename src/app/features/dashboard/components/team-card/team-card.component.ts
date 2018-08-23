import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TeamService, TeamUserService } from '~global-services';
import { TeamUser, Team } from '~models';
import { Observable } from 'rxjs';

@Component({
  selector: 'team-card-app',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent implements OnInit {
  members$: Observable<TeamUser[]>;
  team$: Observable<Team>;

  constructor(
    private teamUserSrv: TeamUserService,
    private teamSrv: TeamService
  ) { }

  ngOnInit() {
    this.members$ = this.teamUserSrv.queryAll();
    this.team$ = this.teamSrv.selectedTeam$;
  }

}
