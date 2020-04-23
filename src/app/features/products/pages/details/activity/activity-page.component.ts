import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiService, Comment, ObservableQuery } from '~core/erm3';
import { ListPageService } from '~core/list-page';
import { AutoUnsub } from '~utils';



@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	listRef: ObservableQuery;
	comments$: Observable<Comment[]>;

	constructor(
		private route: ActivatedRoute,
		private apiSrv: ApiService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id)
		);
		this.comments$ = id$.pipe(
			// TODO should create rxjs pipe that transform this into a filter
			// or use the filter service, at least something for some abstraction
			map(id => ({ filter: { nodeId: { eq: `Product:${id}` }}})),
			map(filter => this.apiSrv.list<Comment>('Comment', { filter })),
			tap(listRef => this.listRef = listRef),
			switchMap(listRef => listRef.data$)
		);
	}

	sendComment(message: string) {
		const comment: Comment = { message };
		this.apiSrv.create<Comment>('Comment', comment).pipe(
			tap(created => this.apiSrv.addToList(this.listRef, created))
		).subscribe();
	}


}
