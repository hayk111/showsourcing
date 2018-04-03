import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromTeamMember } from '~app/entity/store/team-member/team-member.bundle';
import { Observable } from 'rxjs/Observable';
import { User } from '~app/entity';

@Component({
	selector: 'product-request-team-feedback-dlg-app',
	templateUrl: './product-request-team-feedback-dlg.component.html',
	styleUrls: ['./product-request-team-feedback-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestTeamFeedbackDlgComponent implements OnInit {
	teamMembers$: Observable<User>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.store.select(fromTeamMember.selectArray);
	}

}
