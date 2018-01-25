import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { selectUser } from '../../../../store/selectors/entities/user.selector';
import { selectTeams } from '../../../../store/selectors/entities/teams.selector';
import { User } from '../../../../store/model/entities/user.model';
import { Team } from '../../../../store/model/entities/team.model';

@Component({
	selector: 'user-info-app',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
	user$: Observable<User>;
	team$: Observable<Team>;
	panelVisible = false;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.user$ = this.store.select(selectUser);
		const teams$ = this.store.select(selectTeams);
		this.team$ = combineLatest(this.user$, teams$, (user, teams) => {
			return teams.byId[user.currentTeamId];
		});
	}

	openPanel() {
		this.panelVisible = true;
	}

	closePanel() {
		this.panelVisible = false;
	}
}
