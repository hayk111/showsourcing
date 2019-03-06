import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { RequestService } from '~core/entity-services';
import { ERM, Request } from '~core/models';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'request-details-app',
	templateUrl: './request-details.component.html',
	styleUrls: ['./request-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent extends AutoUnsub implements OnInit {

	request: Request;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: RequestService,
		private notifSrv: NotificationService
	) { super(); }

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id, '', Client.GLOBAL_REQUEST)),
			takeUntil(this._destroy$)
		).subscribe(
			request => this.onRequest(request),
			err => this.onError(err)
		);
	}

	private onRequest(request) {
		if (!request) {
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: 'The request doesn\'t exist',
				timeout: 3500
			});
			this.router.navigate(['request']);
		} else {
			this.request = request;
		}
	}

	private onError(error) {
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: 'Error',
			message: 'There is an error, please try again later',
			timeout: 3500
		});
		this.router.navigate(['request']);
	}

}
