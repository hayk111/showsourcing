import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { api, Comment } from 'showsourcing-api-lib';
import { Observable } from 'rxjs';
import { AutoUnsub } from '~utils';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';

@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListHelper2Service]
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	comments$: Observable<Comment[]>;
	private nodeId: string;

	constructor(
		private route: ActivatedRoute,
		public listHelper: ListHelper2Service
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.nodeId = 'product:' + id;
		this.listHelper.setup('Comment', this._destroy$, (options) => api.Comment.findByNodeId(this.nodeId));
		this.listHelper.data$.subscribe(comments => {
			console.log('ActivityPageComponent -> ngOnInit -> comments', comments);
		});
	}

	sendComment(message: string) {
		const comment: Comment = {
			message,
			nodeId: this.nodeId
		};
		api.Comment.create([comment]).subscribe(created => {
			console.log('ActivityPageComponent -> sendComment -> created', created);
		});
	}

}
