import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { api, Comment } from 'lib';
import { Observable } from 'rxjs';
import { AutoUnsub } from '~utils';



@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	comments$: Observable<Comment[]>;
	private nodeId: string;

	constructor(
		private route: ActivatedRoute,
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.snapshot.parent.params.id;
		this.comments$ = api.Product.comments(id).data$;
	}

	sendComment(message: string) {
		const comment: Comment = {
			message,
			nodeId: this.nodeId
		};
		// api.Comment.create([comment]).subscribe();
	}

}
