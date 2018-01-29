import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../../app/components/app.component';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { CommentSlctnActions } from '../../../../store/action/selection/comment-selection.action';
import { UserService } from '../../../user/services/user.service';
import { selectCommentsForSelection } from '../../../../store/selectors/selection/selection.selector';

@Component({
	selector: 'comments-entity-app',
	templateUrl: './comments-input-entity.component.html',
	styleUrls: ['./comments-input-entity.component.scss']
})
export class CommentsInputEntityComponent implements OnInit {
	private _target: EntityTarget;
	comments$: Observable<Array<AppComponent>>;

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.comments$ = this.store.select<any>(selectCommentsForSelection);
	}

	onNewComment(text: string) {
		this.store.dispatch(CommentSlctnActions.create( new AppComment(text, this.userSrv.getUserId())));
	}


}
