import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../../app/components/app.component';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { CommentTargetActions } from '../../../../store/action/target/comment.action';
import { UserService } from '../../../user/services/user.service';
import { selectCommentsForCurrentTarget, selectCommentsArrayForCurrentTarget } from '../../../../store/selectors/target/target.selector';

@Component({
	selector: 'comments-entity-app',
	templateUrl: './comments-input-entity.component.html',
	styleUrls: ['./comments-input-entity.component.scss']
})
export class CommentsInputEntityComponent implements OnInit {
	comments$: Observable<Array<AppComponent>>;

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.comments$ = this.store.select<any>(selectCommentsArrayForCurrentTarget);
	}

	onNewComment(text: string) {
		this.store.dispatch(CommentTargetActions.add( new AppComment(text, this.userSrv.getUserId())));
	}

}
