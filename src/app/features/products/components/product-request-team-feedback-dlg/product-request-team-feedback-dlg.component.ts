import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '~models';
import { DialogService } from '~shared/dialog';
import { TeamService } from '~features/products/services/team.service';
import { take, map, switchMap, first } from 'rxjs/operators';


@Component({
	selector: 'product-request-team-feedback-dlg-app',
	templateUrl: './product-request-team-feedback-dlg.component.html',
	styleUrls: ['./product-request-team-feedback-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestTeamFeedbackDlgComponent implements OnInit {
	teamMembers$: Observable<Array<User>>;
	selected = {};
	selectedProducts: string[];
	get products() {
		return this.selectedProducts;
	}

	constructor(private dlgSrv: DialogService, private teamSrv: TeamService) { }

	ngOnInit() {
		this.teamMembers$ = this.teamSrv.selectTeamMembers();
	}

	select(id: string, user) {
		this.selected[id] = user;
	}

	unselect(id: string) {
		delete this.selected[id];
	}

	submit() {
		this.teamMembers$.pipe(
			first(),
			map(teamMembers => teamMembers.filter(teamMember => !!this.selected[teamMember.id])),
			switchMap(projects => {
				return this.teamSrv.addProductFeedbacksForTeamUsers(projects, this.selectedProducts);
			})
		).subscribe(projects => {
			this.dlgSrv.close();
		});
	}

}
