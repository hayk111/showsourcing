import {
	Component,
	Input,
	ViewChild,
	ChangeDetectorRef,
	Output,
	EventEmitter,
} from '@angular/core';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { StatusSelectorService } from '~shared/status-selector/service/status-selector.service';
import { AutoUnsub, StatusUtils } from '~utils';
import { Typename } from 'showsourcing-api-lib';

@Component({
	selector: 'status-selector-app',
	templateUrl: './status-selector.component.html',
	styleUrls: ['./status-selector.component.scss'],
	providers: [StatusSelectorService],
	host: {
		class: 'pointer',
	},
})
export class StatusSelectorComponent extends AutoUnsub {
	/** Its always going to be a Product | Sample | Supplier | Task */
	private _typename: Typename;
	@Input()
	public set typename(typename: Typename) {
		this.statusSrv.setup(typename);
		this._typename = typename;
	}
	public get typename(): Typename {
		return this._typename;
	}

	// the entity can be optional => for the mass update
	@Input() entity: any = {};
	// the fakeStatus is used to don't update entity when clicking a new status => for the mass update
	@Input() fakeStatus: any = {};

	@Input() displayStep = false; // show the number before the status's name

	// use for the cdk overlay
	@Input() offsetX = 0;
	@Input() offsetY = 5;
	@Input() selectSize: 'l' | 'm' = 'm';

	@Input() type: 'badge' | 'button' = 'badge';

	@Output() statusUpdated = new EventEmitter();

	@ViewChild(ContextMenuComponent, { static: false }) menu: ContextMenuComponent;

	statusUtils = StatusUtils;

	constructor(public statusSrv: StatusSelectorService, private cd: ChangeDetectorRef) {
		super();
	}

	updateStatus(newStatus, entity) {
		this.statusUpdated.emit(newStatus);
		if (!entity.id) {
			this.fakeStatus = newStatus;
			return;
		}
		this.statusSrv.updateStatus(newStatus, entity);
	}

	isLast() {
		const statuses = this.statusSrv.listStatus;
		if (!statuses || !this.entity || !this.entity.status) {
			return true;
		}
		const lastStep = statuses[statuses.length - 1].step;
		return this.entity.status.step < lastStep ? false : true;
	}

	getNextStatus() {
		const statuses = this.statusSrv.listStatus;
		const nextStep = this.entity.status.step + 1;
		return statuses.find(status => status.step === nextStep);
	}

	next(): void {
		this.updateStatus(this.getNextStatus(), this.entity);
	}
}
