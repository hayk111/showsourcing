import { Component, OnInit } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { TargetAction } from '../../../../store/action/target/target.action';
import { selectCommentsForCurrentTarget } from '../../../../store/selectors/target/target.selector';
import { FormControl } from '@angular/forms';
import { CommentTargetActions } from '../../../../store/action/target/comment.action';
import { UserService } from '../../../../shared/user/services/user.service';

@Component({
	selector: 'app-product-activity-page',
	templateUrl: './product-activity-page.component.html',
	styleUrls: ['./product-activity-page.component.scss']
})
export class ProductActivityPageComponent implements OnInit {
	comments$: Observable<Array<AppComment>>;
	comment = new FormControl('');

	constructor(private store: Store<any>, private userSrv: UserService) {

	}

	ngOnInit() {
		this.comments$ = this.store.select(selectCommentsForCurrentTarget);
	}

	onComment(txt: string) {
		this.store.dispatch(CommentTargetActions.add(new AppComment(txt, this.userSrv.getUserId())));
	}
}
