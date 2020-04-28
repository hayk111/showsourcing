import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '~core/auth';
import { ApiService, Comment, ObservableQuery } from '~core/erm3';
import { customQueries } from '~core/erm3/queries/custom-queries';
import { AutoUnsub, uuid } from '~utils';



@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	listRef: ObservableQuery;
	comments$: Observable<Comment[]>;
	private nodeId: string;

	constructor(
		private route: ActivatedRoute,
		private apiSrv: ApiService
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.nodeId = `Product:${id}`;
		this.listRef = this.apiSrv.query<Comment[]>({
				query: customQueries.comments,
				variables: { nodeId: this.nodeId }
			}, true);
		this.comments$ = this.listRef.data$;
	}

	sendComment(message: string) {
		const comment: Comment = {
			message,
			nodeId: this.nodeId
		};
		this.apiSrv.create<Comment>('Comment', comment)
			.subscribe(_ => this.listRef.refetch());
	}


}
