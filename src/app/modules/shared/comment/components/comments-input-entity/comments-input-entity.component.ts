import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { CommentActions } from '../../../../store/action/comment.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../../app/components/app.component';
import { AppComment } from '../../../../store/model/comment.model';
import { selectCommentsForTarget } from '../../../../store/selectors/target/comments.selector';

@Component({
	selector: 'comments-entity-app',
	templateUrl: './comments-input-entity.component.html',
	styleUrls: ['./comments-input-entity.component.scss']
})
export class CommentsInputEntityComponent implements OnInit {
	private _target: EntityTarget;
	comments$: Observable<Array<AppComponent>>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.comments$ = this.store.select<any>(selectCommentsForTarget(this._target));
	}

	onNewComment(text: string) {
		this.store.dispatch(CommentActions.addNew( new AppComment(text, this.target, this.store)));
	}

	@Input()
	set target( target: EntityTarget ) {
		this._target = target;
		this.store.dispatch(CommentActions.load(target));
	}

	get target() {
		return this._target;
	}

}
