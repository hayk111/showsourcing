import { Component, OnInit } from '@angular/core';
import { RequestElementService } from '~core/entity-services';
import { Observable } from 'rxjs';
import { RequestElement } from '~core/models';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'request-element-details-sup',
	templateUrl: './request-element-details.component.html',
	styleUrls: ['./request-element-details.component.scss']
})
export class RequestElementDetailsComponent implements OnInit {
	element$: Observable<RequestElement>;
	constructor(
		private requestElementSrv: RequestElementService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		const id$ = this.route.params.pipe(map(params => params.id));
		this.element$ = id$.pipe(
			switchMap(id => this.requestElementSrv.queryOne(id))
		);
	}

	reply() {

	}

}
