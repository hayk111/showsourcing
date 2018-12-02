import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModuleRef, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ProductService, ProductStatusTypeService } from '~entity-services';
import { ERM, Product, ProductStatusType } from '~models';
import { ProductAddToProjectDlgComponent, RfqDialogComponent } from '~common/dialog';
import { DialogService } from '~shared/dialog/services';
import { CustomField } from '~shared/dynamic-forms';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'price-with-quantity-app',
	templateUrl: './price-with-quantity.component.html',
	styleUrls: ['./price-with-quantity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceWithQuantityComponent extends TrackingComponent implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(){

	}
}
