import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast } from '~shared/toast/model';
import { ToastService } from '~shared/toast/services/toast.service';
import { TrackingComponent } from '~utils/tracking-component';

// container component to show toasts
@Component({
	selector: 'toast-container-app',
	templateUrl: './toast-container.component.html',
	styleUrls: ['./toast-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent extends TrackingComponent implements OnInit {
	toast$: Observable<Array<Toast>>;

	constructor(private toastSrv: ToastService) {
		super();
	}

	ngOnInit() {
		this.toast$ = this.toastSrv.toast$;
	}

}
