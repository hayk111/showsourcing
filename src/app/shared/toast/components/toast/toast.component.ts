import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastType } from '~shared/toast/model';
import { ToastService } from '~shared/toast/services/toast.service';

@Component({
	selector: 'toast-app',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {

	public iconLeft = '';

	@Input() id = null;

	private _type: ToastType;
	@Input() set type(value: ToastType) {
		this._type = value;
		switch (value) {
			case ToastType.ERROR: {
				this.iconLeft = 'times';
				break;
			}
			case ToastType.DANGER:
			case ToastType.WARNING:
			case ToastType.SUCCESS:
			case ToastType.DELETED: {
				this.iconLeft = 'check';
				break;
			}
		}
	}
	get type() {
		return this._type;
	}

	@Input() title: string;
	@Input() message: string;
	@Input() actionMessage: string;
	@Input() action: Observable<any>;

	public ToastType = ToastType;

	constructor(
		protected toastSrv: ToastService
	) { }

	ngOnInit() { }

	forceClose() {
		this.toastSrv.removeToast(this.id);
	}

	onActionClick() {
		this.action.subscribe(({ file, name }) => saveAs(file, name));
	}

}
