import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Typename } from '~core/erm3/typename.type';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { StatusSelectorService } from '~shared/status-selector/service/status-selector.service';
import { AutoUnsub, StatusUtils } from '~utils';
import { map } from 'rxjs/operators';

@Component({
	selector: 'status-selector-app',
	templateUrl: './status-selector.component.html',
	styleUrls: ['./status-selector.component.scss'],
	host: {
		class: 'pointer',
	},
})
export class StatusSelectorComponent extends AutoUnsub {
	/** Its always going to be a Product | Sample | Supplier | Task */
	private _typename: Typename;
	@Input()
	public set typename(typename: Typename) {
		this.statusSrv.setupStatuses(typename);
		this._typename = typename;
	}
	public get typename(): Typename {
		return this._typename;
	}

	@Input() entity: any = {}; // the entity can be optional => for the mass update

	@Input() displayStep = false; // show the number before the status's name

	// use for the cdk overlay
	@Input() offsetX = 0;
	@Input() offsetY = 5;
	@Input() selectSize: 'l' | 'm' = 'm';

	@Input() type: 'badge' | 'button' = 'badge';

	@ViewChild(ContextMenuComponent, { static: false }) menu: ContextMenuComponent;

	statusUtils = StatusUtils; // TODO adapt this for colors and move it in service

	constructor(public statusSrv: StatusSelectorService, private cd: ChangeDetectorRef) {
		super();
	}

	updateStatus(newStatus, entity) {
		this.statusSrv.updateStatus(newStatus, entity).subscribe((newEntity) => {
			this.entity = newEntity;
			this.cd.markForCheck();
		});
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
		return statuses.find((status) => status.step === nextStep);
	}

	next() {
		return this.updateStatus(this.getNextStatus(), this.entity);
	}
}
