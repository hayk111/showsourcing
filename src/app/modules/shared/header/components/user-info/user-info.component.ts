import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { User } from '../../../../store/model/user.model';
import { selectUser } from '../../../../store/selectors/user.selector';
import { Team } from '../../../../store/model/team.model';
import { selectTeams } from '../../../../store/selectors/teams.selector';

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
