import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { CommonDialogService } from '~common/dialog';
import { SampleService, SampleStatusService } from '~core/entity-services';
import { SampleQueries } from '~core/entity-services/sample/sample.queries';
import { ListPageDataService, ListPageViewService, SelectionService, SelectionWithFavoriteService, ListPageService, ListPageKey } from '~core/list-page';
import { Sample, ERM } from '~core/models';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { AutoUnsub } from '~utils';
import { statusSampleToKanbanCol } from '~utils/kanban.utils';
import { first, map } from 'rxjs/operators';

@Component({
	selector: 'sample-card-test-app',
	templateUrl: './sample-card-test.component.html',
	styleUrls: ['./sample-card-test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class SampleCardTestComponent extends AutoUnsub implements OnInit {

	columns$: Observable<KanbanColumn[]>;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, any>>;

	constructor(
		protected sampleSrv: SampleService,
		protected sampleStatusSrv: SampleStatusService,
		protected router: Router,
		protected featureSrv: SampleService,
		public listSrv: ListPageService<any, any>,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.SAMPLE_TEST,
			entitySrv: this.featureSrv,
			searchedFields: ['name', 'supplier.name', 'product.name'],
			entityMetadata: ERM.SAMPLE
		});

		this.selected$ = this.listSrv.selection$;

		// we just take the first 15 since this is a test and we just want to display the behaviour
		const samples$ = this.sampleSrv.queryMany({ take: 15 }).pipe(
			first(),
			// we lose the order when the product is updated
			// because apollo has no idea of how to reorder items unless we do
			// a refetch, but we re gonna do it on the front end
			map(sample => sample.sort(
				(a, b) => +(new Date(b.lastUpdatedDate)) - (+new Date(a.lastUpdatedDate)))
			)
		);

		const sampleStatus$ = this.sampleStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				descending: false
			}).pipe();

		this.columns$ = combineLatest(
			sampleStatus$,
			samples$,
			statusSampleToKanbanCol
		);
	}

	updateSampleStatus(event: KanbanDropEvent) {
		if (event.to === event.from) {
			return;
		}
		this.sampleSrv.update({
			id: event.item.id,
			status: {
				id: event.to,
				__typename: 'SampleStatus'
			}
		}).subscribe();
	}

	updateSamplesStatus(event: { to: any, items: any[] }) {
		const samples = event.items.map(id => ({
			id,
			status: { id: event.to, __typename: 'SampleStatus' }
		}));
		this.sampleSrv.updateMany(samples).subscribe();
	}

	onColumnSelected(samples: Sample[]) {
		samples.forEach(sample => this.listSrv.selectOne(sample));
	}

	onColumnUnselected(samples: Sample[]) {
		samples.forEach(sample => this.listSrv.unselectOne(sample));
	}

}
