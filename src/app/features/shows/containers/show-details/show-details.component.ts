import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ShowService } from '~global-services';
import { Observable } from 'rxjs';
import { Show } from '~models';
import { ShowFeatureService } from '~features/shows/services/show-feature.service';

@Component({
	selector: 'app-show-details',
	templateUrl: './show-details.component.html',
	styleUrls: ['./show-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowDetailsComponent implements OnInit {
	show$: Observable<Show>;

	constructor(
		private route: ActivatedRoute,
		private srv: ShowFeatureService
	) { }

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id)
		);
		this.show$ = id$.pipe(
			switchMap(id => this.srv.selectOne(id))
		);
	}

}
