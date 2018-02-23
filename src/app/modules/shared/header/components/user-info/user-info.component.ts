import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { User } from '../../../../user/models/user.model';
import { selectUser } from '../../../../user/store/selectors/user.selector';
import { Team } from '../../../../store/model/entities/team.model';
import { selectTeams } from '../../../../store/selectors/entities/teams.selector';

@Component({
	selector: 'user-info-app',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
	user$: Observable<User>;
	panelVisible = false;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.user$ = this.store.select(selectUser);
	}

	openPanel() {
		this.panelVisible = true;
	}

	closePanel() {
		this.panelVisible = false;
	}
}
