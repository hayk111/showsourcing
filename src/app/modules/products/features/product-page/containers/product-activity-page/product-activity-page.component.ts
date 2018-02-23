import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserService } from '@modules/user';
import { CommentTargetActions } from '@store/action/target/comment.action';
import { AppComment } from '@store/model/entities/comment.model';
import { selectCommentsForCurrentTarget } from '@store/selectors/target/target.selector';

@Component({
	selector: 'app-product-activity-page',
	templateUrl: './product-activity-page.component.html',
	styleUrls: ['./product-activity-page.component.scss'],
})
export class ProductActivityPageComponent implements OnInit {
	comments$: Observable<Array<AppComment>>;
	comment = new FormControl('');

	constructor(private store: Store<any>, private userSrv: UserService) {}

	ngOnInit() {
		this.comments$ = this.store.select(selectCommentsForCurrentTarget);
	}

	onComment(txt: string) {
		this.store.dispatch(CommentTargetActions.add(new AppComment(txt, this.userSrv.getUserId())));
	}
}
