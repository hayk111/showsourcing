import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Comment } from '~core/erm3';
import { ApiLibService } from '~core/api-lib';
import { AutoUnsub, uuid } from '~utils';



@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	listRef: any;
	comments$: Observable<Comment[]>;
	private nodeId: string;

	constructor(
		private route: ActivatedRoute,
		private apiLibSrv: ApiLibService
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.nodeId = `Product:${id}`;
		// TODO: implement listRef query
		// this.listRef = this.apiSrv.query<Comment[]>({
		// 		query: customQueries.comments,
		// 		variables: { nodeId: this.nodeId }
		// 	}, true);
		this.comments$ = this.listRef.data$;
	}

	sendComment(message: string) {
		const comment: Comment = {
			message,
			nodeId: this.nodeId
		};
		this.apiLibSrv.db.create('Comment', [comment])
			.subscribe(_ => this.listRef.refetch());
	}

	onCommentDeleted(comment: Comment) {
		this.apiLibSrv.db.delete(this.listRef, [comment]);
	}


}
